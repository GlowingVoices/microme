const search_box = document.querySelector("#search_box");
const search_button = document.querySelector("#search_button");
const search_results = document.querySelector("#cl");

window.onload = function () {
  search_box.focus();
};

var lemmatizer = new Lemmatizer();

//could I use the search button for a deeper-than-normal search?
//There might actually be a use for this if I'm looking into adding in date, regex and more complex searches. cmd+enter works for the button too thought

/*
search_button.addEventListener("click", () => {
  find_documents(search_box.value);
});
*/

function file_handler(key, local_file_source, callback) {
  let test = load_from_cache(key);
  if (!test) {
  } else {
    test;
  }
}

function load_from_cache(key) {
  return localStorage.getItem(key);
}

function save_to_cache(key, data) {
  localStorage.setItem(key, data);
}

var snowball_stop_words;
file_handler("snowy", "static/js/snowball.json", function (data) {
  snowball_stop_words = new Set(data);
});

//make this return a dictionary of word:type pairs
function tokenize(query) {
  let doc = nlp(query);
  //doc.contractions().expand();
  let data = doc.json();
  let map = new Map();

  //It's probably possible to improve the search system by acknowledging different input sentences,
  //but I'm not going there till I have a barebones search system running.
  //After that, it's into refactor territory

  data.forEach(function (sentence) {
    sentence.terms.forEach(function (item) {
      if (item.normal != "") {
        map.set(item.normal, item.tags[0]);
      }
    });
  });
  return map;
}

function remove_stop_words(map) {
  map.forEach(function (_, key) {
    if (snowball_stop_words.has(key)) {
      map.delete(key);
    }
  });
  return map;
}

function autolemma(word, type) {
  try {
    type = type.toLowerCase();

    if (
      type == "noun" ||
      type == "verb" ||
      type == "adverb" ||
      type == "adjective"
    ) {
      if (type == "adverb") {
        type = "adv";
      }
      if (type == "adjective") {
        type = "adj";
      }

      word = lemmatizer.lemmas(word, type);
      return word;
    }
  } catch (error) {
    alert(error);
    return error;
  }

  return [[word]];
}

function debounce(func, timeout = 30) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const processchange = debounce(() => box_handler());
function box_handler() {
  if (search_box.value != "") {
    //clearing the result showcase
    clear_results();

    //the process of getting search results
    let tokenized_map = tokenize(search_box.value);
    tokenized_map = remove_stop_words(tokenized_map);

    tokenized_map.forEach(function (value, key) {
      let lemmatized = autolemma(key, value);
      //is the lemmatizer reducing this to t?
      create_search_result_element(lemmatized[0][0]);
    });
  }
}

function create_search_result_element(information) {
  let box = document.createElement("div");
  box.classList.add("blocky");
  box.innerHTML = information;
  search_results.append(box);
}

function clear_results() {
  search_results.innerHTML = "";
}
