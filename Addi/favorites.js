// Dummy data (same IDs used in explore.js)
const musicians = [
    {
      id: 1,
      name: "Lily Harmony",
      city: "Sofia",
      genre: "Jazz",
      image: "images/musicians/lily.jpg"
    },
    {
      id: 2,
      name: "Victor Strings",
      city: "Plovdiv",
      genre: "Rock",
      image: "images/musicians/victor.jpg"
    },
    {
      id: 3,
      name: "Maya Beats",
      city: "Varna",
      genre: "Electronic",
      image: "images/musicians/maya.jpg"
    }
  ];
  
  function loadFavorites() {
    const favoritesContainer = document.getElementById("favorites-container");
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (favoriteIds.length === 0) {
      favoritesContainer.innerHTML = "<p>You haven't added any favorites yet.</p>";
      return;
    }
  
    const favoriteMusicians = musicians.filter(musician =>
      favoriteIds.includes(musician.id)
    );
  
    favoritesContainer.innerHTML = "";
    favoriteMusicians.forEach(musician => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `
        <img src="${musician.image}" alt="${musician.name}">
        <h3>${musician.name}</h3>
        <p><strong>City:</strong> ${musician.city}</p>
        <p><strong>Genre:</strong> ${musician.genre}</p>
        <button class="remove-btn" onclick="removeFromFavorites(${musician.id})">Remove</button>
      `;
  
      favoritesContainer.appendChild(card);
    });
  }
  
  function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(favId => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
  
  loadFavorites();
  