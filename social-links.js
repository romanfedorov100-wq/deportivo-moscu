/*
  Deportivo Moscu social links
  Version: dm_social_20260624_final

  This file safely replaces old footer placeholders:
  <div class="socials"><span>f</span><span>ig</span>...</div>
  with real working social media links and SVG logos.
*/

(function () {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/deportivomoscu?igsh=MWpvOXAyOTNuMTVvcA%3D%3D&utm_source=qr",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm8.75 2.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>'
    },
    {
      name: "Telegram",
      url: "https://t.me/depmoscu",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.94 4.16 18.7 19.44c-.24 1.08-.88 1.35-1.78.84l-4.92-3.63-2.38 2.29c-.26.26-.48.48-.98.48l.35-5.02 9.14-8.26c.4-.35-.09-.55-.62-.2L6.22 13.06 1.35 11.54C.29 11.2.27 10.48 1.57 9.98L20.6 2.65c.88-.33 1.65.21 1.34 1.51Z"/></svg>'
    },
    {
      name: "VK",
      url: "https://vk.ru/deportivomoscu",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.78 17.5c-5.6 0-8.8-3.84-8.94-10.24h2.8c.09 4.7 2.16 6.7 3.8 7.12V7.26h2.64v4.06c1.62-.18 3.32-2.02 3.9-4.06h2.64c-.44 2.52-2.3 4.36-3.62 5.12 1.32.62 3.44 2.22 4.25 5.12h-2.9c-.64-1.96-2.2-3.48-4.27-3.7v3.7h-.32Z"/></svg>'
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@deportivodemoscu?si=F8ifkYrSEw01cfcy",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.55 3.57 12 3.57 12 3.57s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31.16 31.16 0 0 0 0 12a31.16 31.16 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.13A31.16 31.16 0 0 0 24 12a31.16 31.16 0 0 0-.5-5.8ZM9.6 15.56V8.44L15.86 12 9.6 15.56Z"/></svg>'
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@deportivomoscu?_r=1&_t=ZS-97TgyJu8r9p",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 2c.35 3.03 2.05 4.84 5.02 5.03v3.4a8.73 8.73 0 0 1-5.02-1.55v6.36c0 4.05-2.47 6.76-6.45 6.76-3.8 0-6.15-2.7-6.15-5.95 0-3.67 2.8-6.24 6.94-6.08v3.58c-1.86-.28-3.3.75-3.3 2.38 0 1.45 1.05 2.43 2.47 2.43 1.65 0 2.62-.98 2.62-3.18V2h3.87Z"/></svg>'
    },
    {
      name: "Threads",
      url: "https://www.threads.com/@deportivomoscu?igshid=NTc4MTIwNjQ2YQ==",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.22 2C6.42 2 3 5.86 3 12.06 3 18.28 6.42 22 12.32 22c5.1 0 8.28-2.65 8.28-6.88 0-3.02-1.64-5.02-4.66-5.72-.16-.35-.34-.68-.55-.98-1.04-1.5-2.68-2.24-4.74-2.14-2.01.1-3.66 1-4.68 2.56l2.28 1.56c.56-.86 1.38-1.35 2.52-1.4 1.1-.06 1.94.28 2.48 1.02.05.07.1.14.14.22-.4-.02-.82-.03-1.26-.03-3.16 0-5.16 1.63-5.16 4.05 0 2.2 1.78 3.76 4.32 3.76 2.72 0 4.53-1.5 4.9-4.02 1.1.47 1.7 1.35 1.7 2.62 0 2.55-2.02 4.08-5.58 4.08-4.33 0-6.54-2.64-6.54-7.6 0-4.94 2.26-7.7 6.43-7.7 3.03 0 5.08 1.38 6.28 4.22l2.58-1.1C19.36 4.76 16.38 2 12.22 2Zm-.86 13.4c-1.06 0-1.72-.48-1.72-1.2 0-.85.88-1.38 2.44-1.38.55 0 1.07.03 1.55.1-.12 1.58-.96 2.48-2.27 2.48Z"/></svg>'
    }
  ];

  const styleId = "deportivo-social-links-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .socials,
      .deportivo-social-links {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
      }

      .socials a,
      .deportivo-social-links a {
        width: 42px;
        height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        color: #00ff8a;
        background: rgba(0, 255, 138, 0.06);
        border: 1px solid rgba(0, 255, 138, 0.18);
        text-decoration: none;
        transition: transform .18s ease, background .18s ease, border-color .18s ease, color .18s ease;
      }

      .socials a:hover,
      .deportivo-social-links a:hover {
        transform: translateY(-2px);
        background: rgba(0, 255, 138, 0.14);
        border-color: rgba(0, 255, 138, 0.45);
        color: #ffffff;
      }

      .socials svg,
      .deportivo-social-links svg {
        width: 21px;
        height: 21px;
        display: block;
        fill: currentColor;
      }
    `;
    document.head.appendChild(style);
  }

  function renderSocials(container) {
    container.innerHTML = socialLinks.map(function (item) {
      return '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" aria-label="' + item.name + '" title="' + item.name + '">' + item.svg + '</a>';
    }).join("");
    container.classList.add("deportivo-social-links");
  }

  function initSocials() {
    document.querySelectorAll(".socials").forEach(renderSocials);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSocials);
  } else {
    initSocials();
  }
})();
