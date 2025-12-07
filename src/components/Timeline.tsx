export default function Timeline() {
    return (
      <section className="section">
        <div className="container">
          <h2>Important Dates</h2>
  
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              ['Registrations Open', '9–15 Dec 2025'],
              ['Case Study Submission', '23 Dec 2025'],
              ['GD Round', '10 Jan 2026'],
              ['Final Policy Submission', '21 Jan 2026'],
              ['Final Offline Event', '11–12 Feb 2026 · MIT Manipal'],
            ].map(([title, date]) => (
              <div key={title} style={{
                padding: '1.25rem',
                border: '1px solid #eee',
                borderRadius: '8px'
              }}>
                <h4>{title}</h4>
                <p>{date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  