package com.sustainable.backend.controller;

import com.sustainable.backend.model.Goal;
import com.sustainable.backend.model.User;
import com.sustainable.backend.repository.GoalRepository;
import com.sustainable.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
public class GoalController {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(email).orElse(null);
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getMyGoals() {
        User user = getCurrentAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        // Instead of writing a custom query in the repository, we can filter for simplicity,
        // or better yet we should add findByUser in GoalRepository. Let's do filtering if findByUser is absent.
        List<Goal> myGoals = goalRepository.findAll().stream()
                .filter(goal -> goal.getUser() != null && goal.getUser().getId().equals(user.getId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(myGoals);
    }

    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goalRequest) {
        User user = getCurrentAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        goalRequest.setUser(user);
        if (goalRequest.getStatus() == null) {
            goalRequest.setStatus("PENDING");
        }
        Goal savedGoal = goalRepository.save(goalRequest);
        return ResponseEntity.ok(savedGoal);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Goal> updateGoalStatus(@PathVariable Long id, @RequestParam String status) {
        User user = getCurrentAuthenticatedUser();
        Optional<Goal> optionalGoal = goalRepository.findById(id);

        if (optionalGoal.isPresent() && user != null) {
            Goal goal = optionalGoal.get();
            if (goal.getUser().getId().equals(user.getId())) {
                goal.setStatus(status);
                return ResponseEntity.ok(goalRepository.save(goal));
            } else {
                return ResponseEntity.status(403).build(); // Forbidden
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        User user = getCurrentAuthenticatedUser();
        Optional<Goal> optionalGoal = goalRepository.findById(id);

        if (optionalGoal.isPresent() && user != null) {
            Goal goal = optionalGoal.get();
            if (goal.getUser().getId().equals(user.getId())) {
                goalRepository.deleteById(id);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(403).build(); // Forbidden
            }
        }
        return ResponseEntity.notFound().build();
    }
}
