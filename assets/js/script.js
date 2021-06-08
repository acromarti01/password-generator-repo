const button = document.getElementById("generate");
const arrayofLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const arrayOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayOfSpecialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split(""); /*Needed to put two escape \ */
let lowerOrUpperCase = "lowercase";

button.addEventListener("click", function () {
    const userChoices = getUserChoices();
    const result = generatePassword(userChoices);
    const textAreaEl = document.querySelector("textarea");
    textAreaEl.placeholder = `Your Secure Password\n\n${result}`;
});
function getUserChoices() {
    const passwordLength = getPasswordLength();
    const addLowercase = confirm("Do you want lowercase letters in the password?");
    const addUppercase = confirm("Do you want uppercase letters in the password?");
    const addNumbers = confirm("Do you want numbers in the password?");
    const addSpecialCharacters = confirm("Do you want special characters in the password?");
    const userChoices = {
        passwordLength: passwordLength,
        includeLowercaseChars: addLowercase,
        includeUppercaseChars: addUppercase,
        includeNumbers: addNumbers,
        includeSpecialChars: addSpecialCharacters
    };
    return userChoices;
}
function getPasswordLength() {
    const passwordLength = prompt("Please choose length of password.\nMust be at least 8 characters and no more than 128 characters.\n(Example: 9)");
    if (arrayofLetters.includes(passwordLength.toLowerCase())) { return getPasswordLength(); }
    if (arrayOfSpecialCharacters.includes(passwordLength)) { return getPasswordLength(); }
    if (Number(passwordLength) < 8 || Number(passwordLength) > 128) { return getPasswordLength(); }
    return passwordLength;
}
function generatePassword(userChoices) {
    let result = "";
    // If user did not choose any character types in the password
    if (!userChoices.includeLowercaseChars &&
        !userChoices.includeUppercaseChars &&
        !userChoices.includeNumbers &&
        !userChoices.includeSpecialChars) {
        return "NO PASSWORD \n Must Enter At Least One Character Type";
    }
    // If user only chose LETTERS in the password
    else if ((userChoices.includeLowercaseChars || userChoices.includeUppercaseChars) &&
        !userChoices.includeNumbers &&
        !userChoices.includeSpecialChars) {
        for (let i = 0; i < Number(userChoices.passwordLength); i++) {
            const item = getLetter(userChoices);
            result = result + item;
        }
    }
    // If user only chose NUMBERS in the password
    else if (!userChoices.includeLowercaseChars &&
        !userChoices.includeUppercaseChars &&
        userChoices.includeNumbers &&
        !userChoices.includeSpecialChars) {
        for (let i = 0; i < Number(userChoices.passwordLength); i++) {
            const item = getNumber();
            result = result + item;
        }
    }
    // If user only chose SPECIAL CHARACTERS in the password
    else if (!userChoices.includeLowercaseChars &&
        !userChoices.includeUppercaseChars &&
        !userChoices.includeNumbers &&
        userChoices.includeSpecialChars) {
        for (let i = 0; i < Number(userChoices.passwordLength); i++) {
            const item = getSpecialCharacter();
            result = result + item;
        }
    }
    // If user chooses mutiple character types
    else {
        let isLetterAvailable = true;
        let isNumberAvailable = true;
        let isSpecialCharAvailable = true;
        for (let i = 0; i < Number(userChoices.passwordLength); i++) {
            if (userChoices.includeLowercaseChars || userChoices.includeUppercaseChars) {
                //Prevents adding a letter to password if last character added was a letter
                if (isLetterAvailable) {
                    const item = getLetter(userChoices);
                    result = result + item;
                    isLetterAvailable = false;
                    continue;
                }
            }
            if (userChoices.includeNumbers) {
                //Prevents adding a number to password if last character added was a number
                if (isNumberAvailable) {
                    const item = getNumber();
                    result = result + item;
                    isNumberAvailable = false;
                    continue;
                }
            }
            if (userChoices.includeSpecialChars) {
                //Prevents adding a special character to password if last character added was a special character
                if (isSpecialCharAvailable) {
                    const item = getSpecialCharacter();
                    result = result + item;
                }
            }
            isLetterAvailable = true;
            isNumberAvailable = true;
            isSpecialCharAvailable = true;
        }
    }
    return result;
}
function getLetter(userChoices) {
    const randomIndex = Math.floor(Math.random() * arrayofLetters.length);
    let createLetter = arrayofLetters[randomIndex];
    if (userChoices.includeLowercaseChars && !userChoices.includeUppercaseChars) {
        createLetter = createLetter.toLowerCase();
        return createLetter;
    }
    else if (!userChoices.includeLowercaseChars && userChoices.includeUppercaseChars) {
        createLetter = createLetter.toUpperCase();
        return createLetter;
    }
    else {
        if (lowerOrUpperCase.toLowerCase() === "lowercase") {            
            createLetter = createLetter.toLowerCase();
            lowerOrUpperCase = "uppercase";
            return createLetter;
        }
        else {            
            createLetter = createLetter.toUpperCase();
            lowerOrUpperCase = "lowercase";
            return createLetter;
        }
    }
}
function getNumber() {
    const randomIndex = Math.floor(Math.random() * arrayOfNumbers.length);
    return String(arrayOfNumbers[randomIndex]);
}
function getSpecialCharacter() {
    const randomIndex = Math.floor(Math.random() * arrayOfSpecialCharacters.length);
    return arrayOfSpecialCharacters[randomIndex];
}



