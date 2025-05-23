document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");
  const noFavoritesMsg = document.getElementById("no-favorites");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    noFavoritesMsg.style.display = "block";
    return;
  } else {
    noFavoritesMsg.style.display = "none";
  }

  favorites.forEach(musician => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-content">
        <h3>${musician.name}</h3>
        <p><strong>City:</strong> ${musician.city}</p>
        <p><strong>Genre:</strong> ${musician.genre}</p>
        <p><strong>Instument:</strong> ${musician.instrument}</p>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      favorites = favorites.filter(fav => fav.name !== musician.name);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      card.remove();

      if (favorites.length === 0) {
        noFavoritesMsg.style.display = "block";
      }
    });

    favoritesContainer.appendChild(card);
  });
});
