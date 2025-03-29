import "./LeagueTable.css";
import FixturesNavbar from '../FixturesNavbar/FixturesNavbar';

import React, { useEffect, useState } from "react";

function LeagueTable(){
    // State variables for the Table and any error messages:
    const [table, setTable] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const leagueTableResponse = await fetch('http://127.0.0.1:5000/display/league-table');
            const leagueTableData = await leagueTableResponse.json();
            setTable(leagueTableData.leagueTable);
        }
        catch (err) {
            console.error(err);
            setError('Failed to load League Table.');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <FixturesNavbar />
            <table>
                <thead>
                    <tr>
                        <th className="team-name">Team Name</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goal Difference</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((team, index) => (
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

            {/* Show an error if one exists: */}
            {error && <div>{error}</div>}
        </div>
    )
}
export default LeagueTable;