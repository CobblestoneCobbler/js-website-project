const slides = document.querySelectorAll(".review-item");
const buttons = document.querySelectorAll(".slide-ctrl-container button");

const reviews = [
  [1, ipsum, "ava-1.jpg", "John Doe", "Companies-R-Us.co"],
  [2, ipsum, "ava-1.jpg", "Jane Doe", "Companies-R-Us.co"],
  [5, ipsum, "ava-1.jpg", "Matt Smith", "Companies-R-Us.co"],
  [62, ipsum, "ava-1.jpg", "Mike Loret", "Companies-R-Us.co"],
  [4, ipsum, "ava-1.jpg", "John Johnson", "Companies-R-Us.co"],
];

function setCard(card, i) {
  const text = (card.querySelector(
    ".review-text"
  ).innerHTML = `#${reviews[i][0]} ${reviews[i][1]}`);
  card.querySelector(".avatar img").src = `./assets/images/${reviews[i][2]}`;
  card.querySelector(".name").innerHTML = reviews[i][3];
  card.querySelector(".company").innerHTML = reviews[i][4];
}

// First time setup
let current = Math.floor(Math.random() * reviews.length);
for (const card of slides) {
  current = (current + 1) % reviews.length;
  setCard(card, current);
}
current = (current + reviews.length - 2) % reviews.length;

buttons[0].addEventListener("click", () => {
  const active = document.querySelector(".review-item.active");
  const previous = document.querySelector(".review-item.previous");
  const nextCard = document.querySelector(".review-item.next");
  const hidden = document.querySelector(".review-item.hidden");
  current = (current + reviews.length - 1) % reviews.length;
  setCard(hidden, (current + reviews.length - 1) % reviews.length);
  console.log(current);
  previous.className = "review-item hidden";
  active.className = "review-item previous";
  nextCard.className = "review-item active";
  hidden.className = "review-item next";
});
buttons[1].addEventListener("click", () => {
  const active = document.querySelector(".review-item.active");
  const previous = document.querySelector(".review-item.previous");
  const nextCard = document.querySelector(".review-item.next");
  const hidden = document.querySelector(".review-item.hidden");
  current = (current + 1) % reviews.length;
  setCard(hidden, (current + 1) % reviews.length);
  console.log(current);
  nextCard.className = "review-item hidden";
  active.className = "review-item next";
  previous.className = "review-item active";
  hidden.className = "review-item previous";
});
