import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 — route not found:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="page-shell" style={{ display: 'block' }}>
      <main className="content" style={{ textAlign: 'center', paddingTop: '4rem', maxWidth: 'none' }}>
        <h1 className="name" style={{ fontSize: '2rem' }}>
          404
        </h1>
        <p className="section-note">This page could not be found.</p>
        <p>
          <Link to="/">← Back home</Link>
        </p>
      </main>
    </div>
  );
};

export default NotFound;
