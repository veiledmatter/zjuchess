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
                if (data.chess_rapid && data.chess_rapid.last && data.chess_rapid.last.rating) {
                    const rapidRating = data.chess_rapid.last.rating;

                    // Select the name and rating cells for this player
                    const ratingCell = document.querySelector(`#rating-${index + 1}`);
                    const nameCell = document.querySelector(`#name-${index + 1}`);

                    ratingCell.textContent = rapidRating;

                    // Determine the correct class based on the rating and apply it to both cells
                    let ratingClass;
                    if (rapidRating <= 799) {
                        ratingClass = "rating-low";
                    } else if (rapidRating <= 1199) {
                        ratingClass = "rating-mid-low";
                    } else if (rapidRating <= 1499) {
                        ratingClass = "rating-mid";
                    } else if (rapidRating <= 1999) {
                        ratingClass = "rating-high";
                    } else {
                        ratingClass = "rating-top";
                    }

                    // Apply the class to both the name and rating cells
                    ratingCell.classList.add(ratingClass);
                    nameCell.classList.add(ratingClass);
                } else {
                    console.error(`No rapid rating available for ${player.username}`);
                    document.querySelector(`#rating-${index + 1}`).textContent = "N/A";
                }
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
            });
    });
});

