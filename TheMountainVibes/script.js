// ─── UTILS & UI ───
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav-right");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ─── GLOBAL SEARCH ───
const navSearchInput = document.querySelector(".nav-search input");
if (navSearchInput) {
  const searchContainer = document.querySelector(".nav-search");
  
  // Inject results dropdown
  const resultsDropdown = document.createElement("div");
  resultsDropdown.className = "search-dropdown";
  searchContainer.appendChild(resultsDropdown);

  navSearchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    resultsDropdown.innerHTML = "";
    
    if (!query) {
      resultsDropdown.classList.remove("show");
      return;
    }

    // Filter TREKS data
    const matches = Object.entries(TREKS).filter(([key, t]) => {
      return t.title.toLowerCase().includes(query) || t.region.toLowerCase().includes(query);
    });

    if (matches.length > 0) {
      matches.slice(0, 5).forEach(([key, t]) => {
        const item = document.createElement("div");
        item.className = "search-item";
        item.innerHTML = `
          <img src="${getImgUrl(t.img)}" alt="${t.title}" class="search-item-img">
          <div class="search-item-info">
            <div class="search-item-title">${t.title}</div>
            <div class="search-item-region">${t.region.split(',')[0]}</div>
          </div>
        `;
        item.addEventListener("click", () => {
          window.location.href = `view-trek.html?trek=${key}`;
        });
        resultsDropdown.appendChild(item);
      });
    } else {
      resultsDropdown.innerHTML = `<div class="search-item-no-results">No treks found for "${query}"</div>`;
    }
    
    resultsDropdown.classList.add("show");
  });

  // Keep existing Enter key behavior
  navSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = navSearchInput.value.trim();
      if (!query) return;

      const mainSearch = document.getElementById("trekSearch");
      if (mainSearch && typeof filterTreks === "function") {
        mainSearch.value = query;
        filterTreks();
        resultsDropdown.classList.remove("show");
      } else {
        window.location.href = `trek.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      resultsDropdown.classList.remove("show");
    }
  });
}

// ─── HERO SLIDER ───
const heroSlides = [
  {
    title: "The mountains are calling,<br>and you <em>must go</em>.",
    sub: 'Don\'t just dream about the Himalayas—live them. Experience the thrill of the climb and the peace of the peak with the most trusted name in the mountains. <a href="https://api.whatsapp.com/send?phone=919557711495&text=Hi!%20I\'m%20interested%20in%20becoming%20a%20Trek%20Ambassador%20for%20The%20Mountain%20Vibes." style="color:#ffd740;font-weight:700">Answer the call</a>.'
  },
  {
    title: "The trail doesn't just show<br>you the world. It shows you <em>yourself</em>.",
    sub: 'Leave the noise behind. Find your rhythm, find your people, and find a version of you that only exists above the clouds. Start your journey with <a href="https://api.whatsapp.com/send?phone=919557711495&text=Hi!%20I\'m%20interested%20in%20becoming%20a%20Trek%20Ambassador%20for%20The%20Mountain%20Vibes." style="color:#ffd740;font-weight:700">us</a>.',
  },
  {
    title: "If not now, when?<br>If not you, <em>who else</em>?",
    sub: 'The trail doesn\'t care about your age, your job, or your fears. It only cares that you show up. So show up—and let the Himalayas do the rest. <a href="https://api.whatsapp.com/send?phone=919557711495&text=Hi!%20I\'m%20interested%20in%20becoming%20a%20Trek%20Ambassador%20for%20The%20Mountain%20Vibes." style="color:#ffd740;font-weight:700">Claim your trek</a>.',
  },
];
let hs = 0;

function changeHeroSlide(d) {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  slides.forEach((s) => s.classList.remove("active"));
  hs = (hs + d + heroSlides.length) % heroSlides.length;
  slides[hs].classList.add("active");

  const title = document.getElementById("heroTitle");
  const sub = document.getElementById("heroSubtitle");
  if (title) title.innerHTML = heroSlides[hs].title;
  if (sub) sub.innerHTML = heroSlides[hs].sub;

  buildHeroDots();
}

function buildHeroDots() {
  const el = document.getElementById("heroDots");
  if (!el) return;

  el.innerHTML = "";
  heroSlides.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "hdot" + (i === hs ? " active" : "");
    d.onclick = () => {
      hs = i - 1;
      changeHeroSlide(1);
    };
    el.appendChild(d);
  });
}
if (document.getElementById("heroDots")) {
  buildHeroDots();
  setInterval(() => changeHeroSlide(1), 6000);
}

// ─── TREK CARDS SLIDER ───
let currentTranslate = 0;

function getCardWidth() {
  const slider = document.getElementById("treksSlider");
  if (!slider) return 0;
  const cards = slider.querySelectorAll(".trek-card");
  if (!cards.length) return 0;
  const card = cards[0];
  const style = window.getComputedStyle(slider);
  const gap = parseInt(style.gap) || 20;
  return card.offsetWidth + gap;
}

function getMaxTranslate() {
  const slider = document.getElementById("treksSlider");
  if (!slider) return 0;
  const totalWidth = slider.scrollWidth;
  const visibleWidth = slider.parentElement.offsetWidth;
  return Math.max(0, totalWidth - visibleWidth);
}

function slideTreks(direction) {
  const slider = document.getElementById("treksSlider");
  if (!slider) return;
  const moveAmount = getCardWidth();
  const maxTranslate = getMaxTranslate();

  currentTranslate += direction * moveAmount;
  currentTranslate = Math.max(0, Math.min(currentTranslate, maxTranslate));

  slider.style.transform = `translateX(-${currentTranslate}px)`;
  slider.style.transition = "transform 0.4s ease";
}

// Reset slider on resize to prevent positioning issues
window.addEventListener('resize', () => {
  currentTranslate = 0;
  const slider = document.getElementById("treksSlider");
  if (slider) {
    slider.style.transform = `translateX(0)`;
    slider.style.transition = "none";
  }
});

// ─── UI COMPONENTS ───
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains("open");
  
  // Close all other items in the same group
  const group = item.parentElement;
  group.querySelectorAll(".faq-item").forEach((i) => {
    if (i !== item) i.classList.remove("open");
  });
  
  item.classList.toggle("open");
}

function toggleItin(btn) {
  const item = btn.closest(".itin-day");
  const isOpen = item.classList.contains("open");

  // Optional: Close other days when one is opened (Accordion effect)
  const group = item.parentElement;
  group.querySelectorAll(".itin-day").forEach((i) => {
    if (i !== item) i.classList.remove("open");
  });

  item.classList.toggle("open");
}

function switchFaqTab(id, btn) {
  document.querySelectorAll(".faq-tab").forEach((b) => b.classList.remove("active"));
  document.querySelectorAll(".faq-group").forEach((g) => g.classList.remove("active"));
  
  btn.classList.add("active");
  const group = document.getElementById("faq-" + id);
  if (group) group.classList.add("active");
}

function setFTab(btn) {
  document
    .querySelectorAll(".ftab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  if (typeof filterTreks === "function") filterTreks();
}

function setTrustTab(id, btn) {
  document
    .querySelectorAll(".tr-tab")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".trust-panel")
    .forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  const panel = document.getElementById("tp-" + id);
  if (panel) panel.classList.add("active");
}

// ─── LIGHTBOX ───
let currentLbIdx = 0;
const lbImages = [];

function updateLbImages() {
  const imgs = document.querySelectorAll('.mosaic-item img');
  lbImages.length = 0;
  imgs.forEach(img => lbImages.push(img.src));
}

function openLB2(src) {
  updateLbImages();
  const lb = document.getElementById("lb");
  const lbImg = document.getElementById("lbImg");
  if (lb && lbImg) {
    lbImg.src = src;
    currentLbIdx = lbImages.indexOf(src);
    lb.classList.add("open");
  }
}

function closeLB() {
  const lb = document.getElementById("lb");
  if (lb) lb.classList.remove("open");
}

const lb = document.getElementById("lb");
if (lb) {
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains('lb-close')) {
      closeLB();
    }
  });
}

// LB Nav
document.querySelector('.lb-prev')?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentLbIdx = (currentLbIdx - 1 + lbImages.length) % lbImages.length;
  document.getElementById('lbImg').src = lbImages[currentLbIdx];
});

document.querySelector('.lb-next')?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentLbIdx = (currentLbIdx + 1) % lbImages.length;
  document.getElementById('lbImg').src = lbImages[currentLbIdx];
});

// ─── TOAST ───
let tt;
function showToast(msg) {
  clearTimeout(tt);
  const toastMsg = document.getElementById("toastMsg");
  const toast = document.getElementById("toast");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add("show");
  tt = setTimeout(() => toast.classList.remove("show"), 3500);
}

// ─── REVEAL ───
function triggerReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.remove("active");
    obs.observe(el);
  });
}
triggerReveal();

// ─── CUSTOM CURSOR ───
if (window.matchMedia("(pointer: fine)").matches) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  // cursor.innerText = 'Explore';
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 30 + 'px';
    cursor.style.top = e.clientY - 30 + 'px';
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.mosaic-item')) {
      cursor.classList.add('visible', 'hovering');
    } else {
      cursor.classList.remove('visible', 'hovering');
    }
  });
}

// ─── NAVIGATION ───
function showPage(n) {
  const page = document.getElementById("page-" + n);
  if (!page) return;

  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  page.classList.add("active");
  window.scrollTo(0, 0);
  setTimeout(triggerReveal, 80);
  closeMega();

  const ds = document.getElementById("departSticky");
  if (ds) {
    if (n !== "trek") ds.classList.remove("show");
    else ds.classList.add("show");
  }
}

// ─── CAMP ENROLLMENT ───
const enrollForm = document.getElementById("enrollForm");
if (enrollForm) {
  enrollForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("regBtn");
    const thankYou = document.getElementById("thankYouMsg");
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = "Registering...";

    try {
      const response = await fetch(enrollForm.action, {
        method: "POST",
        body: new FormData(enrollForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        enrollForm.style.display = "none";
        thankYou.style.display = "block";
        showToast("✅ Registration successful!");
      } else {
        const data = await response.json();
        showToast("⚠️ Error: " + (data.errors ? data.errors[0].message : "Something went wrong."));
        btn.disabled = false;
        btn.textContent = originalText;
      }
    } catch (err) {
      showToast("⚠️ Network error. Please try again later.");
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}

function enrollProgram(prog) {
  const sel = document.getElementById("regProgram");
  if (sel) sel.value = prog;

  const enrollSec = document.getElementById("enroll");
  if (enrollSec) {
    enrollSec.scrollIntoView({ behavior: "smooth" });
  }
}

function redirectToRental(id, name, price) {
  const url = `booking.html?type=rental&id=${id}&name=${encodeURIComponent(name)}&price=${price}`;
  window.location.href = url;
}

/**
 * Handles private trip inquiry redirection to WhatsApp
 * @param {FormData} formData 
 */
function handlePrivateInquiry(formData) {
  const name = formData.get("fullName");
  const email = formData.get("email");
  const dates = formData.get("dates");
  const details = formData.get("details") || "No additional details provided.";

  const message = `*NEW PRIVATE INQUIRY* 🏔️\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Dates:* ${dates}\n` +
    `*Dream Trip:* ${details}\n\n` +
    `_Generated via The Mountain Vibes_`;

  const WHATSAPP_NUMBER = "919557711495";
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

  window.open(waUrl, "_blank");
}

