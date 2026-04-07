import React from 'react';
import { Users, BookOpen, Layout, PlusCircle, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for admin view
  const stats = [
    { label: 'Total Users', value: 124, icon: <Users size={24} /> },
    { label: 'Total Lessons', value: 12, icon: <BookOpen size={24} /> },
    { label: 'Active Projects', value: 8, icon: <Layout size={24} /> },
  ];

  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <button className="btn btn-primary">
          <PlusCircle size={18} /> Add New Content
        </button>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(74, 144, 226, 0.1)', borderRadius: 'var(--radius-full)', color: 'var(--color-primary)' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{stat.label}</p>
              <h2 style={{ margin: 0 }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layout size={20} /> Content Management
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Type</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: 'Introduction to Solar Energy', type: 'Lesson', status: 'Published' },
              { title: 'Community Garden Initiative', type: 'Project', status: 'Active' },
              { title: 'Waste Management Strategies', type: 'Lesson', status: 'Draft' },
            ].map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem' }}>{item.title}</td>
                <td style={{ padding: '1rem' }}>{item.type}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: 'var(--radius-sm)', 
                    fontSize: '0.8rem',
                    background: item.status === 'Published' || item.status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                    color: item.status === 'Published' || item.status === 'Active' ? '#4CAF50' : '#888'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.25rem', border: 'none', color: 'var(--color-error)' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
