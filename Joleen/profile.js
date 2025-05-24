document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const rating = document.getElementById("rating");
  const comment = document.getElementById("comment");
  const reviewsList = document.getElementById("reviews-list");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Създай нов елемент за ревю
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    reviewItem.innerHTML = `
      <strong>Rating:</strong> ${"⭐".repeat(Number(rating.value))}<br>
      <strong>Comment:</strong> ${comment.value}
    `;

    // Добави го най-отпред в списъка
    reviewsList.prepend(reviewItem);

    // Изчисти формата
    form.reset();
  });
});
