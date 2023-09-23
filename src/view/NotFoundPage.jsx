import React from 'react';
import '../css/not-found-page.css';
const NotFoundPage = () => {
    return (
        <div className="missing-page-container">
            <div className="missing-content">
                <h1 className="glow">404</h1>
                <h2>Oops, The page you're looking for doesn't exist.</h2>
                <p>You might have taken a wrong turn. Better get back on track!</p>
                <a href="/" className="button">Go back to Home</a>
            </div>
        </div>
    );
};
export default NotFoundPage;