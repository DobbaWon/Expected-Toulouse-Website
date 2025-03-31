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
            let fixture = [
                lastFixtureData.latest_fixture, 
                lastFixtureData.latest_fixture_date, 
                lastFixtureData.latest_fixture_time
            ];
            setLastFixture(fixture);
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
        <div>
            <FixturesNavbar />
            
            <div className="fixtures-container">
                <div className="last-fixture">
                    <h2 className="datetime">{lastFixture[1]} - {lastFixture[2]}</h2>
                    <h2>Latest Result:</h2>
                        {lastFixture.length === 3 ? (
                            <p>
                                {lastFixture[0]} 
                            </p>
                        ) : (
                            <p>Loading... (May have failed to load)</p>
                        )}
                </div>

                <div className="results">
                    <h2>Results</h2>
                    {previousFixtures.length > 0 ? (
                        previousFixtures.map((fixture, index) => (
                            <p key={index} className="latest-fixtures">{
                                fixture}</p>
                        ))
                    ) : (
                        <p>Loading... (May have failed to load)</p>
                    )}
                </div>

                {/* Show an error if one exists: */}
                {error && <div>{error}</div>}
            </div>
        </div>
    )
}

export default PreviousFixtures;