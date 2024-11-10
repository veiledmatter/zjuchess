document.addEventListener("DOMContentLoaded", function () {
    const leaderboardContainer = document.getElementById("leaderboard");

    // Example list of players
    const players = [
        { name: "Farhan", username: "ghost_kiss" },
        { name: "Player 2", username: "player_2" },
        { name: "Player 3", username: "player_3" }
    ];

    players.forEach((player, index) => {
        // Create a div for each player
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");

        // Create the name element and append it to the player div
        const nameElement = document.createElement("span");
        nameElement.classList.add("name");
        nameElement.id = `name-${index}`;
        nameElement.textContent = player.name;
        playerDiv.appendChild(nameElement);

        // Create the rating element and append it to the player div
        const ratingElement = document.createElement("span");
        ratingElement.classList.add("rating");
        ratingElement.id = `rating-${index}`;
        ratingElement.textContent = "Loading...";  // Initially loading
        playerDiv.appendChild(ratingElement);

        // Append the player div to the leaderboard container
        leaderboardContainer.appendChild(playerDiv);

        // Fetch ratings from Chess.com for each player
        fetch(`https://api.chess.com/pub/player/${player.username}/stats`)
            .then(response => response.json())
            .then(data => {
                // Check if 'chess_rapid' and 'last' and 'rating' exist in the response
                if (data.chess_rapid && data.chess_rapid.last && data.chess_rapid.last.rating) {
                    const rapidRating = data.chess_rapid.last.rating;

                    // Update the rating element text
                    const ratingCell = document.getElementById(`rating-${index}`);
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
                    // You can set a default value or leave the rating cell empty
                    const ratingCell = document.getElementById(`rating-${index}`);
                    ratingCell.textContent = "N/A";  // or any default value
                }
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
            });
    }); // Close the forEach method
}); // Close the DOMContentLoaded event listener
