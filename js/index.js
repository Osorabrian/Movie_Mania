function searchMoviesDiv(poster,title,user){

    const searchMoviesRow = document.createElement('div')
    searchMoviesRow.style.width = '20%'

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

    searchMoviesRow.appendChild(cardDiv)

    return searchMoviesRow
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
            'X-RapidAPI-Key': '2d19da3935msh75738651fc8a894p14a018jsn9c623ecce237',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            const movieResults = (data.data.search.movies)
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

                const movies = searchMoviesDiv(poster,title,user)
                document.getElementById('searchmovies').append(movies)
            });
        })

        searchForm.reset()
    })
    
}

function homepagesearchMovies(){

    const searchForm = document.getElementById('homepagesearchform')
    
    searchForm.addEventListener('submit', (e) => {

        e.preventDefault()

        const movie = document.getElementById('homemoviename').value
        
        fetch(`https://flixster.p.rapidapi.com/search?query=${movie}&zipCode=90002&radius=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '2d19da3935msh75738651fc8a894p14a018jsn9c623ecce237',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            const movieResults = (data.data.search.movies)
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

                const movies = searchMoviesDiv(poster,title,user)
                document.getElementById('searchmovies').append(movies)
            });
        })

        searchForm.reset()
    })
    
}

function upcomingMoviesDiv (poster,title,date,user){

    const upcomingMoviesRow = document.createElement('div')
    upcomingMoviesRow.style.width = '20%'

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

    const releaseDate = document.createElement('p')
    releaseDate.classList.add('card-text','ms-1')
    releaseDate.innerHTML= `Release Date <i class="fa-solid fa-calendar-xmark" id="calender"></i> :    ${date}`

    const userRating = document.createElement('p')
    userRating.classList.add('card-text','ms-1')
    userRating.innerHTML= `user rating:     <i class="fa-solid fa-fire" id="fire"></i>  ${user}% `

    cardBody.appendChild(movieTitle)
    cardBody.appendChild(releaseDate)
    cardBody.appendChild(userRating)

    cardDiv.appendChild(moviePoster)
    cardDiv.appendChild(cardBody)

    upcomingMoviesRow.appendChild(cardDiv)

    return upcomingMoviesRow
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
            const movies = upcomingMoviesDiv(poster,title,date,user)
            document.getElementById('upcomingmovies').append(movies)
        });
    })
}

function topMoviesDiv (image,title,rank,user){

    const row = document.createElement('div')
    row.style.width = '20%'

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1')
    cardDiv.id = 'moviecard'

    const moviePoster = document.createElement('img')
    moviePoster.src = image
    moviePoster.style.width = '100%'
    moviePoster.alt = 'movie poster'
    moviePoster.classList.add('card-img-top')
    moviePoster.id = 'cardimg'

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const movieTitle = document.createElement('strong')
    movieTitle.classList.add('card-text')
    movieTitle.id = 'movietitle'
    movieTitle.innerText = title

    const movieRating = document.createElement('p')
    movieRating.classList.add('card-text')
    movieRating.innerHTML= `Rank:   <i class="fa-solid fa-ranking-star"></i>       ${rank}`

    const userRating = document.createElement('p')
    userRating.classList.add('card-text')
    userRating.innerHTML= `user rating:   <i class="fa-solid fa-fire" id="fire"></i>        ${user}%`

    cardBody.appendChild(movieTitle)
    cardBody.appendChild(releaseDate)
    cardBody.appendChild(userRating)

    cardDiv.appendChild(moviePoster)
    cardDiv.appendChild(cardBody)

    row.appendChild(cardDiv)

    return row
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
    fetchUpcomingMovies()
    fetchTopMovies()

    const logInDiv = document.querySelector('#logindiv')
    const logInForm = document.querySelector('#loginform')

    const signUpDiv = document.querySelector('#signupdiv')
    const signUpForm = document.querySelector('#signupform')

    const topmoviesNav = document.getElementById('topmoviesnav')
    const homeMoviesNav = document.getElementById('homemoviesnav')
    const upcomingMoviesNav = document.getElementById('upcomingmoviesnav')
    const logOutNav = document.getElementById('logoutnav')

    const homePageDiv = document.querySelector('#homepage')
    const upcomingMoviesDiv = document.querySelector('#upcomingmovies')
    const topMoviesDiv = document.querySelector('#topmovies')
    
    logInForm.addEventListener('submit', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        homePageDiv.style.display = 'block'

    })

    document.getElementById('createaccount').addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'block'
    })

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault()
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'block'
    })

    topmoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'block'
    })

    homeMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        topMoviesDiv.style.display = 'none'
        homePageDiv.style.display = 'block'
    })

    homeMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        topMoviesDiv.style.display = 'none'
        homePageDiv.style.display = 'block'
    })

    upcomingMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        homePageDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'block'
    })

    logOutNav.addEventListener('click', (e) => {
        e.preventDefault()
        upcomingMoviesDiv.style.display = 'none'
        logInDiv.style.display = 'block'
    })
})