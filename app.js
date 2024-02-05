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

// Attach the event handler after defining it
document.getElementById('submitBtn').onclick = submitJournal;

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

            // Example: Adjust the score based on dataset information
            if (description === 'Exemplary' && entry.includes('overcomes challenges')) {
                console.log('Condition 1 met'); // Add this line
                return rubricMapping[description] + datasetRow.holistic_score;
            } else if (description === 'Proficient' && entry.includes('occasionally struggles')) {
                console.log('Condition 2 met'); // Add this line
                return rubricMapping[description] + datasetRow.holistic_score;
            }

            console.log('No specific condition met'); // Add this line

            // If no specific condition is met, use the mapping
            return rubricMapping[description];
        }

        // Retrieve rubric mapping based on virtue
        function getRubricMapping(virtue) {
            let mapping = {};
            if (virtue === 'Courage') {
                mapping = rubric.courageMapping;
            } else if (virtue === 'Wisdom') {
                mapping = rubric.wisdomMapping;
            } else if (virtue === 'Justice') {
                mapping = rubric.justiceMapping;
            } else if (virtue === 'Temperance') {
                mapping = rubric.temperanceMapping;
            }

            console.log(`Virtue: ${virtue}, Mapping:`, mapping); // Add this line

            return mapping;
        }

        // Function to display scores
        function displayScores(scores) {
            const scoreDisplay = document.getElementById('scoreDisplay');
            scoreDisplay.innerHTML = '<h2>Scores:</h2>';
            for (const virtue in scores) {
                scoreDisplay.innerHTML += `<p>${virtue}: ${scores[virtue]}</p>`;
            }
        }

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Call the function to fetch data when the script is loaded
fetchData();
