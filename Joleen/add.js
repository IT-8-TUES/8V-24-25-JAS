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
<input type="file" id="photo" accept="image/*" />
<img id="preview" src="#" alt="Preview" style="display:none; max-width: 200px;"/>

<script>
  const photoInput = document.getElementById('photo');
  const preview = document.getElementById('preview');

  photoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function() {
        preview.setAttribute('src', this.result);
        preview.style.display = 'block';
      });

      reader.readAsDataURL(file);
    } else {
      preview.style.display = 'none';
    }
  });
</script>


