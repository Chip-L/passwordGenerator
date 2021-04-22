// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/********************************** My Code  **********************************/
// This is a list of global constants
const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // from OWASP site in Readme
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqurstuvwxyz";
const numeric = "01234565789";
const chrTypes = ["uppercase", "lowercase", "numeric", "special characters"];

/* Main function to generate password. This will mainly just call other 
  functions to get the data and then return the data needed */
function generatePassword() {
  //get length
  let pwdLength = getPwdLength();
  if (pwdLength === "cancel") {
    return null; //exit with no password (should leave default text)
  }

  //get character types (an array)
  let pwdChrTypes = getChrTypes();
  if (pwdChrTypes === "cancel") {
    return null; //exit with no password (should leave default text)
  }

  return (
    "test password details: \n" +
    "length: " +
    pwdLength +
    "\n" +
    "chartypes: " +
    pwdChrTypes
  );
}

/* Prompts the user to enter a password length value between 8 and 128 
   characters. It will loop while the user attempts this. If the user enters a
   cancel, it will return  "cancel". */
function getPwdLength() {
  let input = 0; // leave 0 in case someone leaves the prompt blank it won't return "cancel"
  let length; // declared here for scope outside of "do/while" block
  let badEntry = ""; // variable that will store bad entry text

  do {
    input = prompt(
      `How many characters would you like in your password? (8-128)${badEntry}`,
      "(8-128)"
    );
    if (input == null || input == "") {
      return "cancel";
    }

    // convert the input to an integer. if it is not an integer, then it will be a NaN
    length = parseInt(input);

    if (length < 8 || length > 128 || isNaN(length)) {
      badEntry = "\n\n That was an invalid answer, please try again.";
    } else {
      return length;
    }
  } while (true); // continuous loop, because if success, the value is returned
}

/* This will open a series of prompts asking what types of values the user wants 
   to use in their password. If "Cancel" is ever clicked, cancel is returned. */
function getChrTypes() {
  let arrReturn = []; //the list of items to return
  let type = "";
  let badEntry = "";
  let noChoice = "";

  do {
    // iterate through the array, prompting yes/no to get if we want to use the type
    for (let i = 0; i < chrTypes.length; i++) {
      badEntry = ""; // clear out any bad entry messages
      type = chrTypes[i];

      while (true) {
        // loop until the valid answer executes a break
        let answer = prompt(
          `Would you like to use ${type} characters? (yes/no)${badEntry}${noChoice}`,
          "yes"
        ); // get answer (msg should show any errors)
        if (answer == null) {
          return "cancel";
        }

        answer = answer.toLowerCase(); // make answer case insensitive

        //validate we have a valid answer
        if (answer === "y" || answer === "yes") {
          arrReturn.push(chrTypes[i]); // records the choice
          break; // breaks out of the while, to move back to the for loop
        } else if (answer === "n" || answer === "no") {
          break; // breaks out of the while, to move back to the for loop
        } else {
          badEntry = "\n\nI'm sorry that was an invalid answer.";
        }
      }
    }
    noChoice = "\n\nRemember, you must choose at least one type.";
  } while (arrReturn.length < 1);

  return arrReturn;
}
