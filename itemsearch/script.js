let allItems = [];
let correctItems = [];

async function main(){
    const response = await fetch("itemsearch/files/items.json");
    const jsonData = await response.json();
    allItems = jsonData;
    /*for (let i = 0; i < 100; i++){
        console.log(allItems[Math.floor((Math.random()*allItems.length))]);
    }*/
}

function search(){
    correctItems = [];
    document.getElementById("allAnswers").innerHTML = "";

    searchWord = document.getElementById("item").value.toLowerCase();
    for (let i = 0; i < allItems.length; i++){
        let currentWord = allItems[i].toLowerCase();
        currentWord = currentWord.replaceAll(' ', '');
        currentWord = currentWord.replaceAll('-', '');
        currentWord = currentWord.replaceAll("'", '');
        currentWord = currentWord.replaceAll(".", '');
        currentWord = currentWord.replaceAll("(", '');
        currentWord = currentWord.replaceAll(")", '');
        let canBeCorrect = true;
        if (currentWord.length !== searchWord.length) { continue; }
        for (let f = 0; f < currentWord.length; f++){
            if (currentWord[f] !== searchWord[f] && searchWord[f] !== "?")
            {
                canBeCorrect = false;
                break;
            }
        }
        if (!canBeCorrect) {continue;}
        correctItems.push(currentWord);
    }
    //seed:
    for (let i = 0; i < allItems.length; i++){
        let currentWord = allItems[i].toLowerCase();
        currentWord = currentWord.replaceAll(' ', '');
        currentWord = currentWord.replaceAll('-', '');
        currentWord = currentWord.replaceAll("'", '');
        currentWord = currentWord.replaceAll(".", '');
        currentWord = currentWord.replaceAll("(", '');
        currentWord = currentWord.replaceAll(")", '');
        currentWord = currentWord + "seed";
        let canBeCorrect = true;
        if (currentWord.length !== searchWord.length) { continue; }
        for (let f = 0; f < currentWord.length; f++){
            if (currentWord[f] !== searchWord[f] && searchWord[f] !== "?")
            {
                canBeCorrect = false;
                break;
            }
        }
        if (!canBeCorrect) {continue;}
        correctItems.push(currentWord);
    }

    if (correctItems.length !== 0){
        for (let i = 0; i < correctItems.length; i++){
            let p = document.createElement("p");
            p.className = "answer";
            p.innerText = correctItems[i];
            document.getElementById("allAnswers").appendChild(p);
        }
    } else {
        let p = document.createElement("p");
        p.className = "answer";
        p.innerText = "No items matching";
        document.getElementById("allAnswers").appendChild(p);
    }
}


main();
document.getElementById("search-button").addEventListener("click", search)
document.getElementById("item").addEventListener("input", function() {
    document.getElementById("len").innerText = document.getElementById("item").value.length;
})