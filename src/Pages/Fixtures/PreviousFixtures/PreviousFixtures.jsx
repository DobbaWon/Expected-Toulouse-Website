import "./PreviousFixtures.css";
import FixturesNavbar from '../FixturesNavbar/FixturesNavbar';

import React, { useEffect, useState } from "react";


function PreviousFixtures() {
    // State variables for the Previous Fixtures and any error messages:
    const [previousFixtures, setPreviousFixtures] = useState('');
    const [lastFixture, setLastFixture] = useState('');
    const [error, setError] = useState('');

    const fetchData = async () => {
        try{
            const previousFixturesResponse = await fetch('http://127.0.0.1:5000/display/previous-fixtures');
            const previousFixturesData = await previousFixturesResponse.json();
            setPreviousFixtures(previousFixturesData.file_content);

            const lastFixture = await fetch('http://127.0.0.1:5000/display/get-latest-fixture');
            const lastFixtureData = await lastFixture.json();
            setLastFixture(lastFixtureData.latestFixture);
        }
        catch (err) {
            console.error(err);
            setError('Failed to load Previous Fixtures.');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className="container">
            <FixturesNavbar />

            <div className="previous-fixtures">
                <h2>Previous Fixtures</h2>

                {previousFixtures.length > 0 ? (
                    previousFixtures.map((fixture, index) => (
                        <p key={index}>{fixture}</p>
                    ))
                ) : (
                    <p>Loading... (May have failed to load)</p>
                )}
            </div>
            <div className="last-fixture">
                <h2>Last Fixture:</h2>
                <pre>{lastFixture || 'Loading... (May have failed to load)'}</pre>
            </div>

            {/* Show an error if one exists: */}
            {error && <div>{error}</div>}
        </div>
    )
}

export default PreviousFixtures;