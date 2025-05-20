const allMusicians = [
    { name: "Ivan", city: "Sofia", genres: ["Rock", "Pop"] },
    { name: "Maria", city: "Plovdiv", genres: ["Jazz"] },
    { name: "Georgi", city: "Varna", genres: ["Classical", "Jazz"] },
    { name: "Elena", city: "Sofia", genres: ["Pop"] }
  ];
  
  const container = document.getElementById("favoritesContainer");
  
  function loadFavorites() {
    const favNames = JSON.parse(localStorage.getItem("favorites")) || [];
    const favMusicians = allMusicians.filter(m => favNames.includes(m.name));
  
    container.innerHTML = "";
  
    if (favMusicians.length === 0) {
      container.innerHTML = "<p>No favorites yet.</p>";
      return;
    }
  
    favMusicians.forEach(m => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${m.name}</h3>
        <p>${m.city}</p>
        <p>${m.genres.join(", ")}</p>
        <span class="remove-btn" onclick="removeFavorite('${m.name}')">🗑️ Remove</span>
      `;
      container.appendChild(card);
    });
  }
  
  function removeFavorite(name) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    favs = favs.filter(n => n !== name);
    localStorage.setItem("favorites", JSON.stringify(favs));
    loadFavorites();
  }
  
  window.onload = loadFavorites;
  