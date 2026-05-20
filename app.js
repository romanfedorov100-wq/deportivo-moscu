(function () {
  const LANG = "ru";

  function getPlayersData() {
    if (Array.isArray(window.deportivoPlayers)) return window.deportivoPlayers;
    if (Array.isArray(window.players)) return window.players;
    if (Array.isArray(window.PLAYERS)) return window.PLAYERS;
    if (Array.isArray(window.playersData)) return window.playersData;
    if (Array.isArray(window.PLAYERS_DATA)) return window.PLAYERS_DATA;
    if (Array.isArray(window.squad)) return window.squad;
    if (Array.isArray(window.SQUAD)) return window.SQUAD;
    return [];
  }

  function getText(value, fallback) {
    if (value === undefined || value === null || value === "") {
      return fallback || "";
    }

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

  function getPlayerNumber(player, index) {
    return getText(
      player.number ||
        player.num ||
        player.shirtNumber ||
        player.shirt ||
        index + 1,
      index + 1
    );
  }

  function getPlayerName(player) {
    return getText(
      player.name ||
        player.fullName ||
        player.fullname ||
        player.title,
      "Игрок"
    );
  }

  function getPlayerPosition(player) {
    return getText(
      player.position ||
        player.role ||
        player.pos ||
        player.type,
      "Игрок"
    );
  }

  function getPlayerCountry(player) {
    return getText(
      player.nationality ||
        player.country ||
        player.nation ||
        player.countryName,
      ""
    );
  }

  function getPlayerPhoto(player) {
    return (
      player.photo ||
      player.image ||
      player.img ||
      player.avatar ||
      player.picture ||
      player.playerPhoto ||
      ""
    );
  }

  function normalizeRole(role) {
    const value = String(getText(role, "")).toLowerCase();

    if (value === "goalkeeper") return "goalkeeper";
    if (value === "defender") return "defender";
    if (value === "midfielder") return "midfielder";
    if (value === "forward") return "forward";
    if (value === "striker") return "forward";

    if (value.includes("врат")) return "goalkeeper";
    if (value.includes("защит")) return "defender";
    if (value.includes("полу")) return "midfielder";
    if (value.includes("напад")) return "forward";

    return "all";
  }

  function countryToFlag(country) {
    const value = String(country || "").trim().toLowerCase();

    const flags = {
      "аргентина": "🇦🇷",
      "argentina": "🇦🇷",
      "россия": "🇷🇺",
      "russia": "🇷🇺",
      "бразилия": "🇧🇷",
      "brazil": "🇧🇷",
      "brasil": "🇧🇷",
      "эквадор": "🇪🇨",
      "ecuador": "🇪🇨",
      "венесуэла": "🇻🇪",
      "venezuela": "🇻🇪",
      "украина": "🇺🇦",
      "ukraine": "🇺🇦",
      "беларусь": "🇧🇾",
      "belarus": "🇧🇾",
      "казахстан": "🇰🇿",
      "kazakhstan": "🇰🇿"
    };

    return flags[value] || "";
  }

  function isRealPlayerPhoto(src) {
    if (!src) return false;

    const value = String(src).toLowerCase();

    const blockedWords = [
      "flag",
      "flags",
      "country",
      "nationality",
      "argentina",
      "russia",
      "ecuador",
      "brazil",
      "brasil",
      "venezuela",
      "флаг",
      "аргентина",
      "россия",
      "эквадор",
      "бразилия",
      "венесуэла"
    ];

    if (
      blockedWords.some(function (word) {
        return value.includes(word);
      })
    ) {
      return false;
    }

    return (
      value.includes("images/players/") ||
      value.includes("./images/players/") ||
      value.includes("/images/players/")
    );
  }

  function splitName(name) {
    const clean = String(name || "Игрок").trim();
    const parts = clean.split(/\s+/).filter(Boolean);

    if (parts.length <= 2) {
      return escapeHtml(clean);
    }

    if (parts.length === 3) {
      return escapeHtml(parts[0]) + "<br>" + escapeHtml(parts.slice(1).join(" "));
    }

    return escapeHtml(parts.slice(0, 2).join(" ")) + "<br>" + escapeHtml(parts.slice(2).join(" "));
  }

  function createPhotoHtml(player) {
    const photo = getPlayerPhoto(player);
    const name = getPlayerName(player);

    if (isRealPlayerPhoto(photo)) {
      return (
        '<img class="player-real-photo" src="' +
        escapeHtml(photo) +
        '" alt="' +
        escapeHtml(name) +
        '" onerror="this.parentElement.innerHTML=\'<div class=&quot;player-placeholder&quot;></div>\';">'
      );
    }

    return '<div class="player-placeholder"></div>';
  }

  function createFlagHtml(country) {
    const flag = countryToFlag(country);

    if (!flag) return "";

    return '<span class="player-flag-emoji" aria-hidden="true">' + flag + "</span>";
  }

  function renderPlayers(filter) {
    const playersGrid =
      document.querySelector("#playersGrid") ||
      document.querySelector(".players-grid");

    const playersCount = document.querySelector("#playersCount");

    if (!playersGrid) return;

    const allPlayers = getPlayersData();

    if (!allPlayers.length) {
      playersGrid.innerHTML = `
        <article class="player-card">
          <div class="player-info">
            <div class="player-position">Ошибка</div>
            <div class="player-name">Игроки<br>не найдены</div>
            <div class="player-country">
              <span>Проверь подключение players-data.js перед app.js</span>
            </div>
          </div>
        </article>
      `;

      if (playersCount) {
        playersCount.textContent = "0 игроков";
      }

      return;
    }

    const activeFilter = filter || "all";

    const players =
      activeFilter === "all"
        ? allPlayers
        : allPlayers.filter(function (player) {
            return normalizeRole(player.role || player.position) === activeFilter;
          });

    if (playersCount) {
      playersCount.textContent = players.length + " игроков";
    }

    playersGrid.innerHTML = players
      .map(function (player, index) {
        const number = getPlayerNumber(player, index);
        const name = getPlayerName(player);
        const position = getPlayerPosition(player);
        const country = getPlayerCountry(player);
        const photoHtml = createPhotoHtml(player);
        const flagHtml = createFlagHtml(country);

        return `
          <article class="player-card">
            <div class="player-number">${escapeHtml(number)}</div>

            <div class="player-photo">
              ${photoHtml}
            </div>

            <div class="player-info">
              <div class="player-position">${escapeHtml(position)}</div>

              <div class="player-name">${splitName(name)}</div>

              <div class="player-country">
                ${flagHtml}
                <span>${escapeHtml(country)}</span>
              </div>

              <button class="player-btn" type="button">Подробнее →</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function setupFilters() {
    const filterButtons = document.querySelectorAll("[data-role-filter]");

    if (!filterButtons.length) return;

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = button.getAttribute("data-role-filter") || "all";

        filterButtons.forEach(function (item) {
          item.classList.remove("is-active");
        });

        button.classList.add("is-active");
        renderPlayers(filter);
      });
    });
  }

  function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".main-nav a");

    links.forEach(function (link) {
      const href = link.getAttribute("href") || "";

      if (href === currentPath || href.startsWith(currentPath + "#")) {
        link.classList.add("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderPlayers("all");
    setupFilters();
    setActiveNavLink();
  });
})();
