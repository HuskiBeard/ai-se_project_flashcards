import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".deck__list");
const newDeckButton = document.querySelector(".deck__newimage-btn");
const homeSection = document.querySelector("#home");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector("#main-content");
const carouselSection = document.querySelector("#carousel-view");

function createDeckEl(item) {
  const deckEl = deckTemplate.content.firstElementChild.cloneNode(true);
  const colorName = hexToString(item.color);

  deckEl.id = item.id;
  deckEl.querySelector(".deck__tags").textContent = item.name;
  deckEl.querySelector(".deck__card-count").textContent =
    `${item.cards.length} cards`;
  deckEl.querySelector(".deck__link").href = `#carousel/${item.id}`;

  if (colorName) {
    removeColorClasses(deckEl);
    deckEl.classList.add(`deck_color_${colorName}`);
  }

  const deleteButton = deckEl.querySelector(".deck__delete-button");
  deleteButton?.addEventListener("click", () => {
    deckEl.remove();
    moveNewDeckCard();
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);

  if (newDeckButton) {
    deckList.insertBefore(deckEl, newDeckButton);
  } else {
    deckList.appendChild(deckEl);
  }
}

function moveNewDeckCard() {
  if (!newDeckButton) {
    return;
  }

  const regularDecks = [...deckList.children].filter((child) =>
    child.classList.contains("deck"),
  );

  if (regularDecks.length <= 1) {
    if (newDeckButton !== deckList.lastElementChild) {
      deckList.appendChild(newDeckButton);
    }
    return;
  }

  const targetDeck = regularDecks[regularDecks.length - 1];

  if (newDeckButton.previousElementSibling !== targetDeck) {
    deckList.insertBefore(newDeckButton, targetDeck);
  }
}

function renderView(hash) {
  const normalizedHash = (hash || "").replace(/^#/, "");
  const view = normalizedHash || "home";
  const isHome = view === "home";
  const isCarouselRoute = view.startsWith("carousel/");
  const deckId = isCarouselRoute ? view.split("/")[1] : null;
  const deck = deckId ? getDeckByID(deckId) : null;

  const isAbout = view === "about";
  const isNotFound = !isHome && !isCarouselRoute && !isAbout;

  if (homeSection) {
    homeSection.hidden = !isHome;
  }

  if (aboutSection) {
    aboutSection.hidden = !isAbout;
  }

  if (notFoundSection) {
    notFoundSection.hidden = !isNotFound;
  }

  if (carouselSection) {
    carouselSection.hidden = !isCarouselRoute || !deck;
  }

  if (mainContent) {
    mainContent.classList.toggle(
      "page__main-content_location_carousel",
      isCarouselRoute && Boolean(deck),
    );
  }

  if (isCarouselRoute && deck) {
    renderCarouselView(deck);
  }
}

function handleHashChange() {
  renderView(window.location.hash);
}

function initDecks() {
  decks.forEach(renderDeckEl);
  moveNewDeckCard();
}

initDecks();
window.addEventListener("hashchange", handleHashChange);
handleHashChange();
