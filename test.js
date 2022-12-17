function MoviesDiv(poster,title,user){

    const MoviesRow = document.createElement('div')
    MoviesRow.style.width = '20%'

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1')
    cardDiv.id = 'moviecard'

    const moviePoster = document.createElement('img')
    moviePoster.src = poster
    moviePoster.style.width = '100%'
    moviePoster.alt = 'movie poster'
    moviePoster.classList.add('card-img-top')
    moviePoster.id = 'cardimg'

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const movieTitle = document.createElement('strong')
    movieTitle.classList.add('card-text','ms-1')
    movieTitle.id = 'movietitle'
    movieTitle.innerText = title

    const userRating = document.createElement('p')
    userRating.classList.add('card-text','ms-1')
    userRating.innerHTML= `user rating:     <i class="fa-solid fa-fire" id="fire"></i>  ${user}% `

    cardBody.appendChild(movieTitle)
    cardBody.appendChild(userRating)

    cardDiv.appendChild(moviePoster)
    cardDiv.appendChild(cardBody)

    MoviesRow.appendChild(cardDiv)

    return MoviesRow
}

function searchMovies(){

    const searchForm = document.getElementById('searchform')
    searchForm.addEventListener('submit', (e) => {

        e.preventDefault()
        const movie = document.getElementById('moviename').value
        
        fetch(`https://flixster.p.rapidapi.com/search?query=${movie}&zipCode=90002&radius=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'cd83e91e5fmsheda6c39c3e92390p17f992jsn51ea51b88097',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            const movieResults = data.data.search.movies
            movieResults.forEach(movie => {
                console.log(movie)
                const title = movie.name

                let poster; 
                if(movie.posterImage === null){
                    poster = 'logo.png'
                }else{
                    poster = movie.posterImage.url
                }

                let user;
                if(movie.userRating.dtlLikedScore === null){
                    user = 0
                }else{
                    user = movie.userRating.dtlLikedScore
                }

                const movies = MoviesDiv(poster,title,user)
                document.getElementById('searchmovies').append(movies)
            });
        })

        searchForm.reset()
    })
}

function fetchUpcomingMovies(){
    fetch('https://flixster.p.rapidapi.com/movies/get-upcoming?countryId=usa&limit=100', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '2d19da3935msh75738651fc8a894p14a018jsn9c623ecce237',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const upcomingMovies = (data.data.upcoming)
        upcomingMovies.forEach( movie => { 
            console.log(movie)
            const title = movie.name
            const poster = movie.posterImage.url

            let user;
            if(movie.userRating.dtlLikedScore === null){
                user = 0
            }else{
                user = movie.userRating.dtlLikedScore
            }


            const date = movie.releaseDate
            const movies = MoviesDiv(poster,title,date,user)
            document.getElementById('upcomingmovies').append(movies)
        });
    })
}

function fetchTopMovies(){
    fetch(`https://flixster.p.rapidapi.com/movies/get-popularity?zipCode=90002&radius=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '2d19da3935msh75738651fc8a894p14a018jsn9c623ecce237',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const movieArrays = data.data.popularity
        movieArrays.forEach( movie => {  
            const title = movie.name
            const poster = movie.posterImage.url
            const user = movie.userRating.dtlLikedScore
            const rank = movie.sortPopularity
            const movies = topMoviesDiv(poster,title,rank,user)
            document.getElementById('topmovies').append(movies)
            
        });
    })
}

document.addEventListener('DOMContentLoaded', () => {
    searchMovies()
   
})