// =======================
// Shared (all pages)
// =======================

// footer year
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// mobile menu
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
        siteNav.classList.toggle("open");
    });
}


// =======================
// INDEX PAGE (pickup games)
// =======================

const gamesContainer = document.querySelector("#games-container");
const addGameForm = document.querySelector("#add-game-form");

const defaultPickupGames = [
    { name: "Park Run", address: "Phoenix Park", date: "2026-04-18", day: "saturday", time: "18:00", level: "casual", court: "outdoor" },
    { name: "Gym Night", address: "Downtown Gym", date: "2026-04-20", day: "monday", time: "19:00", level: "competitive", court: "indoor" }
];

let pickupGames = JSON.parse(localStorage.getItem("pickupGames")) || defaultPickupGames;

function renderPickupGames() {
    if (!gamesContainer) return;

    gamesContainer.innerHTML = pickupGames.map(game => `
        <div class="game-card">
            <h3>${game.name}</h3>
            <p>${game.address}</p>
            <p>${game.date} - ${game.time}</p>
        </div>
    `).join("");
}

renderPickupGames();

if (addGameForm) {
    addGameForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newGame = {
            name: document.querySelector("#game-name").value,
            address: document.querySelector("#game-address").value,
            date: document.querySelector("#pickup-date").value,
            day: document.querySelector("#game-day").value,
            time: document.querySelector("#game-time").value,
            level: document.querySelector("#game-level").value,
            court: document.querySelector("#game-court").value
        };

        pickupGames.push(newGame);
        localStorage.setItem("pickupGames", JSON.stringify(pickupGames));

        renderPickupGames();
        addGameForm.reset();
    });
}


// =======================
// STATS PAGE
// =======================

const averagesTableBody = document.querySelector("#averages-table-body");
const gamelogTableBody = document.querySelector("#gamelog-table-body");

// 5 players, 5 games (simple for grading)
const defaultGames = [
    {
        date: "2026-04-01",
        opponent: "Team A",
        result: "Win",
        players: [
            { name: "Player 1", pts: 10, reb: 5, ast: 3, stl: 1, blk: 0 },
            { name: "Player 2", pts: 8, reb: 4, ast: 2, stl: 1, blk: 0 },
            { name: "Player 3", pts: 12, reb: 6, ast: 3, stl: 2, blk: 1 },
            { name: "Player 4", pts: 6, reb: 7, ast: 1, stl: 0, blk: 1 },
            { name: "Player 5", pts: 4, reb: 3, ast: 2, stl: 1, blk: 0 }
        ]
    },
    {
        date: "2026-04-03",
        opponent: "Team B",
        result: "Loss",
        players: [
            { name: "Player 1", pts: 14, reb: 4, ast: 4, stl: 2, blk: 0 },
            { name: "Player 2", pts: 10, reb: 5, ast: 3, stl: 1, blk: 0 },
            { name: "Player 3", pts: 9, reb: 7, ast: 2, stl: 1, blk: 1 },
            { name: "Player 4", pts: 7, reb: 6, ast: 1, stl: 0, blk: 1 },
            { name: "Player 5", pts: 5, reb: 2, ast: 3, stl: 1, blk: 0 }
        ]
    },
    {
        date: "2026-04-05",
        opponent: "Team C",
        result: "Win",
        players: [
            { name: "Player 1", pts: 16, reb: 6, ast: 5, stl: 2, blk: 1 },
            { name: "Player 2", pts: 9, reb: 4, ast: 3, stl: 1, blk: 0 },
            { name: "Player 3", pts: 11, reb: 8, ast: 2, stl: 1, blk: 1 },
            { name: "Player 4", pts: 8, reb: 5, ast: 2, stl: 1, blk: 1 },
            { name: "Player 5", pts: 6, reb: 3, ast: 2, stl: 1, blk: 0 }
        ]
    },
    {
        date: "2026-04-07",
        opponent: "Team D",
        result: "Win",
        players: [
            { name: "Player 1", pts: 18, reb: 5, ast: 6, stl: 3, blk: 1 },
            { name: "Player 2", pts: 11, reb: 4, ast: 4, stl: 1, blk: 0 },
            { name: "Player 3", pts: 13, reb: 9, ast: 3, stl: 2, blk: 1 },
            { name: "Player 4", pts: 9, reb: 6, ast: 2, stl: 1, blk: 1 },
            { name: "Player 5", pts: 7, reb: 4, ast: 3, stl: 1, blk: 0 }
        ]
    },
    {
        date: "2026-04-09",
        opponent: "Team E",
        result: "Loss",
        players: [
            { name: "Player 1", pts: 20, reb: 6, ast: 5, stl: 2, blk: 1 },
            { name: "Player 2", pts: 12, reb: 5, ast: 4, stl: 1, blk: 0 },
            { name: "Player 3", pts: 14, reb: 7, ast: 3, stl: 2, blk: 1 },
            { name: "Player 4", pts: 10, reb: 6, ast: 2, stl: 1, blk: 1 },
            { name: "Player 5", pts: 8, reb: 3, ast: 3, stl: 1, blk: 0 }
        ]
    }
];

let games = JSON.parse(localStorage.getItem("games")) || defaultGames;


// render game logs
function renderGameLogs() {
    if (!gamelogTableBody) return;

    gamelogTableBody.innerHTML = games.flatMap(game =>
        game.players.map(p => `
            <tr>
                <td>${game.date}</td>
                <td>${game.opponent}</td>
                <td>${game.result}</td>
                <td>${p.name}</td>
                <td>${p.pts}</td>
                <td>${p.reb}</td>
                <td>${p.ast}</td>
                <td>${p.stl}</td>
                <td>${p.blk}</td>
            </tr>
        `)
    ).join("");
}


// calculate averages
function renderAverages() {
    if (!averagesTableBody) return;

    const totals = {};

    games.forEach(game => {
        game.players.forEach(p => {
            if (!totals[p.name]) {
                totals[p.name] = { games: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0 };
            }

            totals[p.name].games++;
            totals[p.name].pts += p.pts;
            totals[p.name].reb += p.reb;
            totals[p.name].ast += p.ast;
            totals[p.name].stl += p.stl;
            totals[p.name].blk += p.blk;
        });
    });

    averagesTableBody.innerHTML = Object.entries(totals).map(([name, t]) => `
        <tr>
            <td>${name}</td>
            <td>${t.games}</td>
            <td>${(t.pts / t.games).toFixed(1)}</td>
            <td>${(t.reb / t.games).toFixed(1)}</td>
            <td>${(t.ast / t.games).toFixed(1)}</td>
            <td>${(t.stl / t.games).toFixed(1)}</td>
            <td>${(t.blk / t.games).toFixed(1)}</td>
        </tr>
    `).join("");
}


// simple sorting
document.querySelectorAll("th[data-sort]").forEach(header => {
    header.addEventListener("click", () => {
        const index = header.cellIndex;
        const table = header.closest("table");
        const rows = Array.from(table.querySelector("tbody").rows);

        rows.sort((a, b) => {
            const A = a.cells[index].innerText;
            const B = b.cells[index].innerText;
            return isNaN(A) ? A.localeCompare(B) : B - A;
        });

        rows.forEach(row => table.querySelector("tbody").appendChild(row));
    });
});


renderGameLogs();
renderAverages();