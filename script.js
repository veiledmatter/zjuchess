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

    // Function to create and append a row to the table
    function createRow(player, index) {
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
        ratingCell.textContent = player.rating || "Loading...";  // Show the rating or "Loading..."
        row.appendChild(ratingCell);

        tableBody.appendChild(row);
    }

    // Fetch ratings or use manually set ratings
    const fetchRatings = players.map(player => {
        return new Promise((resolve) => {
            // If player has a manual rating, resolve immediately
            if (player.rating) {
                resolve(player);
                return;
            }

            // If no manual rating, fetch from Chess.com
            fetch(`https://api.chess.com/pub/player/${player.username}/stats`)
                .then(response => response.json())
                .then(data => {
                    if (data.chess_rapid && data.chess_rapid.last && data.chess_rapid.last.rating) {
                        player.rating = data.chess_rapid.last.rating;
                    } else {
                        player.rating = "N/A";  // If no rating is available
                    }
                    resolve(player);
                })
                .catch(() => {
                    player.rating = "Error";  // In case of error fetching the rating
                    resolve(player);
                });
        });
    });

    // Wait until all ratings are fetched
    Promise.all(fetchRatings).then(() => {
        // Sort players by rating in descending order
        players.sort((a, b) => (b.rating === "N/A" ? -1 : b.rating) - (a.rating === "N/A" ? -1 : a.rating));

        // Clear the table body
        tableBody.innerHTML = "";

        // Create and append sorted rows
        players.forEach((player, index) => {
            createRow(player, index);
        });
    });
});


