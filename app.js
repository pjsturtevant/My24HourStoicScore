// Function to calculate scores
async function calculateScores(entry, virtues, dataset) {
    let scores = {};

    // Find the dataset row that matches the entry
    const matchingRow = dataset.find(row => row.journal_entry === entry);

    if (matchingRow) {
        // Calculate holistic score
        scores.holistic = matchingRow.holistic_score;

        // Calculate scores for each virtue
        virtues.forEach(virtue => {
            scores[virtue] = matchingRow[`${virtue.toLowerCase()}_score`];
        });
    } else {
        console.error('Entry not found in dataset');
    }

    return scores;
}

// Function to display scores
function displayScores(scores) {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = '<h2>Scores:</h2>';
    for (const virtue in scores) {
        scoreDisplay.innerHTML += `<p>${virtue}: ${scores[virtue]}</p>`;
    }
}

// Function to be called when the Submit button is clicked
async function submitJournal() {
    // Get user input
    const journalEntry = document.getElementById('journalEntry').value;
    const selectedVirtues = Array.from(document.getElementById('virtues').selectedOptions).map(option => option.value);

    // Fetch and parse the dataset
    const datasetResponse = await fetch('https://raw.githubusercontent.com/pjsturtevant/My24HourStoicScore/main/data/newstoictokenized_dataset.json');
    const dataset = await datasetResponse.json();

    // Calculate scores
    const scores = await calculateScores(journalEntry, selectedVirtues, dataset);

    // Display scores
    displayScores(scores);
}
