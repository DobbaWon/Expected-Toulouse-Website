import './Fixtures.css';
import React, { useEffect, useState } from 'react';

function Fixtures() {
    // State variables to store the League Table, Previous Fixtures, Next Fixtures, and any error messages:
    const [leagueTable, setLeagueTable] = useState([]);
    const [previousFixtures, setPreviousFixtures] = useState('');
    const [futureFixtures, setFutureFixtures] = useState('');
    const [nextFixture, setNextFixture] = useState([]);
    const [lastFixture, setLastFixture] = useState('');
    const [error, setError] = useState('');

    // Fetch the League Table, Previous Fixtures, and Next Fixtures from backend when this page is loaded:
    const fetchData = async () => {
        try {
            // First trigger the scraping method
            const scrapeResponse = await fetch('http://127.0.0.1:5000/scrape');
            if (!scrapeResponse.ok) {
                throw new Error('Failed to trigger scraping.');
            }

            // Then, fetch the other data after scraping is complete
            const leagueTableResponse = await fetch('http://127.0.0.1:5000/display/league-table');
            const leagueTableData = await leagueTableResponse.json();
            if (leagueTableData.leagueTable) {
                setLeagueTable(leagueTableData.leagueTable);
            } else {
                setError('Failed to load League Table.');
            }

            const previousFixturesResponse = await fetch('http://127.0.0.1:5000/display/previous-fixtures');
            const previousFixturesData = await previousFixturesResponse.json();
            setPreviousFixtures(previousFixturesData.file_content);

            const futureFixturesResponse = await fetch('http://127.0.0.1:5000/display/future-fixtures');
            const futureFixturesData = await futureFixturesResponse.json();
            setFutureFixtures(futureFixturesData.file_content);

            const lastFixture = await fetch('http://127.0.0.1:5000/display/get-latest-fixture');
            const lastFixtureData = await lastFixture.json();
            setLastFixture(lastFixtureData.latestFixture);

            const nextFixture = await fetch('http://127.0.0.1:5000/display/get-next-fixture');
            const nextFixtureData = await nextFixture.json();
            let fixture = [
                nextFixtureData.next_fixture, 
                nextFixtureData.next_fixture_date, 
                nextFixtureData.next_fixture_time
            ];
            setNextFixture(fixture);

        } catch (err) {
            setError('Failed to load data: ' + err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="flex-container">
                <div className="league-table">
                    <h2>League Table</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Games Played</th>
                                <th>Wins</th>
                                <th>Draws</th>
                                <th>Losses</th>
                                <th>Goal Difference</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leagueTable.map((team, index) => (
                                <tr key={index}>
                                    <td>{team.teamName}</td>
                                    <td>{team.played}</td>
                                    <td>{team.won}</td>
                                    <td>{team.drawn}</td>
                                    <td>{team.lost}</td>
                                    <td>{team.goalDifference}</td>
                                    <td>{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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

                <div className="future-fixtures">
                    <h2>Future Fixtures</h2>
                    {futureFixtures.length > 0 ? (
                        futureFixtures.map((fixture, index) => (
                            <p key={index}>{fixture}</p>
                        ))
                    ) : (
                        <p>Loading... (May have failed to load)</p>
                    )}
                </div>
            </div>

            {/* Outside of the flex container */}
            <div className="close-fixtures">
                <div className="next-fixture">
                    <h2>Next Fixture:</h2>
                        {nextFixture.length === 3 ? (
                            <p>
                                <strong>Match:</strong> {nextFixture[0] || 'Unknown'} <br />
                                <strong>Date:</strong> {nextFixture[1] || 'Unknown'} <br />
                                <strong>Time:</strong> {nextFixture[2] || 'Unknown'}
                            </p>
                        ) : (
                            <p>Loading... (May have failed to load)</p>
                        )}
                </div>

                <div className="last-fixture">
                    <h2>Last Fixture:</h2>
                    <pre>{lastFixture || 'Loading... (May have failed to load)'}</pre>
                </div>
            </div>
            {/* Show an error if one exists: */}
            {error && <div>{error}</div>}
        </div>
    );
}

export default Fixtures;
