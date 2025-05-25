const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = 'var(--off-white)';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = 'var(--chocolate)';
  });
});
