// Rubric mappings
const courageMapping = {
    'Exemplary': 5,
    'Proficient': 4,
    'Developing': 3,
    'Limited': 2,
    'Minimal': 1,
};

// Repeat for Wisdom, Justice, and Temperance
const wisdomMapping = { /* ... */ };
const justiceMapping = { /* ... */ };
const temperanceMapping = { /* ... */ };

// Sample dataset row (replace this with actual dataset)
const sampleDatasetRow = {
    courage_score: 'Proficient',
    wisdom_score: 'Developing',
    justice_score: 'Limited',
    temperance_score: 'Exemplary',
    holistic_score: 3.5,
    feedback: 'Some feedback here',
};

// Sample user input
const sampleJournalEntry = "I had a positive day today. Overcame challenges and prioritized needs over wants.";

// Calculate scores
function calculateScores(entry, virtues, datasetRow) {
    const scores = {
        holistic: datasetRow.holistic_score,
    };

    virtues.forEach(virtue => {
        const scoreDescription = datasetRow[`${virtue.toLowerCase()}_score`];
        const rubricMapping = getRubricMapping(virtue);
        
        console.log(`Virtue: ${virtue}, Description: ${scoreDescription}, Mapping:`, rubricMapping); // Add this line
        
        scores[virtue] = mapScore(scoreDescription, rubricMapping, entry, datasetRow);
    });

    console.log('Final Scores:', scores); // Add this line

    return scores;
}

// Map score based on rubric description
function mapScore(description, rubricMapping, entry, datasetRow) {
    console.log('Mapping:', rubricMapping); // Add this line
    console.log('Description:', description); // Add this line
    console.log('Entry:', entry); // Add this line
    console.log('Dataset Row:', datasetRow); // Add this line

    // Custom logic based on rubric criteria, content of the entry, and dataset information
    // You can add more sophisticated logic here

    // Example: Adjust the score based on dataset information
    if (description === 'Exemplary' && entry.includes('overcomes challenges')) {
        return rubricMapping[description] + datasetRow.holistic_score;
    } else if (description === 'Proficient' && entry.includes('occasionally struggles')) {
        return rubricMapping[description] + datasetRow.holistic_score;
    }

    // If no specific condition is met, use the mapping
    return rubricMapping[description];
}

// Retrieve rubric mapping based on virtue
function getRubricMapping(virtue) {
    let mapping = {};
    if (virtue === 'Courage') {
        mapping = courageMapping;
    } else if (virtue === 'Wisdom') {
        mapping = wisdomMapping;
    } else if (virtue === 'Justice') {
        mapping = justiceMapping;
    } else if (virtue === 'Temperance') {
        mapping = temperanceMapping;
    }

    console.log(`Virtue: ${virtue}, Mapping:`, mapping); // Add this line

    return mapping;
}

// Function to be called when the Submit button is clicked
function submitJournal() {
    // Get user input
    const journalEntry = document.getElementById('journalEntry').value;
    const selectedVirtues = Array.from(document.getElementById('virtues').selectedOptions).map(option => option.value);

    // Calculate scores
    const scores = calculateScores(journalEntry, selectedVirtues, sampleDatasetRow);

    // Display scores
    displayScores(scores);
}

// Function to display scores
function displayScores(scores) {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = '<h2>Scores:</h2>';
    for (const virtue in scores) {
        scoreDisplay.innerHTML += `<p>${virtue}: ${scores[virtue]}</p>`;
    }
}
