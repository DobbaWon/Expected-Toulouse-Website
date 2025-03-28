import './Fixtures.css';
import FixturesNavbar from './FixturesNavbar/FixturesNavbar';

import React, { useEffect, useState } from 'react';


function Fixtures() {
    // State variables to store the League Table, Previous Fixtures, Next Fixtures, and any error messages:
    const [error, setError] = useState('');

    // Scrape the website for the sub-pages's data:
    const fetchData = async () => {
        try {
            const scrapeResponse = await fetch('http://127.0.0.1:5000/scrape');
            if (!scrapeResponse.ok) {
                throw new Error('Failed to trigger scraping.');
            }

        } catch (err) {
            setError('Failed to scrape data: ' + err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <FixturesNavbar />
            
            {/* Show an error if one exists: */}
            {error && <div>{error}</div>}
        </div>
    );
}

export default Fixtures;
