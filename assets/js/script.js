var userInputEl = document.querySelector('#user-input');
var searchButton = document.querySelector('#search-btn');
var rhymeList = document.querySelector('#rhyme-list');
var buttonNew = document.querySelector('#btn-new');
var buttonSave = document.querySelector('#btn-save');
var buttonCopy = document.querySelector('#btn-copy');
var textArea = document.getElementById('text-area');
var alertEl = document.querySelector('.alert');
var alertHideEL = document.querySelector('.alert-close')


alertHideEL.addEventListener('click', function(){
    alertEl.classList.remove("show");
    alertEl.classList.add("hide");
})

//Searches dictionary and grabs user's word
searchButton.addEventListener('click', function() {
    rhymeList.innerHTML = ""
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
var rhymeTitle = document.getElementById('rhymes-title')

// Gives selected rhymes of user's word
function rhyme(word) {
    var datamuseUrl = 'https://api.datamuse.com/words?rel_';
    var selectedOptions = optionsInputEl.options[optionsInputEl.selectedIndex].value;

    // Switch statement to grab selected rhyme from dropdown menu
   switch(selectedOptions) {
    case 'eRhymes':
        datamuseUrl = datamuseUrl + 'rhy=' + word +'&max=10';
        rhymeTitle.innerHTML = "Rhymes"
        break;
    case 'aRhymes':
        datamuseUrl = datamuseUrl + 'nry=' + word +'&max=10';
        rhymeTitle.innerHTML = "Rhymes"
        break;
    case 'Homophones':
        datamuseUrl = datamuseUrl + 'hom=' + word +'&max=10';
        rhymeTitle.innerHTML = "Homophones"
        break;
    case 'Consonant':
        datamuseUrl = datamuseUrl + 'cns=' + word +'&max=10';
        rhymeTitle.innerHTML = "Consonants"
        break;
    case 'Synonyms':
        datamuseUrl = datamuseUrl + 'syn=' + word +'&max=10';
        rhymeTitle.innerHTML = "Synonyms"
        break;
    default:
        'Please pick an option'
    };

    console.log(datamuseUrl);
   

    fetch(datamuseUrl)
    .then(function(response){
        return response.json();
        
    })
    .then(function(data){

        if (data.length < 1 ) {
            rhymeList.innerHTML = "Sorry, No results found"
        }
        else{
            for (let i = 0; i < data.length; i++) {
                rhyme[i] = data[i].word;
                console.log(rhyme[i])
                var rh = document.createElement('span');
                rh.innerHTML = rhyme[i] + ". "
                rhymeList.append(rh)
            }
        }
    });
}

document.getElementById("btn-copy").addEventListener("click", function(){
    var copyText = document.getElementById('text-area').value;
    navigator.clipboard.writeText(copyText).then(() => {

        alertEl.classList.remove("hide");
        alertEl.classList.add("show");
  });
})

var loadTasks = function() {
    userSong = localStorage.getItem('userSong');
    textArea.innerHTML = userSong;
}

document.getElementById("btn-save").addEventListener("click", function ()
    {
        var userSong = document.getElementById("text-area").value ;
        localStorage.setItem("userSong", userSong);

        alertEl.classList.remove("hide");
        alertEl.classList.add("show");
    });

loadTasks()

document.getElementById("btn-new").addEventListener("click", function(){
    textArea.innerHTML = ''
    localStorage.clear();

    alertEl.classList.remove("hide");
    alertEl.classList.add("show");
})