let thumbsUp = 0
let thumbsDown = 0

function searchMoviesDiv(poster,title,user){

    const searchMoviesRow = document.createElement('div')
    searchMoviesRow.style.width = '20%'

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1', 'shadow')
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
    userRating.innerHTML= `<strong>user rating:</strong>     <i class="fa-solid fa-fire" id="fire"></i>  ${user}% `
   
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
            'X-RapidAPI-Key': '2cc187e818msha0f85d795d7283dp105ac7jsnc6ba1cd15569',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            const movieResults = (data.data.search.movies)
            movieResults.forEach(movie => {

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
            'X-RapidAPI-Key': '2cc187e818msha0f85d795d7283dp105ac7jsnc6ba1cd15569',
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
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1', 'shadow')
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
    releaseDate.innerHTML= `<strong>Release Date</strong>   <i class="fa-solid fa-calendar-xmark" id="calender"></i> :    ${date}`

    const userRating = document.createElement('p')
    userRating.classList.add('card-text','ms-1')
    userRating.innerHTML= `<strong>user rating:</strong>     <i class="fa-solid fa-fire" id="fire"></i>  ${user}% `

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
            'X-RapidAPI-Key': '2cc187e818msha0f85d795d7283dp105ac7jsnc6ba1cd15569',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const upcomingMovies = (data.data.upcoming)
        upcomingMovies.forEach( movie => { 
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
    cardDiv.classList.add('card','mb-3','ms-1','me-1', 'shadow')
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
    movieRating.innerHTML= `<strong>Rank:</strong>   <i class="fa-solid fa-ranking-star" id="rank"></i>       ${rank}`

    const userRating = document.createElement('p')
    userRating.classList.add('card-text')
    userRating.innerHTML= `<strong>user rating:</strong>   <i class="fa-solid fa-fire" id="fire"></i>        ${user}%`

    cardBody.appendChild(movieTitle)
    cardBody.appendChild(movieRating)
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
            'X-RapidAPI-Key': '2cc187e818msha0f85d795d7283dp105ac7jsnc6ba1cd15569',
		    'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const movieArrays = data.data.popularity
        movieArrays.forEach( movie => {  
            const title = movie.name
            const poster = movie.posterImage.url

            let user;

            if(movie.userRating === null){
                user = parseInt(0,10);
            }else{
                user = movie.userRating.dtlLikedScore;
            }

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
    const signUpDiv = document.querySelector('#signupdiv')
    const homePageDiv = document.querySelector('#homepage')
    const upcomingMoviesDiv = document.querySelector('#upcomingmovies')
    const topMoviesDiv = document.querySelector('#topmovies')
    const searchMoviesDiv = document.querySelector('#searchmovies')    

    const signUpForm = document.querySelector('#signupform')
    const logInForm = document.querySelector('#loginform')
    const homeSearchForm = document.querySelector('#homepagesearchform')
    const navSearchForm = document.querySelector('#searchform')

    const topmoviesNav = document.getElementById('topmoviesnav')
    const homeMoviesNav = document.getElementById('homemoviesnav')
    const upcomingMoviesNav = document.getElementById('upcomingmoviesnav')
    const logOutNav = document.getElementById('logoutnav')

    logInForm.addEventListener('submit', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'flex'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
        logInForm.reset()
    })

    document.getElementById('createaccount').addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'flex'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'flex'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
        signUpForm.reset()
    })

    topmoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'flex'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    homeMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'flex'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    homeMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'flex'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    upcomingMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'flex'
        searchMoviesDiv.style.display = 'none'
    })

    logOutNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'flex'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    homeSearchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'flex'
        homeSearchForm.reset()
    })

    navSearchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'flex'
        navSearchForm.reset()
    })

})