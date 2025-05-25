document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const rating = document.getElementById("rating");
  const comment = document.getElementById("comment");
  const reviewsList = document.getElementById("reviews-list");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    reviewItem.innerHTML = `
      <strong>Rating:</strong> ${"⭐".repeat(Number(rating.value))}<br>
      <strong>Comment:</strong> ${comment.value}
    `;

    reviewsList.prepend(reviewItem);

    form.reset();
    form.classList.remove("active"); // премахваме цвета след изпращане
  });

  // 🌸 Активира pastel pink фон при избор/фокус
  function activateForm() {
    form.classList.add("active");
  }

  function deactivateForm() {
    if (!rating.value && !comment.value.trim()) {
      form.classList.remove("active");
    }
  }

  rating.addEventListener("change", activateForm);
  comment.addEventListener("focus", activateForm);
  comment.addEventListener("blur", deactivateForm);
});
