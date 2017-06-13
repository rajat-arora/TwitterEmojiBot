var emoji = {};
const SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
const emojilib = require("emojilib");
const allEmojis = emojilib.lib;

emoji.translate  = function(words){
   // allEmojis = require('./emoji.json')
  
    string = ''
    words = words.split(/(\s+)/);
    console.log(words);
    for (var i= 0; i < words.length; i++){
       let returnedResult = emoji.translateWord(words[i]);
       if(returnedResult.length > 1){
         randomNum = Math.floor((Math.random()*returnedResult.length)+0);
         returnedResult = returnedResult[randomNum];
       }
       string = string.concat(returnedResult + "")
        //console.log(words[i]);
    }

    if ( string == "" ){
         string = "IDK how to convert this into emoji!!"
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

emoji.isMaybeAlreadyEmoji = function(word){
  let ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
  ];

  return word.match(ranges.join('|')) != null;
}


emoji.giveMeAEmoji = function(word){
    let keyword = word.trim().toLowerCase();
    let useful = [];

      if (!keyword || keyword === '' || keyword === 'a' || keyword === 'it' || keyword === 'is'){
        useful.push('');
        return useful;
    };

      // Maybe this is a plural word but the keyword is the singular?
  let maybeSingular = '';
  if (keyword[keyword.length - 1] == 's')
    maybeSingular = keyword.slice(0, keyword.length - 1);

  // Maybe this is a singular word but the keyword is the plural?
  // Don't do this for single letter since that will pluralize crazy things.
  let maybePlural = (keyword.length == 1) ? '' : keyword + 's';
  let maybeVerbed = (word.indexOf('ing') == -1) ? '' : word.substr(0, word.length-3);


  if (emoji.isMaybeAlreadyEmoji(word)){
   useful.push(word);
  return useful;
  }


   // If it's "i" or "i", add some faces to it.
  if (word === 'i' || word === 'you') {
    useful.push('😀');
    useful.push('😊');
  } else if (word === 'she'){
    useful.push('💁');
  } else if (word === 'he'){
    useful.push('💁‍♂️');
  } else if (word === 'we' || word === 'they') {
    useful.push('👩‍👩‍👦‍👦');
  } else if (word === 'am' || word === 'is' || word === 'are') {
    useful.push('👉');
  }

  // Go through all the things and find the first one that matches.
  for (let emoji in allEmojis) {
    //console.log("here")
    let keywords = allEmojis[emoji].keywords;
    if (word == allEmojis[emoji].char || emoji == word || (emoji == word + '_face')||
    emoji == maybeSingular || emoji == maybePlural || emoji == maybeVerbed
         ||(keywords && keywords.indexOf(word) >= 0) ||
        (keywords && keywords.indexOf(maybeSingular) >= 0) ||
        (keywords && keywords.indexOf(maybePlural) >= 0) ||
        (keywords && keywords.indexOf(maybeVerbed) >= 0) ){
          if (!(word.length <= 3 && allEmojis[emoji].category == 'flags')){
         useful.push(allEmojis[emoji].char)
          }
  } 
}
  return useful;

};

//console.log(emoji.translate("smile j"))


module.exports = emoji;