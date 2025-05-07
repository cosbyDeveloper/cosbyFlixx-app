const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
	apiUrl: 'https://api.themoviedb.org/3',
	authorizationBearer:
		'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTczYzI5OGUyNmEwMjk1NTIwNGE4NjM3NWRjYzFkYiIsIm5iZiI6MTczMzkyNjMyNy43OTEwMDAxLCJzdWIiOiI2NzU5OWRiN2RhM2JkMzliODc4NjBlYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xuMfuS5nHJFC9lDHoqMJKwA34LD9iiE3e-VrxEz0Sys',
};

// Add commas to a number
function addCommasToNumber(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Highlight active link
function highlightActiveLink() {
	const link = document.querySelectorAll('.nav-link');

	link.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

// Show spinner overlay
function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

// Hide spinner overlay
function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

// Show Alert
function showAlert(message, className) {
	const alertDiv = document.createElement('div');

	alertDiv.classList.add('alert', className);
	alertDiv.appendChild(document.createTextNode(message));

	document.querySelector('#alert').appendChild(alertDiv);

	setTimeout(() => alertDiv.remove(), 3000);
}

/**
 * Fetches data from The Movie Database API.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the data retrieved from the API.
 * @throws {Error} Throws an error if the HTTP response is not ok.
 */
async function fetchAPIData(endpoint) {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: global.authorizationBearer,
		},
	};

	showSpinner();

	const API_URL = global.apiUrl;

	try {
		const res = await fetch(`${API_URL}/${endpoint}?language=en-US`, options);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();

		hideSpinner();

		return data;
	} catch (error) {
		throw error;
	}
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Searches for movies or TV shows using the search term provided by the user.
 *
 * @returns {Promise<Object>} A promise that resolves to the search results.
 * @throws {Error} Throws an error if the HTTP response is not ok.
 */
/******  b36ecf79-a9b6-4bc0-acd6-56c6074c95c3  *******/
async function searchAPIData() {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: global.authorizationBearer,
		},
	};

	showSpinner();

	const API_URL = global.apiUrl;

	try {
		const res = await fetch(
			`${API_URL}/search/${global.search.type}?language=en-US&query=${global.search.term}&page=${global.search.page}`,
			options,
		);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();

		hideSpinner();

		return data;
	} catch (error) {
		throw error;
	}
}

/**
 * Displays popular movies.
 *
 * @returns {Promise<void>} A promise that resolves when the popular movies have been displayed.
 * @throws {Error} Throws an error if there is an issue fetching the popular movies.
 */
async function displayPopularMovies() {
	try {
		const { results } = await fetchAPIData('movie/popular');

		results.forEach((movie) => {
			const movieDiv = document.createElement('div');

			movieDiv.classList.add('card');

			movieDiv.innerHTML = `
				<a href="movie-details.html?id=${movie.id}">
            ${
							movie.poster_path
								? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
								: `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
			`;

			document.querySelector('#popular-movies').appendChild(movieDiv);
		});
	} catch (error) {
		const errorDiv = document.querySelector('.fetch_error');
		errorDiv.innerHTML =
			'<h3><em>There was an error fetching popular movies, please try again</em></h3>';
		console.log('Error fetching popular movies:', error);
	}
}

/**
 * Displays popular TV shows.
 *
 * @returns {Promise<void>} A promise that resolves when the popular TV shows have been displayed.
 * @throws {Error} Throws an error if there is an issue fetching the popular TV shows.
 */
async function displayPopularShows() {
	try {
		const { results } = await fetchAPIData('tv/popular');

		results.forEach((show) => {
			const showDiv = document.createElement('div');

			showDiv.classList.add('card');

			showDiv.innerHTML = `
				<a href="tv-details.html?id=${show.id}">
            ${
							show.poster_path
								? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
								: `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
			`;

			document.querySelector('#popular-shows').appendChild(showDiv);
		});
	} catch (error) {
		const errorDiv = document.querySelector('.fetch_error');
		errorDiv.innerHTML =
			'<h3><em>There was an error fetching popular TV shows</em></h3>';
		console.log('Error fetching popular movies:', error);
	}
}

/**
 * Displays a background image for the specified type (movie or TV show).
 *
 * @param {string} type - The type of content, either 'movie' or 'show'.
 * @param {string} backgroundPath - The path to the background image.
 */
function displayBackgroundImage(type, backgroundPath) {
	const overlayDiv = document.createElement('div');
	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.1';

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
}

/**
 * Displays the details of a movie.
 *
 * @returns {Promise<void>} A promise that resolves when the movie details have been displayed.
 * @throws {Error} Throws an error if there is an issue fetching the movie details.
 */
async function displayMovieDetails() {
	const movieID = window.location.search.split('=')[1];

	const movie = await fetchAPIData(`movie/${movieID}`);

	displayBackgroundImage('movie', movie.backdrop_path);

	const movieDetailsDiv = document.createElement('div');

	movieDetailsDiv.innerHTML = `
		<div class="details-top">
					<div>
						${
							movie.poster_path
								? `<img
							src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
							class="card-img-top"
							alt="${movie.title}" />`
								: `<img
							src="images/no-image.jpg"
							class="card-img-top"
							alt="${movie.title}" />`
						}
					</div>
					<div>
						<h2>${movie.title}</h2>
						<p>
							<i class="fas fa-star text-primary"></i>
							${movie.vote_average.toFixed(1)} / 10
						</p>
						<p class="text-muted">Release Date: ${movie.release_date}</p>
						<p>
							${movie.overview}
						</p>
						<h5>Genres</h5>
						<ul class="list-group">
						${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
						</ul>
						<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
					</div>
				</div>
				<div class="details-bottom">
					<h2>Movie Info</h2>
					<ul>
						<li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
							movie.budget,
						)} </li>
						<li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
							movie.revenue,
						)}$</li>
						<li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
						<li><span class="text-secondary">Status:</span> ${movie.status}</li>
					</ul>
					<h4>Production Companies</h4>
					<div class="list-group">
					${movie.production_companies
						.map((company) => `<span>${company.name}</span>`)
						.join(', ')}
					</div>
				</div>
	`;
	document.querySelector('#movie-details').appendChild(movieDetailsDiv);
}

/**
 * Displays a TV show's details on the page.
 *
 * @returns {Promise<void>} A promise that resolves when the TV show's details have been displayed.
 * @throws {Error} Throws an error if there is an issue fetching the TV show's details.
 */
async function displayTVShowDetails() {
	const showID = window.location.search.split('=')[1];

	const show = await fetchAPIData(`tv/${showID}`);

	displayBackgroundImage('show', show.backdrop_path);

	const tvShowDetailsDiv = document.createElement('div');

	tvShowDetailsDiv.innerHTML = `
		<div class="details-top">
					<div>
						${
							show.poster_path
								? `<img
							src="https://image.tmdb.org/t/p/w500${show.poster_path}"
							class="card-img-top"
							alt="${show.name}" />`
								: `<img
							src="images/no-image.jpg"
							class="card-img-top"
							alt="${show.name}" />`
						}
					</div>
					<div>
						<h2>${show.name}</h2>
						<p>
							<i class="fas fa-star text-primary"></i>
							${show.vote_average.toFixed(1)} / 10
						</p>
						<p class="text-muted">Release Date: ${show.first_air_date}</p>
						<p>
							${show.overview}
						</p>
						<h5>Genres</h5>
						<ul class="list-group">
						${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
						</ul>
						<a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
					</div>
				</div>
				<div class="details-bottom">
					<h2>Show Info</h2>
					<ul>
						<li><span class="text-secondary">Number Of Episodes:</span> ${
							show.number_of_episodes
						} </li>
						<li>
							<span class="text-secondary">Last Episode To Air:</span> ${
								show.last_episode_to_air.name
							}
						</li>
						<li><span class="text-secondary">Status:</span> ${show.status}</li>
					</ul>
					<h4>Production Companies</h4>
					<div class="list-group">${show.production_companies
						.map((company) => `<span>${company.name}</span>`)
						.join(', ')}</div>
				</div>
	`;

	document.querySelector('#show-details').appendChild(tvShowDetailsDiv);
}

/**
 * Initializes Swiper.js with the given configuration.
 *
 * This function creates a new Swiper instance that displays one slide at a
 * time. It also sets up breakpoints to show two, three, or four slides at a
 * time when the window is resized to a width of 500px, 700px, and 1200px,
 * respectively. The autoplay feature is also enabled with a delay of 4
 * seconds and will not be disabled when the user interacts with the slider.
 */
function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}

async function displaySlider(endpoint) {
	const { results } = await fetchAPIData(endpoint);

	results.forEach((result) => {
		const sliderDiv = document.createElement('div');
		sliderDiv.classList.add('swiper-slide');

		sliderDiv.innerHTML = `
			<a ${
				endpoint === 'movie/now_playing'
					? `href="movie-details.html?id=${result.id}"`
					: `href="tv-details.html?id=${result.id}"`
			}>
			${
				result.poster_path
					? `<img
				src="https://image.tmdb.org/t/p/w500${result.poster_path}"
				alt="${endpoint === 'movie/now_playing' ? result.title : result.name}" />`
					: `<img
				src="images/no-image.jpg"
				alt="${endpoint === 'movie/now_playing' ? result.title : result.name}" />`
			}
			</a>
			<h4 class="swiper-rating">
				<i class="fas fa-star text-primary"></i>
							${result.vote_average.toFixed(1)} / 10
						</p>
			</h4>
		`;

		document.querySelector('.swiper-wrapper').appendChild(sliderDiv);

		initSwiper();
	});
}

function displayPagination() {
	const paginationDiv = document.createElement('div');

	paginationDiv.classList.add('pagination');
	paginationDiv.innerHTML = `
	<button class="btn btn-primary" id="prev">Prev</button>
	<button class="btn btn-primary" id="next">Next</button>
	<div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
	`;

	document.querySelector('#pagination').appendChild(paginationDiv);

	// Disable prev and next on first and last last page
	if (global.search.page === 1) {
		document.querySelector('#prev').disabled = true;
	}
	if (global.search.page === global.search.totalPages) {
		document.querySelector('#next').disabled = true;
	}

	// Next Page
	document.querySelector('#next').addEventListener('click', async () => {
		global.search.page++;

		const { results, total_pages } = await searchAPIData();
		displaySearchResults(results);
	});
	// Previous Page
	document.querySelector('#prev').addEventListener('click', async () => {
		global.search.page--;

		const { results, total_pages } = await searchAPIData();
		displaySearchResults(results);
	});
}

function displaySearchResults(results) {
	// Clear previous results
	document.querySelector('#search-results').innerHTML = '';
	document.querySelector('#search-results-heading').innerHTML = '';
	document.querySelector('#pagination').innerHTML = '';

	results.forEach((result) => {
		const movieDiv = document.createElement('div');

		movieDiv.classList.add('card');

		movieDiv.innerHTML = `
			<a href="${global.search.type}-details.html?id=${result.id}">
					${
						result.poster_path
							? `<img
						src="https://image.tmdb.org/t/p/w500${result.poster_path}"
						class="card-img-top"
						alt="${global.search.type === 'movie' ? result.title : result.name}"
					/>`
							: `<img
						src="images/no-image.jpg"
						class="card-img-top"
						alt="${global.search.type === 'movie' ? result.title : result.name}"
					/>`
					}
				</a>
				<div class="card-body">
					<h5 class="card-title">${
						global.search.type === 'movie' ? result.title : result.name
					}</h5>
					<p class="card-text">
						<small class="text-muted">Release: ${
							global.search.type === 'movie'
								? result.release_date
								: result.first_air_date
						}</small>
					</p>
				</div>
		`;

		document.querySelector('#search-results-heading').innerHTML = `
			<h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>
		`;
		document.querySelector('#search-results').appendChild(movieDiv);
	});

	displayPagination();
}

async function search() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	global.search.term = urlParams.get('search-term');
	global.search.type = urlParams.get('type');

	if (global.search.term !== '' && global.search.term !== null) {
		const { results, total_pages, page, total_results } = await searchAPIData();

		global.search.page = page;
		global.search.totalPages = total_pages;
		global.search.totalResults = total_results;

		if (results.length === 0) {
			showAlert('No results found', 'alert-error');
		}

		displaySearchResults(results);

		document.querySelector('#search-term').value = '';
	} else {
		showAlert('Please enter search term', 'alert-error');
	}
}

// Initialize App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displaySlider('movie/now_playing');
			displayPopularMovies();
			break;
		case '/shows.html':
			displaySlider('tv/airing_today');
			displayPopularShows();
			break;
		case '/movie-details.html':
			displayMovieDetails();
			break;
		case '/tv-details.html':
			displayTVShowDetails();
			break;
		case '/search.html':
			search();
			break;
	}

	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
