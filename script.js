document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("leaderboard-body"); // Get the table body container

    // Example list of players (can be dynamically added here)
    const players = [
        { name: "Farhan", username: "ghost_kiss" },
        { name: "Player 2", username: "player_2" },
        { name: "Player 3", username: "player_3" }
    ];

    // Loop through players and dynamically create table rows
    players.forEach((player, index) => {
        // Create a new row
        const row = document.createElement("tr");

        // Rank cell
        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1; // Ranking starts from 1
        row.appendChild(rankCell);

        // Name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;
        row.appendChild(nameCell);

        // Rating cell
        const ratingCell = document.createElement("td");
        ratingCell.classList.add("rating");
        ratingCell.textContent = "Loading...";  // Initially loading
        row.appendChild(ratingCell);

        // Append the row to the table body
        tableBody.appendChild(row);

        // Fetch ratings from Chess.com for each player
        fetch(`https://api.chess.com/pub/player/${player.username}/stats`)
            .then(response => response.json())
            .then(data => {
                // Check if 'chess_rapid' and 'last' and 'rating' exist in the response
                if (data.chess_rapid && data.chess_rapid.last && data.chess_rapid.last.rating) {
                    const rapidRating = data.chess_rapid.last.rating;

                    // Set the player's rating
                    ratingCell.textContent = rapidRating;

                    // Apply the correct class based on the rating
                    if (rapidRating <= 799) {
                        ratingCell.classList.add("rating-low");
                    } else if (rapidRating <= 1199) {
                        ratingCell.classList.add("rating-mid-low");
                    } else if (rapidRating <= 1499) {
                        ratingCell.classList.add("rating-mid");
                    } else if (rapidRating <= 1999) {
                        ratingCell.classList.add("rating-high");
                    } else {
                        ratingCell.classList.add("rating-top");
                    }
                } else {
                    // Handle the case where there is no 'rapid' rating
                    console.error(`No rapid rating available for ${player.username}`);
                    ratingCell.textContent = "N/A";  // Or any default value
                }
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
                ratingCell.textContent = "Error";  // Show an error message if something goes wrong
            });
    });
});

