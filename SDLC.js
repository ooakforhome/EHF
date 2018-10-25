npm i --save --dev babel-cli babel-loader babel-preset-latest babel-preset-react babel-preset-stage-0 css-loader json-loader node-sass sass sass-loader style-loader webpack

npm i --save @babel/core @babel/preset-env @babel/preset-react autoprefixer babel-loader connect-history-api-fallback copy-webpack-plugin css-loader express extract-text-webpack-plugin html-webpack-plugin mongoose node-sass nodemon postcss-loader react react-dom react-hot-loader react-router react-router-dom sass-loader style-loader webpack webpack-cli webpack-dev-middleware webpack-hot-middleware webpack-merge whatwg-fetch axios bcryptjs body-parser connect-mongo express-session gridfs-stream lodash morgan multer multer-gridfs-storage


<Route exact path="/product/:id" component = { Product } />
<Route exact path="/newproduct" component = { NewProduct } />
<Route exact path="/signup" component = { SignupForm } />
<Route exact path="/login" component = { Login } />


//======================================================
https://coderbyte.com/challenges
https://regexone.com/
////////////////////////////////////////


function LetterChanges(str) {

    var converted = str.replace(/[a-z]/gi, function(char) {
    return (char === 'z' || char === 'Z') ? 'a' : String.fromCharCode(char.charCodeAt() + 1);
  });

      var capitalized = converted.replace(/a|e|i|o|u/gi, function(vowel) {
        return vowel.toUpperCase();
  });


  return capitalized;
}

// keep this function call here
LetterChanges(readline());


//=============exercise==============================
Input:"hello*3"
Output:"Ifmmp*3"

Input:"fun times!"
Output:"gvO Ujnft!"

function LetterChanges(str) {

  return str;
}

// keep this function call here
LetterChanges(readline());

//---------solution--------------
function LetterChanges(str) {

  // we will replace every letter in the string with the letter following it
  // by first getting the charCode number of the letter, adding 1 to it, then
  // converting this new charCode number to a letter using the fromCharCode function
  // we also check to see if the character is z and if so we simply convert the z to an a
  var converted = str.replace(/[a-z]/gi, function(char) {
    return (char === 'z' || char === 'Z') ? 'a' : String.fromCharCode(char.charCodeAt() + 1);
  });

  // we have now successfully converted each letter to the letter following it
  // in the alphabet, and all we need to do now is capitalize the vowels
  var capitalized = converted.replace(/a|e|i|o|u/gi, function(vowel) {
    return vowel.toUpperCase();
  });

  // return the final string
  return capitalized;

}

LetterChanges("fun times!");
//-----------------------------------
//=============exercise==============================

  function SimpleAdding(num) {
    var addNum = 0;
    for (var i = 1; i <= num; i++ ) {
      addNum += num[i];
    }
      return addNum;
  }

  // keep this function call here
  SimpleAdding(readline());

}

// keep this function call here
LetterChanges(readline());

//---------solution--------------
function SimpleAdding(num) {
  var answer = 0;
  for (var i = 1; i <= num; i++) {
    answer = answer + i;
  }
  return answer;
}

SimpleAdding(4);
//-----------------------------------

//-------------question----------------------
function TimeConvert(num) {
  var hours = Math.floor(num/60);

  var min = num % 60;

  return hours + ':' + min;
}

TimeConvert(readline());

//--------------solution----------------------
function TimeConvert(num) {

  var hours = Math.floor(num / 60);

  var minutes = num % 60;

  return hours + ':' + minutes;

}

TimeConvert(124);


//-------------question----------------------
Using the JavaScript language, have the function QuestionsMarks(str) take the str string parameter, which will contain single digit numbers, letters, and question marks, and check if there are exactly 3 question marks between every pair of two numbers that add up to 10. If so, then your program should return the string true, otherwise it should return the string false. If there aren't any two numbers that add up to 10 in the string, then your program should return false as well.

For example: if str is "arrb6???4xxbl5???eee5" then your program should return true because there are exactly 3 question marks between 6 and 4, and 3 question marks between 5 and 5 at the end of the string.

function QuestionsMarks(str) {

  // code goes here
  return str;

}

// keep this function call here
QuestionsMarks(readline());


//--------------solution----------------------
Input:"aa6?9"
Output:"false"

Input:"acc?7??sss?3rr1??????5"
Output:"true"

Input:"+d+=3=+s+"
Output:"true"


Input:"f++d+"
Output:"false"

//------============================----------------
function SimpleSymbols(str) {

  // pad the strings so that if a character exists at the beginning
  // of the string for example, we don't get on out-of-bounds error by
  // trying to get the character before it
  var str = '=' + str + '=';

  // loop through entire string
  for (var i = 0; i < str.length; i++) {

    // check to see if current character is an alphabetic character
    // by using a simple case-insensitive regex pattern
    if (str[i].match(/[a-z]/i) !== null) {

      // check to see if a + symbol is to the left and right
      // if not, then we know this string is not valid
      if (str[i-1] !== '+' || str[i+1] !== '+') {
        return false;
      }

    }

  }

  return true;

}

SimpleSymbols("+d+=3=+s+");

//-=-----------------------------
function alphaSoup(str){
var sort = '';
  srot = str.sort(function(a,b){
    return a - b
  })
  return sort;
}

return alphaSoup()
