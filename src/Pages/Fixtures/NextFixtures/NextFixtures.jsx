import "./NextFixtures.css";
import FixturesNavbar from '../FixturesNavbar/FixturesNavbar';

import React, { useEffect, useState } from "react";

function NextFixtures() {
    // State variables for the Next Fixtures and any error messages:
    const [nextFixture, setNextFixture] = useState([]);
    const [futureFixtures, setFutureFixtures] = useState('');
    const [error, setError] = useState('');

    const fetchData = async () => {
        try{
            const futureFixturesResponse = await fetch('http://127.0.0.1:5000/display/future-fixtures');
            const futureFixturesData = await futureFixturesResponse.json();
            setFutureFixtures(futureFixturesData.file_content);
    
            const nextFixture = await fetch('http://127.0.0.1:5000/display/get-next-fixture');
            const nextFixtureData = await nextFixture.json();
            let fixture = [
                nextFixtureData.next_fixture, 
                nextFixtureData.next_fixture_date, 
                nextFixtureData.next_fixture_time
            ];
            setNextFixture(fixture);
        }
        catch (err) {
            console.error(err);
            setError('Failed to load Next Fixtures.');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <FixturesNavbar />
            
            <div className="fixtures-container">
                <div className="next-fixture">
                    <h2 className="datetime">{nextFixture[1]} - {nextFixture[2]}</h2>
                    <h2>Next Fixture:</h2>
                        {nextFixture.length === 3 ? (
                            <p>
                                {nextFixture[0]} 
                            </p>
                        ) : (
                            <p>Loading... (May have failed to load)</p>
                        )}
                </div>

                <div className="future-fixtures">
                    <h2>Future Fixtures</h2>
                    {futureFixtures.length > 0 ? (
                        futureFixtures.map((fixture, index) => (
                            <p key={index}>{
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

export default NextFixtures;
