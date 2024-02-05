// Define submitJournal function first
async function submitJournal() {
    // Get user input
    const journalEntry = document.getElementById('journalEntry').value;
    const selectedVirtues = Array.from(document.getElementById('virtues').selectedOptions).map(option => option.value);

    // Calculate scores
    const scores = calculateScores(journalEntry, selectedVirtues, sampleDatasetRow);

    // Display scores
    displayScores(scores);
}

// Fetch rubric and dataset
async function fetchData() {
    try {
        const rubricResponse = await fetch('https://raw.githubusercontent.com/pjsturtevant/My24HourStoicScore/main/data/rubric.json');
        const datasetResponse = await fetch('https://raw.githubusercontent.com/pjsturtevant/My24HourStoicScore/main/data/newstoictokenized_dataset.json');

        if (!rubricResponse.ok || !datasetResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse JSON responses
        const rubric = await rubricResponse.json();
        const dataset = await datasetResponse.json();

        console.log('Rubric:', rubric);
        console.log('Dataset:', dataset);

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

                console.log(`Virtue: ${virtue}, Description: ${scoreDescription}, Mapping:`, rubricMapping);

                scores[virtue] = mapScore(scoreDescription, rubricMapping, entry, datasetRow);
            });

            console.log('Final Scores:', scores);

            return scores;
        }

        // Rest of your code...

        // Attach the event handler after defining it
        document.getElementById('submitBtn').onclick = submitJournal;

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Call the function to fetch data when the script is loaded
fetchData();
