import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Sun, TreeDeciduous } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      <section style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem' }}>
          Learn. Act. Sustain.
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Join the movement towards a greener future. Explore our interactive lessons 
          and start your first sustainable project today.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/lessons" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>
            Start Learning <ArrowRight size={20} />
          </Link>
          <Link to="/projects" className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>
            Browse Projects
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Choose SustainEd?</h2>
        <div className="grid-cards">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--color-primary-light)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Sun size={32} />
            </div>
            <h3>Renewable Energy</h3>
            <p>Understand how solar, wind, and geothermal energy can power our future sustainably.</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ background: '#4A90E2', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Recycle size={32} />
            </div>
            <h3>Waste Reduction</h3>
            <p>Learn practical tips for zero-waste living and responsible consumption.</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--color-primary)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <TreeDeciduous size={32} />
            </div>
            <h3>Eco-friendly Goals</h3>
            <p>Set personal goals and track your progress towards a more sustainable lifestyle.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
