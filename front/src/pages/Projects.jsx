import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const { user, addGoal } = useAuth();
  const [projects] = useState([
    { id: 1, title: 'Build a Rainwater Collector', category: 'Water', diff: 'Medium' },
    { id: 2, title: 'Start a Community Garden', category: 'Community', diff: 'Hard' },
    { id: 3, title: 'Home Energy Audit', category: 'Energy', diff: 'Easy' },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Actionable Projects</h1>
        {user?.role === 'ADMIN' ? (
          <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>+ New Project</button>
        ) : (
          <button className="btn btn-primary">Suggest Project</button>
        )}
      </div>

      <div className="grid-cards">
        {projects.map(project => (
          <div key={project.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {project.category}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-hover)' }}>
                {project.diff}
              </span>
            </div>
            <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>{project.title}</h3>
            
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addGoal(project.title)}>
              <Target size={18} /> Add to My Goals
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
