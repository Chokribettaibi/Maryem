// script.js
// Petites interactions : validation du formulaire et message de confirmation
document.addEventListener('DOMContentLoaded', function(){
  // Année dans le footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Dark mode / theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme){
    if(theme === 'dark'){
      root.classList.add('dark');
      if(themeToggle) themeToggle.textContent = '☀️';
      if(themeToggle) themeToggle.setAttribute('aria-label','Activer le thème clair');
    } else {
      root.classList.remove('dark');
      if(themeToggle) themeToggle.textContent = '🌙';
      if(themeToggle) themeToggle.setAttribute('aria-label','Activer le thème sombre');
    }
  }

  function getPreferredTheme(){
    const stored = localStorage.getItem('site-theme');
    if(stored) return stored;
    // respect system preference
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      return 'dark';
    }
    return 'light';
  }

  // initialize
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      const current = root.classList.contains('dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('site-theme', next);
    });
  }

  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      formMessage.textContent = '';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if(!name || !email || !message){
        formMessage.style.color = 'crimson';
        formMessage.textContent = 'Veuillez remplir tous les champs obligatoires.';
        return;
      }

      // simple validation d'email
      if(!/^\S+@\S+\.\S+$/.test(email)){
        formMessage.style.color = 'crimson';
        formMessage.textContent = 'Adresse email invalide.';
        return;
      }

      // Simuler envoi (ici on ne fait pas d'appel réseau)
      formMessage.style.color = 'green';
      formMessage.textContent = 'Merci ! Votre message a été envoyé. Maryem vous répondra bientôt.';

      // Réinitialiser le formulaire après un court délai
      setTimeout(()=>{
        form.reset();
      },1200);
    });
  }

  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(ev){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        ev.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })
});
