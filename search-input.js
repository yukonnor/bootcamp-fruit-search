const input = document.querySelector("#search-input");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
    "Apple",
    "Apricot",
    "Avocado 🥑",
    "Banana",
    "Bilberry",
    "Blackberry",
    "Blackcurrant",
    "Blueberry",
    "Boysenberry",
    "Currant",
    "Cherry",
    "Coconut",
    "Cranberry",
    "Cucumber",
    "Custard apple",
    "Damson",
    "Date",
    "Dragonfruit",
    "Durian",
    "Elderberry",
    "Feijoa",
    "Fig",
    "Gooseberry",
    "Grape",
    "Raisin",
    "Grapefruit",
    "Guava",
    "Honeyberry",
    "Huckleberry",
    "Jabuticaba",
    "Jackfruit",
    "Jambul",
    "Juniper berry",
    "Kiwifruit",
    "Kumquat",
    "Lemon",
    "Lime",
    "Loquat",
    "Longan",
    "Lychee",
    "Mango",
    "Mangosteen",
    "Marionberry",
    "Melon",
    "Cantaloupe",
    "Honeydew",
    "Watermelon",
    "Miracle fruit",
    "Mulberry",
    "Nectarine",
    "Nance",
    "Olive",
    "Orange",
    "Clementine",
    "Mandarine",
    "Tangerine",
    "Papaya",
    "Passionfruit",
    "Peach",
    "Pear",
    "Persimmon",
    "Plantain",
    "Plum",
    "Pineapple",
    "Pomegranate",
    "Pomelo",
    "Quince",
    "Raspberry",
    "Salmonberry",
    "Rambutan",
    "Redcurrant",
    "Salak",
    "Satsuma",
    "Soursop",
    "Star fruit",
    "Strawberry",
    "Tamarillo",
    "Tamarind",
    "Yuzu",
];

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);

function searchHandler(e) {
    // When text is entered in the search input...

    // Store the text into a variable
    const textInput = e.target;
    let searchText = textInput.value.trim();
    let fruitResults = [];

    // clear suggestions after search text is updated
    clearSuggestions();

    // add clear input button if not one already
    if (!document.querySelector(".fa-circle-xmark")) {
        createClearInputButton();
    }

    // If input is at least 2 chars create a filtered list of fruit
    if (searchText.length > 1) {
        fruitResults = search(searchText);
    }

    // If filterFruit has items, show suggestions
    if (fruitResults) {
        showSuggestions(fruitResults, searchText);
    }
}

function search(searchText) {
    const searchTextLower = searchText.toLowerCase();

    // show results where the search text matches the beginning of the fruit first
    const leadingResults = fruit.filter(
        (value) =>
            value.toLowerCase().includes(searchTextLower) &&
            value.toLowerCase().indexOf(searchTextLower) === 0
    );
    const trailingResults = fruit.filter(
        (value) =>
            value.toLowerCase().includes(searchTextLower) &&
            value.toLowerCase().indexOf(searchTextLower) !== 0
    );

    return leadingResults.concat(trailingResults);
}

function createClearInputButton() {
    const searchBox = document.querySelector(".search-box");
    const clearButton = document.createElement("i");
    clearButton.classList.add("fa-regular", "fa-circle-xmark");
    clearButton.addEventListener("click", () => {
        input.value = "";
        clearSuggestions();
        removeClearInputButtin();
    });

    searchBox.append(clearButton);
}

function showSuggestions(results, inputVal) {
    // create an li for each of the results
    console.log(`Results sent to suggestion LIs: ${results}`);
    for (let result of results) {
        const resultItem = document.createElement("li");
        resultItem.classList.add("result-item");

        // add hover event listener to addd style of suggestion on hover
        resultItem.addEventListener("mouseover", (e) =>
            resultItem.classList.toggle("result-hovered")
        );
        // add hover event listener to remove style of suggestion when mouse leaves
        resultItem.addEventListener("mouseout", (e) =>
            resultItem.classList.toggle("result-hovered")
        );

        const resultItemContent = generateResultItemContent(result, inputVal);
        resultItem.innerHTML = resultItemContent;

        suggestions.append(resultItem);
    }
}

function clearSuggestions() {
    // Q: Would a better alternative be to update the suggestion list to remove items that no longer match?
    // Q: How to make this function return something instead of side effects on global var?
    while (suggestions.firstChild) {
        suggestions.removeChild(suggestions.lastChild);
    }
}

function removeClearInputButtin() {
    const clearButton = document.querySelector(".fa-circle-xmark");
    clearButton.remove();
}

function generateResultItemContent(result, inputVal) {
    // generates bolded text for the inputVal on the result
    const resultLowered = result.toLowerCase();
    const inputLowered = inputVal.toLowerCase();
    const inputIndex = resultLowered.indexOf(inputLowered);
    let resultHTML = "";

    // TODO: This will only catch the first instance of the substring. Case: "Elderberry"
    if (inputIndex >= 0) {
        resultHTML =
            result.slice(0, inputIndex) +
            "<b>" +
            result.slice(inputIndex, inputIndex + inputVal.length) +
            "</b>" +
            result.slice(inputIndex + inputVal.length);
    } else {
        throw new Error(
            "Couldn't generate suggestion text. Input value not found in result string."
        );
    }

    return resultHTML;
}

function useSuggestion(e) {
    // when a suggestion is clicked...

    let suggestion = e.target;

    // if bold area clicked, update the target to be the parent li
    if (suggestion.nodeName !== "LI") {
        suggestion = suggestion.parentElement;
    }

    // update the value of the input to be the value of the clicked suggestion
    const suggestionText = suggestion.innerText;
    console.log(`Suggestion clicked: ${suggestionText}`);
    input.value = suggestionText;

    // hide the suggestions ul
    clearSuggestions();
}
