import React, { useEffect, useState } from 'react';

function Fixtures() {
    // State variables to store the League Table, Previous Fixtures, Next Fixtures, and any error messages:
    const [leagueTable, setLeagueTable] = useState([]);
    const [previousFixtures, setPreviousFixtures] = useState('');
    const [futureFixtures, setFutureFixtures] = useState('');
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

        } catch (err) {
            setError('Failed to load data: ' + err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
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

            <h2>Previous Fixtures</h2>
            <pre>{previousFixtures || 'Loading... (May have failed to load)'}</pre>

            <h2>Future Fixtures</h2>
            <pre>{futureFixtures || 'Loading... (May have failed to load)'}</pre>

            {/* Show an error if one exists: */}
            {error && <div>{error}</div>}
        </div>
    );
}

export default Fixtures;
