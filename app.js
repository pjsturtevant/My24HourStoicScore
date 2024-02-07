// Function to calculate scores
async function calculateScores(entry, virtues, dataset) {
    let scores = {};

    // Find the closest matching row in the dataset based on some criteria
    const closestMatch = findClosestMatch(entry, dataset);

    if (closestMatch) {
        // Calculate holistic score
        scores.holistic = closestMatch.holistic_score;

        // Calculate scores for each virtue
        virtues.forEach(virtue => {
            scores[virtue] = closestMatch[`${virtue.toLowerCase()}_score`];
        });
    } else {
        console.error('No matching entry found in dataset. Using default scores.');
        // Set default scores here...
        // For simplicity, setting all scores to a default value of 1 (Minimal)
        virtues.forEach(virtue => {
            scores[virtue] = 1;
        });
    }

    return scores;
}

// Function to find the closest matching entry in the dataset
function findClosestMatch(entry, dataset) {
    // Placeholder implementation for demonstration purposes
    // In a real-world scenario, you would implement a more sophisticated matching algorithm
    return dataset.find(row => row.journal_entry.toLowerCase() === entry.toLowerCase());
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

