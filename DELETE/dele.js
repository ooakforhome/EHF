Input:"coderbyte"
Output:"etybredoc"

Input:"I Love Code"
Output:"edoC evoL I"

function FirstReverse(str) {
  var reverseword = '';

  for(var i = str.length; i >= 0; i--){
    reverseword += str[i];
  }
    return reverseword;
}

// keep this function call here
FirstReverse(readline());
