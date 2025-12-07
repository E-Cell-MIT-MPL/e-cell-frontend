export default function Hero() {
    return (
      <header style={{
        background: 'var(--bg-light)',
        padding: '5rem 0'
      }}>
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
            E-Cell, MIT Manipal presents
          </p>
  
          <h1 style={{ fontSize: '3rem', color: 'var(--plum-dark)' }}>
            Innovation Policy Consortium
          </h1>
  
          <p style={{ margin: '1rem 0 2rem' }}>
            A National-Level Inter-College Policy & Research Initiative
          </p>
  
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="btn-primary">Register Now</a>
            <a href="#" className="btn-ghost">View Guidelines</a>
          </div>
        </div>
      </header>
    );
  }
  