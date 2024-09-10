
gsap.from('.hero-text', {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: 'power2.out' 
});


anime({
  targets: '.skill-list li',
  translateX: [
    {value: -100, duration: 1000, easing: 'easeInOutExpo'},
    {value: 0, duration: 500, easing: 'easeInOutExpo'}
  ],
  delay: anime.stagger(100, {grid: [5, 1], from: 'center'})
});