import badWords from "bad-words";
import * as naughtyWords from "naughty-words";

/**
 * Filter for inappropiate content
 * @module ./setup/censor
 * 
 */
let censor = new badWords({ regex: /\w/gi });

// Gets all sorts of mature wikipedia article titles
fetch("https://MatureWikipediaArticlesAPI.lchap701.repl.co/api")
  .then((res) => res.json())
  .then((data) => {
    censor.addWords(...data.censor);
    censor.addWords(...naughtyWords.en);
    censor.removeWords(...data.remove);
  })
  .catch((err) => console.error(err));

export { censor };
