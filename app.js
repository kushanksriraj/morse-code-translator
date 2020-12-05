var inputTextRef = document.querySelector("#input-txt");
var translateButtonRef = document.querySelector("#translate-btn");
var outputTextRef = document.querySelector("#output-txt");
var resetButtonRef = document.querySelector("#reset-btn");


const serverUrl = "https://api.funtranslations.com/translate/morse.json";

function constructUrl(text) {
    var url = serverUrl + "?text=" + text;
    return encodeURI(url);
}


function errorHandler(error) {
    console.log(error);
    outputTextRef.innerText = "ERROR! Please try again after some time.";
}


function translateClickEventHandler() {

    var inputText = inputTextRef.value;

    fetch(constructUrl(inputText))
        .then(response => response.json())
        .then(json => {
            var translated = json.contents.translated;
            outputTextRef.innerText = translated;
        })
        .catch(errorHandler);

}

function resetClickEventHandler() {
    inputTextRef.value = "";
    outputTextRef.innerText = "";
}


translateButtonRef.addEventListener("click", translateClickEventHandler);

resetButtonRef.addEventListener("click", resetClickEventHandler);
