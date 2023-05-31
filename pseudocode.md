
Declare HTML document type as HTML

Start HTML document
  Start head section
    Set character encoding to UTF-8
    Set viewport meta tag
    Set title of the document
    Link external CSS file (style.css)
    Add favicon
    Link external Google Fonts (Roboto)
  End head section

  Start body section
    Start section element
      Start paragraph with id "p1"
        Add text "We Keep You Entertained"
      End paragraph

      Start paragraph with id "p2"
        Add text "Join Us And Bookmark Us"
      End paragraph

      Start script
        Define constant variable p1 and assign it the element with id "p1"
        Define constant variable p2 and assign it the element with id "p2"
        Define variable current and assign it the value of p1

        Define function switchParagraphs
          Set display style of current element to "none"

          If current is equal to p1
            Set current to p2
          Else
            Set current to p1

          Set display style of current element to "block"
        End function

        Call switchParagraphs function every 5 seconds using setInterval
      End script
    End section

    Start header section
      Start div element with class "carousel"
        Start div element with class "container__carousel"
          Add image with source "https://static.tvmaze.com/uploads/images/medium_portrait/423/1058922.jpg"
          Add image with source "https://static.tvmaze.com/uploads/images/medium_portrait/450/1126198.jpg"
          Add image with source "https://static.tvmaze.com/uploads/images/medium_portrait/425/1064746.jpg"
          Add image with source "https://static.tvmaze.com/uploads/images/medium_portrait/408/1022465.jpg"
          Add image with source "https://static.tvmaze.com/uploads/images/medium_portrait/458/1146396.jpg"
        End div

        Add button with class "prev-btn" and text "<"
        Add button with class "next-btn" and text ">"
      End div
    End header

    Start section element
      Start div element with class "input__wrap"
        Start select element with name "show" and id "shows"
          Add option element with value "" and text "Choose show"
        End select

        Start select element with class "hidden" and id "series" and name "episode"
        End select

        Add input element with id "searchForShow" and type "text" and placeholder "Search for show"

        Add input element with class "hidden" and id "searchForEpisode" and type "text" and placeholder "Search for episode"

        Start paragraph element with id "output"
        End paragraph

        Add button element with class "btn btn-danger" and id "displayShow" and type "button" with text "TV Shows"
      End div
    End section

    Add div element with class "container__ForShow" and id "containerForShow"
    Add div element with class "container" and id "containerForSeason"

    Add div element with class "container" and id "episode"
      Start nav element with aria-label "Page navigation example" and class "navbar"
        Start ul element with class "pagination"
          Start li element with class "page-item"
            Add anchor element with class "page-link" and text "Previous"
          End li

          Start div element with class "pagination__pages"
            Start li element with class "page-item"
              Add anchor element with class "page

CSS pseudo code.
The :root selector sets global CSS variables, such as colors and font families, that can be used throughout the document.
The body selector sets the styles for the overall body of the page, including its width, margin, colors, background, box-sizing, and font family.
The section selector sets the height of section elements to 50px.
The .input__wrap class styles a container for input elements, including display, alignment, column gap, and padding.
The input selector styles input elements, including height, background, border, border-radius, and text color. The ::placeholder selector styles the placeholder text color.
The select selector styles select elements, including height, background, text color, and border-radius.
The .container class styles a container element with flexbox layout properties, including flex-direction, flex-wrap, justify-content, and gaps between rows and columns.
The .episode__wrap class styles a container for an episode, including display, alignment, width, and border-radius.
The .episode__info class styles a container for episode information, including margin, width, display, and alignment.
The .episode__info p selector styles paragraphs inside the .episode__info container with a top margin.
The .episode__info img:hover selector styles images inside the .episode__info container on hover, changing their opacity and adding a transition effect.
The img selector styles all images, including height, border-radius, and cursor.
The h1 and h2 selectors style heading elements, adding cursor and transition effects on hover.
The #read-more-button selector styles a specific element with an ID, adding cursor and width properties, and changing color on hover.
The .props class styles a container for properties, including border, width, height, and padding.
The .pagination .page-link.active selector styles the active page link in a pagination element with a specific background color and text color.
The .pagination .page-link selector styles page links in a pagination element, setting their text color and removing borders.
The .container__ForShow class styles a container for a show, including width, margin, display, and column gaps.
The .each__show class styles a container for each individual show, adding padding.
The .show__wrap class styles a container for show content, using a grid layout with two columns and a gap between them.
The .content__wrap class styles a container for content, including display and column gap.
The .hidden class styles elements to be hidden by setting their display property to none.
The .navbar class styles a navigation bar, using flexbox to center its content.
The .pagination__pages class styles a container for pagination pages, using flexbox.
The .page-link:hover selector styles page links on hover, changing their opacity.
The .carousel class styles a container for a carousel element, including margin, position, width, height, and overflow properties.
The .container__carousel class styles a container for carousel images, using flexbox with nowrap and a transition effect on transform.
The .container__carousel img selector styles carousel images, including width, height, margin, opacity on hover, and cursor.
The .prev-btn and .next-btn classes style previous


Pseudocode script.js 

The JavaScript code interacts with the Document Object Model (DOM) to access and manipulate specific elements on a webpage.
DOM Element Selection: The code uses the querySelector() method to select specific elements in the DOM tree based on their IDs or classes. For example, document.querySelector('#episode') selects the element with the ID "episode" and assigns it to the containerForEpisode variable.
Global Variables: The code declares several global variables that are accessible from any part of the program. These variables store URLs, arrays, and other data needed for the functionality of the webpage.
Fetching Data: The code includes several asynchronous functions (fetchShows(), fetchSeason(), fetchEpisodes()) that make API calls to retrieve data (shows, seasons, episodes) from an external source using the fetch() function.
The retrieved data is then processed and used to create HTML elements for display on the webpage.