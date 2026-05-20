(function () {
  const LANG = "ru";

  function getPlayersData() {
    if (Array.isArray(window.deportivoPlayers)) return window.deportivoPlayers;
    if (Array.isArray(window.players)) return window.players;
    if (Array.isArray(window.PLAYERS)) return window.PLAYERS;
    if (Array.isArray(window.playersData)) return window.playersData;
    if (Array.isArray(window.PLAYERS_DATA)) return window.PLAYERS_DATA;
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

  function getPlayerNumber(player, index) {
    return getText(
      player.number || player.num || player.shirtNumber || player.shirt || index + 1,
      index + 1
    );
  }

  function getPlayerName(player) {
    return getText(
      player.name || player.fullName || player.fullname || player.title,
      "Игрок"
    );
  }

  function getPlayerId(player) {
    return slugify(player.id || getPlayerName(player));
  }

  function getPlayerPosition(player) {
    return getText(
      player.position || player.role || player.pos || player.type,
      "Игрок"
    );
  }

  function getPlayerCountry(player) {
    return getText(
      player.nationality || player.country || player.nation || player.countryName,
      ""
    );
  }

  function getPlayerBirthDate(player) {
    return getText(
      player.birthDate || player.birth || player.dateOfBirth || player.dob,
      "—"
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
    const parts = clean.split(/\s+/).filter(Boolean);

    if (parts.length <= 2) {
      return escapeHtml(clean);
    }

    if (parts.length === 3) {
      return escapeHtml(parts[0]) + "<br>" + escapeHtml(parts.slice(1).join(" "));
    }

    return escapeHtml(parts.slice(0, 2).join(" ")) + "<br>" + escapeHtml(parts.slice(2).join(" "));
  }

  function countryToFlagClass(country) {
    const value = String(country || "").trim().toLowerCase();

    const flags = {
      "аргентина": "flag-argentina",
      "argentina": "flag-argentina",
      "россия": "flag-russia",
      "russia": "flag-russia",
      "бразилия": "flag-brazil",
      "brazil": "flag-brazil",
      "brasil": "flag-brazil",
      "эквадор": "flag-ecuador",
      "ecuador": "flag-ecuador",
      "венесуэла": "flag-venezuela",
      "venezuela": "flag-venezuela",
      "украина": "flag-ukraine",
      "ukraine": "flag-ukraine",
      "беларусь": "flag-belarus",
      "belarus": "flag-belarus",
      "казахстан": "flag-kazakhstan",
      "kazakhstan": "flag-kazakhstan"
    };

    return flags[value] || "";
  }

  function createFlagHtml(country) {
    const flagClass = countryToFlagClass(country);

    if (!flagClass) return "";

    return '<span class="player-flag ' + flagClass + '" aria-hidden="true"></span>';
  }

  function createPhotoHtml(player) {
    const manualPhoto = getPlayerPhoto(player);
    const name = getPlayerName(player);
    const id = getPlayerId(player);

    if (manualPhoto && String(manualPhoto).includes("images/players/")) {
      return (
        '<img class="player-real-photo" src="' +
        escapeHtml(manualPhoto) +
        '" alt="' +
        escapeHtml(name) +
        '" onerror="this.parentElement.innerHTML=\'<div class=&quot;player-placeholder&quot;></div>\';">'
      );
    }

    return (
      '<img class="player-real-photo" src="images/players/' +
      escapeHtml(id) +
      '.jpg" data-player-id="' +
      escapeHtml(id) +
      '" data-photo-step="jpg" alt="' +
      escapeHtml(name) +
      '" onerror="tryNextPlayerPhoto(this);">'
    );
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

  function injectStyles() {
    const oldStyle = document.querySelector("#deportivo-app-styles");
    if (oldStyle) oldStyle.remove();

    const style = document.createElement("style");
    style.id = "deportivo-app-styles";

    style.textContent = `
      html {
        scroll-padding-top: 125px !important;
      }

      body {
        overflow-x: hidden !important;
      }

      body.modal-open {
        overflow: hidden !important;
      }

      #players {
        scroll-margin-top: 125px !important;
      }

      .players-section {
        padding-top: 72px !important;
        padding-bottom: 70px !important;
      }

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

      .player-real-photo {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
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

      .player-flag {
        position: relative !important;
        display: inline-block !important;
        width: 44px !important;
        height: 28px !important;
        flex: 0 0 44px !important;
        overflow: hidden !important;
        border-radius: 4px !important;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08) !important;
        background: #eeeeee !important;
      }

      .flag-argentina {
        background: linear-gradient(to bottom, #74acdf 0%, #74acdf 33.33%, #ffffff 33.33%, #ffffff 66.66%, #74acdf 66.66%, #74acdf 100%) !important;
      }

      .flag-argentina::after {
        content: "" !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        width: 7px !important;
        height: 7px !important;
        transform: translate(-50%, -50%) !important;
        border-radius: 50% !important;
        background: #f6b40e !important;
      }

      .flag-russia {
        background: linear-gradient(to bottom, #ffffff 0%, #ffffff 33.33%, #0039a6 33.33%, #0039a6 66.66%, #d52b1e 66.66%, #d52b1e 100%) !important;
      }

      .flag-brazil {
        background: #009b3a !important;
      }

      .flag-brazil::before {
        content: "" !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        width: 22px !important;
        height: 16px !important;
        transform: translate(-50%, -50%) rotate(45deg) !important;
        background: #ffdf00 !important;
      }

      .flag-brazil::after {
        content: "" !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        width: 10px !important;
        height: 10px !important;
        transform: translate(-50%, -50%) !important;
        border-radius: 50% !important;
        background: #002776 !important;
      }

      .flag-ecuador {
        background: linear-gradient(to bottom, #ffdd00 0%, #ffdd00 50%, #034ea2 50%, #034ea2 75%, #ed1c24 75%, #ed1c24 100%) !important;
      }

      .flag-venezuela {
        background: linear-gradient(to bottom, #f4d900 0%, #f4d900 33.33%, #0033a0 33.33%, #0033a0 66.66%, #ef3340 66.66%, #ef3340 100%) !important;
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

      .player-modal {
        position: fixed !important;
        inset: 0 !important;
        z-index: 99999 !important;
        display: none !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 24px !important;
        background: rgba(0, 0, 0, 0.64) !important;
        backdrop-filter: blur(12px) !important;
      }

      .player-modal.is-open {
        display: flex !important;
      }

      .player-modal-card {
        position: relative !important;
        width: min(940px, 100%) !important;
        max-height: 92vh !important;
        overflow: auto !important;
        border-radius: 34px !important;
        background: #ffffff !important;
        box-shadow: 0 40px 90px rgba(0, 0, 0, 0.35) !important;
      }

      .player-modal-close {
        position: absolute !important;
        top: 18px !important;
        right: 18px !important;
        z-index: 5 !important;
        width: 48px !important;
        height: 48px !important;
        border: none !important;
        border-radius: 50% !important;
        background: rgba(255, 255, 255, 0.94) !important;
        color: #050505 !important;
        font-size: 28px !important;
        font-weight: 900 !important;
        cursor: pointer !important;
      }

      .player-modal-top {
        display: grid !important;
        grid-template-columns: 0.9fr 1.1fr !important;
        min-height: 420px !important;
        background: radial-gradient(circle at center, #006b2a 0%, #003b16 62%, #001b09 100%) !important;
      }

      .player-modal-photo {
        position: relative !important;
        display: flex !important;
        align-items: flex-end !important;
        justify-content: center !important;
        overflow: hidden !important;
      }

      .player-modal-main {
        padding: 56px 52px 44px !important;
        color: #ffffff !important;
      }

      .player-modal-number {
        display: inline-flex !important;
        width: 78px !important;
        height: 62px !important;
        align-items: center !important;
        justify-content: center !important;
        margin-bottom: 30px !important;
        border-radius: 18px !important;
        background: #ffffff !important;
        color: #008c35 !important;
        font-size: 30px !important;
        font-weight: 950 !important;
      }

      .player-modal-position {
        margin-bottom: 18px !important;
        color: #7dffac !important;
        font-size: 14px !important;
        font-weight: 950 !important;
        letter-spacing: 0.18em !important;
        text-transform: uppercase !important;
      }

      .player-modal-name {
        font-size: clamp(34px, 5vw, 64px) !important;
        line-height: 0.98 !important;
        font-weight: 950 !important;
        letter-spacing: 0.05em !important;
        text-transform: uppercase !important;
      }

      .player-modal-bottom {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 1px !important;
        background: #e9eee9 !important;
      }

      .player-modal-stat {
        padding: 26px !important;
        background: #ffffff !important;
      }

      .player-modal-stat span {
        display: block !important;
        margin-bottom: 8px !important;
        color: #7c8580 !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
      }

      .player-modal-stat strong {
        color: #050505 !important;
        font-size: 21px !important;
        font-weight: 950 !important;
      }

      .player-modal-country {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
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

        .player-modal-top {
          grid-template-columns: 1fr !important;
        }

        .player-modal-bottom {
          grid-template-columns: 1fr 1fr !important;
        }
      }

      @media (max-width: 620px) {
        .players-grid {
          grid-template-columns: 1fr !important;
        }

        .player-modal-bottom {
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
              <span>Проверь players-data.js и подключение перед app.js</span>
            </div>
          </div>
        </article>
      `;

      if (playersCount) playersCount.textContent = "0 игроков";
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
      .map(function (player) {
        const originalIndex = allPlayers.indexOf(player);
        const number = getPlayerNumber(player, originalIndex);
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

              <button class="player-btn" type="button" data-player-index="${originalIndex}">
                Подробнее →
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    setupPlayerButtons();
  }

  function createModal() {
    const oldModal = document.querySelector("#playerModal");
    if (oldModal) oldModal.remove();

    const modal = document.createElement("div");
    modal.id = "playerModal";
    modal.className = "player-modal";

    modal.innerHTML = `
      <div class="player-modal-card">
        <button class="player-modal-close" type="button" aria-label="Закрыть">×</button>
        <div id="playerModalContent"></div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", function (event) {
      if (
        event.target === modal ||
        event.target.classList.contains("player-modal-close")
      ) {
        closePlayerModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePlayerModal();
      }
    });
  }

  function openPlayerModal(index) {
    const players = getPlayersData();
    const player = players[index];

    if (!player) return;

    const modal = document.querySelector("#playerModal");
    const content = document.querySelector("#playerModalContent");

    if (!modal || !content) return;

    const number = getPlayerNumber(player, index);
    const name = getPlayerName(player);
    const position = getPlayerPosition(player);
    const country = getPlayerCountry(player);
    const birthDate = getPlayerBirthDate(player);
    const photoHtml = createPhotoHtml(player);
    const flagHtml = createFlagHtml(country);
    const stats = player.stats || {};

    content.innerHTML = `
      <div class="player-modal-top">
        <div class="player-modal-photo">
          ${photoHtml}
        </div>

        <div class="player-modal-main">
          <div class="player-modal-number">${escapeHtml(number)}</div>
          <div class="player-modal-position">${escapeHtml(position)}</div>
          <div class="player-modal-name">${escapeHtml(name)}</div>
        </div>
      </div>

      <div class="player-modal-bottom">
        <div class="player-modal-stat">
          <span>Номер</span>
          <strong>${escapeHtml(number)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Позиция</span>
          <strong>${escapeHtml(position)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Страна</span>
          <strong class="player-modal-country">${flagHtml}${escapeHtml(country)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Дата рождения</span>
          <strong>${escapeHtml(birthDate)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Матчи</span>
          <strong>${escapeHtml(stats.matches || 0)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Голы</span>
          <strong>${escapeHtml(stats.goals || 0)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Передачи</span>
          <strong>${escapeHtml(stats.assists || 0)}</strong>
        </div>

        <div class="player-modal-stat">
          <span>Минуты</span>
          <strong>${escapeHtml(stats.minutes || 0)}</strong>
        </div>
      </div>
    `;

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closePlayerModal() {
    const modal = document.querySelector("#playerModal");

    if (!modal) return;

    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  function setupPlayerButtons() {
    const buttons = document.querySelectorAll(".player-btn[data-player-index]");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(button.getAttribute("data-player-index"));
        openPlayerModal(index);
      });
    });
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
    injectStyles();
    createModal();
    renderPlayers("all");
    setupFilters();
    setActiveNavLink();
  });
})();
