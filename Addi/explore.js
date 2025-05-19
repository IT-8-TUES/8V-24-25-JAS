// Get DOM elements
const searchInput = document.getElementById('searchInput');
const cityFilter = document.getElementById('cityFilter');
const styleFilter = document.getElementById('styleFilter');
const musicianList = document.getElementById('musicianList');

// Example musician data
const musicians = [
  { name: "John Doe", city: "Sofia", style: "Rock" },
  { name: "Anna Smith", city: "Plovdiv", style: "Jazz" },
  { name: "Lily Music", city: "Varna", style: "Classical" },
  { name: "Max Popov", city: "Sofia", style: "Pop" },
  { name: "Raya Jazz", city: "Burgas", style: "Jazz" },
  { name: "Nina Star", city: "Plovdiv", style: "Pop" },
  { name: "Kamen Beats", city: "Sofia", style: "Rock" },
];

// Utility to get selected values from multi-select
function getSelectedValues(selectElement) {
  return Array.from(selectElement.selectedOptions).map(option => option.value);
}

// Render list of musicians
function displayMusicians(filtered) {
  musicianList.innerHTML = "";

  if (filtered.length === 0) {
    musicianList.innerHTML = "<p>No musicians found.</p>";
    return;
  }

  filtered.forEach(musician => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${musician.name}</h2>
      <p><strong>City:</strong> ${musician.city}</p>
      <p><strong>Style:</strong> ${musician.style}</p>
    `;
    musicianList.appendChild(card);
  });
}

// Filter logic
function filterMusicians() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCities = getSelectedValues(cityFilter);
  const selectedStyles = getSelectedValues(styleFilter);

  const filtered = musicians.filter(musician => {
    const matchesSearch = musician.name.toLowerCase().includes(searchTerm);
    const matchesCity = selectedCities.length === 0 || selectedCities.includes(musician.city);
    const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(musician.style);

    return matchesSearch && matchesCity && matchesStyle;
  });

  displayMusicians(filtered);
}

// Event listeners
searchInput.addEventListener("input", filterMusicians);
cityFilter.addEventListener("change", filterMusicians);
styleFilter.addEventListener("change", filterMusicians);

// Initial display
displayMusicians(musicians);
