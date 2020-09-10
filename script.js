const slider = document.getElementById('passwordLengthSlider')
const passwordLengthBox = document.getElementById('passwordLength')
const form = document.getElementById('form')
const passwordBox = document.getElementById('pass-box')

// get the ascii arrays for the characters
const UpperCase = genArray(65, 90)
const LowerCase = genArray(97, 122)
const numbers = genArray(48,57)
const symbols = genArray(33, 47).concat(genArray(58,64)).concat(genArray(91,96)).concat(genArray(123,126))

// Match slider and number box
slider.addEventListener('input', syncValues)
passwordLengthBox.addEventListener('input', syncValues)

// On submitting the form, generate a random string of passwords from the choices made 
form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const includeSymbol = document.getElementById('containSymbol').checked
    const includeUppercase = document.getElementById('containUppercase').checked
    const includeLowercase = document.getElementById('containLowercase').checked
    const includeNumbers = document.getElementById('containNumbers').checked

    const passwordLength = document.getElementById('passwordLength').value
    
    let password = []

    if (includeUppercase) password = password.concat(UpperCase)
    if (includeLowercase) password = password.concat(LowerCase)
    if (includeNumbers) password = password.concat(numbers)
    if (includeSymbol) password = password.concat(symbols)

    let passwordString = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomChar = password[Math.floor(Math.random()*(password.length - 1))]
        // console.log(randomChar)
        passwordString += randomChar
    }

    // console.log(passwordString);
    passwordBox.innerHTML = passwordString;
})

// function to generate arrays having characters from their ASCII values
function genArray(low, high) {
    const newArray = []
    for(let num = low; num <= high; num++ ) {
        let newChar = String.fromCharCode(num)
        newArray.push(newChar);
    }
    return newArray;
}

// function to sync those values
function syncValues(e) {
    let value = e.target.value
    slider.value = value
    passwordLengthBox.value = value
}