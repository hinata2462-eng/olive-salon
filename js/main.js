/* ============================================================
   Beauty Salon Olive — main.js
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.OLIVE_CONFIG || {};

  /* ---------- LINEリンクを一括設定 ---------- */
  var lineReady = CFG.LINE_URL && CFG.LINE_URL.indexOf("XXXXXXX") === -1;
  document.querySelectorAll("[data-line]").forEach(function (a) {
    if (lineReady) {
      a.href = CFG.LINE_URL;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = "#";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        alert("LINEでのご予約受付は、ただいま準備中です。\n公開まで今しばらくお待ちください。");
      });
    }
  });

  /* ---------- Instagramリンク ---------- */
  document.querySelectorAll("[data-instagram]").forEach(function (a) {
    if (CFG.INSTAGRAM_URL) {
      a.href = CFG.INSTAGRAM_URL;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.style.display = "none";
    }
  });

  /* ---------- Googleマップ埋め込み ---------- */
  var mapBox = document.querySelector("[data-map]");
  if (mapBox && CFG.GOOGLE_MAP_EMBED) {
    var iframe = document.createElement("iframe");
    iframe.src = CFG.GOOGLE_MAP_EMBED;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    mapBox.innerHTML = "";
    mapBox.appendChild(iframe);
  }

  /* ---------- ヘッダー：スクロールで影 ---------- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- ドロワーメニュー ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var drawer = document.querySelector(".drawer");
  var spMenuBtn = document.querySelector(".sp-fixed__menu");

  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    if (toggle) {
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("is-open"));
    });
  }
  if (spMenuBtn) {
    spMenuBtn.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("is-open"));
    });
  }
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
  }

  /* ---------- スクロール表示アニメーション ---------- */
  var targets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }

  /* ---------- フッターの年 ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
