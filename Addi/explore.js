document.addEventListener("DOMContentLoaded", () => {
    const cityFilter = document.getElementById("cityFilter");
    const genreCheckboxes = document.querySelectorAll(".genre-filter input[type='checkbox']");
    const instrumentCheckboxes = document.querySelectorAll(".instrument-filter input[type='checkbox']");
    const cardsContainer = document.getElementById("musicianCards");
  
    // Зареждане на музикантите от localStorage
    function loadMusicians() {
      const musicians = JSON.parse(localStorage.getItem("musicians")) || [];
      return musicians;
    }
  
    // Запис в localStorage за любими
    function toggleFavorite(musician) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const index = favorites.findIndex(fav => fav.name === musician.name && fav.city === musician.city);
      if (index >= 0) {
        favorites.splice(index, 1);
      } else {
        favorites.push(musician);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  
    // Създаване на една карта за музикант
    function createCard(musician) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${musician.name}</h3>
        <p><strong>City:</strong> ${musician.city}</p>
        <p><strong>Genre:</strong> ${musician.genre}</p>
        <p><strong>Instrument:</strong> ${musician.instrument}</p>
        <button class="favorite-btn">❤️ Add to Favorites</button>
      `;
  
      card.querySelector("button").addEventListener("click", () => {
        toggleFavorite(musician);
        alert(`${musician.name} added to favorites!`);
      });
  
      return card;
    }
  
    // Рендериране на всички карти
    function renderMusicians() {
      const selectedCity = cityFilter.value;
      const selectedGenres = Array.from(genreCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
      const selectedInstruments = Array.from(instrumentCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
  
      const musicians = loadMusicians();
  
      const filtered = musicians.filter(musician => {
        const matchCity = !selectedCity || musician.city === selectedCity;
        const matchGenre = selectedGenres.length === 0 || selectedGenres.includes(musician.genre);
        const matchInstrument = selectedInstruments.length === 0 || selectedInstruments.includes(musician.instrument);
        return matchCity && matchGenre && matchInstrument;
      });
  
      cardsContainer.innerHTML = "";
      filtered.forEach(m => {
        const card = createCard(m);
        cardsContainer.appendChild(card);
      });
    }
  
    // Слушатели за филтрите
    cityFilter.addEventListener("change", renderMusicians);
    genreCheckboxes.forEach(cb => cb.addEventListener("change", renderMusicians));
    instrumentCheckboxes.forEach(cb => cb.addEventListener("change", renderMusicians));
  
    // Добавяне на 9 примерни музиканта, ако няма
    function addExampleMusiciansIfNeeded() {
      const existing = JSON.parse(localStorage.getItem('musicians')) || [];
      if (existing.length === 0) {
        const exampleMusicians = [
          { name: "Anna Petrova", city: "Sofia", genre: "Pop", instrument: "Vocal" },
          { name: "Ivan Ivanov", city: "Plovdiv", genre: "Rock", instrument: "Guitar" },
          { name: "Maria Georgieva", city: "Varna", genre: "Classical", instrument: "Piano" },
          { name: "Nikolay Stoyanov", city: "Burgas", genre: "Jazz", instrument: "Saxophone" },
          { name: "Elena Dimitrova", city: "Sofia", genre: "R&B", instrument: "Vocal" },
          { name: "Georgi Hristov", city: "Plovdiv", genre: "Metal", instrument: "Drums" },
          { name: "Kristina Koleva", city: "Varna", genre: "Pop", instrument: "Bass" },
          { name: "Todor Marinov", city: "Burgas", genre: "Blues", instrument: "Acoustic guitar" },
          { name: "Viktoria Angelova", city: "Sofia", genre: "Jazz", instrument: "Piano" }
        ];
        localStorage.setItem('musicians', JSON.stringify(exampleMusicians));
      }
    }
  
    addExampleMusiciansIfNeeded();
    renderMusicians();
  });
  