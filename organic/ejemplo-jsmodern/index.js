console.log("Hello world");
//console.log(arr);

function vowelsAndConsonants(s) {
  [...s].forEach((c) => ("aeiou".includes(c) ? console.log(c) : null));
  [...s].forEach((c) => ("aeiou".includes(c) ? null : console.log(c)));
}

//vowelsAndConsonants('javascript is awesome');
