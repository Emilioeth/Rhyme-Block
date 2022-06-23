var userInputEl = document.querySelector('#user-input');

var searchButton = document.querySelector('#search-btn');

//Searches dictionary and grabs user's word
searchButton.addEventListener('click', function() {
    var userWords = userInputEl.value;
    dictionary(userWords);
    rhyme(userWords);
});

// Gives definition of user's word
function dictionary(word) {
    var dictionaryUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=1fda1280-56d7-46fd-83fd-00e8c791511a'
    fetch(dictionaryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var definition = data[0].shortdef[0];
        document.querySelector('#definition-list').textContent = definition;
    });
}

var optionsInputEl = document.querySelector('.options-select');

// Gives selected rhymes of user's word
function rhyme(word) {
    var datamuseUrl = 'https://api.datamuse.com/words?rel_';
    var selectedOptions = optionsInputEl.options[optionsInputEl.selectedIndex].value;

    // Switch statement to grab selected rhyme from dropdown menu
   switch(selectedOptions) {
    case 'eRhymes':
        datamuseUrl = datamuseUrl + 'rhy=' + word +'&max=5';
        break;
    case 'aRhymes':
        datamuseUrl = datamuseUrl + 'nry=' + word +'&max=5';
        break;
    case 'Homophones':
        datamuseUrl = datamuseUrl + 'hom=' + word +'&max=5';
        break;
    case 'Consonant':
        datamuseUrl = datamuseUrl + 'cns=' + word +'&max=5';
        break;
    case 'Synonyms':
        datamuseUrl = datamuseUrl + 'syn=' + word +'&max=5';
        break;
    default:
        'Please pick an options'
    };

    console.log(datamuseUrl);

    fetch(datamuseUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var rhyme = data[0].word;
        document.querySelector('#rhyme-list').textContent = rhyme;
    });
}