// ตารางออกกำลังกายประจำวัน
const WORKOUT_DATA = {
    1: {
        title: "MONDAY: UPPER A",
        short: "Upper A",
        subtitle: "V-Shape Mass & Shoulder Cannon (เน้นปีกกว้าง + ไหล่ปูด)",
        exercises: [
            { id: "m1", name: "1. Wide Pull-ups (ดึงข้อกว้าง)", info: "5 เซต // หน่วงลงช้าๆ 3 วินาที", sets: 5 },
            { id: "m2", name: "2. PPPU (วิดพื้นโน้มตัว)", info: "4 เซต x 12-15 ครั้ง (เน้นไหล่หน้า/อก)", sets: 4 },
            { id: "m3", name: "3. DB Lateral Raise (ดัมเบล 5kg)", info: "4 เซต x 15 ครั้ง (ค้างบน 1 วิ)", sets: 4 },
            { id: "m4", name: "4. DB Overhead Press", info: "4 เซต x 12 ครั้ง (ทำต่อจากท่าระเบิดไหล่)", sets: 4 },
            { id: "m5", name: "5. Chin-ups (ดึงข้อหงายมือ)", info: "4 เซต x Max (เค้นปีกส่วนล่าง/Biceps)", sets: 4 }
        ]
    },
    2: {
        title: "TUESDAY: LOWER & CORE",
        short: "Lower & Core",
        subtitle: "Explosive Athletic & Core Blaster (ขาแน่น + รีดพุง)",
        exercises: [
            { id: "t1", name: "1. Jump Squats", info: "4 เซต x 15-20 ครั้ง (ออกแรงระเบิดกล้ามขา)", sets: 4 },
            { id: "t2", name: "2. DB Walking Lunges (ดัมเบล 5kg)", info: "4 เซต x ข้างละ 15 ก้าว", sets: 4 },
            { id: "t3", name: "3. Hanging Leg Raises (โหนบาร์ยกขา)", info: "4 เซต x 12-15 ครั้ง (ห้ามเหวี่ยง)", sets: 4 },
            { id: "t4", name: "4. Plank / Hollow Body Hold", info: "3 เซต x 45 วินาที (เกร็งท้องแน่นๆ)", sets: 3 }
        ]
    },
    3: {
        title: "WEDNESDAY: REST & RECOVERY",
        short: "Rest",
        subtitle: "พักผ่อนเต็มที่เพื่อซ่อมแซมกล้ามเนื้อ",
        isRest: true
    },
    4: {
        title: "THURSDAY: UPPER B",
        short: "Upper B",
        subtitle: "Chest Thickness & Arm Burnout (อกหนา + แขนเส้นเลือดปูด)",
        exercises: [
            { id: "th1", name: "1. Decline Push-ups (เท้าพาดเก้าอี้)", info: "4 เซต x 15-20 ครั้ง (เน้นอกบน)", sets: 4 },
            { id: "th2", name: "2. Floor Barbell Press (บาร์เบล 10kg)", info: "4 เซต x 20 ครั้ง (เค้นอกชิด)", sets: 4 },
            { id: "th3", name: "3. DB Lateral Drop Set", info: "4 เซต x เล่นจนหมดแรงทั้งดัมเบลและตัวเปล่า", sets: 4 },
            { id: "th4", name: "4. DB Bicep Curls (ดัมเบล 5kg)", info: "4 เซต x 12-15 ครั้ง (ลงหน่วงช้าๆ)", sets: 4 }
        ]
    },
    5: {
        title: "FRIDAY: ATHLETIC CONDITIONING",
        short: "Conditioning",
        subtitle: "High-Intensity Shred (กระตุ้นระบบเผาผลาญนักกรีฑา)",
        exercises: [
            { id: "f1", name: "1. กระโดดเชือกต่อเนื่อง", info: "1 เซต x 20 นาที (ยาวๆ รวดเดียวจบ)", sets: 1 },
            { id: "f2", name: "2. Burpees", info: "4 เซต x 15 ครั้ง", sets: 4 },
            { id: "f3", name: "3. Hollow Body Hold", info: "4 เซต x 45 วินาที", sets: 4 }
        ]
    },
    6: {
        title: "SATURDAY: REST & RECOVERY",
        short: "Rest",
        subtitle: "พักผ่อนเต็มที่ อัดโปรตีน ยืดเหยียดกล้ามเนื้อ",
        isRest: true
    },
    0: {
        title: "SUNDAY: REST & RECOVERY",
        short: "Rest",
        subtitle: "เตรียมพร้อมสำหรับการเริ่มรอบซ้อมใหม่",
        isRest: true
    }
};

const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const DAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const STORAGE_KEY = "cyber_workout_progress";

const ICONS = {
    check: '<svg class="set-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"/></svg>',
    water: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3.5 4.4 6 7.4 6 10.5a6 6 0 0 1-12 0C6 10.4 8.5 7.4 12 3z"/></svg>',
    protein: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
};

let selectedDay = new Date().getDay();
let userProgress = loadProgress();
let resetArmed = false;
let resetTimer = null;

const els = {};

document.addEventListener("DOMContentLoaded", initApp);

/* ---------- storage ---------- */

function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (err) {
        return {};
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch (err) {
        /* storage unavailable: progress lasts for this session only */
    }
}

/* ---------- helpers ---------- */

function countDone(ex) {
    const list = userProgress[ex.id] || [];
    return list.filter(n => n >= 1 && n <= ex.sets).length;
}

function dayStats(day) {
    const data = WORKOUT_DATA[day];
    if (data.isRest) return { done: 0, total: 0 };
    let done = 0;
    let total = 0;
    data.exercises.forEach(ex => {
        total += ex.sets;
        done += countDone(ex);
    });
    return { done, total };
}

function sessionName(day) {
    return WORKOUT_DATA[day].title.split(":")[1].trim();
}

function parseExercise(ex) {
    const clean = ex.name.replace(/^\d+\.\s*/, "");
    const m = clean.match(/^(.*?)\s*\((.*)\)\s*$/);
    return m ? { main: m[1], hint: m[2] } : { main: clean, hint: "" };
}

function nextTrainingDay(from) {
    for (let i = 1; i <= 7; i++) {
        const d = (from + i) % 7;
        if (!WORKOUT_DATA[d].isRest) return d;
    }
    return from;
}

/* ---------- init ---------- */

function initApp() {
    els.nav = document.getElementById("day-nav");
    els.head = document.getElementById("day-head");
    els.container = document.getElementById("workout-container");
    els.readout = document.querySelector(".readout");
    els.label = document.getElementById("readout-label");
    els.percent = document.getElementById("progress-percent");
    els.segments = document.getElementById("segments");
    els.meta = document.getElementById("progress-meta");
    els.resetBtn = document.getElementById("reset-day-btn");
    els.resetLabel = document.getElementById("reset-label");
    els.goBtn = document.getElementById("auto-day-btn");

    updateDateDisplay();
    buildNav();

    els.nav.addEventListener("click", e => {
        const btn = e.target.closest(".day");
        if (!btn) return;
        selectedDay = parseInt(btn.dataset.day, 10);
        render();
    });

    els.container.addEventListener("click", e => {
        const setBtn = e.target.closest(".set");
        if (setBtn) {
            toggleSet(setBtn.dataset.ex, parseInt(setBtn.dataset.set, 10));
            return;
        }
        const jump = e.target.closest("[data-jump]");
        if (jump) {
            selectedDay = parseInt(jump.dataset.jump, 10);
            render();
        }
    });

    els.resetBtn.addEventListener("click", onResetClick);
    els.goBtn.addEventListener("click", () => {
        selectedDay = new Date().getDay();
        render();
    });

    render();
}

function updateDateDisplay() {
    const today = new Date();
    document.getElementById("today-name").textContent = dayNames[today.getDay()];
    document.getElementById("current-date-str").textContent =
        today.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
}

/* ---------- rendering ---------- */

function render() {
    disarmReset();
    syncNav();
    renderHead();
    renderWorkout();
    renderReadout();
}

function buildNav() {
    els.nav.innerHTML = DAY_ORDER.map(d => {
        const data = WORKOUT_DATA[d];
        return `
            <button type="button" class="day${data.isRest ? " is-rest" : ""}" data-day="${d}">
                <span class="day-abbr">${DAY_ABBR[d]}</span>
                <span class="day-name">${data.short}<span class="tag">TODAY</span></span>
                <span class="day-meter" aria-hidden="true"><i></i></span>
            </button>`;
    }).join("");
}

function syncNav() {
    const today = new Date().getDay();
    els.nav.querySelectorAll(".day").forEach(btn => {
        const d = parseInt(btn.dataset.day, 10);
        const { done, total } = dayStats(d);
        const meter = btn.querySelector(".day-meter");

        btn.setAttribute("aria-current", d === selectedDay ? "true" : "false");
        btn.classList.toggle("is-today", d === today);
        btn.setAttribute("aria-label", `${dayNames[d]} ${WORKOUT_DATA[d].short}` + (total ? ` ${done}/${total}` : ""));

        meter.style.setProperty("--p", total ? `${(done / total) * 100}%` : "0%");
        meter.classList.toggle("full", total > 0 && done === total);
    });
}

function renderHead() {
    const data = WORKOUT_DATA[selectedDay];
    els.head.innerHTML = `
        <h2 class="day-title">
            <span class="day-title-weekday">${dayNames[selectedDay]}</span>
            <span class="day-title-session">${sessionName(selectedDay)}</span>
        </h2>
        <p class="day-sub">${data.subtitle}</p>
    `;
}

function renderWorkout() {
    const data = WORKOUT_DATA[selectedDay];
    els.resetBtn.disabled = !!data.isRest;

    if (data.isRest) {
        const next = nextTrainingDay(selectedDay);
        els.container.innerHTML = `
            <article class="rest panel">
                <ul>
                    <li class="rest-item"><span class="rest-ico">${ICONS.water}</span>ดื่มน้ำ 2.5 - 3 ลิตร</li>
                    <li class="rest-item"><span class="rest-ico">${ICONS.protein}</span>อัดโปรตีนซ่อมแซมกล้ามเนื้อ</li>
                </ul>
                <button type="button" class="next" data-jump="${next}">
                    <span class="next-label">ซ้อมครั้งต่อไป</span>
                    <span class="next-name">${dayNames[next]} / ${WORKOUT_DATA[next].short}</span>
                    ${ICONS.chevron}
                </button>
            </article>`;
        return;
    }

    els.container.innerHTML = data.exercises.map((ex, i) => exerciseHTML(ex, i)).join("");
}

function exerciseHTML(ex, index) {
    const { main, hint } = parseExercise(ex);
    const done = countDone(ex);
    const marked = userProgress[ex.id] || [];
    const wide = ex.sets === 1;

    let sets = "";
    for (let n = 1; n <= ex.sets; n++) {
        const on = marked.includes(n);
        sets += `
            <button type="button" class="set${on ? " done" : ""}${wide ? " set--wide" : ""}"
                    data-ex="${ex.id}" data-set="${n}" aria-pressed="${on}"
                    aria-label="${main} เซต ${n}">
                <span class="set-num">${wide ? "ทำครบแล้ว" : n}</span>${ICONS.check}
            </button>`;
    }

    return `
        <article class="ex panel${done === ex.sets ? " is-complete" : ""}" id="card-${ex.id}">
            <div class="ex-idx" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
            <div class="ex-body">
                <h3 class="ex-name">${main}</h3>
                ${hint ? `<p class="ex-th">${hint}</p>` : ""}
                <p class="ex-info">${ex.info}</p>
            </div>
            <div class="ex-count"><b>${done}</b>/${ex.sets}</div>
            <div class="set-row">${sets}</div>
        </article>`;
}

function renderReadout() {
    const { done, total } = dayStats(selectedDay);
    const rest = total === 0;
    const pct = rest ? 0 : Math.round((done / total) * 100);

    els.readout.classList.toggle("is-rest", rest);
    els.readout.classList.toggle("is-clear", !rest && pct === 100);
    els.label.textContent = `PROGRESS // ${dayNames[selectedDay]}`;
    els.percent.textContent = rest ? "REST" : pct;

    els.segments.innerHTML = rest
        ? ""
        : Array.from({ length: total }, (_, i) => `<i class="${i < done ? "on" : ""}"></i>`).join("");

    if (rest) {
        els.meta.textContent = "วันพัก ไม่มีเซตที่ต้องทำ";
    } else if (pct === 100) {
        els.meta.textContent = `ครบทุกเซตแล้ว (${done} / ${total})`;
    } else {
        els.meta.textContent = `${done} / ${total} เซต`;
    }
}

/* ---------- actions ---------- */

function findExercise(exId) {
    return WORKOUT_DATA[selectedDay].exercises.find(ex => ex.id === exId);
}

function toggleSet(exId, setNum) {
    const ex = findExercise(exId);
    if (!ex) return;

    if (!userProgress[exId]) userProgress[exId] = [];
    const idx = userProgress[exId].indexOf(setNum);
    if (idx > -1) {
        userProgress[exId].splice(idx, 1);
    } else {
        userProgress[exId].push(setNum);
    }
    saveProgress();

    // update in place so keyboard focus stays on the button just pressed
    syncCard(ex);
    syncNav();
    renderReadout();
}

function syncCard(ex) {
    const card = document.getElementById(`card-${ex.id}`);
    if (!card) return;
    const done = countDone(ex);
    const marked = userProgress[ex.id] || [];

    card.classList.toggle("is-complete", done === ex.sets);
    card.querySelector(".ex-count b").textContent = done;
    card.querySelectorAll(".set").forEach(btn => {
        const on = marked.includes(parseInt(btn.dataset.set, 10));
        btn.classList.toggle("done", on);
        btn.setAttribute("aria-pressed", on);
    });
}

function onResetClick() {
    const data = WORKOUT_DATA[selectedDay];
    if (data.isRest || !data.exercises) return;

    if (!resetArmed) {
        resetArmed = true;
        els.resetBtn.classList.add("armed");
        els.resetLabel.textContent = "CONFIRM RESET";
        resetTimer = setTimeout(disarmReset, 3000);
        return;
    }

    disarmReset();
    data.exercises.forEach(ex => delete userProgress[ex.id]);
    saveProgress();
    renderWorkout();
    syncNav();
    renderReadout();
}

function disarmReset() {
    clearTimeout(resetTimer);
    resetArmed = false;
    els.resetBtn.classList.remove("armed");
    els.resetLabel.textContent = "RESET DAY";
}