const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const filterTab = ".filter-link";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisable = "is-visable";

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

const root = document.documentElement;

/* Portfolio Builder 
  title, item, png, h2, p1, p2
*/
const ipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
let portfolioCards = [
  ["Photography Website", "web", "portfolio-1.jpg", "Title", ipsum, ipsum],
  ["Media Website", "web", "portfolio-2.jpg", "Title", ipsum, ipsum],
  ["Merch Website", "web", "portfolio-3.jpg", "Title", ipsum, ipsum],
  ["Teams App", "app", "portfolio-4.jpg", "Title", ipsum, ipsum],
  ["Media Display", "app", "portfolio-5.jpg", "Title", ipsum, ipsum],
  ["Daily Outlook", "ui", "portfolio-6.jpg", "Title", ipsum, ipsum],
  ["VPN", "app", "portfolio-7.jpg", "Title", ipsum, ipsum],
  ["Phone Alert", "ui", "portfolio-8.jpg", "Title", ipsum, ipsum],
];
function deleteModal(modal) {
  setTimeout(() => {
    modal.replaceChildren();
    modal.remove();
  }, 500);
}
const portfolioGrid = document.querySelector(".portfolio-grid");
for (const card of portfolioCards) {
  const fullCard = document.createElement("div");
  const image = document.createElement("img");
  const popup = document.createElement("a");
  const categorey = document.createElement("div");
  const title = document.createElement("h3");

  fullCard.className = "portfolio-card";
  fullCard.setAttribute("data-item", card[1]);
  portfolioGrid.appendChild(fullCard);

  image.src = `./assets/images/${card[2]}`;
  image.alt = "Portfolio Image";
  fullCard.appendChild(image);

  popup.className = "card-popup-box";
  //HREF
  fullCard.appendChild(popup);

  switch (card[1]) {
    case "web": {
      categorey.innerHTML = "Web Development";
    }
    case "app": {
      categorey.innerHTML = "App Development";
    }
    case "ui": {
      categorey.innerHTML = "UI Design";
    }
    default: {
      categorey.innerHTML = "Personal Project";
    }
  }
  popup.appendChild(categorey);

  title.innerHTML = card[0];
  popup.appendChild(title);
  //TODO Add Modal generation, add click event to target data project
  //Modals

  fullCard.addEventListener("click", function () {
    const modal = document.createElement("div");
    const modalDialogue = document.createElement("div");

    const modalHead = document.createElement("header");
    const modalH3 = document.createElement("h3");
    const closer = document.createElement("i");

    const modalBody = document.createElement("div");
    const imgWrap = document.createElement("div");
    const img = document.createElement("img");
    const textWrap = document.createElement("div");

    const modalH2 = document.createElement("h2");
    const modalP1 = document.createElement("p");
    const modalP2 = document.createElement("p");

    modal.className = "modal";
    modal.setAttribute("data-project", card[0]);
    modal.setAttribute("data-animation", "slideInOutTop");

    modalDialogue.className = "modal-dialogue";
    modal.appendChild(modalDialogue);

    modalHead.className = "modal-header";
    modalDialogue.appendChild(modalHead);

    modalH3.innerHTML = card[0];
    modalHead.appendChild(modalH3);

    closer.className = "fa fa-times";
    modalHead.appendChild(closer);

    modalBody.className = "modal-body";
    modalDialogue.appendChild(modalBody);

    imgWrap.className = "img-wrapper";
    modalBody.appendChild(imgWrap);

    img.src = `./assets/images/${card[2]}`;
    img.alt = `Portfolio Image`;
    imgWrap.appendChild(img);

    textWrap.className = "modal-text";

    modalH2.innerHTML = card[3];
    modalP1.innerHTML = card[4];
    modalP2.innerHTML = card[5];
    textWrap.appendChild(modalH2);
    textWrap.appendChild(modalP1);
    textWrap.appendChild(modalP2);

    modalBody.appendChild(textWrap);

    document.querySelector("main").appendChild(modal);
    setTimeout(() => {
      modal.classList.add(isVisable);
    }, 20);
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("is-visable");
        deleteModal(this);
      }
    });
    closer.addEventListener("click", function () {
      modal.classList.remove("is-visable");
      deleteModal(modal);
    });
  });
}

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

/* Portfolio Links */

searchBox.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    }
    //search child element div or h3
    else {
      card.style.display = "none";
    }
  });
});

for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, filterTab);
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* Full site modal  open buttons */
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(this.dataset.open).classList.add(isVisable);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisable);
  });
}

document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    let target = document.querySelector(".is-visable");
    if (target.classList.contains("full-site-modal")) {
      target.classList.remove("is-visable");
    } else if (target.classList.contains("modal")) {
      target.classList.remove("is-visable");
      deleteModal(target);
    }
  }
});
