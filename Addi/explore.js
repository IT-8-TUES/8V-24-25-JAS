// Примерни музиканти (можеш да добавиш още)
const musicians = [
    {
      id: 1,
      name: "Anna Ivanova",
      city: "Sofia",
      genres: ["Pop", "Jazz"],
      instruments: ["Vocal", "Piano"],
    },
    {
      id: 2,
      name: "Georgi Petrov",
      city: "Plovdiv",
      genres: ["Rock", "Metal"],
      instruments: ["Guitar", "Vocal"],
    },
    {
      id: 3,
      name: "Elena Georgieva",
      city: "Varna",
      genres: ["Classical"],
      instruments: ["Piano"],
    },
    {
      id: 4,
      name: "Martin Dimitrov",
      city: "Burgas",
      genres: ["R&B", "Blues"],
      instruments: ["Drums"],
    },
    {
      id: 5,
      name: "Viktoria Koleva",
      city: "Sofia",
      genres: ["Jazz", "Blues"],
      instruments: ["Saxophone", "Vocal"],
    }
  ];
  
  // DOM елементи
  const cityFilter = document.getElementById('cityFilter');
  const genreFilters = document.querySelectorAll('.genre-filter input');
  const instrumentFilters = document.querySelectorAll('.instrument-filter input');
  const cardsContainer = document.getElementById('musicianCards');
  
  // Зареждане на началния изглед
  window.addEventListener('DOMContentLoaded', () => {
    renderMusicians(musicians);
    addFilterListeners();
  });
  
  // Добавяне на слушатели към филтрите
  function addFilterListeners() {
    cityFilter.addEventListener('change', filterMusicians);
    genreFilters.forEach(cb => cb.addEventListener('change', filterMusicians));
    instrumentFilters.forEach(cb => cb.addEventListener('change', filterMusicians));
  }
  
  // Извличане на избраните стойности от филтрите
  function getSelectedFilters() {
    const selectedCity = cityFilter.value;
    const selectedGenres = Array.from(genreFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  
    const selectedInstruments = Array.from(instrumentFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  
    return { selectedCity, selectedGenres, selectedInstruments };
  }
  
  // Филтриране на музикантите според избраните стойности
  function filterMusicians() {
    const { selectedCity, selectedGenres, selectedInstruments } = getSelectedFilters();
  
    const filtered = musicians.filter(m => {
      const matchCity = selectedCity === '' || m.city === selectedCity;
      const matchGenres = selectedGenres.length === 0 || selectedGenres.some(g => m.genres.includes(g));
      const matchInstruments = selectedInstruments.length === 0 || selectedInstruments.some(i => m.instruments.includes(i));
  
      return matchCity && matchGenres && matchInstruments;
    });
  
    renderMusicians(filtered);
  }
  
  // Генериране на картите
  function renderMusicians(data) {
    cardsContainer.innerHTML = '';
  
    if (data.length === 0) {
      cardsContainer.innerHTML = '<p>No musicians found.</p>';
      return;
    }
  
    data.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';
  
      const isFavorite = getFavorites().includes(m.id);
  
      card.innerHTML = `
        <h3>${m.name}</h3>
        <p><strong>City:</strong> ${m.city}</p>
        <p><strong>Genres:</strong> ${m.genres.join(', ')}</p>
        <p><strong>Instruments:</strong> ${m.instruments.join(', ')}</p>
        <div class="favorite-btn" data-id="${m.id}" title="Add to favorites">
          ${isFavorite ? '❤️' : '🤍'}
        </div>
      `;
  
      card.querySelector('.favorite-btn').addEventListener('click', toggleFavorite);
      cardsContainer.appendChild(card);
    });
  }
  
  // Работа с localStorage – favorites
  function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  function toggleFavorite(event) {
    const id = Number(event.currentTarget.getAttribute('data-id'));
    let favorites = getFavorites();
  
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
  
    localStorage.setItem('favorites', JSON.stringify(favorites));
    filterMusicians(); // Пререндиране, за да се покаже иконата правилно
  }
  