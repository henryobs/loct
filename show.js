
// Get the input element, button, and search results container
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

// Function to fetch TV show data from an API based on the search query
function searchTVShows() {
  const query = searchInput.value.trim();

  if (query.length > 2) {
    // Replace `API_KEY` with your own API key or endpoint
    const apiUrl = "https://www.episodate.com/api/most-popular?page=1";
    const api2 = `https://www.episodate.com/api/search?q=${query}&page=1`

    // Make a request to the API
    fetch(api2)
      .then(response => response.json())
      .then(data => {
        // Clear previous search results
        searchResults.innerHTML = '';

        // Process the search results
        console.log(data.tv_shows);
        data.tv_shows.forEach(show => {
          // Create a new result item
          const showItem = document.createElement('div');
          showItem.classList.add('show-item');

          // Set the show's name as the item's text content
          showItem.textContent = show.name;

          // Append the item to the search results container
          searchResults.appendChild(showItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    // Clear search results if the input is too short
    searchResults.innerHTML = '';
  }
}

// Event listener to trigger the search on button click
searchButton.addEventListener('click', searchTVShows);
















let currPage = 0;
function next() { 
  currPage = currPage + 1;
  fetch("https://www.episodate.com/api/most-popular?page=" + currPage)
  .then((data) =>{
    return data.json();
  })
  .then((post) => {

     // let movies = data.json("tv_shows"); 
    document.getElementById("containerone").innerHTML = "";
for (let i = 0; i < post.tv_shows.length; i++) {
  const cards = post.tv_shows[i];
 
  document.getElementById("containerone").innerHTML += `
  <div class= "card">
    <img src="${cards.image_thumbnail_path}" alt= "image of ${cards.name}">
      <div class="cardContents">
        <h4>${cards.name}</h4>
        <h5>${cards.country}</h5>
        <h6>${cards.start_date}</h6>
        </div>

  </div>
  `
}
})
}
  next();

  






















// Function to fetch TV show details
async function fetchTV_ShowDetails(e) {
  console.log(e);
  // API endpoint for TV show details
  const API_ENDPOINT = `https://www.episodate.com/api/show-details?q=${e.target.id}`;
  // const url = API_ENDPOINT + showId;

  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      // Handle the TV show details
      // ...
      console.log(data);


      // new URLSearchParams()

      // localStorage()

      window.location = '/details.html'
    })
    .catch(error => {
      console.error('Error fetching TV show details:', error);
    });
}





















  async function logJSONData() {
    const response = await fetch("https://www.episodate.com/api/most-popular?page=1");
    const jsonData = await response.json();
    // console.log(jsonData);
    return jsonData
  }

  
  window.onload = async () => {
    let grid = document.getElementById('row')

    let data = await logJSONData();

    data.tv_shows.forEach(show => {
      grid.innerHTML +=
       `<a href="/details?id=${show.id}"><div class="card" style="width: 18rem;">
       <img src=${show.image_thumbnail_path} class="card-img-top" alt="movie image"></a>
       <div class="card-body">
         <h5 class="card-title">${show.name}</h5>
         <h5 class="card-title">${show.country}</h5>
         <h5 class="card-title">${show.network}</h5>
         <h5 class="card-title">${show.status}</h5>
         
         <button id=${show.id} class="btn btn-primary" type="submit">View More</button>
       </div>
     </div></a>
      
  

   `
    })

    let viewButtons = document.querySelectorAll('#row button')

    viewButtons.forEach(button => {
      button.addEventListener('click', fetchTV_ShowDetails)
    })


    console.log(data.tv_shows)
    
  }