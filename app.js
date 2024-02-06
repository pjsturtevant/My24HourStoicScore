// Fetch rubric and dataset
async function fetchData() {
    try {
        // Fetch rubric and dataset
        const rubricResponse = await fetch('https://raw.githubusercontent.com/pjsturtevant/My24HourStoicScore/main/data/rubric.json');
        const datasetResponse = await fetch('https://raw.githubusercontent.com/pjsturtevant/My24HourStoicScore/main/data/newstoictokenized_dataset.json');

        // Parse JSON responses
        const rubric = await rubricResponse.json();
        const dataset = await datasetResponse.json();

        // Log fetched data
        console.log('Rubric:', rubric);
        console.log('Dataset:', dataset);

        // Call function to process data
        processData(rubric, dataset);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Function to process data
function processData(rubric, dataset) {
    // Function to calculate scores
    function calculateScores(entry, virtues, dataset) {
        // Initialize scores
        const scores = {
            holistic: 0,
        };

        // Iterate over dataset to find the appropriate row
        dataset.forEach(datasetRow => {
            // Check if journal entry matches
            if (datasetRow.journal_entry === entry) {
                // Calculate holistic score
                scores.holistic = datasetRow.holistic_score;

                // Calculate scores for each virtue
                virtues.forEach(virtue => {
                    const scoreDescription = datasetRow[`${virtue.toLowerCase()}_score`];
                    const rubricMapping = getRubricMapping(virtue);

                    scores[virtue] = mapScore(scoreDescription, rubricMapping, entry, datasetRow);
                });
            }
        });

        return scores;
    }

    // Your other functions (getRubricMapping, mapScore, displayScores) go here...

    // Call fetchData function to start fetching and processing data
    fetchData();
}
