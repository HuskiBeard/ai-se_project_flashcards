import { hexToString, removeColorClasses } from "./colors.js";

function getCarouselTitleString(deck) {
  return `${deck.name} · ${deck.cards.length} cards`;
}

const state = {
  deck: null,
  currentIndex: 0,
  showingQuestion: true,
};

let listenersAttached = false;

function renderCarouselView(deck) {
  const mainContent = document.querySelector("#main-content");
  const carouselSection = document.querySelector("#carousel-view");
  const titleEl = document.querySelector("#carousel-title");
  const cardTextEl = document.querySelector("#carousel-card-text");
  const prevButton = document.querySelector("#carousel-prev");
  const nextButton = document.querySelector("#carousel-next");
  const flipButton = document.querySelector("#carousel-flip");

  if (!carouselSection || !titleEl || !cardTextEl || !deck?.cards?.length) {
    return;
  }

  const updateButtons = () => {
    const isFirstCard = state.currentIndex === 0;
    const isLastCard = state.currentIndex === state.deck.cards.length - 1;

    prevButton?.classList.toggle("carousel__btn_disabled", isFirstCard);
    if (prevButton) {
      prevButton.disabled = isFirstCard;
    }

    nextButton?.classList.toggle("carousel__btn_disabled", isLastCard);
    if (nextButton) {
      nextButton.disabled = isLastCard;
    }
  };

  const updateDisplay = () => {
    const currentCard = state.deck.cards[state.currentIndex];
    titleEl.textContent = `${state.deck.name} · ${state.currentIndex + 1}/${state.deck.cards.length}`;

    if (state.showingQuestion) {
      cardTextEl.textContent = currentCard.question;
      cardTextEl.classList.remove("carousel__card_color_white");
    } else {
      cardTextEl.textContent = currentCard.answer;
      cardTextEl.classList.add("carousel__card_color_white");
    }

    updateButtons();
  };

  const handlePrev = () => {
    if (state.currentIndex === 0) {
      state.showingQuestion = true;
      return;
    }
    state.currentIndex =
      (state.currentIndex - 1 + state.deck.cards.length) %
      state.deck.cards.length;
    state.showingQuestion = true;
    updateDisplay();
  };

  const handleNext = () => {
    if (state.currentIndex === state.deck.cards.length - 1) {
      state.showingQuestion = true;
      return;
    }
    state.currentIndex = (state.currentIndex + 1) % state.deck.cards.length;
    state.showingQuestion = true;
    updateDisplay();
  };

  const handleFlip = () => {
    state.showingQuestion = !state.showingQuestion;
    updateDisplay();
  };

  if (mainContent) {
    mainContent.classList.add("page__main-content_location_carousel");
  }

  carouselSection.hidden = false;
  carouselSection.style.display = "flex";

  state.deck = deck;
  state.currentIndex = 0;
  state.showingQuestion = true;

  const colorName = hexToString(deck.color);
  removeColorClasses(cardTextEl);
  if (colorName) {
    cardTextEl.classList.add(`card__carousel_color_${colorName}`);
  }

  if (!listenersAttached) {
    prevButton?.addEventListener("click", handlePrev);
    nextButton?.addEventListener("click", handleNext);
    flipButton?.addEventListener("click", handleFlip);
    listenersAttached = true;
  }

  updateDisplay();
}

export { renderCarouselView, getCarouselTitleString };
