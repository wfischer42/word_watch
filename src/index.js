import $ from 'jquery'

$(document).ready(() => {
  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
    .then(response => response.json())
    .then(topWord => displayTopWord(topWord["word"]))
    .catch(error => console.error(error));
})

function displayTopWord(topWord) {
  var word = Object.keys(topWord)[0]
  var count = topWord[word]
  $('article.word-count').append(`With ${count} uses, "${word}" is the top word!`)
}
