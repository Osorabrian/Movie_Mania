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

document.addEventListener('DOMContentLoaded', () => {
    // passwordMatch()
    const logInDiv = document.getElementById('logindiv')
    const logInForm = document.getElementById('loginform')

    logInForm.addEventListener('submit', () => {
        logInDiv.style.display = 'none'
        
    
})
})