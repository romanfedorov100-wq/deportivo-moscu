const translations = {
  ru: {
    nav_home: "Главная",
    nav_news: "Новости",
    nav_team: "Команда",
    nav_matches: "Матчи",
    nav_club: "Клуб",
    nav_academy: "Академия",
    nav_media: "Медиа",
    nav_store: "Магазин",
    buy_tickets: "Купить билеты",
    official_site: "Официальный сайт клуба",
    hero_title: "Добро пожаловать<br>в Депортиво Москву",
    hero_subtitle: "Единый город. Одна страсть. Одна зелёно-чёрная семья.",
    learn_more: "Узнать больше",
    watch_team: "Смотреть состав",
    club_slogan: "Футбол. Страсть. Москва.",
    latest_news: "Последние новости",
    all_news: "Все новости →",
    next_match: "Следующий матч",
    season_calendar: "Календарь сезона",
    all_matches: "Все матчи →",
    league_table: "Турнирная таблица",
    full_table: "Вся таблица →",
    team: "Команда",
    games: "И",
    wins: "В",
    draws: "Н",
    losses: "П",
    points: "О",
    club_short_text: "Клуб, созданный в Москве в 2024 году. Мы объединяем страсть южноамериканского футбола, энергию Москвы и современную клубную культуру.",
    team_squad: "Состав команды",
    team_squad_text: "Познакомьтесь с игроками, которые бьются за наш герб.",
    view_squad: "Смотреть состав →",
    academy_community: "Академия и сообщество",
    academy_text: "Будущее начинается здесь. Стань частью нашей семьи.",
    learn_more_arrow: "Узнать больше →",
    store: "Магазин",
    store_text: "Официальная экипировка Deportivo Moscu.",
    go_store: "Перейти в магазин →",
    footer_slogan: "Единый город. Одна страсть. Одна зелёно-чёрная семья.",
    about_club: "О клубе",
    management: "Руководство",
    stadium: "Стадион",
    partners: "Партнёры",
    help: "Помощь",
    rules: "Правила посещения",
    tickets_return: "Возврат билетов",
    contacts: "Контакты"
  },

  en: {
    nav_home: "Home",
    nav_news: "News",
    nav_team: "Team",
    nav_matches: "Matches",
    nav_club: "Club",
    nav_academy: "Academy",
    nav_media: "Media",
    nav_store: "Store",
    buy_tickets: "Buy tickets",
    official_site: "Official club website",
    hero_title: "Welcome to<br>Deportivo Moscu",
    hero_subtitle: "One city. One passion. One green-and-black family.",
    learn_more: "Learn more",
    watch_team: "View squad",
    club_slogan: "Football. Passion. Moscow.",
    latest_news: "Latest news",
    all_news: "All news →",
    next_match: "Next match",
    season_calendar: "Season calendar",
    all_matches: "All matches →",
    league_table: "League table",
    full_table: "Full table →",
    team: "Team",
    games: "G",
    wins: "W",
    draws: "D",
    losses: "L",
    points: "Pts",
    club_short_text: "A club founded in Moscow in 2024. We unite South American football passion, Moscow energy and modern club culture.",
    team_squad: "Team squad",
    team_squad_text: "Meet the players who fight for our badge.",
    view_squad: "View squad →",
    academy_community: "Academy and community",
    academy_text: "The future starts here. Become part of our family.",
    learn_more_arrow: "Learn more →",
    store: "Store",
    store_text: "Official Deportivo Moscu equipment.",
    go_store: "Go to store →",
    footer_slogan: "One city. One passion. One green-and-black family.",
    about_club: "About club",
    management: "Management",
    stadium: "Stadium",
    partners: "Partners",
    help: "Help",
    rules: "Visitor rules",
    tickets_return: "Ticket refund",
    contacts: "Contacts"
  },

  es: {
    nav_home: "Inicio",
    nav_news: "Noticias",
    nav_team: "Equipo",
    nav_matches: "Partidos",
    nav_club: "Club",
    nav_academy: "Academia",
    nav_media: "Media",
    nav_store: "Tienda",
    buy_tickets: "Comprar entradas",
    official_site: "Sitio oficial del club",
    hero_title: "Bienvenido a<br>Deportivo Moscu",
    hero_subtitle: "Una ciudad. Una pasión. Una familia verde y negra.",
    learn_more: "Saber más",
    watch_team: "Ver plantilla",
    club_slogan: "Fútbol. Pasión. Moscú.",
    latest_news: "Últimas noticias",
    all_news: "Todas las noticias →",
    next_match: "Próximo partido",
    season_calendar: "Calendario de temporada",
    all_matches: "Todos los partidos →",
    league_table: "Tabla de posiciones",
    full_table: "Tabla completa →",
    team: "Equipo",
    games: "J",
    wins: "G",
    draws: "E",
    losses: "P",
    points: "Pts",
    club_short_text: "Un club fundado en Moscú en 2024. Unimos la pasión del fútbol sudamericano, la energía de Moscú y una cultura moderna de club.",
    team_squad: "Plantilla",
    team_squad_text: "Conoce a los jugadores que luchan por nuestro escudo.",
    view_squad: "Ver plantilla →",
    academy_community: "Academia y comunidad",
    academy_text: "El futuro empieza aquí. Forma parte de nuestra familia.",
    learn_more_arrow: "Saber más →",
    store: "Tienda",
    store_text: "Equipación oficial de Deportivo Moscu.",
    go_store: "Ir a la tienda →",
    footer_slogan: "Una ciudad. Una pasión. Una familia verde y negra.",
    about_club: "Sobre el club",
    management: "Dirección",
    stadium: "Estadio",
    partners: "Socios",
    help: "Ayuda",
    rules: "Normas de visita",
    tickets_return: "Devolución de entradas",
    contacts: "Contactos"
  }
};

const newsData = {
  ru: [
    {
      category: "Клуб",
      time: "2 часа назад",
      title: "Депортиво Москву открывает новый тренировочный центр"
    },
    {
      category: "Команда",
      time: "1 день назад",
      title: "Интервью с капитаном: «Мы строим что-то особенное»"
    },
    {
      category: "Академия",
      time: "2 дня назад",
      title: "Академия Депортиво: набор юных талантов продолжается"
    }
  ],

  en: [
    {
      category: "Club",
      time: "2 hours ago",
      title: "Deportivo Moscu opens a new training center"
    },
    {
      category: "Team",
      time: "1 day ago",
      title: "Captain interview: “We are building something special”"
    },
    {
      category: "Academy",
      time: "2 days ago",
      title: "Deportivo Academy: youth talent recruitment continues"
    }
  ],

  es: [
    {
      category: "Club",
      time: "Hace 2 horas",
      title: "Deportivo Moscu inaugura un nuevo centro de entrenamiento"
    },
    {
      category: "Equipo",
      time: "Hace 1 día",
      title: "Entrevista con el capitán: “Estamos construyendo algo especial”"
    },
    {
      category: "Academia",
      time: "Hace 2 días",
      title: "Academia Deportivo: continúa la captación de jóvenes talentos"
    }
  ]
};

const matchesData = [
  {
    date: "25 мая",
    home: "Deportivo Moscu",
    away: "Alania",
    place: "Дома • 19:00"
  },
  {
    date: "1 июня",
    home: "Spartak-Nalchik",
    away: "Deportivo Moscu",
    place: "В гостях • 17:00"
  },
  {
    date: "8 июня",
    home: "Deportivo Moscu",
    away: "Legion",
    place: "Дома • 19:00"
  },
  {
    date: "15 июня",
    home: "Dinamo Stavropol",
    away: "Deportivo Moscu",
    place: "В гостях • 18:00"
  },
  {
    date: "22 июня",
    home: "Deportivo Moscu",
    away: "Rotor Vladikavkaz",
    place: "Дома • 19:00"
  }
];

const tableData = [
  {
    position: 1,
    team: "Deportivo Moscu",
    games: 29,
    wins: 18,
    draws: 7,
    losses: 4,
    points: 61
  },
  {
    position: 2,
    team: "Alania",
    games: 29,
    wins: 17,
    draws: 6,
    losses: 6,
    points: 57
  },
  {
    position: 3,
    team: "Spartak-Nalchik",
    games: 29,
    wins: 15,
    draws: 7,
    losses: 7,
    points: 52
  },
  {
    position: 4,
    team: "Dinamo Stavropol",
    games: 29,
    wins: 13,
    draws: 8,
    losses: 8,
    points: 47
  },
  {
    position: 5,
    team: "Legion",
    games: 29,
    wins: 12,
    draws: 6,
    losses: 11,
    points: 42
  }
];

let currentLang = "ru";

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  renderNews();
}

function renderNews() {
  const newsGrid = document.getElementById("newsGrid");

  if (!newsGrid) {
    return;
  }

  newsGrid.innerHTML = newsData[currentLang].map((news) => {
    return `
      <article class="news-card">
        <div class="news-image"></div>
        <div class="news-body">
          <div class="news-meta">${news.category} • ${news.time}</div>
          <h3 class="news-title">${news.title}</h3>
        </div>
      </article>
    `;
  }).join("");
}

function renderMatches() {
  const matchesRow = document.getElementById("matchesRow");

  if (!matchesRow) {
    return;
  }

  matchesRow.innerHTML = matchesData.map((match) => {
    return `
      <article class="match-mini-card">
        <div class="match-mini-date">${match.date}</div>
        <div class="match-mini-teams">
          ${match.home}<br>
          vs<br>
          ${match.away}
        </div>
        <div class="match-mini-place">${match.place}</div>
      </article>
    `;
  }).join("");
}

function renderTable() {
  const leagueTableBody = document.getElementById("leagueTableBody");

  if (!leagueTableBody) {
    return;
  }

  leagueTableBody.innerHTML = tableData.map((row) => {
    const isDeportivo = row.team === "Deportivo Moscu";

    return `
      <tr class="${isDeportivo ? "deportivo-row" : ""}">
        <td>${row.position}</td>
        <td>${row.team}</td>
        <td>${row.games}</td>
        <td>${row.wins}</td>
        <td>${row.draws}</td>
        <td>${row.losses}</td>
        <td>${row.points}</td>
      </tr>
    `;
  }).join("");
}

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}

renderNews();
renderMatches();
renderTable();
setLanguage("ru");
