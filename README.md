# cosbyFlixx App

cosbyFlixx App is a vanilla JavaScript project that displays information about movies and TV shows using The Movie Database (TMDB) API. This project is part of the JavaScript course from Brad Traversy and serves as a practice exercise for interacting with APIs, manipulating the DOM, and enhancing user interface functionality.

## Features

- **Movie and TV Show Listings**: Browse popular movies and TV shows.
- **Detailed Information**: View details such as ratings, overviews, and release dates.
- **Responsive Design**: The app is designed to work on various screen sizes.

## Technologies Used

- **JavaScript (Vanilla)**: For application logic and DOM manipulation.
- **TMDB API**: To fetch movie and TV show data.
- **HTML & CSS**: For structuring and styling the application.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/cosbyDeveloper/cosbyFlixx-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cosbyFlixx-app
   ```
3. Open the `index.html` file in a browser to run the app.

## Usage

- Browse through the displayed movie and TV show lists.
- Click on a movie or TV show to view more details.

## API Key

This project requires an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/). Sign up for an account, navigate to the API section, and generate your API key. Add the key to the file as shown above.

In this version, we used the Authorization header to pass the bearer token. as shown below.

```javascript
const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer YOUR_TOKEN',
	},
};
```

**Note**: For simplicity, the bearer token was used directly in the code. In a real-world application, it is recommended to store the API key in a secure way, such as a .env file or a server-side environment variable. Locate the script.js file and replace the bearer your token or you can change the style and use the API key.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API.
- Inspiration and guidance from the JavaScript course by [Brad Traversy](https://www.udemy.com/user/brad-traversy/).
