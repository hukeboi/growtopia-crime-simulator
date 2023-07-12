const allItems = [
    {
        id: 1,
        name: "Heat Vision",
        type: "fire"
    },
    {
        id: 2,
        name: "Incinerate",
        type: "fire"
    },
    {
        id: 3,
        name: "Flame On!",
        type: "fire"
    },
    {
        id: 4,
        name: "Liquify",
        type: "fire"
    },
    {
        id: 5,
        name: "Overheat",
        type: "fire"
    },
    {
        id: 6,
        name: "Ice Shards",
        type: "ice"
    },
    {
        id: 7,
        name: "Frost Breath",
        type: "ice"
    },
    {
        id: 8,
        name: "Ice Barrier",
        type: "ice"
    },
    {
        id: 9,
        name: "Puddle",
        type: "ice"
    },
    {
        id: 10,
        name: "Frozen Mirror",
        type: "ice"
    },
    {
        id: 11,
        name: "Super Strength",
        type: "muscle"
    },
    {
        id: 12,
        name: "Super Speed",
        type: "muscle"
    },
    {
        id: 13,
        name: "Enrage",
        type: "muscle"
    },
    {
        id: 14,
        name: "Crush",
        type: "muscle"
    },
    {
        id: 15,
        name: "Regeneration",
        type: "muscle"
    },
    {
        id: 16,
        name: "Shocking Fist",
        type: "lightning"
    },
    {
        id: 17,
        name: "Thunderstorm",
        type: "lightning"
    },
    {
        id: 18,
        name: "Overcharge",
        type: "lightning"
    },
    {
        id: 19,
        name: "Megawatt Pulse",
        type: "lightning"
    },
    {
        id: 20,
        name: "Resuscitate",
        type: "lightning"
    }
]
function GetNameFromID(id) {
    for (let i = 0; i < allItems.length; i++){
        if (allItems[i].id === id){
            return allItems[i].name;
        }
    }
    return "none";
}
document.getElementById("start").disabled = true;
let pSelected = [];
let eSelected = [];
for (let i = 0; i < 20; i++){
    //PLAYER!
    let b = document.createElement("button");
    b.classList.add("button");
    b.classList.add("active");
    let img = document.createElement("img");
    img.src = "/assets/" + (i + 1) + ".png"
    img.classList.add("cardImg");
    b.appendChild(img);
    let text = document.createElement("div");
    text.innerText = GetNameFromID((i + 1));
    text.classList.add("text")
    b.appendChild(text);
    b.addEventListener("click", function() {
        if (pSelected.includes(i + 1)){
            pSelected.splice(pSelected.indexOf((i + 1)), 1);
            b.classList.remove("disabled")
            if (eSelected.length !== 5 || pSelected.length !== 5){
                document.getElementById("start").disabled = true;
            }
        } else if (pSelected.length < 5){
            pSelected.push(i + 1);
            b.classList.add("disabled")
            if (eSelected.length === 5 && pSelected.length === 5){
                document.getElementById("start").disabled = false;
            }
        }
        document.getElementById("me-card-title").innerText = "Select your cards: (" + pSelected.length + "/5)"
    })
    document.getElementById("my-cards").appendChild(b);


    //ENEMY!
    let b2 = document.createElement("button");
    b2.classList.add("button");
    b2.classList.add("active");
    let img2 = document.createElement("img");
    img2.src = "/assets/" + (i + 1) + ".png"
    img2.classList.add("cardImg");
    b2.appendChild(img2);
    let text2 = document.createElement("div");
    text2.innerText = GetNameFromID((i + 1));
    text2.classList.add("text")
    b2.appendChild(text2);
    b2.addEventListener("click", function() {
        if (eSelected.includes(i + 1)){
            eSelected.splice(eSelected.indexOf((i + 1)), 1);
            b2.classList.remove("disabled")
            if (eSelected.length !== 5 || pSelected.length !== 5){
                document.getElementById("start").disabled = true;
            }
        } else if (eSelected.length < 5){
            eSelected.push(i + 1);
            b2.classList.add("disabled")
            if (eSelected.length === 5 && pSelected.length === 5){
                document.getElementById("start").disabled = false;
            }
        }
        document.getElementById("bot-card-title").innerText = "Select bot cards: (" + eSelected.length + "/5)"
    })
    document.getElementById("bot-cards").appendChild(b2);
}
let b = document.createElement("button");
b.classList.add("button");
b.classList.add("active");
let img = document.createElement("img");
img.src = "/assets/r.png"
img.classList.add("cardImg");
b.appendChild(img);
let text = document.createElement("div");
text.innerText = "Random cards";
text.classList.add("text")
b.appendChild(text);
b.addEventListener("click", function() {
    if (eSelected.includes("x")){
        eSelected = [];
        b.classList.remove("disabled")
        if (eSelected.length !== 5 || pSelected.length !== 5){
            document.getElementById("start").disabled = true;
        }
    } else if (eSelected.length === 0){
        eSelected = ["x", "x", "x", "x", "x"];
        b.classList.add("disabled")
        if (eSelected.length === 5 && pSelected.length === 5){
            document.getElementById("start").disabled = false;
        }
    }
    document.getElementById("bot-card-title").innerText = "Select bot cards: (" + eSelected.length + "/5)"
})
document.getElementById("bot-cards").appendChild(b);


document.getElementById("start").addEventListener("click", function() {
    if (eSelected.includes("x")){
        eSelected.splice(1, 4);
    } else {
        eSelected.sort(function(a, b){return a-b});
    }
    pSelected.sort(function(a, b){return a-b});
    let cards = pSelected.toString() + "_" + eSelected.toString();
    cards = cards.replaceAll(",", "_");
    let hp = document.getElementById("hp-me").value + "_" + document.getElementById("hp-bot").value;
    window.location.href = "/play?c=" + encodeURIComponent(cards) + "&h=" + encodeURIComponent(hp);
})