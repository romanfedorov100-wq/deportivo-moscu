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

    const fullName = player.fullName || player.fullname || player.full_name || player.title || "";
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

    const fullName = player.fullName || player.fullname || player.full_name || player.title || "";
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

  function isFlagLikeImage(src, player) {
    if (!src) return false;

    const photo = String(src).toLowerCase();
    const flag = String(getPlayerFlag(player) || "").toLowerCase();
    const country = String(getPlayerCountry(player) || "").toLowerCase();

    if (flag && photo === flag) return true;

    const flagWords = [
      "flag",
      "flags",
      "флаг",
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

    if (flagWords.some(function (word) {
      return photo.includes(word);
    })) {
      return true;
    }

    if (country && photo.includes(country)) {
      return true;
    }

    return false;
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

  function createPhotoHtml(player) {
    const photo = getPlayerPhoto(player);
    const firstName = getPlayerFirstName(player);
    const lastName = getPlayerLastName(player);
    const name = `${firstName} ${lastName}`.trim();

    if (photo && !isFlagLikeImage(photo, player)) {
      return `<img src="${escapeHtml(photo)}" alt="${escapeHtml(name || "Player")}" onerror="this.remove(); this.parentElement.innerHTML='<div class=&quot;player-placeholder&quot;></div>';">`;
    }

    return `<div class="player-placeholder"></div>`;
  }

  function createFlagHtml(player) {
    const country = getPlayerCountry(player);
    const flag = getPlayerFlag(player);

    if (flag) {
      return `<img class="player-flag" src="${escapeHtml(flag)}" alt="${escapeHtml(country)}" onerror="this.remove();">`;
    }

    const emoji = countryToEmoji(country);

    if (emoji) {
      return `<span class="flag-emoji">${emoji}</span>`;
    }

    return "";
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
    renderPlayers();
    setActiveNavLink();
  });
})();
