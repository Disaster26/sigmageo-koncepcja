(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  function zamknij(){n.classList.remove('otw');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');}
  b.addEventListener('click',function(){var o=n.classList.toggle('otw');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  n.addEventListener('click',function(e){if(e.target.closest('a'))zamknij();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  var rok=document.getElementById('rok'); if(rok) rok.textContent=new Date().getFullYear();

  // dolny pasek na telefonie dopiero po przewinieciu za przycisk w hero
  var mob=document.getElementById('mob'),cta=document.getElementById('hero-cta'),kontakt=document.getElementById('kontakt');
  if('IntersectionObserver' in window&&mob&&cta){
    var zaCta=false,wKontakcie=false;
    function ustaw(){var w=zaCta&&!wKontakcie;mob.classList.toggle('widac',w);mob.setAttribute('aria-hidden',w?'false':'true');mob.querySelectorAll('a').forEach(function(a){a.tabIndex=w?0:-1;});}
    new IntersectionObserver(function(e){zaCta=!e[0].isIntersecting&&e[0].boundingClientRect.top<0;ustaw();}).observe(cta);
    new IntersectionObserver(function(e){wKontakcie=e[0].isIntersecting;ustaw();},{rootMargin:'0px 0px -40% 0px'}).observe(kontakt);
  }

  // aktywna pozycja menu
  var linki=[].slice.call(n.querySelectorAll('a')),sek=linki.map(function(a){return document.querySelector(a.getAttribute('href'));});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=sek.indexOf(e.target);linki.forEach(function(a,j){a.classList.toggle('akt',i===j);if(i===j)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}});},{rootMargin:'-45% 0px -50% 0px'});
    sek.forEach(function(s){if(s)io.observe(s);});
  }

  // formularz pokazowy
  var f=document.getElementById('form'),info=document.getElementById('f-info');
  f.addEventListener('submit',function(e){e.preventDefault();info.hidden=false;});
})();
