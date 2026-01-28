// SCRIPT.JS

// Loader
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "flex";
}, 3200);

// Countdown
const target = new Date("February 14, 2026 00:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  daysEl.innerHTML = d;
  hoursEl.innerHTML = h;
  minutesEl.innerHTML = m;
  secondsEl.innerHTML = s;
}, 1000);

// No button escape
const noBtn = document.getElementById("no");
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 50);
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// Yes hearts
const yesBtn = document.getElementById("yes");
yesBtn.addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
});
