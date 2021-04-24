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
const specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // from OWASP site in Readme
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqurstuvwxyz";
const numeric = "01234565789";

function generatePassword() {
  let pwdLength;
  let pwd;
  let chrTypesSelected = []; // records what character sets are going to be used (-1 = not used, 0=used) upper/lower/num/special
  let pwdValidation = [];

  // get pwd length - using a prompt (convert to number and check to be sure it is a number)
  do {
    pwdLength = Number(
      prompt(
        "Please enter the number of character (8-128) you need in your password:"
      )
    );
    if (pwdLength < 8 || pwdLength > 128 || isNaN(pwdLength)) {
      alert("That was not a valid entry. Please try again.");
    }
  } while (pwdLength < 8 || pwdLength > 128 || isNaN(pwdLength));

  // user confirm to get character types these are stored in an array of -1 = no and 0 = yes (values are used later)
  do {
    chrTypesSelected = [-1, -1, -1, -1];
    if (confirm("Would you like to include uppercase characters?")) {
      chrTypesSelected[0] = 0;
    }
    if (confirm("Would you like to include lowercase characters?")) {
      chrTypesSelected[1] = 0;
    }
    if (confirm("Would you like to include numberic characters?")) {
      chrTypesSelected[2] = 0;
    }
    if (confirm("Would you like to include special characters?")) {
      chrTypesSelected[3] = 0;
    }

    // if there are no 0s in the array, then give error to choose 1
    if (!chrTypesSelected.includes(0)) {
      alert("You must choose at least one character type. Please try again.");
    }
  } while (!chrTypesSelected.includes(0));

  // generate actual password - assign the chrTypesSelected to the pwdValidation array to ensure we have at least one of each character type
  do {
    let chrChoice; // block level variable used to store random number
    pwdValidation = chrTypesSelected.slice(); // set the types to count while presevering original

    pwd = ""; // clear password
    for (let i = 0; i < pwdLength; i++) {
      // select a random type (this looks at chrType and ensures it was selected eles then repeats)
      do {
        chrChoice = Math.floor(Math.random() * 4);
      } while (chrTypesSelected[chrChoice] === -1);

      // select which chrType to add to the pwd
      if (chrChoice === 0) {
        pwd += uppercase[Math.floor(Math.random() * uppercase.length)];
        pwdValidation[0]++;
      } else if (chrChoice === 1) {
        pwd += lowercase[Math.floor(Math.random() * lowercase.length)];
        pwdValidation[1]++;
      } else if (chrChoice === 2) {
        pwd += numeric[Math.floor(Math.random() * numeric.length)];
        pwdValidation[2]++;
      } else if (chrChoice === 3) {
        pwd +=
          specialCharacters[Math.floor(Math.random() * specialChars.length)];
        pwdValidation[3]++;
      }
    }
  } while (pwdValidation.includes(0));

  return pwd;
}
