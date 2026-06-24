/*
  Deportivo Moscu news card image fix
  Version: dm_news_images_force_20260624

  Purpose:
  Some pages render news cards from app.js but may ignore the `image` field
  from news-data.js. This script safely forces each news card to use its own image.
*/

(function () {
  const MAP = [
    {
      match: ["Deportivo Moscu U-21", "Liga Escobarense U-21"],
      image: "images/news/u21-champions-2025-26.webp"
    },
    {
      match: ["Sport24", "Интервью с основателем", "Interview with the founder", "Entrevista con el fundador"],
      image: "images/news/sport24-interview.webp"
    },
    {
      match: ["La Nación"],
      image: "images/news/la-nacion.webp"
    },
    {
      match: ["Olé", "Ole"],
      image: "images/news/ole.webp"
    },
    {
      match: ["CNN Español", "CNN"],
      image: "images/news/cnn-espanol.webp"
    },
    {
      match: ["MSN"],
      image: "images/news/msn-video.webp"
    },
    {
      match: ["РИА Новости", "RIA Novosti"],
      image: "images/news/ria.webp"
    },
    {
      match: ["Газета.Ru", "Gazeta.Ru"],
      image: "images/news/gazeta.webp"
    },
    {
      match: ["Чемпионат", "championat"],
      image: "images/news/championat.webp"
    },
    {
      match: ["YouTube"],
      image: "images/news/youtube.webp"
    },
    {
      match: ["ТАСС", "TASS"],
      image: "images/news/tass.webp"
    },
    {
      match: ["Матч ТВ", "Match TV"],
      image: "images/news/match-tv.webp"
    }
  ];

  function normalize(text) {
    return String(text || "").toLowerCase();
  }

  function setImage(img, src) {
    if (!img || !src) return;
    img.src = src + "?v=dm_news_images_force_20260624";
    img.removeAttribute("srcset");
    img.removeAttribute("data-src");
    img.loading = "lazy";
    img.style.objectFit = "cover";
    img.style.width = "100%";
  }

  function findCardImage(card) {
    return card.querySelector("img");
  }

  function patchByText() {
    const cards = Array.from(document.querySelectorAll("article, .news-card, .media-card, .panel, .card, a"))
      .filter(function (el) {
        return el.querySelector && el.querySelector("img") && el.textContent && el.textContent.trim().length > 20;
      });

    const used = new Set();

    MAP.forEach(function (item) {
      const card = cards.find(function (el) {
        if (used.has(el)) return false;
        const txt = normalize(el.textContent);
        return item.match.some(function (key) {
          return txt.includes(normalize(key));
        });
      });

      if (card) {
        const img = findCardImage(card);
        setImage(img, item.image);
        used.add(card);
      }
    });
  }

  function patchByOrderFallback() {
    const isMediaPage =
      location.pathname.includes("media") ||
      document.body.getAttribute("data-page") === "media" ||
      document.querySelector('[data-render="media"]') ||
      document.querySelector('[data-render="home-news"]');

    if (!isMediaPage) return;

    const imgs = Array.from(document.querySelectorAll("main img"))
      .filter(function (img) {
        const src = img.getAttribute("src") || "";
        const alt = img.getAttribute("alt") || "";
        const box = img.getBoundingClientRect();
        const isLogo = src.includes("logo") || alt.toLowerCase().includes("logo");
        return !isLogo && box.width >= 80 && box.height >= 50;
      });

    imgs.slice(0, MAP.length).forEach(function (img, index) {
      if (MAP[index]) setImage(img, MAP[index].image);
    });
  }

  function patchAll() {
    patchByText();
    patchByOrderFallback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(patchAll, 250);
      setTimeout(patchAll, 900);
      setTimeout(patchAll, 1800);
    });
  } else {
    setTimeout(patchAll, 250);
    setTimeout(patchAll, 900);
    setTimeout(patchAll, 1800);
  }

  window.addEventListener("load", patchAll);
})();
