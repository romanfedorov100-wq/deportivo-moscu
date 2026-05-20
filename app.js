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

  function splitName(name) {
    const clean = String(name || "Игрок").trim();
    const parts = clean.split(/\s+/);

    if (parts.length <= 2) {
      return escapeHtml(clean);
    }

    const firstLine = parts.slice(0, 2).join(" ");
    const secondLine = parts.slice(2).join(" ");

    return escapeHtml(firstLine) + "<br>" + escapeHtml(secondLine);
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

    if (blockedWords.some(function (word) {
      return value.includes(word);
    })) {
      return false;
    }

    return (
      value.includes("images/players/") ||
      value.includes("./images/players/") ||
      value.includes("/images/players/")
    );
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

  function injectPlayersStyles() {
    const oldStyle = document.querySelector("#deportivo-players-style");
    if (oldStyle) oldStyle.remove();

    const style = document.createElement("style");
    style.id = "deportivo-players-style";

    style.textContent = `
      .players-grid {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(230px, 1fr)) !important;
        gap: 34px !important;
        align-items: stretch !important;
      }

      .player-card {
        position: relative !important;
        overflow: hidden !important;
        min-height: 520px !important;
        border-radius: 0 38px 18px 18px !important;
        background: #ffffff !important;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08) !important;
      }

      .player-number {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 10 !important;
        width: 88px !important;
        height: 74px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-bottom-right-radius: 28px !important;
        background: #ffffff !important;
        color: #008c35 !important;
        font-size: 30px !important;
        font-weight: 950 !important;
      }

      .player-photo {
        position: relative !important;
        height: 300px !important;
        overflow: hidden !important;
        background: radial-gradient(circle at center, #00551f 0%, #003b16 60%, #00250d 100%) !important;
        display: flex !important;
        align-items: flex-end !important;
        justify-content: center !important;
      }

      .player-photo img:not(.player-real-photo),
      .player-photo .player-flag,
      .player-photo .flag,
      .player-photo .flag-icon,
      .player-photo .country-flag,
      .player-photo .nationality-flag,
      .player-photo [class*="flag"],
      .player-photo [class*="Flag"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }

      .player-real-photo {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        display: block !important;
      }

      .player-placeholder {
        position: relative !important;
        width: 230px !important;
        height: 250px !important;
      }

      .player-placeholder::before {
        content: "" !important;
        position: absolute !important;
        top: 0 !important;
        left: 50% !important;
        width: 98px !important;
        height: 98px !important;
        transform: translateX(-50%) !important;
        border-radius: 50% !important;
        background: #c4a07b !important;
      }

      .player-placeholder::after {
        content: "" !important;
        position: absolute !important;
        left: 50% !important;
        bottom: 0 !important;
        width: 210px !important;
        height: 165px !important;
        transform: translateX(-50%) !important;
        border-radius: 110px 110px 0 0 !important;
        background: linear-gradient(180deg, #d7d7d7 0%, #111111 45%, #050505 100%) !important;
      }

      .player-info {
        padding: 32px 32px 28px !important;
        background: #ffffff !important;
      }

      .player-position {
        margin-bottom: 18px !important;
        color: #008c35 !important;
        font-size: 15px !important;
        font-weight: 950 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
      }

      .player-name {
        min-height: 72px !important;
        margin-bottom: 24px !important;
        color: #050505 !important;
        font-size: 27px !important;
        line-height: 1.08 !important;
        font-weight: 950 !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        word-break: break-word !important;
      }

      .player-country {
        display: flex !important;
        align-items: center !important;
        gap: 14px !important;
        min-height: 34px !important;
        margin-bottom: 28px !important;
        color: #67726a !important;
        font-size: 17px !important;
        font-weight: 800 !important;
      }

      .player-flag-emoji {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 44px !important;
        height: 28px !important;
        font-size: 28px !important;
        line-height: 1 !important;
        flex: 0 0 auto !important;
      }

      .player-btn {
        width: 100% !important;
        height: 54px !important;
        border: none !important;
        border-radius: 999px !important;
        background: #008c35 !important;
        color: #ffffff !important;
        font-size: 17px !important;
        font-weight: 950 !important;
        cursor: pointer !important;
        transition: 0.2s ease !important;
      }

      .player-btn:hover {
        background: #006e29 !important;
        transform: translateY(-2px) !important;
      }

      .players-empty-card {
        padding: 34px !important;
        border-radius: 24px !important;
        background: #ffffff !important;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08) !important;
      }

      .players-empty-card h3 {
        margin-bottom: 14px !important;
        color: #003b16 !important;
        font-size: 26px !important;
        font-weight: 950 !important;
        text-transform: uppercase !important;
      }

      .players-empty-card p {
        color: #67726a !important;
        font-size: 17px !important;
        line-height: 1.5 !important;
        font-weight: 700 !important;
      }

      @media (max-width: 1280px) {
        .players-grid {
          grid-template-columns: repeat(3, minmax(230px, 1fr)) !important;
        }
      }

      @media (max-width: 980px) {
        .players-grid {
          grid-template-columns: repeat(2, minmax(220px, 1fr)) !important;
        }
      }

      @media (max-width: 620px) {
        .players-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function renderPlayers(filter) {
    const playersGrid =
      document.querySelector("#playersGrid") ||
      document.querySelector(".players-grid");

    if (!playersGrid) return;

    const allPlayers = getPlayersData();

    if (!allPlayers.length) {
      playersGrid.innerHTML = `
        <article class="players-empty-card">
          <h3>Игроки скоро появятся</h3>
          <p>Файл players-data.js подключен, но массив window.deportivoPlayers не найден. Проверь порядок подключения: players-data.js должен быть перед app.js.</p>
        </article>
      `;
      return;
    }

    const activeFilter = filter || "all";

    const players =
      activeFilter === "all"
        ? allPlayers
        : allPlayers.filter(function (player) {
            return normalizeRole(player.role || player.position) === activeFilter;
          });

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
          item.classList.remove("is-active", "active");
        });

        button.classList.add("is-active", "active");
        renderPlayers(filter);
      });
    });
  }

  function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".main-nav a, .nav a, header a");

    links.forEach(function (link) {
      const href = link.getAttribute("href") || "";

      if (href === currentPath || href.startsWith(currentPath + "#")) {
        link.classList.add("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectPlayersStyles();
    renderPlayers("all");
    setupFilters();
    setActiveNavLink();
  });
})();
