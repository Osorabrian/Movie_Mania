// function passwordMatch (){

//     const pass1 = document.getElementById('password1')
//     const pass2 = document.getElementById('password2')

//     if(pass1 === ''){
//         alert('Please enter the password')
//     }else if(pass2 === ''){
//         alert('please confirm the password')
//     }else if(pass2 !== pass1){
//         alert('passwords do not match')
//         return false
//     }else{
//         'Congratulations log in'
//         return true
//     }
// }

function topMoviesDiv (image,title,tomato,user){

    const row = document.createElement('div')
    row.style.width = '20%'

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3', 'ms-1', 'me-1')
    cardDiv.id = 'moviecard'
    // cardDiv.style.width = '16%'

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
    movieRating.innerText = 'Ratings'

    const tomatoRating = document.createElement('p')
    tomatoRating.classList.add('card-text')
    tomatoRating.innerHTML = `tomato:  <i class="fa-solid fa-pizza-slice" id="pizza"></i>        ${tomato}%`

    const userRating = document.createElement('p')
    userRating.classList.add('card-text')
    userRating.innerHTML= `user:   <i class="fa-solid fa-fire" id="fire"></i>        ${user}%`

    cardBody.appendChild(movieTitle)
    cardBody.appendChild(movieRating)
    cardBody.appendChild(tomatoRating)
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
            const tomato = movie.tomatoRating.tomatometer
            const user = movie.userRating.dtlLikedScore
            const movies = topMoviesDiv(poster,title,tomato,user)
            document.getElementById('topmovies').append(movies)
            
        });
    })
}


document.addEventListener('DOMContentLoaded', () => {
    fetchTopMovies()
    // passwordMatch()
    // const logInDiv = document.getElementById('logindiv')
    // const logInForm = document.getElementById('loginform')

    // logInForm.addEventListener('submit', () => {
    //     logInDiv.style.display = 'none'
// })
})