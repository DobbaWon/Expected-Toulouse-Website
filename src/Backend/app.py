import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, send_file
from flask_cors import CORS
import os

def get_league_table(text_content):
    # Get the League Table (Between "League Table" and the first "League Rules"):
    lines = text_content.split("\n")
    start_index = lines.index("League Table") + 1
    end_index = lines.index("League Rules")
        
    # Split the league table into individual team entries by detecting the team names:
    league_table = []
    current_team = []
    team_names = ["EXPECTED TOULOUSE", "CHRIS PEGGS BOYS", "RORO FC", "JLK FC", "SILVERDOOR FC", "DIDDY'S ROSTER"]

    for line in lines[start_index:end_index]:
        # Check if the line starts with a team name:
        for team in team_names:
            if line.startswith(team):
                if current_team:
                    league_table.append(" ".join(current_team))  # Save previous team:
                current_team = [line]  # Start new team entry:
                break
        else:
            # The last team:
            current_team.append(line)
    
    # Append the last team:
    league_table.append(" ".join(current_team))
    
    # Removing the position number from the table because its not needed and ruins the JSON structure:
    new_league_table = []
    for i in range(len(league_table)):
        if i < len(league_table) - 1:
            new_league_table.append(league_table[i][:-1])
        else:
            new_league_table.append(league_table[i])

    with open("LeagueTable.txt", "w", encoding="utf-8") as file:
        file.write("\n".join(new_league_table))
    
    print("Saved League Table to LeagueTable.txt")

def get_previous_fixtures(text_content):
    # Get the Previous Fixtures (Between "View Previous Results" and the second "League Rules"):
    lines = text_content.split("\n")
    start_index = lines.index("View Previous Results") + 1
    end_index = lines.index("League Rules", (lines.index("League Rules") + 1))

    previous_fixures = lines[start_index:end_index]
    previous_fixures = [line for line in previous_fixures if "Time" not in line and "Home" not in line and "Away" not in line and "Result" not in line and "Report" not in line and ("View" != line)]

    # Merge the lines of each fixture into one line:
    merged_fixtures = []
    current_fixture = ""

    for line in previous_fixures:
        if line.startswith("2") or line.startswith("View"):
            if current_fixture:
                merged_fixtures.append(current_fixture.strip())
            current_fixture = line
        else:
            current_fixture += " " + line.strip()
    # Append the last fixture
    if current_fixture:
        merged_fixtures.append(current_fixture.strip())

    with open("PreviousFixtures.txt", "w", encoding="utf-8") as file:
        for line in merged_fixtures:
            file.write(line + "\n")

    print("Saved Previous Fixtures to PreviousFixtures.txt")

def get_future_fixtures(text_content):
    # Get the Future Fixtures (Between "View Future Fixtures" and "View Previous Results"):
    lines = text_content.split("\n")
    start_index = lines.index("View Future Fixtures") + 1
    end_index = lines.index("View Previous Results")

    future_fixtures = lines[start_index:end_index]
    future_fixtures = [line for line in future_fixtures if "Time" not in line and "Home" not in line and "Away" not in line]

    # Merge the lines of each fixture into one line:
    merged_fixtures = []
    current_fixture = ""

    for line in future_fixtures:
        if line.startswith("2") or line.startswith("View"):
            if current_fixture:
                merged_fixtures.append(current_fixture.strip())
            current_fixture = line
        else:
            current_fixture += " " + line.strip()
    # Append the last fixture
    if current_fixture:
        merged_fixtures.append(current_fixture.strip())

    with open("FutureFixtures.txt", "w", encoding="utf-8") as file:
        for line in merged_fixtures:
            file.write(line + "\n")

    print("Saved Future Fixtures to FutureFixtures.txt")

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape_data():
    url = "https://www.footballmundial.com/info/leagues/11881"
    headers = {"User-Agent": "Mozilla/5.0"}  
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "lxml")
        text_content = soup.get_text(separator="\n", strip=True)

        get_league_table(text_content)
        get_previous_fixtures(text_content)
        get_future_fixtures(text_content)

        return jsonify({'message': 'Scraping completed successfully!'}), 200
    else:
        return jsonify({'message': f'Failed to fetch page, status code: {response.status_code}'}), 500

@app.route('/display/league-table', methods=['GET'])
def display_league_table():
    file_path = "LeagueTable.txt"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            file_content = file.read()
        
        lines = file_content.split("\n")
        league_data = []
        
        # Skip the table header (first line):
        for line in lines[1:]:
            columns = line.split()  # Split by whitespace because the columns are separated by spaces
            
            # We have just split our names too, so we have to go and fix that:
            if len(columns) >= 8: # There is a team name with more than one word:
                team_name = " ".join(columns[0:-6]) # Join the first columns to get the team name
                
                # Extract the stats from the last six columns:
                played = columns[-6]
                won = columns[-5]
                drawn = columns[-4]
                lost = columns[-3]
                goal_difference = columns[-2]
                points = columns[-1]
                
                # Append to the league_data list:
                league_data.append({
                    'teamName': team_name,  
                    'played': played,     
                    'won': won,             
                    'drawn': drawn,        
                    'lost': lost,         
                    'goalDifference': goal_difference,
                    'points': points         # Points (Pt)
                })
        
        return jsonify({'leagueTable': league_data}), 200
    else:
        return jsonify({'message': 'File not found'}), 404

@app.route('/display/previous-fixtures', methods=['GET'])
def display_previous_fixtures():
    file_path = "PreviousFixtures.txt"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            file_content = file.read()

    # Getting just Expected Toulouse fixtures:
    lines = file_content.split("\n")
    previous_fixtures = []
    for i in range(len(lines)):
        if "EXPECTED TOULOUSE" in lines[i]:
            previous_fixtures.append(lines[i] + "\n")

    if (previous_fixtures):
        return jsonify({'file_content': previous_fixtures}), 200
    else:
        return jsonify({'message': 'File not found'}), 404

@app.route('/display/future-fixtures', methods=['GET'])
def display_future_fixtures():
    file_path = "FutureFixtures.txt"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            file_content = file.read()

    # Getting just Expected Toulouse fixtures:
    lines = file_content.split("\n")
    future_fixtures = []
    for i in range(len(lines)):
        if "View:" in lines[i]:
            future_fixtures.append(lines[i][5:] + " - ")
        if "EXPECTED TOULOUSE" in lines[i]:
            future_fixtures[len(future_fixtures) - 1] += lines[i][:5] + " -" + lines[i][5:]
        
    if (future_fixtures):
        return jsonify({'file_content': future_fixtures}), 200
    else:
        return jsonify({'message': 'File not found'}), 404

@app.route('/display/get-latest-fixture', methods=['GET'])
def get_latest_fixture():
    latest_fixture = None

    file_path = "PreviousFixtures.txt"
    with open(file_path, "r", encoding="utf-8") as file:
        file_content = file.read()

    lines = file_content.split("\n")[:5] # The latest fixtures for all teams
    for i in range(len(lines)):
        if "EXPECTED TOULOUSE" in lines[i]:
            latest_fixture = lines[i]
            break
    
    else:
        return jsonify({'message': 'Fixture not found'}), 404
    
    return jsonify({'latestFixture': latest_fixture}), 200

@app.route('/display/get-next-fixture', methods=['GET'])
def get_next_fixture():
    next_fixture = None
    next_fixture_date = None
    next_fixture_time = None

    file_path = "FutureFixtures.txt"
    with open(file_path, "r", encoding="utf-8") as file:
        file_content = file.read()

    lines = file_content.split("\n")[:5]
    for i in range(len(lines)):
        if "EXPECTED TOULOUSE" in lines[i]:
            next_fixture_time = lines[i][:5] # Get the time of the fixture
            next_fixture = lines[i][5:] # Skip the time
            next_fixture_date = lines[0][5:] # Skip the "View:"
            break
    
    else:
        return jsonify({'message': 'Fixture not found'}), 404
    
    return jsonify(
        {'next_fixture': next_fixture,
         'next_fixture_date': next_fixture_date,
         'next_fixture_time': next_fixture_time}), 200

if __name__ == "__main__":
    app.run(debug=True)

