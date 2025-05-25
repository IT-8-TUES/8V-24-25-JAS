const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();


  if (!name || !email || !phone) {
    alert('Please fill in the required fields');
    return;
  }

  let musicians = JSON.parse(localStorage.getItem('musicians')) || [];

  musicians.push({ name, email, phone });

  localStorage.setItem('musicians', JSON.stringify(musicians));

  alert('Musician added successfully!');

  form.reset();
});


