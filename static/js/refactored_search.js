//DOM constants
const search_box = document.querySelector("#search_box");
const search_button = document.querySelector("#search_button");
const search_results = document.querySelector("#cl");

//Lemmatizer initialization

/*
This focuses on the search_box when the page is loaded
This removes the need for the user to manually click on the search_box before starting to type
*/
window.onload = () => {
  search_box.focus();
};

const process_change = debounce(() => process_user_input());
async function process_user_input() {
  clear_results();
  //clearing the results
  if (search_box.value != "") {
    //creating a map of (word, word type)
    let tokenized_map = tokenize_with_word_type(search_box.value);
    //removing stop words from the map
    tokenized_map = await remove_stop_words(tokenized_map);
    //creating a map of matches
    let matches = new Map();

    for (const [key, _] of tokenized_map) {
      matches.set(key, await match(key));
    }

    matches.forEach((list, word) => {
      list.forEach((object) => {
        create_search_result_element(object.file);
      });
    });
    utility_print_map(matches);
  }
}

function utility_print_map(map) {
  map.forEach((value, key) => {
    console.log(`The key is: ${key} and the value is: ${value}`);
  });
}

function clear_results() {
  search_results.innerHTML = "";
}

/*
function tokenize_with_word_type(raw_string_from_searchbox)
This function accepts the raw search_box.value as a STRING and returns a MAP of (word, word_type) pairs
*/
function tokenize_with_word_type(raw_string_from_searchbox) {
  //constructing an array of nested sentences with compromise.js's .json() function
  //Example: [['The','dancing', 'dragon', 'died'], ['sentence2]]
  const sentence_array = nlp(raw_string_from_searchbox).json();
  let map = new Map();

  sentence_array.forEach((sentence) => {
    sentence.terms.forEach((token) => {
      if (token.normal != "") {
        map.set(token.normal, token.tags[0]);
      }
    });
  });
  return map;
}
/*
function remove_stop_words(map)
This function accepts the tokenized MAP and returns the MAP after removing the stop words.
It calles async load_file_complex(key, source) to obtain the SET of stop words.
It's returning the interpretation of a PROMISE, so it must be awaited on.
*/

function remove_stop_words(map) {
  return load_file_complex("snowy", "static/js/snowball.json")
    .then((snowball_set) => {
      snowball_set.forEach((token) => {
        if (map.has(token)) {
          map.delete(token);
        }
      });
      return map; // Return the modified map
    })
    .catch((err) => {
      console.log("Error removing stop words ", err);
      return map; // Return the original map in case of error
    });
}

function load_file_complex(key, source) {
  return new Promise(async function (resolve, reject) {
    try {
      if (localStorage.getItem(key)) {
        resolve(localStorage.getItem(key));
      } else {
        const response = await fetch(source);
        const results = await response.json();
        resolve(results);
      }
    } catch (err) {
      reject(err);
    }
  });
}

async function match(key) {
  return load_file_complex("index", "static/js/indexed.json")
    .then((index) => {
      index = new Map(Object.entries(index));
      if (index.has(key)) {
        return index.get(key);
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log("Error searching index ", err);
      return [];
    });
}

function debounce(func, timeout = 60) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function create_search_result_element(information) {
  let box = document.createElement("div");
  box.classList.add("blocky");
  box.innerHTML = information;
  search_results.append(box);
}