//You can edit ALL of the code here

// DOM elements for carousel
const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');



// Assign global variables
const listOfShows = 'https://api.tvmaze.com/shows';
const slideWidth = carousel.offsetWidth / 5.45;
let currentShow = 'https://api.tvmaze.com/shows/82/episodes';
let currentSeason = 'https://api.tvmaze.com/shows/82/seasons';
let selectionOfShows = [];
let seasonList = [];
let episodesList = [];
let activePageButton = 1;
let slideIndex = 0;
let episodePageActive = false;

fetchShows();


// Fetch all shows/seasons/episodes and display them
async function fetchShows() {
  try {
    const response = await fetch(listOfShows);
    selectionOfShows = await response.json();
    selectionOfShows.sort((a, b) => a.name.localeCompare(b.name));
    makePageForShows(selectionOfShows);
    makeDropdownForShows(selectionOfShows);
    console.log(selectionOfShows);
  } catch (error) {
    console.error(error);
  }
}

// Fetch season of the selected show
async function fetchSeason() {
  try {
    const response = await fetch(currentSeason);
    seasonList = await response.json();
    console.log(seasonList);
    makePageForSeasons(seasonList);
  } catch (error) {
    console.error(error);
  }
}

// Fetch episodes of the selected show
async function fetchEpisodes() {
  try {
    const response = await fetch(currentShow);
    episodesList = await response.json();
    makeDropdownForEpisodes();
    console.log('Episodes fetched');
  } catch (error) {
    console.error(error);
  }
}




//  Functionality for carousel
function startCarousel() {
  setInterval(() => {
    slideIndex++;
    if (slideIndex >= carouselContainer.children.length) {
      slideIndex = 0;
    }
    addCarouselPoster();
    carouselContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
  }, 3000);
}

function addCarouselPoster() {
  const poster = selectionOfShows[Math.floor(Math.random() * selectionOfShows.length)].image.medium;
  carouselContainer.innerHTML += `<img src="${poster}">`;
}

startCarousel();





function getSelectedPoster(poster) {
  const selectedShow = selectionOfShows.filter(({ image: { medium } }) => medium.includes(poster));
  makePageForShows(selectedShow);
}


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

