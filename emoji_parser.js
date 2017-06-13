var emoji = {};
var SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
var XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;

var allEmojis;

emoji.translate  = function(words){
    allEmojis = require('./emoji.json')
  
    string = ''
    words = words.split(/(\s+)/);
    console.log(words);
    for (var i= 0; i < words.length; i++){
       string = string.concat(emoji.translateWord(words[i]) + " ")
        //console.log(words[i]);
    }
    return string;
}




emoji.translateWord = function(word){
    //remove any punctuation in word start and end
    var firstSymbol = '';
  var lastSymbol = '';

  while (SYMBOLS.indexOf(word[0]) != -1) {
    firstSymbol += word[0];
    word = word.slice(1, word.length);
  }

  while (SYMBOLS.indexOf(word[word.length - 1]) != -1) {
    lastSymbol += word[word.length - 1];
    word = word.slice(0, word.length - 1);
  }

    return emoji.giveMeAEmoji(word);


}


emoji.giveMeAEmoji = function(word){
    keyword = word.trim().toLowerCase();

    if(!keyword || keyword === '' || keyword === 'it'){
        return '';
    };

      // Maybe this is a plural word but the keyword is the singular?
  var maybeSingular = '';
  if (keyword[keyword.length - 1] == 's')
    maybeSingular = keyword.slice(0, keyword.length - 1);

  // Maybe this is a singular word but the keyword is the plural?
  // Don't do this for single letter since that will pluralize crazy things.
  var maybePlural = (keyword.length == 1) ? '' : keyword + 's';

  // Go through all the things and find the first one that matches.
  for (var emoji in allEmojis) {
    var keywords = allEmojis[emoji].keywords;
    if (emoji == keyword || emoji == maybeSingular || emoji == maybePlural ||
        (keywords && keywords.indexOf(keyword) >= 0) ||
        (keywords && keywords.indexOf(maybeSingular) >= 0) ||
        (keywords && keywords.indexOf(maybePlural) >= 0))
      return allEmojis[emoji].char;
  }
  return word;




};

//console.log(emoji.translate("smile j"))


module.exports = emoji;