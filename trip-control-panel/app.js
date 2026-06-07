const TRIP_START = new Date("2026-06-22T00:00:00+08:00");
const TRIP_END = new Date("2026-07-14T23:59:59+08:00");
const NOTION_URL = "https://www.notion.so/2bdd977afa3180a09e4ce5d7d716896c";

const stays = [
  {
    area: "琉森",
    range: "2026-06-23 - 06-26",
    days: ["D2", "D3", "D4"],
    hotel: "Hotel Monopol Luzern",
    status: "已確認",
    query: "Hotel Monopol Luzern"
  },
  {
    area: "格林德瓦",
    range: "2026-06-26 - 07-01",
    days: ["D5", "D6", "D7", "D8", "D9"],
    hotel: "Eiger Guest House - Grindelwald",
    status: "已確認",
    query: "Eiger Guest House Grindelwald"
  },
  {
    area: "蒙特勒",
    range: "2026-07-01 - 07-03",
    days: ["D10", "D11"],
    hotel: "Grand Hotel Suisse Majestic",
    status: "已確認",
    query: "Grand Hotel Suisse Majestic Montreux"
  },
  {
    area: "策馬特",
    range: "2026-07-03 - 07-06",
    days: ["D12", "D13", "D14"],
    hotel: "Ascot Penthouse Matterhorn View",
    status: "已確認",
    query: "Ascot Penthouse 160 m2 Matterhorn View Zermatt"
  },
  {
    area: "沙夫豪森",
    range: "2026-07-06 - 07-07",
    days: ["D15"],
    hotel: "Vienna House by Wyndham zur Bleiche Schaffhausen",
    status: "已確認",
    query: "Vienna House by Wyndham zur Bleiche Schaffhausen"
  },
  {
    area: "LEGOLAND",
    range: "2026-07-07 - 07-09",
    days: ["D16", "D17"],
    hotel: "LEGOLAND Feriendorf",
    status: "已確認",
    query: "LEGOLAND Feriendorf Germany"
  },
  {
    area: "Salzburg",
    range: "2026-07-09 - 07-13",
    days: ["D18", "D19", "D20", "D21"],
    hotel: "Sheraton Grand Salzburg",
    status: "需修正兒童年齡備註",
    query: "Sheraton Grand Salzburg"
  }
];

const dayOps = {
  D1: {
    primary: ["Kaohsiung International Airport", "Hong Kong International Airport", "Zurich Airport"],
    notes: ["護照、登機證、轉機時間", "長程飛行補水與外套"]
  },
  D2: {
    primary: ["Zurich Airport to Hotel Monopol Luzern", "Kapellbrucke Luzern"],
    food: ["Wirtshaus Galliker Luzern", "Bachmann Luzern"],
    notes: ["抵達日先壓低行程密度", "飯店、湖邊、卡貝爾橋即可"]
  },
  D3: {
    primary: ["Luzern to Mt Rigi", "Rigi Kulm"],
    food: ["Restaurant Lok 7 Vitznau", "Luzern dinner near Hotel Monopol"],
    notes: ["船、齒軌火車、纜車順序先查好", "天氣差就降低登頂期待"]
  },
  D4: {
    primary: ["Swiss Museum of Transport Luzern", "Lindt Swiss Chocolate Adventure Luzern"],
    food: ["Restaurant Verkehrshaus Luzern", "Luzern old town dinner"],
    notes: ["室內日，很適合當疲勞緩衝"]
  },
  D5: {
    primary: ["Luzern to Grindelwald", "Eiger Guesthouse Grindelwald"],
    transit: ["Luzern Interlaken Ost Grindelwald train"],
    notes: ["移動日優先保護行李節奏", "到格林德瓦後看天氣決定散步距離"]
  },
  D6: {
    primary: ["Grindelwald First", "Bort Alpine Playground"],
    food: ["Berggasthaus First Grindelwald", "Restaurant Bort Grindelwald"],
    notes: ["First 活動看天氣、排隊、身高", "Bort 遊樂場當主體比較穩"]
  },
  D7: {
    primary: ["Jungfraujoch from Grindelwald Terminal", "Restaurant Crystal Jungfraujoch"],
    transit: ["Grindelwald Terminal Eigergletscher Jungfraujoch"],
    notes: ["票券與座位預約出發前 1-2 天看天氣", "高山日保留慢走與保暖"]
  },
  D8: {
    primary: ["Lauterbrunnen", "Murren Switzerland"],
    food: ["Airtime Cafe Lauterbrunnen", "Hotel Oberland Restaurant Lauterbrunnen"],
    notes: ["瀑布山谷加米倫，依體力裁切", "推車與纜車/火車轉乘先看路線"]
  },
  D9: {
    primary: ["Lake Thun Switzerland", "St Beatus Caves"],
    food: ["Spiez lake restaurant", "Grindelwald easy dinner"],
    notes: ["彈性日，可改格林德瓦慢活", "若前幾天累，就不要硬衝洞穴"]
  },
  D10: {
    primary: ["Interlaken Ost to Montreux GoldenPass Express", "Grand Hotel Suisse Majestic Montreux"],
    transit: ["GoldenPass Express Interlaken Ost Montreux Train 4065 09:07"],
    notes: ["GoldenPass 是座位預約，仍需有效 Swiss Travel Pass", "Wagon 10 Seats 16 / 22 / 23 / 28"]
  },
  D11: {
    primary: ["Chillon Castle", "Montreux lakeside"],
    food: ["Montreux lakeside restaurant", "Confiserie Zurcher Montreux"],
    notes: ["西庸城堡加湖邊慢活即可", "卓別林世界只當雨天加碼"]
  },
  D12: {
    primary: ["Montreux to Zermatt", "Ascot Penthouse Matterhorn View Zermatt"],
    food: ["Restaurant Schaeferstube Zermatt"],
    notes: ["進入無車山城，行李與接駁先確認", "抵達後先把超市與晚餐位置抓好"]
  },
  D13: {
    primary: ["Gornergrat Bahn Zermatt", "Gornergrat"],
    food: ["Chez Vrony Zermatt", "Restaurant Schaeferstube Zermatt"],
    notes: ["天氣好優先 Gornergrat", "黑面羊與山景是親子主軸"]
  },
  D14: {
    primary: ["Sunnegga Zermatt", "Leisee Zermatt"],
    food: ["Findlerhof Zermatt", "Zermatt easy dinner"],
    notes: ["Sunnegga / Leisee 是較輕鬆山景日", "可當前一天高山日後的恢復日"]
  },
  D15: {
    primary: ["Zermatt to Schaffhausen", "Rhine Falls Schloss Laufen"],
    food: ["Gueterhof Schaffhausen", "Restaurant Schloss Laufen am Rheinfall"],
    notes: ["長移動日，萊茵瀑布放下午", "先放行李再去瀑布比較穩"]
  },
  D16: {
    primary: ["Vienna House Schaffhausen to LEGOLAND Feriendorf", "Munot Schaffhausen"],
    transit: ["Vienna House zur Bleiche Schaffhausen to LEGOLAND Feriendorf 10:30"],
    notes: ["D16 包車已完成，出發前確認司機、兒童座椅、pickup 位置", "早上只做老城與 Munot 短散步"]
  },
  D17: {
    primary: ["LEGOLAND Deutschland Resort", "LEGOLAND Feriendorf"],
    food: ["Dschungel Buffet LEGOLAND Feriendorf", "LEGOLAND Germany restaurant"],
    notes: ["含 2 日入園、早餐、Dschungel Buffet、Fastrack Bronze", "全日主題樂園，午休節奏比排滿設施重要"]
  },
  D18: {
    primary: ["LEGOLAND Feriendorf to Sheraton Grand Salzburg", "Mirabell Palace Salzburg"],
    transit: ["LEGOLAND Feriendorf to Sheraton Grand Salzburg private transfer"],
    notes: ["D18 包車仍是重點待辦", "抵達 Salzburg 後用 Mirabell / 河邊 / 老城暖身"]
  },
  D19: {
    primary: ["Sheraton Grand Salzburg to Koenigssee", "St Bartholomae Koenigssee"],
    food: ["Cafe Malerwinkel Koenigssee", "Restaurant Echostueberl Koenigssee"],
    notes: ["晴天主行程，船到 St. Bartholomae 即可", "Salet / Obersee 只當體力與天氣加碼"]
  },
  D20: {
    primary: ["Hellbrunn Trick Fountains", "Salzburg Zoo"],
    food: ["Baerenwirt Salzburg", "Stiegl-Keller Salzburg", "Sternbraeu Salzburg"],
    notes: ["親子慢活日，噴泉比博物館更直覺", "可視天氣加入 Haus der Natur"]
  },
  D21: {
    primary: ["Hohensalzburg Fortress", "Salzburg Altstadt"],
    food: ["Cafe Tomaselli Salzburg", "St Peter Stiftskulinarium Salzburg"],
    notes: ["城堡與市區收尾，不進 Munich 市區", "退稅與整理行李可以提前做"]
  },
  D22: {
    primary: ["Sheraton Grand Salzburg to Munich Airport", "Munich Airport Terminal 1"],
    transit: ["Sheraton Grand Salzburg to Munich Airport private transfer"],
    notes: ["D22 包車是回程航班安全關鍵", "13:55 起飛，抵達機場時間要保守"]
  },
  D23: {
    primary: ["Kaohsiung International Airport"],
    notes: ["回家整理票券、照片、旅行記憶", "把需要報帳或保固的單據集中"]
  }
};

const actionItems = [
  { done: false, title: "預訂 D22 Salzburg → Munich Airport 包車", body: "直接影響回程航班安全，優先度最高。" },
  { done: false, title: "預訂 D18 LEGOLAND → Salzburg 包車", body: "跨國移動日，建議保守安排 pickup 與兒童座椅。" },
  { done: true, title: "D16 Schaffhausen → LEGOLAND 包車", body: "10:30 Vienna House 上車，直達 LEGOLAND Feriendorf reception。" },
  { done: false, title: "修正 Booking.com 兒童年齡", body: "Sheraton Salzburg 備註需修正為實際生日。" },
  { done: false, title: "預訂 Zermatt 與重點城市餐廳", body: "Restaurant Schaeferstube、Chez Vrony、Galliker、Gueterhof、Salzburg 晚餐。" },
  { done: false, title: "D7 少女峰票券與座位", body: "天氣型票券，出發前 1-2 天再決定。" },
  { done: false, title: "eSIM / 旅平險 / 離線票券", body: "出發前把票券、保單、護照備份放進離線可取用位置。" }
];

const state = {
  days: [],
  selectedDay: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

async function init() {
  const response = await fetch("../content/travel_journal_content.json");
  const data = await response.json();
  state.days = data.days;
  state.selectedDay = getCurrentTripDay() ?? state.days[0];

  bindTabs();
  bindSearch();
  bindDialog();
  bindDaySwitcher();
  renderAll();
}

function getCurrentTripDay() {
  const now = new Date();
  if (now < TRIP_START) return null;
  if (now > TRIP_END) return state.days.at(-1);
  const dayIndex = Math.floor((now - TRIP_START) / 86400000);
  return state.days[Math.min(dayIndex, state.days.length - 1)];
}

function renderAll() {
  renderSpotlight(state.selectedDay);
  renderTodayActions(state.selectedDay);
  renderTodayNotes(state.selectedDay);
  renderDaySwitcher();
  renderDays();
  renderStays();
  renderActions();
}

function bindTabs() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.view;
      $$(".tab").forEach((item) => item.classList.toggle("is-active", item === tab));
      $$(".view").forEach((item) => item.classList.toggle("is-active", item.id === `view-${view}`));
    });
  });

  $$("[data-open-view]").forEach((control) => {
    control.addEventListener("click", () => {
      const view = control.dataset.openView;
      setActiveTab(view);
      if (view === "days") {
        requestAnimationFrame(() => {
          const current = document.querySelector(`[data-day-code="${state.selectedDay.code}"]`);
          current?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    });
  });
}

function bindSearch() {
  $("#day-filter").addEventListener("input", renderDays);
}

function bindDialog() {
  $("#close-dialog").addEventListener("click", () => $("#day-dialog").close());
  $("#day-dialog").addEventListener("click", (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const inDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inDialog) event.currentTarget.close();
  });
}

function bindDaySwitcher() {
  $("#today-select").addEventListener("change", (event) => {
    selectDay(event.target.value);
  });

  $("#prev-day").addEventListener("click", () => {
    moveSelectedDay(-1);
  });

  $("#next-day").addEventListener("click", () => {
    moveSelectedDay(1);
  });
}

function setActiveTab(view) {
  $$(".tab").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  $$(".view").forEach((item) => item.classList.toggle("is-active", item.id === `view-${view}`));
}

function renderSpotlight(day) {
  $("#spotlight").innerHTML = `
    <article class="spotlight-card">
      <div>
        <div class="day-meta">
          <span class="chip accent">${day.code}</span>
          <span class="chip">${day.date}</span>
          <span class="chip">${escapeHtml(stayForDay(day.code)?.area ?? day.place)}</span>
        </div>
        <h3>${escapeHtml(day.title)}</h3>
        <p>${escapeHtml(day.focus)}</p>
      </div>
      <div class="day-icon" aria-hidden="true">${day.icon ?? "□"}</div>
    </article>
  `;
}

function renderDaySwitcher() {
  const select = $("#today-select");
  select.innerHTML = state.days
    .map((day) => `<option value="${day.code}">${day.code} · ${day.date} · ${escapeHtml(day.title)}</option>`)
    .join("");
  select.value = state.selectedDay.code;

  const index = selectedDayIndex();
  $("#prev-day").disabled = index <= 0;
  $("#next-day").disabled = index >= state.days.length - 1;
}

function selectDay(code) {
  const day = state.days.find((item) => item.code === code);
  if (!day) return;
  state.selectedDay = day;
  renderSpotlight(day);
  renderTodayActions(day);
  renderTodayNotes(day);
  renderDaySwitcher();
}

function moveSelectedDay(delta) {
  const nextIndex = selectedDayIndex() + delta;
  const next = state.days[nextIndex];
  if (next) selectDay(next.code);
}

function selectedDayIndex() {
  return state.days.findIndex((day) => day.code === state.selectedDay.code);
}

function renderTodayActions(day) {
  const ops = dayOps[day.code] ?? {};
  const targets = [
    ...(ops.primary ?? []),
    ...(ops.transit ?? []),
    ...(ops.food ?? []).slice(0, 1)
  ].slice(0, 5);
  $("#today-actions").innerHTML = targets
    .map((target, index) => actionLink(index === 0 ? "primary" : "", target))
    .join("");
}

function renderTodayNotes(day) {
  const ops = dayOps[day.code] ?? {};
  const hotel = stayForDay(day.code);
  const notes = [
    ...(ops.notes ?? []),
    hotel ? `住宿：${hotel.hotel}` : "",
    day.route
  ].filter(Boolean);
  $("#today-notes").innerHTML = notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("");
}

function renderDays() {
  const q = $("#day-filter").value.trim().toLowerCase();
  const filtered = state.days.filter((day) => {
    const ops = dayOps[day.code] ?? {};
    const haystack = [
      day.code,
      day.date,
      day.title,
      day.place,
      day.route,
      day.focus,
      ...(ops.primary ?? []),
      ...(ops.food ?? [])
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  $("#day-list").innerHTML = filtered.length
    ? filtered.map(dayCard).join("")
    : `<div class="empty-state">沒有找到符合的日程</div>`;

  $$(".day-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      openDay(card.dataset.dayCode);
    });
  });
  $$(".copy-button").forEach((button) => {
    button.addEventListener("click", () => copyText(button.dataset.copy));
  });
}

function dayCard(day) {
  const ops = dayOps[day.code] ?? {};
  const primary = ops.primary?.[0] ?? day.place;
  const hotel = stayForDay(day.code);
  return `
    <article class="day-card" data-day-code="${day.code}">
      <div class="day-card-top">
        <span class="day-code">${day.code}</span>
        <span class="day-icon" aria-hidden="true">${day.icon ?? "□"}</span>
      </div>
      <div>
        <div class="day-meta">
          <span class="chip">${day.date}</span>
          ${hotel ? `<span class="chip accent">${escapeHtml(hotel.area)}</span>` : ""}
        </div>
        <h3>${escapeHtml(day.title)}</h3>
        <p>${escapeHtml(day.route)}</p>
      </div>
      <div class="button-row">
        ${actionLink("primary", primary, "地圖")}
        <button class="link-button copy-button" type="button" data-copy="${escapeAttr(primary)}">複製</button>
        <button class="link-button" type="button" onclick="openDay('${day.code}')">更多</button>
      </div>
    </article>
  `;
}

function renderStays() {
  $("#stay-list").innerHTML = stays
    .map(
      (stay) => `
        <article class="stay-card">
          <div>
            <p class="eyebrow">${stay.range}</p>
            <h3>${escapeHtml(stay.area)} · ${escapeHtml(stay.hotel)}</h3>
            <p>${escapeHtml(stay.status)}</p>
            <div class="stay-days">
              ${stay.days.map((day) => `<span class="chip">${day}</span>`).join("")}
            </div>
          </div>
          <div class="button-row">
            ${actionLink("primary", stay.query, "地圖")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderActions() {
  $("#action-board").innerHTML = actionItems
    .map(
      (item) => `
        <article class="todo-card ${item.done ? "done" : ""}">
          <span class="todo-dot"></span>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function openDay(code) {
  const day = state.days.find((item) => item.code === code);
  if (!day) return;
  const ops = dayOps[code] ?? {};
  const hotel = stayForDay(code);
  $("#dialog-code").textContent = `${day.code} · ${day.date}`;
  $("#dialog-title").textContent = day.title;
  $("#dialog-body").innerHTML = `
    <section class="dialog-section">
      <div class="day-meta">
        <span class="chip accent">${escapeHtml(day.place)}</span>
        ${hotel ? `<span class="chip">${escapeHtml(hotel.hotel)}</span>` : ""}
      </div>
      <p>${escapeHtml(day.focus)}</p>
    </section>
    ${dialogLinks("地圖", ops.primary ?? [day.place])}
    ${dialogLinks("交通", ops.transit ?? [day.route])}
    ${dialogLinks("吃飯 / 咖啡", ops.food ?? [])}
    <section class="dialog-section">
      <h3>孩子任務</h3>
      <ol class="task-list">
        ${day.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}
      </ol>
    </section>
    <section class="dialog-section">
      <h3>備忘</h3>
      <div class="note-stack">
        ${(ops.notes ?? []).map((note) => `<p>${escapeHtml(note)}</p>`).join("")}
        <p>${escapeHtml(day.spotlight)}</p>
      </div>
    </section>
    <section class="dialog-section">
      <div class="button-row">
        <a class="link-button primary" href="${NOTION_URL}" target="_blank" rel="noreferrer">Notion</a>
        <button class="link-button copy-button" type="button" data-copy="${escapeAttr(day.route)}">複製路線</button>
      </div>
    </section>
  `;
  $$("#dialog-body .copy-button").forEach((button) => {
    button.addEventListener("click", () => copyText(button.dataset.copy));
  });
  $("#day-dialog").showModal();
}

function dialogLinks(title, targets) {
  const validTargets = targets.filter(Boolean);
  if (!validTargets.length) return "";
  return `
    <section class="dialog-section">
      <h3>${title}</h3>
      <div class="button-row">
        ${validTargets.map((target, index) => actionLink(index === 0 ? "primary" : "", target)).join("")}
      </div>
    </section>
  `;
}

function actionLink(extraClass, target, label = target) {
  return `
    <a class="link-button ${extraClass}" href="${mapsSearchUrl(target)}" target="_blank" rel="noreferrer">
      <span>⌖</span>
      ${escapeHtml(label)}
    </a>
  `;
}

function stayForDay(code) {
  return stays.find((stay) => stay.days.includes(code));
}

function mapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("已複製");
  } catch {
    showToast("複製失敗");
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1400);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `<main class="shell"><div class="empty-state">行程資料載入失敗</div></main>`;
});
