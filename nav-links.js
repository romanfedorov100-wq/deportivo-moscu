document.addEventListener("DOMContentLoaded", () => {
  const links = {
    nav_home: "index.html",
    nav_news: "news.html",
    nav_team: "team.html",
    nav_matches: "league.html",
    nav_club: "club.html",
    nav_academy: "academy.html",
    nav_media: "media.html",
    nav_store: "store.html"
  };

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (links[key] && element.tagName.toLowerCase() === "a") {
      element.setAttribute("href", links[key]);
    }
  });
});