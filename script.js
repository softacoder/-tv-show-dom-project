//You can edit ALL of the code here


// Get DOM elements to access or retrieve specific objects in the DOM tree using JavaScript with the querySelector() method

const containerForEpisode = document.querySelector('#episode');
const containerForShow = document.querySelector('#containerForShow');
const searchForShow = document.querySelector('#searchForShow');
const searchForEpisode = document.querySelector('#searchForEpisode');
const searchForResult = document.querySelector('#output');
const dropdownForShows = document.querySelector('#shows');
const dropdownForSeries = document.querySelector('#series');
const buttonForShow = document.querySelector('#displayShow');
const buttonForPage = document.querySelector('.pagination');
const containerForPages = document.querySelector('.pagination__pages');
const containerForSeason = document.querySelector('#containerForSeason');



// For a carousel, you work with DOM elements to define the HTML structure for the carousel container and its individual
//  items, such as images or text boxes. HTML tags such as <div>, <ul>, and <li> to create this structure.Once you have 
// defined the HTML structure, you can use JavaScript to manipulate the DOM elements to achieve the desired carousel behavior.

const carousel = document.querySelector('.carousel');
const containerForCarousel = document.querySelector('.container__carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');



// Below are global variables that is declared outside of any function or code block and is therefore accessible from any part of the program.

const listOfShows = 'https://api.tvmaze.com/shows';
const itemWidthRatio = carousel.offsetWidth / 5.45;
let showEpisodesAPIURL = 'https://api.tvmaze.com/shows/82/episodes';
let showSeasonsAPIURL = 'https://api.tvmaze.com/shows/82/seasons';
let arrayOfShows = [];
let seasonList = [];
let episodesList = [];
let currentButtonIndex = 1;
let indexOfSlide = 0;
let pageStatus = false;
fetchShows();



// Below I grab/fetch or "API-call" the shows, seasons, and episodes from an external source and display it on the webpage.
async function fetchShows() {
  try {
    const answer = await fetch(listOfShows);
    arrayOfShows = await answer.json();
    arrayOfShows.sort((a, b) => a.name.localeCompare(b.name));
    createPageShows(arrayOfShows);
    createDropdownShows(arrayOfShows);
    console.log(arrayOfShows);
  } catch (error) {
    console.error(error);
  }
}


// Below I grab/fetch or "API-call" season of the selected show. See the fetch code to achieve it.
async function fetchSeason() {
  try {
       const answer = await fetch(showSeasonsAPIURL);
        arrayForSeason = await answer.json();
       console.log(arrayForSeason);
        createPageSeasons(arrayForSeason);
  } catch (error) {
    console.error(error);
  }
}

// Below I grab/fetch or "API-call" episodes of the selected show.
async function fetchEpisodes() {
  try {
       const answer = await fetch(showEpisodesAPIURL);
       episodesList = await answer.json();
       createDropdownEpisodes();
    console.log('Episodes fetched');
  } catch (error) {
    console.error(error);
  }
}


// Below is a dropdown for the shows and .forEach() method is used to 
// iterate over the shows and create HTML <option> elements for each one. Both these functions work. The one below is arrow functions.
//    function createDropdownShows(indexOfShows) {
//       indexOfShows.map((show) => {
//     dropdownForShows.innerHTML += `<option value="${show.name}">${show.name}</option>`;
//   });
// }  

const createDropdownShows = (indexOfShows) => {
  indexOfShows.map((show) => {
    dropdownForShows.innerHTML += `<option value="${show.name}">${show.name}</option>`;
  });
};


// Below season and episode numbers is tranformed to a standard format. Both these functions work. The one below is arrow functions.
//   function grabNumber(number) {
//   return number < 10 ? `0${number}` : number;
// }

const grabNumber = (number) => number < 10 ? `0${number}` : number;


// Check whether to display pagination based on the amount of data available. If .. else statement determine what option. Both these functions work. The one below is arrow functions.
//   function checkPaginationNeeded(showList) {
//   if (showList.length < 5) {
//     buttonForPage.classList.add('hidden');
//   } else {
//         buttonForPage.classList.remove('hidden');
//   }
// }

const checkPaginationNeeded = (showList) => {
  if (showList.length < 5) {
    buttonForPage.classList.add('hidden');
  } else {
    buttonForPage.classList.remove('hidden');
  }
};


// Below the main function is defined to make pages for shows by fetching data about all available shows from the API.
  function createPageShows(showList) {
  const summaryLength = 350;
    const page = showList.slice(0, 5);
  let result = '';


    page.map((show) => {
    const truncatedSummary = show.summary.substring(0, summaryLength).trim();
    const btnReadMoreClass = show.summary.length > summaryLength ? '' : 'hidden';
     const summaryText = show.summary.length > summaryLength ? truncatedSummary : show.summary;
    result += `
    <div class="each__show">
    
     <h1>${show.name}</h1>
      <div class="show__wrap">
        <div class="content__wrap">
        <div class="image__container">
        <img src="${show.image.medium}" alt="">
        <div class="play-circle" id="${show.name}">
            <i class="fas fa-play"></i>
          </div>
          </div>
                  <div>
          <span class="${show.id}" id="summaryText">${summaryText}</span>
          <span id="read-more-button" class="${btnReadMoreClass}">...read more</span>
          </div>
        </div>
        <div class="props">
          <p>Rating: ${show.rating.average}</p>
          <p>Genres: ${show.genres}</p>
          <p>Status: ${show.status}</p>
          <p>Runtime: ${show.runtime}</p>
        </div>
      </div>
    </div>`;
  });
  containerForShow.classList.remove('hidden');

  containerForShow.innerHTML = result;
  containerForEpisode.innerHTML = '';
  checkPaginationNeeded(showList);
}

// Below the function make pages for all seasons by using the API. Both these functions work. The one below is arrow functions.
    const createPageSeasons = (seasonArray) => {
    const result = seasonArray.reduce((acc, { number, image: { medium }, summary }) => {
    const isNull = summary === null ? '' : summary;
    const season = `
        <div class="episode__wrap">
            <div class="episode__info">
              <h2 id="${number}">Season ${number}</h2>
              <img id="${number}" src="${medium}" alt="">
              ${isNull}
            </div>
        </div>`;
    return acc + season;
  }, '');
  containerForSeason.innerHTML = result;
};

// Below the function display all episodes pages by using the API. Both these functions work. The one below is arrow functions.
//   function createPageEpisodes(episodeList) {
//   const result = episodeList.reduce((acc, {
//     name, number, season, summary, image: { medium },
//   }) => {
//     const episodeNum = grabNumber(number);
//         const episodeSeason = grabNumber(season);
//     const episode = `
//       <div class="episode__wrap">
//           <div class="episode__header">
//             <h3>${name} - S${episodeSeason}E${episodeNum}</h3>
            
//           </div>
//           <div class="episode__info">
//             <img src="${medium}" alt="">
//             ${summary}
//           </div>
//       </div>`;
//     return acc + episode;
//   }, '');
//   searchForResult.textContent = `Displaying ${episodeList.length}/${episodesList.length} episodes`;
//   containerForShow.classList.add('hidden');  
    
// containerForEpisode.innerHTML = result;
// }

const createPageEpisodes = (episodeList) => {
  const result = episodeList.reduce((acc, { name, number, season, summary, image: { medium } }) => {
    const episodeNum = grabNumber(number);
    const episodeSeason = grabNumber(season);
    const episode = `
      <div class="episode__wrap">
        <div class="episode__header">
          <h3>${name} - S${episodeSeason}E${episodeNum}</h3>
        </div>
        <div class="episode__info">
          <img src="${medium}" alt="">
          ${summary}
        </div>
      </div>`;
    return acc + episode;
  }, '');

  searchForResult.textContent = `Displaying ${episodeList.length}/${episodesList.length} episodes`;
  containerForShow.classList.add('hidden');
  containerForEpisode.innerHTML = result;
};


// Pagination functionality checks how many items should be included on page, either 9 or 5. Both these functions work. The one below is arrow functions.
//   function checkActiveEpisodeOrShowPage() {
//     if (episodePageIsActive) {
//     generatePage(null, 9, episodesList);
//   } else {
//     generatePage(arrayOfShows, 5, null);
//   }
// }

const checkActiveEpisodeOrShowPage = () => {
  if (episodePageIsActive) {
    generatePage(null, 9, episodesList);
  } else {
    generatePage(arrayOfShows, 5, null);
  }
};


//   function generatePage(shows, pageSize, episodes) {
//   const startIndex = (currentButtonIndex - 1) * pageSize;
//   const endIndex = currentButtonIndex * pageSize;
//   if (shows !== null) {
//     const page = shows.slice(startIndex, endIndex);
//     createPageShows(page);
//   } else if (episodes !== null) {
//     const page = episodes.slice(startIndex, endIndex);
//     createPageEpisodes(page);
//   }
// }

const generatePage = (shows, pageSize, episodes) => {
  const startIndex = (currentButtonIndex - 1) * pageSize;
  const endIndex = currentButtonIndex * pageSize;

  if (shows !== null) {
    const page = shows.slice(startIndex, endIndex);
    createPageShows(page);
  } else if (episodes !== null) {
    const page = episodes.slice(startIndex, endIndex);
    createPageEpisodes(page);
  }
};



  const generateActivePaginationButton = () => {
    const pageBar = document.querySelectorAll('.page-link');
    pageBar.map((page) => {
     if (Number(page.textContent) !== currentButtonIndex) { 
      page.classList.remove('active');
      } else if (Number(page.textContent) === currentButtonIndex) {
      page.classList.add('active');
    }
  });
};


//   function addPageButton() {
//     const numOfPages = containerForPages.children.length;
//     currentButtonIndex++;
//     checkActiveEpisodeOrShowPage();
//         if (currentButtonIndex > numOfPages) {
//     if (numOfPages >= 5) {
//         const firstPageNum = currentButtonIndex - 5;
//         const firstPage = containerForPages.querySelector(`.page-item:nth-child(${firstPageNum})`);
//       for (let i = 1; i < firstPageNum; i++) {
//           const page = containerForPages.querySelector(`.page-item:nth-child(${i})`);
//         page.style.display = 'none';
//       }
//       firstPage.style.display = 'none';
//     }
//       containerForPages.innerHTML += `<li class="page-item"><a class="page-link">${currentButtonIndex}</a></li>`;
//   }
//     generateActivePaginationButton();
// }

const addPageButton = () => {
  const numOfPages = containerForPages.children.length;
  currentButtonIndex++;
  checkActiveEpisodeOrShowPage();

  if (currentButtonIndex > numOfPages) {
    if (numOfPages >= 5) {
      const firstPageNum = currentButtonIndex - 5;
      const firstPage = containerForPages.querySelector(`.page-item:nth-child(${firstPageNum})`);

      for (let i = 1; i < firstPageNum; i++) {
        const page = containerForPages.querySelector(`.page-item:nth-child(${i})`);
        page.style.display = 'none';
      }
      firstPage.style.display = 'none';
    }

    containerForPages.innerHTML += `<li class="page-item"><a class="page-link">${currentButtonIndex}</a></li>`;
  }

  generateActivePaginationButton();
};


//   function navigateBackward() {
//   const getNumberOfPages = containerForPages.children.length;
//     if (currentButtonIndex > 1) {
//     currentButtonIndex--;
//     checkActiveEpisodeOrShowPage();
//     generateActivePaginationButton();
// if (getNumberOfPages >= 6) {
//       const firstPageNum = getNumberOfPages - 5;
//             const firstPage = containerForPages.querySelector(`.page-item:nth-child(${firstPageNum})`);
//             const lastPage = containerForPages.querySelector(`.page-item:nth-child(${numOfPages})`);
//       lastPage.remove();
//       firstPage.style.display = '';
//     }
//   }
// }

const navigateBackward = () => {
  const getNumberOfPages = containerForPages.children.length;

  if (currentButtonIndex > 1) {
    currentButtonIndex--;
    checkActiveEpisodeOrShowPage();
    generateActivePaginationButton();

    if (getNumberOfPages >= 6) {
      const firstPageNum = getNumberOfPages - 5;
      const firstPage = containerForPages.querySelector(`.page-item:nth-child(${firstPageNum})`);
      const lastPage = containerForPages.querySelector(`.page-item:nth-child(${numOfPages})`);
      lastPage.remove();
      firstPage.style.display = '';
    }
  }
};


// Below a dropdown for selected episodes is created
//   function createDropdownEpisodes() {
//   let result = '<option value="">Choose episode</option>';
//     episodesList.map(({ name, number, season }) => {
//     const episodeNum = grabNumber(number);
//     const episodeSeason = grabNumber(season);
//     result += `<option value="${name}">S${episodeSeason}E${episodeNum} - ${name}</option>`;
//   });
//     dropdownForSeries.innerHTML = result;
// }

const createDropdownEpisodes = () => {
  let result = '<option value="">Choose episode</option>';
  episodesList.map(({ name, number, season }) => {
    const episodeNum = grabNumber(number);
    const episodeSeason = grabNumber(season);
    result += `<option value="${name}">S${episodeSeason}E${episodeNum} - ${name}</option>`;
  });
  dropdownForSeries.innerHTML = result;
};


// The 4 functions below make and display pages for the shows, seasons, episodes. Both these functions work. The one below is arrow functions.
// function getSelectedShow(showName) {
//    const chosenShow = arrayOfShows.filter(({ name }) => name === showName);
//     createPageShows(chosenShow);
// }

const getSelectedShow = (showName) => {
  const chosenShow = arrayOfShows.filter(({ name }) => name === showName);
  createPageShows(chosenShow);
};


// function findSeasonsOfChosenShow(chosenShow) {
//   const clickedShow = arrayOfShows.find(({ name }) => name === chosenShow);
//   const { _links } = clickedShow;
//   const link = _links.self.href;
//   showEpisodesAPIURL = `${link}/episodes`;
//    showSeasonsAPIURL = `${link}/seasons`;
//   fetchSeason(showSeasonsAPIURL);
//    searchForShow.value = '';
// }

const findSeasonsOfChosenShow = (chosenShow) => {
  const clickedShow = arrayOfShows.find(({ name }) => name === chosenShow);
  const { _links } = clickedShow;
  const link = _links.self.href;
  showEpisodesAPIURL = `${link}/episodes`;
  showSeasonsAPIURL = `${link}/seasons`;
  fetchSeason(showSeasonsAPIURL);
  searchForShow.value = '';
};


    const findEpisodesOfChosenSeason = (chosenSeason) => {
  const numberOfSeason = Number(chosenSeason);
  const numberOfEpisodes = episodesList.filter(({ season }) => season === numberOfSeason);
  createPageEpisodes(numberOfEpisodes);
};


// function getSelectedEpisode(selectedEpisode) {
//   const foundEpisode = episodesList.filter(({ name }) => name.includes(selectedEpisode));
//     buttonForPage.classList.add('hidden');
//   createPageEpisodes(foundEpisode);
// }

const getSelectedEpisode = (selectedEpisode) => {
  const foundEpisode = episodesList.filter(({ name }) => name.includes(selectedEpisode));
  buttonForPage.classList.add('hidden');
  createPageEpisodes(foundEpisode);
};


//This function is used to normalize user input or clean up strings before further processing. It takes the value and returns trimmed and lower cased string/value. Both these functions work. The one below is arrow functions. 
//   function grabSearchInput(searchInput) {
//   return searchInput.value
//     .trim()
//     .toLocaleLowerCase()
//     .replace(/[^a-zA-Z0-9]/g, ' ');
// }

const grabSearchInput = (searchInput) => searchInput.value
  .trim()
  .toLocaleLowerCase()
  .replace(/[^a-zA-Z0-9]/g, ' ');


// The function retrieves user input, filters an array of TV shows based on that input, and then renders the filtered results to the page.
// function displayShow() {
//   const grabShowValue = grabSearchInput(searchForShow);
//   const sortedShows = arrayOfShows.filter(({ name, summary }) => name
//     .toLocaleLowerCase()
//     .includes(grabShowValue)
//     || summary
//       .toLocaleLowerCase()
//       .includes(grabShowValue));
//    generatePage(sortedShows, 5, null);
// }

const displayShow = () => {
  const grabShowValue = grabSearchInput(searchForShow);
  const sortedShows = arrayOfShows.filter(({ name, summary }) => name
    .toLocaleLowerCase()
    .includes(grabShowValue)
    || summary
      .toLocaleLowerCase()
      .includes(grabShowValue));
  generatePage(sortedShows, 5, null);
};

// This function retrieve and display a list of TV show episodes based on a user's search input. Both these functions work. The one below is arrow functions.
// function displayEpisode() {
//   const finderValue = grabSearchInput(searchForEpisode);
//   const sortedEpisodes = episodesList.filter(({ name, summary }) => name
//     .toLocaleLowerCase()
//     .includes(finderValue)
//     || summary
//       .toLocaleLowerCase()
//       .includes(finderValue));
//   generatePage(null, 9, sortedEpisodes);
// }

const displayEpisode = () => {
  const finderValue = grabSearchInput(searchForEpisode);
  const sortedEpisodes = episodesList.filter(({ name, summary }) => name
    .toLocaleLowerCase()
    .includes(finderValue)
    || summary
      .toLocaleLowerCase()
      .includes(finderValue));
  generatePage(null, 9, sortedEpisodes);
};


// Expand clicked summary
//   function toggleSummary(spanId, spanSummary) {
//   const summary = spanSummary;
//   const querySummary = arrayOfShows.find(({ id }) => id === spanId);
//   summary.innerHTML = querySummary.summary;
// }

const toggleSummary = (spanId, spanSummary) => {
  const summary = spanSummary;
  const querySummary = arrayOfShows.find(({ id }) => id === spanId);
  summary.innerHTML = querySummary.summary;
};


// It describes a section of code that implements functionality for a carousel. Both these functions work. The one below is arrow functions.

//   function playCarousel() {
//   setInterval(() => {
//     indexOfSlide++;
//         if (indexOfSlide >= containerForCarousel.children.length) {
//       indexOfSlide = 0;
//     }
//      appendCarouselPoster();
//     containerForCarousel.style.transform = `translateX(-${indexOfSlide * itemWidthRatio}px)`;
//   }, 3000);
// }

const playCarousel = () => {
  setInterval(() => {
    indexOfSlide++;
    if (indexOfSlide >= containerForCarousel.children.length) {
      indexOfSlide = 0;
    }
    appendCarouselPoster();
    containerForCarousel.style.transform = `translateX(-${indexOfSlide * itemWidthRatio}px)`;
  }, 3000);
};


//   function appendCarouselPoster() {
//   const poster = arrayOfShows[Math.floor(Math.random() * arrayOfShows.length)].image.medium;
//   containerForCarousel.innerHTML += `<img src="${poster}">`;
// }

const appendCarouselPoster = () => {
  const poster = arrayOfShows[Math.floor(Math.random() * arrayOfShows.length)].image.medium;
  containerForCarousel.innerHTML += `<img src="${poster}">`;
};


// playCarousel();
//   function retrievePosterData(poster) {
//   const chosenShow = arrayOfShows.filter(({ image: { medium } }) => medium.includes(poster));
//   createPageShows(selectedShow);
// }

playCarousel();

const retrievePosterData = (poster) => {
  const chosenShow = arrayOfShows.filter(({ image: { medium } }) => medium.includes(poster));
  createPageShows(selectedShow);
};


// These two functions determine when to display or hide bars. Both these functions work. The one below is arrow functions.
//   function showShowsBar() {
//   searchForEpisode.classList.add('hidden');
//   dropdownForSeries.classList.add('hidden');
//   dropdownForShows.classList.remove('hidden');
//   searchForShow.classList.remove('hidden');
//   searchForResult.textContent = '';
//   searchForEpisode.value = '';
// }

const showShowsBar = () => {
  searchForEpisode.classList.add('hidden');
  dropdownForSeries.classList.add('hidden');
  dropdownForShows.classList.remove('hidden');
  searchForShow.classList.remove('hidden');
  searchForResult.textContent = '';
  searchForEpisode.value = '';
};

//   function showEpisodeBar() {
//   dropdownForSeries.classList.remove('hidden');
//   searchForEpisode.classList.remove('hidden');
//   dropdownForShows.classList.add('hidden');
//   searchForShow.classList.add('hidden');
// }

const showEpisodeBar = () => {
  dropdownForSeries.classList.remove('hidden');
  searchForEpisode.classList.remove('hidden');
  dropdownForShows.classList.add('hidden');
  searchForShow.classList.add('hidden');
};


// These event listeners are used to add interactivity to my TV show web page, allowing users to search, filter, 
// and navigate the content dynamically.
  searchForEpisode.addEventListener('keydown', () => {
  showEpisode();
});


searchForShow.addEventListener('keydown', () => {
  displayShow();
});


  dropdownForShows.addEventListener('change', (event) => {
  if (event.target.value !== '') {
    getSelectedShow(event.target.value);
  } else {
    makePageForShows(selectionOfShows);
  }
});

dropdownForSeries.addEventListener('change', (event) => {
  if (event.target.value !== '') {
    getSelectedEpisode(event.target.value);
  } else {
    generatePage(null, 9, episodesList);
    buttonForPage.classList.remove('hidden');
  }
});


containerForShow.addEventListener('click', (event) => {
  if (event.target.tagName === 'H1') {
    findSeasonsOfChosenShow(event.target.textContent);
     buttonForPage.classList.add('hidden');
    containerForShow.classList.add('hidden');

        fetchEpisodes();
  } else if (event.target.className === 'play-circle') {
    findSeasonsOfChosenShow(event.target.id);
    buttonForPage.classList.add('hidden');
    containerForShow.classList.add('hidden');

    fetchEpisodes();
  }
});

  containerForSeason.addEventListener('click', (event) => {
    if (event.target.tagName === 'H2'
  || event.target.tagName === 'IMG') {
      pageStatus = true;
      containerForSeason.classList.add('hidden');
  
      findEpisodesOfChosenSeason(event.target.id);
      showEpisodeBar();
  }
});


  buttonForShow.addEventListener('click', () => {
  containerForSeason.classList.remove('hidden');
    containerForSeason.innerHTML = '';
  searchForShow.value = '';
  pageStatus = false;
  currentButtonIndex = 1;
   showShowsBar();
  generateActivePaginationButton();
  generatePage(arrayOfShows, 5, null);
});

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'SPAN') {
    const spanSummary = event.target.parentNode.parentNode;
    const spanId = Number(event.target.parentNode.parentNode.className);
     event.target.classList.add('hidden');
    
    expandSummary(spanId, spanSummary);
  }
});


  buttonForPage.addEventListener('click', (event) => {
  const pageNum = Number(event.target.textContent);
  const pageContent = event.target.textContent;
  if (!Number.isNaN(pageNum)) {
    currentButtonIndex = pageNum;
    checkActiveEpisodeOrShowPage();
     generateActivePaginationButton();
  } else if (pageContent === 'Next') {
           if (!pageStatus && currentButtonIndex < arrayOfShows.length / 5) {
      addPageButton();
        } else if (pageStatus && currentButtonIndex < episodesList.length / 9) {
      addPageButton();
    }
  } else if (pageContent === 'Previous') {
     navigateBackward();
  }
});

prevBtn.addEventListener('click', () => {
  indexOfSlide--;
    if (indexOfSlide < 0) {
    indexOfSlide = containerForCarousel.children.length - 1;
  }
  containerForCarousel.style.transform = `translateX(-${indexOfSlide * itemWidthRatio}px)`;
});

nextBtn.addEventListener('click', () => {
  indexOfSlide++;
      if (indexOfSlide >= containerForCarousel.children.length) {
    indexOfSlide = 0;
  }
  containerForCarousel.style.transform = `translateX(-${indexOfSlide * itemWidthRatio}px)`;
  appendCarouselPoster();
});


containerForCarousel.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    containerForSeason.innerHTML = '';
    containerForSeason.classList.remove('hidden');
    currentButtonIndex = 1;
    showShowsBar();
    retrievePosterData(event.target.getAttribute('src'));
  }
});

