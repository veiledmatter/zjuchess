document.addEventListener("DOMContentLoaded", function () {
    const ratings = document.querySelectorAll(".rating");

    // Example usernames of players, these could be dynamic
    const players = [
        { name: "Farhan", username: "ghost_kiss" },
        { name: "Player2", username: "player2chess" },
        { name: "Player3", username: "player3chess" },
        { name: "Player4", username: "player4chess" },
        { name: "Player5", username: "player5chess" }
    ];

    // Fetch ratings from Chess.com for each player
    players.forEach((player, index) => {
        fetch(`https://api.chess.com/pub/player/${player.username}/stats`)
            .then(response => response.json())
            .then(data => {
                // Extract Rapid rating from the API response
                const rapidRating = data.stats.rapid.rating;

                // Find the player’s rating cell in the table
                const ratingCell = ratings[index];
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
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
            });
    });
});
