import $ from 'jquery'

$(document).ready(() => {
  getTopWord();


  $("section.text-submission button").click(function(){
    var text = $("section.text-submission textarea").val()
    if (text != "") {
      submitText(text)
    }
  })
})

function getTopWord() {
  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
    .then(response => response.json())
    .then(topWord => displayTopWord(topWord["word"]))
    .catch(error => console.error(error));
}

function submitText(text) {
  var wordArray = normalizeText(text).split(" ");
  for (var i in wordArray) {
    sendWord(wordArray[i]);
  }
}

function normalizeText(text) {
  return text.replace(/[^a-zA-Z ]/g, "");
}

function displayTopWord(topWord) {
  var word = Object.keys(topWord)[0]
  var count = topWord[word]
  $('article.word-count').html(`With ${count} uses, "${word}" is the top word!`)
}

function sendWord(word){
  var data = {'word': {'value': word}}
  fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response => getTopWord())
    .catch(error => console.error(error));
}
