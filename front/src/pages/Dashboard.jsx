import React from 'react';
import { Award, CheckCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, goals, completedLessons, ecoPoints } = useAuth();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Please login to view your Dashboard</h2>
      </div>
    );
  }

  const stats = [
    { label: 'Lessons Completed', value: completedLessons.length, icon: <CheckCircle size={24} color="var(--color-primary)" /> },
    { label: 'Active Goals', value: goals.length, icon: <TrendingUp size={24} color="#4A90E2" /> },
    { label: 'Eco-Points', value: ecoPoints, icon: <Award size={24} color="#F5A623" /> },
  ];

  return (
    <div>
      <h1>Welcome back, {user.name}!</h1>
      <p style={{ marginBottom: '2rem' }}>Here's your sustainability progress.</p>
      
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-full)' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{stat.label}</p>
              <h2 style={{ margin: 0 }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            My Goals
          </h3>
          {goals.length === 0 ? (
            <p>You haven't added any goals yet. Visit the Lessons or Projects tab to get started!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {goals.map((goal, idx) => (
                <li key={goal.id} style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between', borderTop: idx !== 0 ? '1px solid var(--color-border)' : 'none' }}>
                  <span>{goal.title}</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{goal.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Recommended Next Steps
          </h3>
          <div style={{ padding: '0.75rem 0' }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-text-main)' }}>Take Lesson: Upcycling Basics</p>
            <span style={{ fontSize: '0.8rem' }}>10 mins • Earn 20 Eco-Points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
