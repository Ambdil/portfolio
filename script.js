/* ==== CYBER STREAM minimal, confiné à #home ==== */
(function(){
  const home   = document.getElementById('home');
  const canvas = document.getElementById('cyberRain');
  if (!home || !canvas) return;
  const ctx = canvas.getContext('2d');

  const messages = [
    "🔒 Utilisez des mots de passe forts et uniques",
    "⚠️ Ne cliquez jamais sur un lien suspect",
    "📡 Activez l’authentification à deux facteurs",
    "💾 Sauvegardez régulièrement vos données",
    "🧠 La cybersécurité, c’est l’affaire de tous",
    "🛑 Verrouillez votre poste avant de partir",
    "🧩 Mettez à jour vos logiciels de sécurité",
    "📱 Ne partagez pas d’informations sensibles en ligne",
    "🚨 Signalez toute activité suspecte à votre RSSI"
  ];

  const fontSize = 18;
  const baseSpeed = 0.6;

  let cssW = 0, cssH = 0, dpr = 1, lines = [];

  function resize(){
    dpr = window.devicePixelRatio || 1;
    const rect = home.getBoundingClientRect();
    cssW = Math.max(1, Math.round(rect.width));
    cssH = Math.max(1, Math.round(rect.height));
    canvas.style.width  = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width  = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    buildLines();
  }

  function buildLines(){
    const count = 8, spacing = cssH / count;
    lines = [];
    for (let i = 0; i < count; i++){
      lines.push({
        text: messages[Math.floor(Math.random()*messages.length)],
        x: Math.random() * cssW,
        y: i * spacing + Math.min(50, spacing * .5),
        speed: baseSpeed + Math.random() * 0.6
      });
    }
  }

  function tick(){
    ctx.clearRect(0,0,cssW,cssH);
    const grad = ctx.createLinearGradient(0,0,cssW,0);
    grad.addColorStop(0,'#00bcd4');
    grad.addColorStop(1,'#00eaff');
    ctx.fillStyle = grad;
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (const line of lines){
      ctx.fillText(line.text, line.x, line.y);
      line.x -= line.speed;
      const w = ctx.measureText(line.text).width;
      if (line.x < -w){
        line.x = cssW + Math.random()*200;
        line.text = messages[Math.floor(Math.random()*messages.length)];
      }
    }
    requestAnimationFrame(tick);
  }

  resize();
  if ('ResizeObserver' in window){
    new ResizeObserver(resize).observe(home);
  } else {
    window.addEventListener('resize', resize);
  }
  requestAnimationFrame(tick);
})();


/* ========== EFFET REVEAL AU SCROLL (sections + cartes) ========== */
const reveals = document.querySelectorAll(
  '.reveal, #skills .card, .timeline .exp, .timeline-edu .edu-card'
);

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;

    // On ajoute la classe visible une seule fois
    if (boxTop < triggerBottom) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ========== IMPULSION CYBER SUR LA TIMELINE (FORMATION) ========== */
const timelineEdu = document.querySelector('.timeline-edu');

function activateTimelineGlow() {
  if (!timelineEdu) return;
  const rect = timelineEdu.getBoundingClientRect();
  const triggerBottom = window.innerHeight * 0.8;

  if (rect.top < triggerBottom && rect.bottom > 0) {
    timelineEdu.classList.add('active');
  }
}

window.addEventListener('scroll', activateTimelineGlow);
window.addEventListener('load', activateTimelineGlow);


/* ========== MESSAGE DE CONFIRMATION FORMULAIRE (FormSubmit) ========== */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    formStatus.textContent = "⏳ Envoi en cours...";
    formStatus.classList.add("visible");
    formStatus.style.color = "#00eaff";

    setTimeout(() => {
      formStatus.textContent = "✅ Merci, votre message a bien été envoyé !";
    }, 1500);
  });
}




