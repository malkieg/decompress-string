// Information from the HTML file
const myForm = document.querySelector('#my-form');
const inputValue = document.querySelector('#inputValue');
const message = document.querySelector('#message');
let output = '';

// When the info is submited the onSubmit function is called, requirements stated no need to make sure that what was entered is valid
myForm.addEventListener('submit', onSubmit);

// Call the decompressString function on what was submitted and output the decompressed string
function onSubmit(e) {
  e.preventDefault();
  message.innerHTML = '';
  console.log(inputValue.value);
  decompressString(inputValue.value);
  message.appendChild(document.createTextNode(output));
}

function decompressString(str) {
  output = '';
  function decompress(str) {
    //   find the open bracket and its corresponding closing bracket
    const firstBracketIndex = str.indexOf('[');
    let count = 0;
    let endingBracketIndex;
    for (let i = firstBracketIndex + 1; i < str.length; i++) {
      if (str[i] === '[') {
        count--;
      } else if (str[i] === ']' && count === 0) {
        endingBracketIndex = i;
      } else if (str[i] === ']') {
        count++;
      }
    }

    // Get the number in front of the brackets, check inside the bracket for another set of brackets within if applies use recursion to call the decompressString function on the inner set of brackets. Loop through to repeat the letters according to the specified numTimesToLoop
    if (firstBracketIndex > -1) {
      const numTimesToLoop = Number(str.split('[')[0]);
      for (let i = 0; i < numTimesToLoop; i++) {
        const interiorString = str
          .split('')
          .slice(firstBracketIndex + 1, endingBracketIndex);
        if (interiorString.includes('[')) {
          output += decompressString(interiorString.join(''));
        } else {
          output += interiorString.join('');
        }
      }
    } else {
      output += str;
      return;
    }
    // Call decompress function if theirs another set of brackets after the first set
    if (endingBracketIndex !== str.length - 1) {
      decompress(
        str
          .split('')
          .slice(endingBracketIndex + 1, str.length)
          .join('')
      );
    }
    console.log(output);
  }
  //   call the decompress function when the decompressString function is called
  decompress(str);
  return output;
}
