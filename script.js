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
const OWASPSpecialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphaLower = "abcdefghijklmnopqurstuvwxyz";
const numeric = "01234565789";

function generatePassword() {
  var pwdLength = getPwdLength();

  return "test password (length: " + pwdLength + ")";
}

/* Prompts the user to enter a password that has a length value between 8 and 
   128 characters. It will loop while the user attempts this. If the user enters
   a cancel, it will return  "cancel". */
function getPwdLength() {
  let input = 0; // leave 0 in case someone leaves the prompt blank it won't return "cancel"
  let msg = "How many characters would you like in your password? (8-128)";
  let length; // declared here for scope outside of "do/while" block
  let hadError = false; // flag to check if we need to add error message

  do {
    input = prompt(msg, "(8-128)");
    if (input == null || input == "") {
      return "cancel";
    }

    // convert the input to an integer. if it is not an integer, then it will be a NaN
    length = parseInt(input);

    if (length < 8 || length > 128 || isNaN(length)) {
      if (!hadError) {
        msg = msg + "\n\n That was an invalid answer, please try again.";
        hadError = true;
      }
    } else {
      return length;
    }
  } while (true); // continuous loop, because if success, the value is returned
}
