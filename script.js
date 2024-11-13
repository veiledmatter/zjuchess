document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("leaderboard-body"); // Get the table body container

    // Example list of players (can be dynamically added here)
    const players = [
        { name: "Farhan", username: "ghost_kiss" }, 
        { name: "Aaryan", username: "Aaryan2001AA" },  // This will fetch rating from Chess.com
        { name: "Edbert L", username: "Edbertl" },
        { name: "Kenny Ian", username: "kennyianw" },
        { name: "Thana-ard Kasemsuk", username: "Puard850" },
        { name: "Haqy Ghiffari", username: "Dewa_KipasSmurf"},
        { name: "Edbert Hansen", username: "SOD020"},
        { name: "Wan Li Ping", username: "pinger224"}
    ];

    // Function to create and append a row to the table with colors
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

        // Set rating text and color based on rating
        let rating = player.rating || "Loading...";  // Default to "Loading..." if not available
        ratingCell.textContent = rating;
        
        // Apply color based on rating
        if (rating !== "Loading..." && rating !== "N/A" && rating !== "Error") {
            if (rating <= 799) {
                ratingCell.classList.add("rating-low");
            } else if (rating <= 1199) {
                ratingCell.classList.add("rating-mid-low");
            } else if (rating <= 1499) {
                ratingCell.classList.add("rating-mid");
            } else if (rating <= 1999) {
                ratingCell.classList.add("rating-high");
            } else {
                ratingCell.classList.add("rating-top");
            }
        } else {
            // For cases like N/A or Error
            ratingCell.classList.add("rating-low");  // Example class for Error or N/A
        }

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
        players.sort((a, b) => {
            if (a.rating === "N/A" || a.rating === "Error") return 1;
            if (b.rating === "N/A" || b.rating === "Error") return -1;
            return b.rating - a.rating;
        });

        // Clear the table body
        tableBody.innerHTML = "";

        // Create and append sorted rows with rating colors
        players.forEach((player, index) => {
            createRow(player, index);
        });
    });
});
