

/*
https://api.dictionaryapi.dev/api/v2/entries/en/<word>

api.datamuse.com/words
api.datamuse.com/sug //autocomplete function on search input fields


rhy	-Rhymes ("perfect" rhymes, per RhymeZone)	spade → aid
nry	-Approximate rhymes (per RhymeZone)	forest → chorus
hom	-Homophones (sound-alike words)	course → coarse
cns	-Consonant match
syn	-Synonyms (words contained within the same WordNet synset)
*/


// var api = 'api.datamuse.com/words?rel_';

// function wordSearch() {
//     var button = select('#search');
//     button.mousePressed(findWords);

//     wordInput = select('#word-input');
// }

// function findWords() {
//     var url = api + wordOption + wordInput.value();
//     loadJSON(url, exactRhyme);
// }

// console.log(findWords());

// function exactRhyme () {
//

var wordInputEl = document.querySelector("#word-input");
var resultsBodyEl = document.querySelector("#results-body");
var optionButtonsEl = document.querySelector("#option-input");
var searchButtonEl = document.querySelector("#search");
var wordOption = 'rhy=';
var wordInputSearch = document.querySelector("");
var wordInput;
// wordInput.value();

var inputSubmitHandler = function(event) {

    // stops page from refreshing
    event.preventDefault();

    // grab value from input element
    var word = wordInputEl.value.trim();

    if (word) {
        getWordRhymes(word);

        resultsBodyEl.textContent = "";
        wordInputEl.value = "";
    } else {
        alert("Please enter a word.");
    }
};


// function that fetches data from api
// var getWordRhymes = function(rhymes) {
//     // format the github api url
//     var apiUrl = "https://api.datamuse.com/words?rel_rhy=blue";
  
//     // make a get request to url
//     fetch(apiUrl)
//         .then(function(response) {
//         // request was successful
//         if (response.ok) {
//             console.log(response);
//             response.json().then(function(data) {
//                 console.log(data);
//                 displayWords(data, word);
//             });
//         } else {
//           alert('Error: Word Not Found');
//         }
//     });
// };               

var apiUrl = "https://api.datamuse.com/words?rel_rhy=blue";

fetch(apiUrl, {
    mode: 'no-cors'
})
.then(function(response) {
    return json(response);
    response.json()
    .then(function(data) {
    console.log(data);
    // var docArray = data.response.docs;
    // for(var i = 0; i < docArray.length; i++) {
    //     var listItem = document.createElement("li");
    //     listItem.textContent = docArray[i].description;
    //     resultsBodyEl.appendChild(listItem);
    // }
    });
});

var apiUrl =  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=1fda1280-56d7-46fd-83fd-00e8c791511a"
fetch(apiUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data[0].shortdef[0])
})

// console.log(response);
    // return response.JSON()
    // .then(function(data) {
    //     console.log(data);
    // });


// .then(function(response) {
//     if (response.ok) {
//         console.log(response);
//         response.JSON().then(function(data) {
//             console.log(data);
//         });
//     };
// });



var displayWords = function(words, inputSearch) {
    // check if api returned any repos
    if (words.length === 0) {
        resultsBodyEl.textContent = "No matches found.";
        return;
    }
  
    wordInputSearch.textContent = inputSearch;
  
    // loop over word arrays
    for (var i = 0; i < words.length; i++) {
        // format list of rhyming words
        var keyword = wordInput.value();
    
        // create a span element to hold keyword searched
        var titleEl = document.createElement("span");
        titleEl.textContent = keyword;
    
        // append to container
        keywordEl.appendChild(titleEl);
    
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
    
        // append to container
        resultsBodyEl.appendChild(statusEl);
    
        // append container to the dom
        ContainerEl.appendChild(resultsBodyEl);
    }
};


// event listeners for search button and word options
// wordInputEl.addEventListener("search", inputSubmitHandler);
// optionButtonsEl.addEventListener("click", buttonClickHandler);