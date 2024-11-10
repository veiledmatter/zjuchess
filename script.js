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

                    // Determine the color based on the rating and apply it to both cells
                    let color;
                    if (rapidRating <= 799) {
                        color = "lightblue";
                    } else if (rapidRating <= 1199) {
                        color = "darkblue";
                    } else if (rapidRating <= 1499) {
                        color = "violet";
                    } else if (rapidRating <= 1999) {
                        color = "purple";
                    } else {
                        color = "maroon";
                    }

                    // Apply the color to both the name and rating cells
                    ratingCell.style.color = color;
                    nameCell.style.color = color;
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


