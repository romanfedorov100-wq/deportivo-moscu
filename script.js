const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");

if (burgerBtn && mainNav) {
  burgerBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

const tabs = document.querySelectorAll(".tab-btn");
const panels = {
  table: document.getElementById("tab-table"),
  past: document.getElementById("tab-past"),
  future: document.getElementById("tab-future"),
};

tabs.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.tab;

    tabs.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    Object.values(panels).forEach((panel) => {
      if (panel) panel.classList.remove("active");
    });

    if (panels[tabName]) {
      panels[tabName].classList.add("active");
    }
  });
});

const teams = {
  deportivo: {
    name: "Deportivo Moscu",
    logo: "images/teams/deportivo-moscu.png",
  },
  matheu: {
    name: "Matheu",
    logo: "images/teams/matheu.png",
  },
  savio: {
    name: "Savio",
    logo: "images/teams/savio.png",
  },
  roma: {
    name: "Roma",
    logo: "images/teams/roma.png",
  },
  malvinas: {
    name: "Malvinas",
    logo: "images/teams/malvinas.png",
  },
  union: {
    name: "Unión",
    logo: "images/teams/union.png",
  },
  escobar: {
    name: "Escobar FC",
    logo: "images/teams/escobar-fc.png",
  },
  placeholder: {
    name: "Club",
    logo: "images/teams/placeholder.png",
  },
};

const leagueTable = [
  {
    club: teams.deportivo,
    played: 8,
    wins: 5,
    draws: 2,
    losses: 1,
    goalsFor: 17,
    goalsAgainst: 8,
    points: 17,
  },
  {
    club: teams.matheu,
    played: 8,
    wins: 5,
    draws: 1,
    losses: 2,
    goalsFor: 15,
    goalsAgainst: 9,
    points: 16,
  },
  {
    club: teams.savio,
    played: 8,
    wins: 4,
    draws: 2,
    losses: 2,
    goalsFor: 13,
    goalsAgainst: 8,
    points: 14,
  },
  {
    club: teams.roma,
    played: 8,
    wins: 4,
    draws: 1,
    losses: 3,
    goalsFor: 12,
    goalsAgainst: 10,
    points: 13,
  },
  {
    club: teams.malvinas,
    played: 8,
    wins: 3,
    draws: 2,
    losses: 3,
    goalsFor: 11,
    goalsAgainst: 11,
    points: 11,
  },
  {
    club: teams.union,
    played: 8,
    wins: 3,
    draws: 1,
    losses: 4,
    goalsFor: 10,
    goalsAgainst: 12,
    points: 10,
  },
  {
    club: teams.escobar,
    played: 8,
    wins: 2,
    draws: 2,
    losses: 4,
    goalsFor: 9,
    goalsAgainst: 13,
    points: 8,
  },
  {
    club: {
      name: "Atlético Escobar",
      logo: "images/teams/placeholder.png",
    },
    played: 8,
    wins: 2,
    draws: 1,
    losses: 5,
    goalsFor: 8,
    goalsAgainst: 15,
    points: 7,
  },
  {
    club: {
      name: "Sportivo Norte",
      logo: "images/teams/placeholder.png",
    },
    played: 8,
    wins: 1,
    draws: 2,
    losses: 5,
    goalsFor: 7,
    goalsAgainst: 16,
    points: 5,
  },
];

const pastMatches = [
  {
    date: "12.05.2026",
    home: teams.deportivo,
    away: teams.matheu,
    score: "2 : 1",
    stadium: "Cancha Deportivo Moscu",
  },
  {
    date: "05.05.2026",
    home: teams.savio,
    away: teams.deportivo,
    score: "1 : 1",
    stadium: "Estadio Savio",
  },
  {
    date: "28.04.2026",
    home: teams.deportivo,
    away: teams.roma,
    score: "3 : 0",
    stadium: "Cancha Deportivo Moscu",
  },
  {
    date: "21.04.2026",
    home: teams.malvinas,
    away: teams.deportivo,
    score: "0 : 2",
    stadium: "Malvinas Stadium",
  },
  {
    date: "14.04.2026",
    home: teams.deportivo,
    away: teams.union,
    score: "1 : 1",
    stadium: "Cancha Deportivo Moscu",
  },
  {
    date: "07.04.2026",
    home: teams.escobar,
    away: teams.deportivo,
    score: "2 : 1",
    stadium: "Escobar",
  },
];

const futureMatches = [
  {
    date: "26.05.2026",
    home: teams.deportivo,
    away: teams.escobar,
    score: "VS",
    stadium: "Cancha Deportivo Moscu",
  },
  {
    date: "02.06.2026",
    home: teams.union,
    away: teams.deportivo,
    score: "VS",
    stadium: "Unión Stadium",
  },
  {
    date: "09.06.2026",
    home: teams.deportivo,
    away: teams.malvinas,
    score: "VS",
    stadium: "Cancha Deportivo Moscu",
  },
  {
    date: "16.06.2026",
    home: teams.roma,
    away: teams.deportivo,
    score: "VS",
    stadium: "Roma Stadium",
  },
  {
    date: "23.06.2026",
    home: teams.deportivo,
    away: teams.savio,
    score: "VS",
    stadium: "Cancha Deportivo Moscu",
  },
];

function renderLeagueTable() {
  const body = document.getElementById("leagueTableBody");
  if (!body) return;

  body.innerHTML = leagueTable
    .map((row, index) => {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>
            <div class="club-cell">
              <img src="${row.club.logo}" alt="${row.club.name}" onerror="this.src='images/teams/placeholder.png'" />
              <span>${row.club.name}</span>
            </div>
          </td>
          <td>${row.played}</td>
          <td>${row.wins}</td>
          <td>${row.draws}</td>
          <td>${row.losses}</td>
          <td>${row.goalsFor}</td>
          <td>${row.goalsAgainst}</td>
          <td><strong>${row.points}</strong></td>
        </tr>
      `;
    })
    .join("");
}

function renderMatches(containerId, matches) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = matches
    .map((match) => {
      return `
        <article class="match-card">
          <div class="match-date">${match.date}</div>

          <div class="match-teams">
            <div class="team home">
              <img src="${match.home.logo}" alt="${match.home.name}" onerror="this.src='images/teams/placeholder.png'" />
              <span>${match.home.name}</span>
            </div>

            <div class="score">${match.score}</div>

            <div class="team away">
              <span>${match.away.name}</span>
              <img src="${match.away.logo}" alt="${match.away.name}" onerror="this.src='images/teams/placeholder.png'" />
            </div>
          </div>

          <div class="match-meta">${match.stadium}</div>
        </article>
      `;
    })
    .join("");
}

renderLeagueTable();
renderMatches("pastMatches", pastMatches);
renderMatches("futureMatches", futureMatches);
