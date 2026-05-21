(function () {
  "use strict";

  const LANG = "ru";

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function getText(value, fallback) {
    if (value === undefined || value === null || value === "") return fallback || "";

    if (typeof value === "object") {
      return value[LANG] || value.ru || value.en || value.es || fallback || "";
    }

    return String(value);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getPlayersData() {
    if (Array.isArray(window.deportivoPlayers)) return window.deportivoPlayers;
    if (Array.isArray(window.players)) return window.players;
    if (Array.isArray(window.PLAYERS)) return window.PLAYERS;
    if (Array.isArray(window.playersData)) return window.playersData;
    if (Array.isArray(window.PLAYERS_DATA)) return window.PLAYERS_DATA;
    return [];
  }

  function getNewsData() {
    if (Array.isArray(window.deportivoNews)) return window.deportivoNews;
    if (Array.isArray(window.news)) return window.news;
    if (Array.isArray(window.NEWS)) return window.NEWS;
    if (Array.isArray(window.newsData)) return window.newsData;
    if (Array.isArray(window.NEWS_DATA)) return window.NEWS_DATA;
    return [];
  }

  function getMatchesData() {
    if (Array.isArray(window.deportivoMatches)) return window.deportivoMatches;
    if (Array.isArray(window.matches)) return window.matches;
    if (Array.isArray(window.MATCHES)) return window.MATCHES;
    if (Array.isArray(window.matchesData)) return window.matchesData;
    if (Array.isArray(window.MATCHES_DATA)) return window.MATCHES_DATA;
    return [];
  }

  function setupBurger() {
    const burger = qs("#burgerBtn");
    const menu = qs("#mobileMenu");

    if (!burger || !menu) return;

    burger.addEventListener("click", function () {
      menu.classList.toggle("open");
    });

    qsa("a", menu).forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
      });
    });
  }

  function setupActiveNav() {
    const current = location.pathname.split("/").pop() || "index.html";

    qsa(".main-nav a, .mobile-menu a").forEach(function (link) {
      const href = link.getAttribute("href") || "";

      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  function setText(id, value) {
    const el = qs("#" + id);
    if (el) el.textContent = value;
  }

  function updateStats() {
    const players = getPlayersData();
    const news = getNewsData();
    const matches = getMatchesData();

    setText("statPlayers", players.length || "—");
    setText("statNews", news.length || "—");
    setText("statMatches", matches.length || "—");
  }

  function createNewsCard(item, index) {
    const title = getText(item.title || item.name || item.heading, "Новость клуба");
    const date = getText(item.date || item.createdAt || item.day, "Deportivo Moscu");
    const text = getText(item.text || item.description || item.body || item.excerpt, "Скоро здесь появится подробная новость клуба.");
    const link = getText(item.link || item.url, "news.html");

    return `
      <article class="news-card">
        <span class="news-date">${escapeHtml(date)}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
        <a class="card-btn" href="${escapeHtml(link)}">Подробнее</a>
      </article>
    `;
  }

  function renderNews() {
    const grid = qs("#newsGrid");
    if (!grid) return;

    const data = getNewsData();

    const fallback = [
      {
        title: "Новый проект стадиона",
        date: "Deportivo Moscu",
        text: "Клуб представил концепцию нового закрытого стадиона в Буэнос-Айресе.",
        link: "stadium.html"
      },
      {
        title: "Команда готовится к сезону",
        date: "Тренировки",
        text: "Deportivo Moscu продолжает подготовку к матчам Liga Escobarense.",
        link: "team.html"
      },
      {
        title: "Магазин клуба",
        date: "Store",
        text: "Раздел магазина будет развиваться: форма, билеты, шарфы и атрибутика.",
        link: "store.html"
      }
    ];

    const items = (data.length ? data : fallback).slice(0, 3);
    grid.innerHTML = items.map(createNewsCard).join("");
  }

  function createMatchCard(item, index) {
    const opponent = getText(item.opponent || item.rival || item.team2 || item.awayTeam, index === 0 ? "Matheu" : "Соперник");
    const date = getText(item.date || item.day || item.matchDate, "Дата будет добавлена");
    const place = getText(item.place || item.stadium || item.location, "Buenos Aires, Argentina");
    const tournament = getText(item.tournament || item.league || item.competition, "Liga Escobarense");

    return `
      <article class="match-card">
        <span class="match-date">${escapeHtml(tournament)}</span>
        <h3>Deportivo Moscu — ${escapeHtml(opponent)}</h3>
        <p>${escapeHtml(date)}<br>${escapeHtml(place)}</p>
        <a class="card-btn" href="league.html">Открыть матч</a>
      </article>
    `;
  }

  function renderMatches() {
    const row = qs("#matchesRow");
    if (!row) return;

    const data = getMatchesData();

    const fallback = [
      {
        opponent: "Matheu",
        date: "Дата и время скоро будут добавлены",
        place: "Buenos Aires, Argentina",
        tournament: "Liga Escobarense"
      },
      {
        opponent: "Próximo rival",
        date: "Календарь обновляется",
        place: "Liga Escobarense",
        tournament: "Primera División B"
      },
      {
        opponent: "Fecha por confirmar",
        date: "Следите за новостями клуба",
        place: "Deportivo Moscu",
        tournament: "Temporada 2026"
      }
    ];

    const items = (data.length ? data : fallback).slice(0, 3);
    row.innerHTML = items.map(createMatchCard).join("");
  }

  function updateNextMatch() {
    const matches = getMatchesData();
    if (!matches.length) return;

    const first = matches[0];

    const opponent = getText(first.opponent || first.rival || first.team2 || first.awayTeam, "Matheu");
    const date = getText(first.date || first.day || first.matchDate, "Дата скоро будет добавлена");
    const place = getText(first.place || first.stadium || first.location, "Buenos Aires, Argentina");
    const league = getText(first.tournament || first.league || first.competition, "Liga Escobarense");

    setText("nextOpponentName", opponent);
    setText("nextMatchDate", date);
    setText("nextMatchPlace", place);
    setText("nextMatchLeague", league);

    const logo = qs("#nextOpponentLogo");
    if (logo) logo.textContent = opponent.trim().charAt(0).toUpperCase() || "M";
  }

  function getPlayerName(player) {
    return getText(player.name || player.fullName || player.fullname || player.title, "Игрок");
  }

  function getPlayerPosition(player) {
    return getText(player.position || player.role || player.pos || player.type, "Игрок");
  }

  function getPlayerCountry(player) {
    return getText(player.nationality || player.country || player.nation || player.countryName, "");
  }

  function getPlayerNumber(player, index) {
    return getText(player.number || player.num || player.shirtNumber || player.shirt || index + 1, index + 1);
  }

  function getPlayerPhoto(player) {
    return player.photo || player.image || player.img || player.avatar || player.picture || "";
  }

  function createPlayerPhoto(player) {
    const manualPhoto = getPlayerPhoto(player);
    const name = getPlayerName(player);
    const id = slugify(player.id || name);

    if (manualPhoto) {
      return `
        <img class="player-real-photo"
             src="${escapeHtml(manualPhoto)}"
             alt="${escapeHtml(name)}"
             onerror="this.parentElement.innerHTML='<div class=&quot;player-placeholder&quot;></div>';">
      `;
    }

    return `
      <img class="player-real-photo"
           src="images/players/${escapeHtml(id)}.jpg"
           data-player-id="${escapeHtml(id)}"
           data-photo-step="jpg"
           alt="${escapeHtml(name)}"
           onerror="tryNextPlayerPhoto(this);">
    `;
  }

  window.tryNextPlayerPhoto = function (img) {
    const id = img.getAttribute("data-player-id");
    const step = img.getAttribute("data-photo-step");

    if (!id) {
      img.parentElement.innerHTML = '<div class="player-placeholder"></div>';
      return;
    }

    if (step === "jpg") {
      img.setAttribute("data-photo-step", "jpeg");
      img.src = "images/players/" + id + ".jpeg";
      return;
    }

    if (step === "jpeg") {
      img.setAttribute("data-photo-step", "png");
      img.src = "images/players/" + id + ".png";
      return;
    }

    if (step === "png") {
      img.setAttribute("data-photo-step", "webp");
      img.src = "images/players/" + id + ".webp";
      return;
    }

    img.parentElement.innerHTML = '<div class="player-placeholder"></div>';
  };

  function createPlayerCard(player, index) {
    const name = getPlayerName(player);
    const position = getPlayerPosition(player);
    const country = getPlayerCountry(player);
    const number = getPlayerNumber(player, index);

    return `
      <article class="player-card">
        <div class="player-number">${escapeHtml(number)}</div>
        <div class="player-photo">
          ${createPlayerPhoto(player)}
        </div>
        <div class="player-info">
          <div class="player-position">${escapeHtml(position)}</div>
          <div class="player-name">${escapeHtml(name)}</div>
          <div class="player-country">${escapeHtml(country || "Deportivo Moscu")}</div>
          <button class="player-details-btn" type="button" data-player-index="${index}">
            Подробнее
          </button>
        </div>
      </article>
    `;
  }

  function renderPlayers() {
    const grid =
      qs("#playersGrid") ||
      qs("#playersContainer") ||
      qs(".players-grid");

    if (!grid) return;

    const players = getPlayersData();

    if (!players.length) {
      grid.innerHTML = `
        <article class="glass-card">
          <h3>Состав скоро будет добавлен</h3>
          <p>Здесь появятся карточки игроков Deportivo Moscu.</p>
        </article>
      `;
      return;
    }

    grid.innerHTML = players.map(createPlayerCard).join("");
  }

  function setupPlayerModal() {
    document.addEventListener("click", function (event) {
      const btn = event.target.closest(".player-details-btn");
      if (!btn) return;

      const index = Number(btn.getAttribute("data-player-index"));
      const player = getPlayersData()[index];

      if (!player) return;

      const name = getPlayerName(player);
      const position = getPlayerPosition(player);
      const country = getPlayerCountry(player);
      const number = getPlayerNumber(player, index);
      const birth = getText(player.birthDate || player.birth || player.dateOfBirth || player.dob, "—");
      const height = getText(player.height, "—");
      const foot = getText(player.foot, "—");

      openModal(`
        <div class="modal-card">
          <button class="modal-close" type="button" aria-label="Закрыть">×</button>
          <h2>${escapeHtml(name)}</h2>
          <p><strong>Номер:</strong> ${escapeHtml(number)}</p>
          <p><strong>Позиция:</strong> ${escapeHtml(position)}</p>
          <p><strong>Страна:</strong> ${escapeHtml(country || "—")}</p>
          <p><strong>Дата рождения:</strong> ${escapeHtml(birth)}</p>
          <p><strong>Рост:</strong> ${escapeHtml(height)}</p>
          <p><strong>Рабочая нога:</strong> ${escapeHtml(foot)}</p>
        </div>
      `);
    });
  }

  function injectModalStyles() {
    if (qs("#modalStyles")) return;

    const style = document.createElement("style");
    style.id = "modalStyles";
    style.textContent = `
      .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 999;
        display: grid;
        place-items: center;
        padding: 20px;
        background: rgba(0, 0, 0, 0.76);
        backdrop-filter: blur(14px);
      }

      .modal-card {
        width: min(560px, 100%);
        position: relative;
        padding: 30px;
        background:
          radial-gradient(circle at 20% 10%, rgba(0, 255, 157, 0.14), transparent 34%),
          linear-gradient(180deg, rgba(4, 21, 18, 0.98), rgba(2, 6, 5, 0.98));
        border: 1px solid rgba(0, 255, 157, 0.28);
        color: rgba(237, 255, 249, 0.95);
        box-shadow: 0 24px 90px rgba(0, 0, 0, 0.6);
      }

      .modal-card h2 {
        margin: 0 0 18px;
        color: #00ff9d;
        font-family: "Oswald", sans-serif;
        font-size: 42px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .modal-card p {
        color: rgba(218, 255, 244, 0.78);
        line-height: 1.7;
        margin: 0 0 8px;
      }

      .modal-card strong {
        color: #ffffff;
      }

      .modal-close {
        position: absolute;
        right: 14px;
        top: 12px;
        border: 1px solid rgba(0, 255, 157, 0.28);
        background: rgba(0, 255, 157, 0.08);
        color: #00ff9d;
        width: 38px;
        height: 38px;
        font-size: 26px;
        line-height: 1;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  function openModal(html) {
    injectModalStyles();

    const old = qs(".modal-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = html;

    document.body.appendChild(overlay);
    document.body.classList.add("modal-open");

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay || event.target.closest(".modal-close")) {
        overlay.remove();
        document.body.classList.remove("modal-open");
      }
    });
  }

  function fixBrokenImages() {
    qsa("img").forEach(function (img) {
      img.addEventListener("error", function () {
        if (img.dataset.fallbackApplied === "true") return;

        img.dataset.fallbackApplied = "true";

        if (img.classList.contains("logo-img")) {
          return;
        }

        img.style.display = "none";
      });
    });
  }

  function init() {
    setupBurger();
    setupActiveNav();
    updateStats();
    updateNextMatch();
    renderNews();
    renderMatches();
    renderPlayers();
    setupPlayerModal();
    fixBrokenImages();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
