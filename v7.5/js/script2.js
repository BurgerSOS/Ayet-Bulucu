
  /* Tema toggle */
  function guncelleTemaLabel() {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      themeLabel.textContent = "Karanlık Mod";
    } else {
      themeLabel.textContent = "Açık Mod";
    }
  }
  // uygula kayıtlı tema (veya açık)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  else document.documentElement.setAttribute("data-theme", "light");
  guncelleTemaLabel();

  document.getElementById("themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = (cur === "dark") ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    guncelleTemaLabel();
  });

  /* RANDOM buton - sadece tek ayet gösterir, otomatik seçili yapmaz */
  randomBtn.addEventListener("click", () => {
    temizleSonuclari();

    // rastgele bir ayet seç
    const rastgeleIndex = Math.floor(Math.random() * tumAyetler.length);
    const ayet = tumAyetler[rastgeleIndex];

    // gösterilecek array olarak bir tane ayet ver
    listeleAyetler([ayet]);

    // NOT: listeleAyetler random ayeti gösterir ama seçili yapmaz.
    // Eğer kullanıcı o öğeye tıklarsa seciliAyet atanır (ve kopyala görünür).
  });

  /* sayfa yüklendiğinde temizle */
  window.addEventListener("load", () => {
    temizleSonuclari();
  });
