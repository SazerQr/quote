const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const quoteBtn = document.getElementById("new-quote");
const twiterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

//loading function part

function loading(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}

//stop animation part

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//get Quote from api 
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {    
        const response = await fetch(apiUrl);
        const data = await response.json();
        const randomNumber = Math.floor(Math.random() * data.length);
        if(data[randomNumber].author===""){
            quoteAuthor.innerText = "Unknown";
        }else{
            quoteAuthor.innerText = data[randomNumber].author;
        }
        if(data[randomNumber].text.length>120){
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data[randomNumber].text;
        complete();
    } catch (error) {
        getQuote();
    }
  }

function twitterQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank")
}

//
getQuote();
quoteBtn.addEventListener("click", getQuote);
twiterBtn.addEventListener("click", twitterQuote); 

//

