import requests
from bs4 import BeautifulSoup

def get_league_table(text_content):
    # Get the League Table (Between "League Table" and the first "League Rules"):
    lines = text_content.split("\n")
    start_index = lines.index("League Table") + 1
    end_index = lines.index("League Rules")
        
    league_table = "\n".join(lines[start_index:end_index])

    with open("LeagueTable.txt", "w", encoding="utf-8") as file:
        file.write(league_table)
    
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


url = "https://www.footballmundial.com/info/leagues/11881"
headers = {"User-Agent": "Mozilla/5.0"}  
response = requests.get(url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, "lxml")
    text_content = soup.get_text(separator="\n", strip=True)

    get_league_table(text_content)
    get_previous_fixtures(text_content)
    get_future_fixtures(text_content)

else:
    print(f"Failed to fetch page, status code: {response.status_code}")


