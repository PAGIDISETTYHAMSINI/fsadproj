import React, { useState } from 'react';
import { BookOpen, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Lessons = () => {
  const { user, addGoal, completeLesson, completedLessons } = useAuth();
  // In a real app, this would be fetched from the Spring Boot API
  const [lessons] = useState([
    { id: 1, title: 'Introduction to Solar Power', type: 'Energy', excerpt: 'Learn the basics of photovoltaics.' },
    { id: 2, title: 'Composting 101', type: 'Waste', excerpt: 'Turn your food scraps into rich soil.' },
    { id: 3, title: 'Minimalist Wardrobe', type: 'Lifestyle', excerpt: 'Reduce your fashion footprint.' },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Interactive Lessons</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {user?.role === 'ADMIN' && (
            <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>+ Add Lesson</button>
          )}
          <input type="text" className="input-field" placeholder="Search lessons..." style={{ padding: '0.5rem', width: '200px' }} />
        </div>
      </div>

      <div className="grid-cards">
        {lessons.map(lesson => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <div key={lesson.id} className="card" style={isCompleted ? { border: '2px solid var(--color-primary-light)' } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {lesson.type}
                </span>
                {isCompleted && <CheckCircle size={18} color="var(--color-primary)" />}
              </div>
              <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>{lesson.title}</h3>
              <p>{lesson.excerpt}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button 
                  className={isCompleted ? "btn btn-outline" : "btn btn-primary"} 
                  style={{ flex: 1 }}
                  onClick={() => completeLesson(lesson.id)}
                  disabled={isCompleted}
                >
                  <BookOpen size={18} /> {isCompleted ? 'Completed' : 'Read Lesson'}
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '0.5rem' }}
                  onClick={() => addGoal(`Complete Lesson: ${lesson.title}`)}
                  title="Add to Goals"
                >
                  <Target size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons;
