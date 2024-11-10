document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("leaderboard-body"); // Get the table body container

    // Example list of players (can be dynamically added here)
    const players = [
        { name: "Farhan", username: "ghost_kiss" }, 
        { name: "Aaryan", username: "Aaryan2001AA" },  // This will fetch rating from Chess.com
        { name: "Edbert L", username: "Edbertl" },
        { name: "Kenny Ian", username: "kennyianw" },
        { name: "Test", username: "sifh", rating: 1000 }
    ];

    // Loop through players and dynamically create table rows
    players.forEach((player, index) => {
        // Create a new row for each player
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

        // Check if the player has a manually set rating
        if (player.rating) {
            // If manually set, use that rating
            updateRatingCell(player, ratingCell);
        } else {
            // If no manual rating, fetch from Chess.com
            fetch(`https://api.chess.com/pub/player/${player.username}/stats`)
                .then(response => response.json())
                .then(data => {
                    if (data.chess_rapid && data.chess_rapid.last && data.chess_rapid.last.rating) {
                        const rapidRating = data.chess_rapid.last.rating;
                        player.rating = rapidRating;  // Store the fetched rating

                        updateRatingCell(player, ratingCell); // Update the rating cell
                    } else {
                        console.error(`No rapid rating available for ${player.username}`);
                        ratingCell.textContent = "N/A";  // Or any default value
                    }
                })
                .catch(error => {
                    console.error('Error fetching player data:', error);
                    ratingCell.textContent = "Error";  // Show an error message if something goes wrong
                });
        }
    });

    // After the loop, sort the players by rating (descending order)
    players.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // Once sorting is done, re-render the rows with correct ranking
    const allRows = Array.from(tableBody.getElementsByTagName("tr"));
    allRows.forEach(row => row.remove());  // Clear the current rows

    // Recreate rows in sorted order
    players.forEach((player, index) => {
        const row = document.createElement("tr");

        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;
        row.appendChild(nameCell);

        const ratingCell = document.createElement("td");
        ratingCell.classList.add("rating");
        ratingCell.textContent = player.rating || "Loading..."; // Show the rating
        row.appendChild(ratingCell);

        tableBody.appendChild(row);  // Append the new row
    });

    // Function to update the rating cell with the correct value and class
    function updateRatingCell(player, ratingCell) {
        ratingCell.textContent = player.rating || "N/A";  // Set the rating or "N/A"

        // Apply the correct class based on the rating
        if (player.rating <= 799) {
            ratingCell.classList.add("rating-low");
        } else if (player.rating <= 1199) {
            ratingCell.classList.add("rating-mid-low");
        } else if (player.rating <= 1499) {
            ratingCell.classList.add("rating-mid");
        } else if (player.rating <= 1999) {
            ratingCell.classList.add("rating-high");
        } else {
            ratingCell.classList.add("rating-top");
        }
    }
});

