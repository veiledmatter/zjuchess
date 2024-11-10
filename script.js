document.addEventListener("DOMContentLoaded", function () {
    const ratings = document.querySelectorAll(".rating");

    // Example usernames of players, these could be dynamic
    const players = [
        { name: "Farhan", username: "ghost_kiss" }
    ];

    // Fetch ratings from Chess.com for each player
    players.forEach((player, index) => {
        fetch(`https://api.chess.com/pub/player/${player.username}/stats`)
            .then(response => response.json())
            .then(data => {
                // Check if 'chess_rapid' and 'last' and 'rating' exist in the response
                if (data.chess_rapid && data.chess_rapid.last && data.chess_rapid.last.rating) {
                    const rapidRating = data.chess_rapid.last.rating;

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

                } else {
                    // Handle the case where there is no 'rapid' rating
                    console.error(`No rapid rating available for ${player.username}`);
                    // You can set a default value or leave the rating cell empty
                    const ratingCell = ratings[index];
                    ratingCell.textContent = "N/A";  // or any default value
                }
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
            });
    }); // Close the forEach method
}); // Close the DOMContentLoaded event listener
