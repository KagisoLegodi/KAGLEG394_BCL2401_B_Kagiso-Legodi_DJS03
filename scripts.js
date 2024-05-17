// Importing necessary data and constants from data.js file
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

// Initialize page number and matches array
let page = 1;
let matches = books;

// Function to get DOM elements
const getElement = (selector) => document.querySelector(selector);

// Function to create and append book previews
const createBookPreviews = (books, container) => {
  const fragment = document.createDocumentFragment();
  books.forEach(({ author, id, image, title }) => {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);
    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
};

// Function to create and append options to a select element
const createOptions = (options, defaultOption, container) => {
  const fragment = document.createDocumentFragment();
  const firstOption = document.createElement("option");
  firstOption.value = "any";
  firstOption.innerText = defaultOption;
  fragment.appendChild(firstOption);
  Object.entries(options).forEach(([id, name]) => {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
};

// Function to apply theme
const applyTheme = (theme) => {
  const isNight = theme === "night";
  document.documentElement.style.setProperty(
    "--color-dark",
    isNight ? "255, 255, 255" : "10, 10, 20"
  );
  document.documentElement.style.setProperty(
    "--color-light",
    isNight ? "10, 10, 20" : "255, 255, 255"
  );
};

// Function to update "Show more" button text and state
const updateShowMoreButton = () => {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  const button = getElement("[data-list-button]");
  button.innerText = `Show more (${remainingBooks})`;
  button.disabled = remainingBooks <= 0;
  button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">(${
      remainingBooks > 0 ? remainingBooks : 0
    })</span>
  `;
};

// Event listener functions
const closeOverlay = (selector) => {
  getElement(selector).open = false;
};

const openOverlay = (selector, focusSelector = null) => {
  getElement(selector).open = true;
  if (focusSelector) getElement(focusSelector).focus();
};

const applySearchFilters = (filters) => {
  return books.filter((book) => {
    const titleMatch =
      filters.title.trim() === "" ||
      book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch =
      filters.author === "any" || book.author === filters.author;
    const genreMatch =
      filters.genre === "any" || book.genres.includes(filters.genre);
    return titleMatch && authorMatch && genreMatch;
  });
};

// Event listeners
getElement("[data-search-cancel]").addEventListener("click", () =>
  closeOverlay("[data-search-overlay]")
);