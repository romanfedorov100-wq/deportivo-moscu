(function () {
  function getPlayersData() {
    if (Array.isArray(window.players)) return window.players;
    if (Array.isArray(window.PLAYERS)) return window.PLAYERS;
    if (Array.isArray(window.playersData)) return window.playersData;
    if (Array.isArray(window.PLAYERS_DATA)) return window.PLAYERS_DATA;
    if (Array.isArray(window.squad)) return window.squad;
    if (Array.isArray(window.SQUAD)) return window.SQUAD;
    return [];
  }

  function safeText(value, fallback) {
    if (value === undefined || value === null || value === "") {
      return fallback || "";
    }

    return String(value);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getPlayerNumber(player, index) {
    return safeText(
      player.number ||
        player.num ||
        player.id ||
        player.shirtNumber ||
        player.shirt ||
        index + 1,
      index + 1
    );
  }

  function getPlayerFirstName(player) {
    if (player.firstName) return player.firstName;
    if (player.firstname) return player.firstname;
    if (player.first_name) return player.first_name;

    if (player.name && !player.lastName && !player.lastname && !player.surname) {
      return player.name;
    }

    const fullName =
      player.fullName ||
      player.fullname ||
      player.full_name ||
      player.title ||
      "";

    const parts = String(fullName).trim().split(/\s+/);

    if (parts.length > 1) {
      return parts.slice(1).join(" ");
    }

    return fullName || "";
  }

  function getPlayerLastName(player) {
    if (player.lastName) return player.lastName;
    if (player.lastname) return player.lastname;
    if (player.last_name) return player.last_name;
    if (player.surname) return player.surname;

    const fullName =
      player.fullName ||
      player.fullname ||
      player.full_name ||
      player.title ||
      "";

    const parts = String(fullName).trim().split(/\s+/);

    if (parts.length > 1) {
      return parts[0];
    }

    return "";
  }

  function getPlayerNameHtml(player) {
    const firstName = safeText(getPlayerFirstName(player), "");
    const lastName = safeText(getPlayerLastName(player), "");

    if (lastName && firstName) {
      return `${escapeHtml(lastName)}<br>${escapeHtml(firstName)}`;
    }

    if (firstName) {
      return escapeHtml(firstName);
    }

    if (lastName) {
      return escapeHtml(lastName);
    }

    return "PLAYER";
  }

  function getPlayerPosition(player) {
    return safeText(
      player.position ||
        player.role ||
        player.pos ||
        player.amplua ||
        player.amp ||
        player.type,
      "Игрок"
    );
  }

  function getPlayerCountry(player) {
    return safeText(
      player.country ||
        player.nationality ||
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

  function getPlayerFlag(player) {
    return (
      player.flag ||
      player.flagUrl ||
      player.flagImage ||
      player.countryFlag ||
      player.flagSrc ||
      ""
    );
  }

  function countryToEmoji(country) {
    const value = String(country || "").trim().toLowerCase();

    const map = {
      "россия": "🇷🇺",
      "russia": "🇷🇺",
      "аргентина": "🇦🇷",
      "argentina": "🇦🇷",
      "беларусь": "🇧🇾",
      "belarus": "🇧🇾",
      "казахстан": "🇰🇿",
      "kazakhstan": "🇰🇿",
      "украина": "🇺🇦",
      "ukraine": "🇺🇦",
      "испания": "🇪🇸",
      "spain": "🇪🇸",
      "бразилия": "🇧🇷",
      "brazil": "🇧🇷",
      "франция": "🇫🇷",
      "france": "🇫🇷",
      "португалия": "🇵🇹",
      "portugal": "🇵🇹",
      "италия": "🇮🇹",
      "italy": "🇮🇹",
      "германия": "🇩🇪",
      "germany": "🇩🇪"
    };

    return map[value] || "";
  }

  function isFlagFile(src) {
    if (!src) return false;

    const value = String(src).toLowerCase();

    const flagWords = [
      "flag",
      "flags",
      "флаг",
      "country",
      "nationality",
      "argentina",
      "russia",
      "rossiya",
      "belarus",
      "kazakhstan",
      "ukraine",
      "spain",
      "brazil",
      "france",
      "portugal",
      "italy",
      "germany",
      "аргентина",
      "россия",
      "беларусь",
      "казахстан",
      "украина"
    ];

    return flagWords.some(function (word) {
      return value.includes(word);
    });
  }

  function isRealPlayerPhoto(src) {
    if (!src) return false;

    const value = String(src).toLowerCase();

    if (isFlagFile(value)) return false;

    const allowedPhotoFolders = [
      "images/players/",
      "./images/players/",
      "/images/players/",
      "players/"
    ];

    return allowedPhotoFolders.some(function (folder) {
      return value.includes(folder);
    });
  }

  function createPhotoHtml(player) {
    const photo = getPlayerPhoto(player);
    const firstName = getPlayerFirstName(player);
    const lastName = getPlayerLastName(player);
    const name = `${firstName} ${lastName}`.trim();

    if (isRealPlayerPhoto(photo)) {
      return `
        <img 
          class="player-real-photo"
          src="${escapeHtml(photo)}" 
          alt="${escapeHtml(name || "Player")}" 
          onerror="this.parentElement.innerHTML='<div class=&quot;player-placeholder&quot;></div>';"
        >
      `;
    }

    return `<div class="player-placeholder"></div>`;
  }

  function createFlagHtml(player) {
    const country = getPlayerCountry(player);
    const flag = getPlayerFlag(player);

    if (flag && !isFlagFile(flag)) {
      return `
        <img 
          class="player-flag" 
          src="${escapeHtml(flag)}" 
          alt="${escapeHtml(country)}" 
          onerror="this.remove();"
        >
      `;
    }

    if (flag) {
      return `
        <img 
          class="player-flag" 
          src="${escapeHtml(flag)}" 
          alt="${escapeHtml(country)}" 
          onerror="this.remove();"
        >
      `;
    }

    const emoji = countryToEmoji(country);

    if (emoji) {
      return `<span class="flag-emoji">${emoji}</span>`;
    }

    return "";
  }

  function injectPlayerFixStyles() {
    const oldStyle = document.querySelector("#deportivo-player-fix-styles");
    if (oldStyle) oldStyle.remove();

    const style = document.createElement("style");
    style.id = "deportivo-player-fix-styles";

    style.textContent = `
      .players-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(230px, 1fr));
        gap: 34px;
        align-items: stretch;
      }

      .player-card {
        position: relative;
        overflow: hidden;
        background: #ffffff;
        border-radius: 0 38px 18px 18px;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
      }

      .player-photo {
        position: relative;
        height: 300px;
        overflow: hidden;
        background: radial-gradient(circle at center, #00551f 0%, #003b16 60%, #00250d 100%);
        display: flex;
        align-items: flex-end;
        justify-content: center;
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
        opacity: 0 !important;
        visibility: hidden !important;
      }

      .player-card > .player-flag,
      .player-card > .flag,
      .player-card > .flag-icon,
      .player-card > .country-flag,
      .player-card > .nationality-flag,
      .player-card > [class*="flag"],
      .player-card > [class*="Flag"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }

      .player-number {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 88px;
        height: 74px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom-right-radius: 28px;
        background: #ffffff;
        color: #008c35;
        font-size: 30px;
        font-weight: 950;
      }

      .player-real-photo {
        display: block !important;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .player-placeholder {
        position: relative;
        width: 230px;
        height: 250px;
      }

      .player-placeholder::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 98px;
        height: 98px;
        transform: translateX(-50%);
        border-radius: 50%;
        background: #c4a07b;
      }

      .player-placeholder::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 210px;
        height: 165px;
        transform: translateX(-50%);
        border-radius: 110px 110px 0 0;
        background: linear-gradient(180deg, #d7d7d7 0%, #111111 45%, #050505 100%);
      }

      .player-info {
        padding: 32px 32px 28px;
        background: #ffffff;
      }

      .player-position {
        margin-bottom: 18px;
        color: #008c35;
        font-size: 15px;
        font-weight: 950;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .player-name {
        min-height: 66px;
        margin-bottom: 24px;
        color: #050505;
        font-size: 27px;
        line-height: 1.08;
        font-weight: 950;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        word-break: break-word;
      }

      .player-country {
        display: flex;
        align-items: center;
        gap: 14px;
        min-height: 34px;
        margin-bottom: 28px;
        color: #67726a;
        font-size: 17px;
        font-weight: 800;
      }

      .player-country .player-flag {
        display: block !important;
        width: 44px;
        height: 28px;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
        flex: 0 0 auto;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .player-country .flag-emoji {
        display: inline-block !important;
        font-size: 28px;
        line-height: 1;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .player-btn {
        width: 100%;
        height: 54px;
        border: none;
        border-radius: 999px;
        background: #008c35;
        color: #ffffff;
        font-size: 17px;
        font-weight: 950;
        cursor: pointer;
        transition: 0.2s ease;
      }

      .player-btn:hover {
        background: #006e29;
        transform: translateY(-2px);
      }

      @media (max-width: 1280px) {
        .players-grid {
          grid-template-columns: repeat(3, minmax(230px, 1fr));
        }
      }

      @media (max-width: 980px) {
        .players-grid {
          grid-template-columns: repeat(2, minmax(220px, 1fr));
        }
      }

      @media (max-width: 620px) {
        .players-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function removeTopFlags() {
    const cards = document.querySelectorAll(".player-card");

    cards.forEach(function (card) {
      const photoZone = card.querySelector(".player-photo");

      if (photoZone) {
        const flagElements = photoZone.querySelectorAll(
          "img:not(.player-real-photo), .player-flag, .flag, .flag-icon, .country-flag, .nationality-flag, [class*='flag'], [class*='Flag']"
        );

        flagElements.forEach(function (element) {
          element.remove();
        });
      }

      const directChildren = Array.from(card.children);

      directChildren.forEach(function (element) {
        if (
          element.classList &&
          element !== card.querySelector(".player-number") &&
          element !== card.querySelector(".player-photo") &&
          element !== card.querySelector(".player-info")
        ) {
          const className = String(element.className || "").toLowerCase();

          if (className.includes("flag")) {
            element.remove();
          }
        }
      });
    });
  }

  function renderPlayers() {
    const playersGrid =
      document.querySelector("#playersGrid") ||
      document.querySelector(".players-grid");

    if (!playersGrid) return;

    const players = getPlayersData();

    if (!players.length) {
      playersGrid.innerHTML = `
        <article class="info-card">
          <h3>Игроки скоро появятся</h3>
          <p>Проверь файл players-data.js. Данные игроков должны быть подключены перед app.js.</p>
        </article>
      `;
      return;
    }

    playersGrid.innerHTML = players
      .map(function (player, index) {
        const number = getPlayerNumber(player, index);
        const position = getPlayerPosition(player);
        const country = getPlayerCountry(player);
        const nameHtml = getPlayerNameHtml(player);
        const photoHtml = createPhotoHtml(player);
        const flagHtml = createFlagHtml(player);

        return `
          <article class="player-card">
            <div class="player-number">${escapeHtml(number)}</div>

            <div class="player-photo">
              ${photoHtml}
            </div>

            <div class="player-info">
              <div class="player-position">${escapeHtml(position)}</div>

              <div class="player-name">
                ${nameHtml}
              </div>

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

    removeTopFlags();
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
    injectPlayerFixStyles();
    renderPlayers();
    removeTopFlags();
    setActiveNavLink();

    setTimeout(removeTopFlags, 300);
    setTimeout(removeTopFlags, 1000);
  });
})();
