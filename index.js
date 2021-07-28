let quoteDisplayEl = document.getElementById('quoteDisplay');
let timerEl = document.getElementById('timer');
let resultEl = document.getElementById('result');
let quoteInputEl = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById('resetBtn');
let spinner = document.getElementById('spinner');
resultEl.value = "";
spinner.classList.remove("spin");
let url = "https://apis.ccbp.in/random-quote";
let options = {
    method: "GET"
};
let x = null;

function start() {
    let c = 0;
    x = setInterval(function() {
        c = c + 1;
        if(c==1){
        timerEl.textContent = c + " second";}
        else{
        timerEl.textContent = c + " seconds";
        }
    }, 1000);
}
fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        start();
        spinner.classList.add("spin");
        quoteDisplayEl.textContent = jsonData.content;
    });
let typo = null;
quoteInputEl.addEventListener("change", function(event) {
    typo = event.target.value;
});


submitBtn.addEventListener("click", function(event) {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        resultEl.textContent = "You typed it in : " + timerEl.textContent;
        clearInterval(x);
    } else {
        resultEl.textContent = "You typed it wrong";
    }
});
resetBtn.addEventListener("click", function() {
    resultEl.textContent = "";
    quoteInputEl.value = "";
    clearInterval(x);

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            start();
            quoteDisplayEl.textContent = jsonData.content;
        });

});
