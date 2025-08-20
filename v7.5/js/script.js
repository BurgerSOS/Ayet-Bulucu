//sure liste için
const sureSelect = document.getElementById("sureSec");

const sureler = [
  "Tüm Kur'an","Fatiha","Bakara",
  "Ali İmran","Nisa","Maide","Enam","Araf","Enfal",
  "Tevbe","Yunus","Hud","Yusuf","Rad","İbrahim","Hicr","Nahl","İsra","Kehf","Meryem","Taha","Enbiya","Hac",
  "Müminun","Nur","Furkan","Şuara","Neml","Kasas","Ankebut","Rum","Lokman","Secde","Ahzab","Sebe","Fatır",
  "Yasin","Saffat","Sad","Zümer","Mümin","Fussilet","Şura","Zuhruf","Duhan","Casiye","Ahkaf","Muhammed","Fetih","Hucurat",
  "Kaf","Zariyat","Tur","Necm","Kamer","Rahman","Vakıa","Hadid","Mücadele","Haşr","Mümtehine","Saff",
  "Cuma","Münafikun","Tegabun","Talak","Tahrim","Mülk","Kalem","Hâkka","Mearic","Nuh","Cin","Müzzemmil","Müddessir",
  "Kıyame","İnsan","Mürselat","Nebe","Naziat","Abese","Tekvir","İnfitar","Mutaffifin","İnşikak","Büruc","Tarık",
  "Ala","Gaşiye","Fecr","Beled","Şems","Leyl","Duha","İnşirah","Tin","Alak","Kadir","Beyyine","Zilzal","Adiyat",
  "Karia","Tekasür","Asr","Hümeze","Fil","Kureyş","Maun","Kevser","Kafirun","Nasr","Tebbet","İhlas","Felak","Nas"
];

sureler.forEach((s, index) => {
  const opt = document.createElement("option"); 
  opt.value = s;
  
  if(index === 0){
    opt.textContent = s; // ilk seçenek numarasız
  } else {
    opt.textContent = index + ". " + s; // diğerleri numaralı
  }

  // Burada CSS için class ekle
  opt.classList.add("sure-option");

  sureSelect.appendChild(opt);
});

sureSelect.value = "Tüm Kur'an";

sureSelect.addEventListener("change", () => {
  console.log("Seçilen sure:", sureSelect.value);
});

sureSelect.value = "Tüm Kur'an";

sureSelect.addEventListener("change", () => {
  console.log("Seçilen sure:", sureSelect.value);


});
//sayfa acıldığunda arama
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const resultsContainer = document.getElementById("results");
  const sakla = document.getElementById("sakla");
  const yazi = document.getElementById("loading");

  // Başta opaklığı düşür
  resultsContainer.style.opacity = "0";
  sakla.style.opacity = "0";
  yazi.style.opacity ="0";
  [resultsContainer, sakla].forEach(el => {
    el.style.transition = "opacity 1s";
  });

  // inputa "a" yaz
  searchInput.value = "a";

  // Butona tıkla (mevcut click event çalışacak)
  searchBtn.click();
  searchInput.value = "";

  // DOM'a yeni result-item eklendiğinde fade-in uygula
  const observer = new MutationObserver(() => {
    document.querySelectorAll(".result-item").forEach(el => {
      el.style.transition = "opacity 1s";
      el.style.opacity = "1";
    });
    resultsContainer.style.opacity = "1";
    sakla.style.opacity = "1";
    yazi.style.opacity="1";
  });

  observer.observe(resultsContainer, { childList: true, subtree: true });
});




function hideResults() {
    const wrapper = document.querySelector('.scroll-wrapper');
    wrapper.style.maxHeight = '0';
    wrapper.style.padding = '0 8px';
}

function hideResults() {
    const wrapper = document.querySelector('.scroll-wrapper');
    
    wrapper.style.maxHeight = '0';
    wrapper.style.padding = '0 8px';}


 const loading = document.getElementById("loading");

searchBtn.addEventListener("click", () => {
  const term = searchInput.value.trim();
  if (!term) return;

  // "Aranıyor..." ve ikon göster
  loading.style.display = "block";
  resultsContainer.innerHTML = "";

  setTimeout(() => {
    aramaYap(term); // mevcut arama fonksiyonun
    loading.style.display = "none"; // sonuç geldikten sonra gizle
  }, 1000);
});

  /* === VERİ (örnek) ===
     Burada senin sağladığın sureBilgileri ve tumAyetler tutuluyor.
     Gerçek verini buraya koyabilirsin.
  */


  /* === DOM referansları === */
  const resultsContainer = document.getElementById("results");
  const searchInput = document.getElementById("searchInput");
  const kapatBtn = document.getElementById("kapatBtn");
  const paylasBtn = document.getElementById("paylasBtn");
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const randomBtn = document.getElementById("randomBtn");
  const baslik = document.getElementById("baslik");
  const aracizgi = document.getElementById("aracizgi");
  const arabtn = document.getElementById("searchBtn");
  const surelerliste = document.getElementById("surelerliste")

  /* durum değişkenleri */
  let highlightedIndex = null;           // arama-listesinde seçili index (null ise seçili yok)
  let currentDisplayedAyetler = [];      // şu anda results'ta gösterilen ayetler (array)
  let seciliAyet = null;                 // tıklanmış ve seçilmiş ayet objesi (kopyalamada kullanılacak)

  /* temizlik fonksiyonu */
  function temizleSonuclari() {
    resultsContainer.innerHTML = "";
    currentDisplayedAyetler = [];
    highlightedIndex = null;
    seciliAyet = null;
  }

  /* sonuçları listeleme (hiçbir şey varsayılan olarak seçili gelmez) */
  function listeleAyetler(ayetler) {
    temizleSonuclari();
    if (!ayetler || ayetler.length === 0) {
      resultsContainer.innerHTML = "<p class='sonucbulunmadı'>Sonuç bulunamadı.</p>";
      return;
    }
    currentDisplayedAyetler = ayetler.slice(); // kopyasını sakla

    let html = "";
    ayetler.forEach((ayet, i) => {
      html += `
        <div class="result-item" data-index="${i}">
          <div class="sure-ayet">${ayet.sure_adi} ${ayet.ayet_no}.Ayet</div>
          <div class="ayet-arabic">${ayet.text}</div>
          <div class="ayet-turkce">${ayet.translation}</div>
        </div>
      `;
    });
    resultsContainer.innerHTML = html;

    // Başta hiçbir şey seçili değil, butonlar gizli
    highlightedIndex = null;
    seciliAyet = null;
    kapatBtn.style.display = "none";
    paylasBtn.style.display = "none";
    resultsContainer.classList.remove("fokus-var");
    themeToggle.style.display = "flex";

    aktiflestirSonucEventleri();
  }

  /* arama fonksiyonu */
function aramaYap(kelime) {
  if (!kelime || !kelime.trim()) {
    temizleSonuclari();
    return;
  }
  const k = kelime.trim().toLowerCase();
  const secilenSure = document.getElementById("sureSec").value.toLowerCase();

  // 🔹 Özel: "Bakara 255" gibi format
  const parts = k.split(" ");
  if (parts.length === 2) {
    const sureAdi = parts[0];
    const ayetNo = parseInt(parts[1]);
    if (!isNaN(ayetNo)) {
      const bulunan = tumAyetler.filter(ayet =>
        ayet.sure_adi.toLowerCase() === sureAdi &&
        ayet.ayet_no === ayetNo
      );
      if (bulunan.length > 0) {
        listeleAyetler(bulunan);
        return;
      }
    }
  }

  // 🔹 Sure seçimine göre filtrele
  let filtrelenmis = tumAyetler;
  if (secilenSure !== "tüm kur'an") {
    filtrelenmis = filtrelenmis.filter(a => a.sure_adi.toLowerCase() === secilenSure);
  }

  // 🔹 Kelime araması
  const bulunanlar = filtrelenmis.filter(ayet =>
    (ayet.text || "").toLowerCase().includes(k) ||
    (ayet.translation || "").toLowerCase().includes(k) ||
    (ayet.transliteration || "").toLowerCase().includes(k)
  );

  listeleAyetler(bulunanlar);
}


const favFokusBtn = document.createElement("button");
favFokusBtn.id = "favFokusBtn";
favFokusBtn.className = "fav-btn-fokus";
favFokusBtn.style.display = "none";
favFokusBtn.textContent = "⭐ Favori Ekle";
document.body.appendChild(favFokusBtn);



favorilerBtn.onclick = () => {
  const favAyetler = JSON.parse(localStorage.getItem("favoriAyetler") || "[]");
  
  if(favAyetler.length === 0){
    resultsContainer.innerHTML = "<p class='sonucbulunmadı'>Favori yok.</p>";
    currentDisplayedAyetler = [];
    highlightedIndex = null;
    seciliAyet = null;
    kapatBtn.style.display = "none";
    paylasBtn.style.display = "none";
    favFokusBtn.style.display = "none";
    resultsContainer.classList.remove("fokus-var");
    themeToggle.style.display = "flex";
    return;
  }

  const bulunanAyetler = tumAyetler.filter(ayet => favAyetler.includes(ayet.translation));
  listeleAyetler(bulunanAyetler);
};


  /* sonuç öğelerine tıklama olaylarını aktif et */
function aktiflestirSonucEventleri() {
  const resultItems = document.querySelectorAll(".result-item");
  resultItems.forEach((item) => {
    item.onclick = null;
    item.addEventListener("click", () => {
      const prev = document.querySelector(".result-item.highlighted");
      if (prev) prev.classList.remove("highlighted");

      item.classList.add("highlighted");
      highlightedIndex = parseInt(item.dataset.index, 10);
      seciliAyet = currentDisplayedAyetler[highlightedIndex] || null;

      resultsContainer.classList.add("fokus-var");
      item.scrollIntoView({ behavior: "smooth", block: "center" });

      // Arama çubuğu, randomBtn, başlık vs yarı saydam
      searchInput.style.opacity = "0.1";
      searchInput.style.pointerEvents = "none";
      surelerliste.style.opacity = "0.1";
      surelerliste.style.pointerEvents = "none";
      arabtn.style.opacity = "0.1";
      arabtn.style.pointerEvents = "none";
      randomBtn.style.opacity = "0.1";
      randomBtn.style.pointerEvents = "none";
      baslik.style.opacity = "0.1";
      baslik.style.pointerEvents = "none";
      aracizgi.style.opacity = "0.1";
      aracizgi.style.pointerEvents = "none";
      themeToggle.style.opacity = "0.1";
      themeToggle.style.pointerEvents = "none";
      favorilerBtn.style.opacity = "0.1";
      favorilerBtn.style.pointerEvents = "none";

      const all = Array.from(resultItems);
      all.forEach((itm) => {
        if (itm !== item) {
          itm.style.pointerEvents = "none";
          itm.style.userSelect = "none";
        } else {
          itm.style.pointerEvents = "";
          itm.style.userSelect = "";
        }
      });

      kapatBtn.style.display = "block";
      paylasBtn.style.display = "inline-block"
      favFokusBtn.style.display = "inline-block"

      const rect = item.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      paylasBtn.style.top = (rect.bottom + scrollTop + 6) + "px";
      paylasBtn.style.left = "40%";
      favFokusBtn.style.top = (rect.bottom + scrollTop + 6) + "px";
      favFokusBtn.style.left = "60%";
      // Favori butonunu göster
      favFokusBtn.style.display = "inline-block";
      favFokusBtn.style.top = (rect.bottom + scrollTop + 6) + "px";
      favFokusBtn.style.left = "calc(50% + 80px)";
      // Favori butonu durumu güncelle
      const favAyetler = JSON.parse(localStorage.getItem("favoriAyetler") || "[]");
favFokusBtn.textContent = favAyetler.includes(seciliAyet.translation) ? "⭐ Favoriden Çıkar" : "⭐ Favori Ekle";

favFokusBtn.onclick = () => {
    if (!seciliAyet) return;
    let favAyetler = JSON.parse(localStorage.getItem("favoriAyetler") || "[]");
    if (favAyetler.includes(seciliAyet.translation)) {
        favAyetler = favAyetler.filter(t => t !== seciliAyet.translation);
        favFokusBtn.textContent = "⭐ Favori Ekle";
    } else {
        favAyetler.push(seciliAyet.translation);
        favFokusBtn.textContent = "⭐ Favoriden Çıkar";
    }
    localStorage.setItem("favoriAyetler", JSON.stringify(favAyetler));
};

      // Kapat butonuna basınca favori butonu gizlensin
      kapatBtn.onclick = () => {
        const old = document.querySelector(".result-item.highlighted");
        if (old) old.classList.remove("highlighted");

        highlightedIndex = null;
        resultsContainer.classList.remove("fokus-var");

        all.forEach((itm) => {
          itm.style.pointerEvents = "";
          itm.style.userSelect = "";
        });

        kapatBtn.style.display = "none";
        paylasBtn.style.display = "none";
        favFokusBtn.style.display = "none";
        favorilerBtn.style.opacity = "1";
        favorilerBtn.style.pointerEvents = "auto";
        searchInput.style.opacity = "1";
        searchInput.style.pointerEvents = "auto";
        arabtn.style.opacity = "1";
        arabtn.style.pointerEvents = "auto";
        randomBtn.style.opacity = "1";
        randomBtn.style.pointerEvents = "auto";
        themeToggle.style.opacity = "1";
        themeToggle.style.pointerEvents = "auto";
        baslik.style.opacity = "1";
        baslik.style.pointerEvents = "auto";
        aracizgi.style.opacity = "1";
        aracizgi.style.pointerEvents = "auto";
        surelerliste.style.opacity = "1";
        surelerliste.style.pointerEvents = "auto";
      };
    });
  });
}




  /* Kapat butonu - seçimi kaldır */
  kapatBtn.addEventListener("click", () => {
    const prev = document.querySelector(".result-item.highlighted");
    if (prev) prev.classList.remove("highlighted");
    highlightedIndex = null;
    seciliAyet = null;
    resultsContainer.classList.remove("fokus-var");

    document.querySelectorAll(".result-item").forEach((itm) => {
      itm.style.pointerEvents = "";
      itm.style.userSelect = "";
    });

    kapatBtn.style.display = "none";
    paylasBtn.style.display = "none";
    themeToggle.style.display = "flex";
  });

  /* Escape ile kapatma */
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && highlightedIndex !== null) {
      kapatBtn.click();
      searchInput.focus();
    }
  });

  /* Kopyala butonu - her zaman seciliAyet'e bakar */
  paylasBtn.addEventListener("click", () => {
    if (!seciliAyet) return; // hiçbir şey seçili değilse çık
    const ayet = seciliAyet;
    const kopyalanacakMetin = `${ayet.sure_adi} ${ayet.ayet_no}. Ayet\n${ayet.text}\n\n${ayet.translation}`;

    navigator.clipboard.writeText(kopyalanacakMetin).then(() => {
      const old = paylasBtn.textContent;
      paylasBtn.textContent = "Kopyalandı!";
      setTimeout(() => {
        paylasBtn.textContent = old || "Kopyala";
      }, 1500);
    }).catch(() => {
      alert("Kopyalama işlemi başarısız oldu.");
    });
  });

  /* input event */
  /* input dan direk arama butonsuz
  searchInput.addEventListener("input", (e) => {
    aramaYap(e.target.value);
  });
*/
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
