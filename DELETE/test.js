// Find duplicate number:
  // find first duplicated Number ==> 12
  // find all duplicated number ==> [12, 53, 89]
const array = [53, 100, 89, 64, 57, 12, 26, 7, 33, 31, 17, 98, 12, 6, 53, 53, 89, 93];


function duplicate(arr){
  return arr
}

console.log(duplicate(array));


// find the medium number or return both medium number if its even number array
const aarray = [53, 100, 89, 64, 57, 12, 26, 7, 33, 31, 17, 98, 12, 6, 53, 93];
  // [33, 53]
const barray = [53, 100, 89, 64, 57, 33, 12, 26, 7, 33, 31, 17, 98, 12, 6, 53, 93];
  // [33]

function medium(arr){
  return arr
}

console.log( medium(array) );


// find the average of the total number and round it up
const aarray = [53, 100, 89, 64, 57, 12, 26, 7, 33, 31, 17, 98, 12, 6, 53, 93]; // 47
const barray = [1,2,3,4,5,6,7,8,9];
    // 5

function avg(arr){
  return arr
}

console.log(avg(aarray));


// make a multiply table from giving number
function table(num){
  return num
}

console.log(table(5));


// Giving an array and find the matching word.
  // find first matching
  // filter all matching
const arr = ["How", "are", "you", "today", "my", "friend", "do", "you", "like", "ChiCken"];
function compare(a,b){

}

console.log(compare(arr, "o"))

// giving a string and a value. return a array of matching word
   // using Match
function compare(a,b){

}

console.log(compare("How are you today my friend do you like ChiCken", "HiCK"))

  //solution
  //   function compare(a,b){
  // let aa = a.toLowerCase().split(' ');
  // let bb = b.toLowerCase();
  //
  // let matchword = []
  // aa.map(word => {
  //   return(word.match(bb))? matchword.push(word): '';
  // })
  // return matchword.join(' ')
  // }
  //
  // console.log(compare("How are you today my friend do you like ChiCken", "ChiCken"))

//==================================================
  // setTimeout practice, display alert in 3 second
function settime(str){

}
console.log(1settime())

// ================================================
  // display all object in key: and value:
    // use for in loop
    // use Object.keys
  const aObj = { a: 12, b: 15, c: 18 }

  function modifyObj(obj){

  }
  console.log(modifyObj(aObj))

  // function modifyObj(obj){
  //   let kstr = [];
  //   for(var key in obj){
  //    kstr.push(key +"<:>"+ obj[key])
  //   }
  //   return kstr
  // }

// ====================================
.search() - string - begin location, method executes a search for a match between a regular expression and this String object. `str.search(regexp)` ==> output indexOf()
.match() - string - string, method retrieves the result of matching a string against a regular expression. "str.match(regexp)"
.test() - string - boolean, return boolean
.includes() = array - boolean,
