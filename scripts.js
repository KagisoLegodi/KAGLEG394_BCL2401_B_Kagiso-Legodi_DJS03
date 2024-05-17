// Importing necessary data and constants from data.js file
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

// Initializing page number and matches array
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

// Appending genre dropdown options to the genre dropdown container
document.querySelector("[data-search-genres]").appendChild(genreHtml);

// Creating document fragment for author dropdown options
const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement("option");
firstAuthorElement.value = "any";
firstAuthorElement.innerText = "All Authors";
authorsHtml.appendChild(firstAuthorElement);

// Populating author dropdown options
for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

// Appending author dropdown options to the author dropdown container
document.querySelector("[data-search-authors]").appendChild(authorsHtml);

// Setting theme based on user's preference
const saveButton = getElement("[data-settings-save]");
const cancelButton = getElement("[data-settings-cancel]");
const form = getElement("[data-settings-form]");

const applyTheme = (theme) => {
  document.documentElement.style.setProperty(
    "--color-dark",
    theme === "night" ? "255, 255, 255" : "10, 10, 20"
  );
  document.documentElement.style.setProperty(
    "--color-light",
    theme === "night" ? "10, 10, 20" : "255, 255, 255"
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
    <span class="list__remaining">(${remainingBooks > 0 ? remainingBooks : 0})</span>
  `;
};

// Event listener functions
const closeOverlay = (selector) => {
  getElement(selector).open = false;