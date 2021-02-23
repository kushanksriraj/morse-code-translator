const inputTextRef = document.querySelector("#input-txt");
const translateButtonRef = document.querySelector("#translate-btn");
const outputTextRef = document.querySelector("#output-txt");
const resetButtonRef = document.querySelector("#reset-btn");

const serverUrl = `https://api.funtranslations.com/translate/morse.json`;

const constructUrl = text =>  {

    const url = `${serverUrl}?text=${text}`;
    return encodeURI(url);
}

const errorHandler = error => {
    alert("Some error occured!");
    console.log(error);
    outputTextRef.innerText = "";
    //create a new element
    const span = document.createElement("span");
    const node = document.createTextNode("API rate limit might be exceeded. Try again after an hour.");
    span.appendChild(node);
    const element = document.getElementById("output-txt");
    element.appendChild(span);
}

const translateClickEventHandler = () => {

    const inputText = inputTextRef.value;

    fetch(constructUrl(inputText))
        .then(response => response.json())
        .then(json => {
            const translated = json.contents.translated;
            outputTextRef.innerText = translated;
        })
        .catch(errorHandler);
}

const resetClickEventHandler = () => {
    inputTextRef.value = "";
    outputTextRef.innerText = "</>";
}

translateButtonRef.addEventListener("click", translateClickEventHandler);
resetButtonRef.addEventListener("click", resetClickEventHandler);