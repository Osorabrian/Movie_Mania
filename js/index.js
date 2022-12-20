// function that creates and returns a div used to display serched movie results
function searchMoviesDiv(poster,title,user){
    // create div
    const searchMoviesRow = document.createElement('div')
    searchMoviesRow.style.width = '20%'
    // create card
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1', 'shadow')
    cardDiv.id = 'moviecard'
    // create and add card image
    const moviePoster = document.createElement('img')
    moviePoster.src = poster
    moviePoster.style.width = '100%'
    moviePoster.alt = 'movie poster'
    moviePoster.classList.add('card-img-top')
    moviePoster.id = 'cardimg'
    // create card body
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    // create and add card title
    const movieTitle = document.createElement('strong')
    movieTitle.classList.add('card-text','ms-1')
    movieTitle.id = 'movietitle'
    movieTitle.innerText = title
    // create and add card text
    const userRating = document.createElement('p')
    userRating.classList.add('card-text','ms-1')
    userRating.innerHTML= `<strong>user rating:</strong>     <i class="fa-solid fa-fire" id="fire"></i>  ${user}% `
   // append child elements to card body
    cardBody.appendChild(movieTitle)
    cardBody.appendChild(userRating)
    // append child elements to card
    cardDiv.appendChild(moviePoster)
    cardDiv.appendChild(cardBody)
    // append card to div
    searchMoviesRow.appendChild(cardDiv)
    // return div
    return searchMoviesRow

    
}

// function used to fetch for searched movies from the API
function searchMovies(){
    // grab search form on navbar
    const searchForm = document.getElementById('searchform')
    // listen to submit event from search form
    searchForm.addEventListener('submit', (e) => {

        e.preventDefault()
        // get the value from the input field
        const movie = document.getElementById('moviename').value
        // fetch function to grab the movie that is been searched for
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
                // conditional statement to check if the movie poster is null
                let poster; 
                if(movie.posterImage === null){
                    poster = 'logo.png'
                }else{
                    poster = movie.posterImage.url
                }
                // conditional statement to check if the user rating is null
                let user;
                if(movie.userRating.dtlLikedScore === null){
                    user = 0
                }else{
                    user = movie.userRating.dtlLikedScore
                }
                // function call for rendering the searched movies
                const movies = searchMoviesDiv(poster,title,user)
                // append the returned div to searchmovies div
                document.getElementById('searchmovies').append(movies)
            });
        })
        searchForm.reset()
    })
    
}

// function used to fetch for searched movies from the home page search form
function homepagesearchMovies(){
    // grab the search form from the home page
    const searchForm = document.getElementById('homepagesearchform')
    // listen to search button when submitted at the home age search form
    searchForm.addEventListener('submit', (e) => {

        e.preventDefault()

        const movie = document.getElementById('homemoviename').value
        // fetch the movie been searched for and allocate the results to 
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
                // function call to render searched movies to searchmovies div
                const movies = searchMoviesDiv(poster,title,user)
                document.getElementById('searchmovies').append(movies)
            });
        })

        searchForm.reset()
    })
    
}

//function used to create a div to display upcoming movies
function upcomingMoviesDiv (poster,title,date,user){
    // create div
    const upcomingMoviesRow = document.createElement('div')
    upcomingMoviesRow.style.width = '20%'
    // create card
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1', 'shadow')
    cardDiv.id = 'moviecard'
    // create card image and add image
    const moviePoster = document.createElement('img')
    moviePoster.src = poster
    moviePoster.style.width = '100%'
    moviePoster.alt = 'movie poster'
    moviePoster.classList.add('card-img-top')
    moviePoster.id = 'cardimg'
    // create card body div
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    // create card text for movie title
    const movieTitle = document.createElement('strong')
    movieTitle.classList.add('card-text','ms-1')
    movieTitle.id = 'movietitle'
    movieTitle.innerText = title
    // create card text for release date
    const releaseDate = document.createElement('p')
    releaseDate.classList.add('card-text','ms-1')
    releaseDate.innerHTML= `<strong>Release Date</strong>   <i class="fa-solid fa-calendar-xmark" id="calender"></i> :    ${date}`
    // create cad text for user rating
    const userRating = document.createElement('p')
    userRating.classList.add('card-text','ms-1')
    userRating.innerHTML= `<strong>user rating:</strong>     <i class="fa-solid fa-fire" id="fire"></i>  ${user}% `
    // append image nad card texts elements to the card body div
    cardBody.appendChild(movieTitle)
    cardBody.appendChild(releaseDate)
    cardBody.appendChild(userRating)
    // append movie poster and card body to card
    cardDiv.appendChild(moviePoster)
    cardDiv.appendChild(cardBody)
    // append the card to div
    upcomingMoviesRow.appendChild(cardDiv)

    return upcomingMoviesRow
}

// function used to fetch upcoming movies from API
function fetchUpcomingMovies(){
    // fetch upcoming movies
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
            // conditional statement to check if the user rating is null
            let user;
            if(movie.userRating.dtlLikedScore === null){
                user = 0
            }else{
                user = movie.userRating.dtlLikedScore
            }
            const date = movie.releaseDate
            // invoke function to create a card div
            const movies = upcomingMoviesDiv(poster,title,date,user)
            document.getElementById('upcomingmovies').append(movies)
        });
    })
}

// function used to create a div used to display top movies
function topMoviesDiv (image,title,rank,user){
    // create div
    const row = document.createElement('div')
    row.style.width = '20%'
    // create card
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3','ms-1','me-1', 'shadow')
    cardDiv.id = 'moviecard'
    // create and add movie poster
    const moviePoster = document.createElement('img')
    moviePoster.src = image
    moviePoster.style.width = '100%'
    moviePoster.alt = 'movie poster'
    moviePoster.classList.add('card-img-top')
    moviePoster.id = 'cardimg'
    // create card body
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    // create card text for the movie title
    const movieTitle = document.createElement('strong')
    movieTitle.classList.add('card-text')
    movieTitle.id = 'movietitle'
    movieTitle.innerText = title
    // create card text for movie ranking
    const movieRating = document.createElement('p')
    movieRating.classList.add('card-text')
    movieRating.innerHTML= `<strong>Rank:</strong>   <i class="fa-solid fa-ranking-star" id="rank"></i>       ${rank}`
    // create card text for user rating
    const userRating = document.createElement('p')
    userRating.classList.add('card-text')
    userRating.innerHTML= `<strong>user rating:</strong>   <i class="fa-solid fa-fire" id="fire"></i>        ${user}%`
    // append title,movie rating and user rating to the card body 
    cardBody.appendChild(movieTitle)
    cardBody.appendChild(movieRating)
    cardBody.appendChild(userRating)
    // append card body and movie poster to the card
    cardDiv.appendChild(moviePoster)
    cardDiv.appendChild(cardBody)
    // append card to div
    row.appendChild(cardDiv)

    return row
}

// function used to fetch top movies from API
function fetchTopMovies(){
    // GET top movies
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
            // conditional statement to check if the rating is null
            let user;
            if(movie.userRating === null){
                user = parseInt(0,10);
            }else{
                user = movie.userRating.dtlLikedScore;
            }

            const rank = movie.sortPopularity
            // invoke function for creating top movies div
            const movies = topMoviesDiv(poster,title,rank,user)
            document.getElementById('topmovies').append(movies)
        });
    })
}


document.addEventListener('DOMContentLoaded', () => {
    // invoke functions for creating divs
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

    // event listener for the log in form to log in to page
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

    // event listener for the log in form to open sign up form
    document.getElementById('createaccount').addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'block'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    // event listener for sign up form to create account
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const pass1 = document.getElementById('password1').value
        const pass2 = document.getElementById('password2').value

        if(pass1 !== pass2){
            alert("passwords dont match")
        }else{
            logInDiv.style.display = 'none'
            signUpDiv.style.display = 'none'
            homePageDiv.style.display = 'flex'
            topMoviesDiv.style.display = 'none'
            upcomingMoviesDiv.style.display = 'none'
            searchMoviesDiv.style.display = 'none'
            alert(`Welcome ${document.getElementById('fullname').value}`)
        }
        signUpForm.reset() 
    })

    // event listener for the top movies nav bar navigation
    topmoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'flex'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    // event listener for the home menu nav bar
    homeMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'flex'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    // event listener for upcoming movies link on nav bar
    upcomingMoviesNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'none'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'flex'
        searchMoviesDiv.style.display = 'none'
    })

    // event listener for the log out link on nav bar
    logOutNav.addEventListener('click', (e) => {
        e.preventDefault()
        logInDiv.style.display = 'block'
        signUpDiv.style.display = 'none'
        homePageDiv.style.display = 'none'
        topMoviesDiv.style.display = 'none'
        upcomingMoviesDiv.style.display = 'none'
        searchMoviesDiv.style.display = 'none'
    })

    // event listener for the search form on home page
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

    // event listener for the search form on nav bar
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