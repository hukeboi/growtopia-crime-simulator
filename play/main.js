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
function GetTypeFromID(id) {
    for (let i = 0; i < allItems.length; i++){
        if (allItems[i].id === id){
            return allItems[i].type;
        }
    }
    return "none";
}
function GetNameFromID(id) {
    for (let i = 0; i < allItems.length; i++){
        if (allItems[i].id === id){
            return allItems[i].name;
        }
    }
    return "none";
}
function GetColoredNameFromID(id) {
    for (let i = 0; i < allItems.length; i++){
        if (allItems[i].id === id){
            switch (GetTypeFromID(id)){
                case "fire":
                    return "!3" + allItems[i].name.replaceAll(" ", " !3");
                case "ice":
                    return "!4" + allItems[i].name.replaceAll(" ", " !4");
                case "muscle":
                    return "!5" + allItems[i].name.replaceAll(" ", " !5");
                case "lightning":
                    return "!6" + allItems[i].name.replaceAll(" ", " !6");
                default:
                    return allItems[i].name;
                
            }
            
        }
    }
    return "none";
}
function ElementNullifies(element) {
    if (element === "fire"){ return "muscle"; }
    if (element === "muscle"){ return "lightning"; }
    if (element === "lightning"){ return "ice"; }
    if (element === "ice"){ return "fire"; }
    return "none";
}
function HasEffect(who, number){
    for (let i = 0; i < who.effects.length; i++){
        if (who.effects[i][0] === number){
            return true;
        }
    }
    return false;
}
function UpdateHealthUI(){
    document.getElementById("hp-me").childNodes[1].textContent = " - Life: " + me.health + "/" + me.maxhealth;
    document.getElementById("hp-bot").childNodes[1].textContent = " - Life: " + enemy.health + "/" + enemy.maxhealth;
}
function Thunderstorm(cardobject, enemyobject){
    //THUNDERSTORM:
    if (HasEffect(cardobject.opponent, 17)){
        DealDamage(1, cardobject, {id: -99, user: enemyobject.user, opponent: enemyobject.opponent});
        console.log("Took damage from Thunderstorm")
    }
}
function AddEffect(obj, who){
    let added = false;
    for (let i = 0; i < who.effects.length; i++){
        if (who.effects[i][0] === obj[0]){
            who.effects[i][1] = obj[1];
            added = true;
        }
    }
    if (!added){
        who.effects.unshift(obj);
    }
}
function CheckHp(who){
    if (who.health <= 0 && HasEffect(who, 20)){
        who.health = 1;
        let removeIndex = 0;
        for (let i = 0; i < who.effects.length; i++){
            if (who.effects[i] === 20){
                removeIndex = i;
                console.log("Saved by Resuscitate")
                break;
            }
        }
        who.effects.splice(removeIndex, 1);
    } else {
        if (enemy.health <= 0 && GameOn){
            GameOn = false;
            for (let i = 0; i < cardButtons.length; i++){
                cardButtons[i].disabled = true;
                cardButtons[i].firstChild.classList.add("disabled");
                cardButtons[i].classList.remove("active");
            }
            document.getElementById("not").disabled = true;
            document.getElementById("end").style = "display: inherit;";
            
            console.log("YOU WON!!!!")
        }
        if (me.health <= 0 && GameOn){
            GameOn = false;
            for (let i = 0; i < cardButtons.length; i++){
                cardButtons[i].disabled = true;
                cardButtons[i].firstChild.classList.add("disabled");
                cardButtons[i].classList.remove("active");
            }
            document.getElementById("not").disabled = true;
            document.getElementById("end").style = "display: inherit;";
            document.getElementById("end").childNodes[1].textContent = "You lost...";
            console.log("YOU LOST!!!!")
        }
    }
}
const header = document.getElementById("header");
const supers = document.getElementById("ss");
function Inform(message, place){
    //COLOR CODES: !1: YOU, !2: ENEMY, !3: FIRE, !4: ICE, !5: MUSCLE, !6: LIGHTNING, !7: QUOTE
    let base;
    if (place === 0){
        base = header;
    } else if (place === 1){
        base = document.createElement("p");
        base.classList.add("text")
        base.classList.add("fx")
        document.getElementById("player-fx").appendChild(base);
    } else if (place === 2){
        base = document.createElement("p");
        base.classList.add("text")
        base.classList.add("fx")
        document.getElementById("bot-fx").appendChild(base);
    } else if (place === 3){
        base = supers;
    }
    base.innerText = "";
    let words = message.split(" ");
    let lastColor = "";
    let lastNode;
    
    for (let i = 0; i < words.length; i++){
        if (words[i].substring(0, 2) === lastColor){
            lastNode.textContent += words[i].substring(2, words[i].length) + " ";
            continue;
        }
        let newElem = document.createElement("span");
        let isColor = true;
        switch (words[i].substring(0, 2)){
            case "!1":
                newElem.classList.add("you");
                break;
            case "!2":
                newElem.classList.add("enemy");
                break;
            case "!3":
                newElem.style = "color: #f62622;";
                break;
            case "!4":
                newElem.style = "color: #aff3ff;";
                break;
            case "!5":
                newElem.style = "color: #43f408;";
                break;
            case "!6":
                newElem.style = "color: #feea7a;";
                break;
            case "!7":
                newElem.style = "color: #fdfffa;";
                break;
            default:
                isColor = false;
                break;
        }
        if (isColor){
            newElem.textContent = words[i].substring(2, words[i].length) + " ";
            base.appendChild(newElem);
            lastNode = newElem;
        } else {
            let txt = document.createTextNode(words[i] + " ");
            if (words)
            base.appendChild(txt);
        }
        lastColor = words[i].substring(0, 2);
        if (!isColor){
            lastColor = "none";
        }
    }
    
    //console.log(message)
}

let me = {
    cards: [],
    health: 8,
    maxhealth: 8,
    unavailableCards: [],
    playedCards: [],

    //card specific things:
    permanentlyDisabled: 0,
    effects: [],
    superSpeedSawNextCard: false,
    storm: false,
    megawatt: 0
};
let enemy = {
    cards: [],
    health: 10,
    maxhealth: 10,
    unavailableCards: [],
    playedCards: [],

    //card specific things:
    permanentlyDisabled: 0,
    effects: [],
    superSpeedSawNextCard: false,
    storm: false,
    megawatt: 0
};

let waitForInput = false;
let enemyNextCard = 0;
let cardButtons = [];
let GameOn = true;

function DealDamage(amount, card, opponentCard){
    let opponent = card.opponent;
    let EffectsToBeRemoved = [];
    let EffectsToBeRemovedOpp = [];

    //calculate the damage
    if (opponentCard.id === 13){//enrage (block 1 dmg on this turn)
        amount -= 1;
        console.log("Partly blockked by Enrage")
    }

    for (let i = 0; i < card.user.effects.length; i++){
        if (card.user.effects[i][0] === 3) {//flame on (take 1 damage)
            card.user.health -= 1;
            console.log("Deflected by Flame On!")
        }
        if (card.user.effects[i][0] === 5){//overheat +1 dmg
            amount += 1;
            console.log("Dealt 1 more dmg due to Overheat")
        }
        if (card.user.effects[i][0] === 13){//enrage (do +1 dmg on next attac)
            amount += 1;
            console.log("More damage due to Enrage")
            EffectsToBeRemoved.push(i);
        }
        if (card.user.effects[i][0] === 18 && card.id === 18){
            amount += 1;
            console.log("More damage due to Overcharge")
        }
    }
    for (let i = 0; i < card.opponent.effects.length; i++){
        if ((card.opponent.effects[i][0] === 8 && GetTypeFromID(card.id) !== "lightning") || (opponentCard.id === 8 && GetTypeFromID(card.id) !== "lightning")) {//ice barrier (mitigate dmg if not lightning)
            amount = 0;
            console.log("Blockked by Ice Barrier")
            EffectsToBeRemovedOpp.push(i);
            break;
        }    
        if (amount === 0) { break; }
    }


    if (amount !== 0 && HasEffect(card.opponent, 17) && GetTypeFromID(card.id) === "muscle"){
        for (let i = 0; i < card.opponent.effects.length; i++){
            if (card.opponent.effects[i][0] === 17){
                EffectsToBeRemovedOpp.push(i);
                console.log("Thunderstorm was removed by a muscle card.")
            }
        }
    }
    if (amount !== 0 && HasEffect(opponent, 18) && GetTypeFromID(card.id) === "muscle"){
        for (let i = 0; i < card.opponent.effects.length; i++){
            if (card.opponent.effects[i][0] === 18){
                EffectsToBeRemovedOpp.push(i);
                console.log("Overcharge was remove by a muscle card.")
            }
        }
    }

    opponent.health -= amount;


    //remove 1 time effects (ONLY REMOVES OPPONENT) NOTE: PASS INDEX NOT ID!!!!!
    for (let i = 0; i < EffectsToBeRemoved.length; i++){
        card.user.effects.splice(EffectsToBeRemoved[i], 1);
    }
    for (let i = 0; i < EffectsToBeRemovedOpp.length; i++){
        card.opponent.effects.splice(EffectsToBeRemovedOpp[i], 1);
    }

    UpdateHealthUI();
}

function processCard(card, opponentCard, trueid){
    let newEffect = [[], [], ""];

    if (HasEffect(card.user, 7) && GetTypeFromID(card.id) !== "fire"){
        console.log("Blocked by Frost Breath")
        return newEffect;
    }
    if (HasEffect(card.opponent, 9) && GetTypeFromID(opponentCard.id) !== "lightning"){
        console.log("Took damage from puddle")
        DealDamage(1, card, opponentCard)
    }

    switch (card.id){
        case 1:
            DealDamage(1, card, opponentCard)
            break;
        case 2:
            if (GetTypeFromID(trueid) === "muscle") {
                DealDamage(2, card, opponentCard);
            } else {
                DealDamage(1, card, opponentCard)
            }
            break;
        case 3:
            card.user.health += 1;
            if (card.user.health > card.user.maxhealth) {card.user.health = card.user.maxhealth};
            UpdateHealthUI();
            newEffect[0] = [card.id, 3]
            break;
        case 4:
            DealDamage(1, card, opponentCard);
            card.opponent.permanentlyDisabled = trueid;
            break;
        case 5:
            newEffect[1] = [card.id, 1];
            break;
        case 6:
            DealDamage(1, card, opponentCard);
            break;
        case 7:
            newEffect[0] = [card.id, 1]
            break;
        case 8:
            newEffect[1] = [card.id, -99];
            break;
        case 9:
            newEffect[0] = [card.id, 3]
            break;
        case 10:
            DealDamage(1, card, opponentCard);
            if ([1, 2, 4].includes(trueid) && HasEffect(card.opponent, 5)){
                processCard({id: trueid, user: card.user, opponent: card.opponent}, {id: -99, user: card.opponent, opponent: card.user})
                if (card.user === me){
                    newEffect[2] = "!2The !2enemy thaws out by using a !3Fire card! !1Your !4Frozen !4Mirror reflected !2the !2enemy's " + GetColoredNameFromID(trueid) + "!";
                } else {
                    newEffect[2] = "!1You thaw out by using a !3Fire card! !2The !2enemy's !4Frozen !4Mirror reflected !1your " + GetColoredNameFromID(trueid) + "!";
                }
            }
            break;
        case 11:
            DealDamage(1, card, opponentCard);
            break;
        case 12:
            DealDamage(1, card, opponentCard);
            card.user.superSpeedSawNextCard = true;
            break;
        case 13:
            newEffect[1] = [card.id, -99];
            break;
        case 14:
            if (GetTypeFromID(trueid) === "lightning"){
                DealDamage(3, card, opponentCard);
            }
            break;
        case 15:
            newEffect[1] = [card.id, 1]
            break;
        case 16:
            DealDamage(1, card, opponentCard);
            break;
        case 17:
            //card.user.storm = true;
            newEffect[0] = [card.id, 2]
            break;
        case 18:
            newEffect[1] = [card.id, -99];
            break;
        case 19:
            card.user.megawatt = card.id;
            DealDamage(2, card, opponentCard);
            break;
        case 20:
            newEffect[1] = [card.id, 3];
            break;
        default:
            console.log("error, invalid card");
            break;
    }
    
    return newEffect;
}

function useCards(cardObj1, cardObj2){

    //manage playable and unplayable cards
    cardObj1.user.unavailableCards.pop();
    cardObj1.user.unavailableCards.unshift(cardObj1.id);
    

    cardObj2.user.unavailableCards.pop();
    cardObj2.user.unavailableCards.unshift(cardObj2.id);
    

    let obj1Effect = [];
    let obj2Effect = [];

    if (HasEffect(cardObj1.user, 15)){
        cardObj1.user.health += 1;
        if (cardObj1.user.health > cardObj1.user.maxhealth) {cardObj1.user.health = cardObj1.user.maxhealth};
        console.log("Healed by Regeneration")
        UpdateHealthUI();
    }
    if (HasEffect(cardObj2.user, 15)){
        cardObj2.user.health += 1;
        if (cardObj2.user.health > cardObj2.user.maxhealth) {cardObj2.user.health = cardObj2.user.maxhealth};
        console.log("Healed by Regeneration")
        UpdateHealthUI();
    }

    
    if (cardObj1.id === 0 && cardObj2.id === 0){
        Inform("Wow. !1You and !2the !2enemy just stare at each other. lol", 0)
    } else if (cardObj1.id === 12 && cardObj2.id === 12) {
        Inform("!1You and !2the !2enemy both used !5Super !5Speed so neither sees the next cards.", 0)
    } else if (cardObj1.id === 0) {
        obj2Effect = processCard(cardObj2, cardObj1, cardObj1.id);
        Inform("!1You stare slack-jawed as !2the !2enemy uses " + GetColoredNameFromID(cardObj2.id) + ".", 0)
    } else if (cardObj2.id === 0) {
        obj1Effect = processCard(cardObj1, cardObj2, cardObj2.id);
        Inform("!2the !2enemy stares slack-jawed as !1you use " + GetColoredNameFromID(cardObj1.id) + ".", 0)
    } else if (ElementNullifies(GetTypeFromID(cardObj1.id)) == GetTypeFromID(cardObj2.id)){
        //only process card 1 except if effect = 5
        if (HasEffect(cardObj2.user, 5) && GetTypeFromID(cardObj2.id) === "fire"){
            obj2Effect = processCard(cardObj2, cardObj1, cardObj1.id);
            obj1Effect = processCard(cardObj1, cardObj2, cardObj2.id);
        } else {
            obj1Effect = processCard(cardObj1, {id: -99, user: enemy, opponent: me}, cardObj2.id);
            if (obj1Effect[2].length !== 0){
                Inform(obj1Effect[2], 0);
            } else {
                switch (GetTypeFromID(cardObj1.id)){
                    case "fire":
                        Inform("!1Your " + GetColoredNameFromID(cardObj1.id) + " scoraches !2the !2enemy, stopping " + GetColoredNameFromID(cardObj2.id) + " from working.", 0);
                        break;
                    case "ice":
                        Inform("!1Your " + GetColoredNameFromID(cardObj1.id) + " freezes !2the !2enemy, stopping " + GetColoredNameFromID(cardObj2.id) + " from working.", 0);
                        break;
                    case "muscle":
                        Inform("!1Your " + GetColoredNameFromID(cardObj1.id) + " pummels !2the !2enemy, stopping " + GetColoredNameFromID(cardObj2.id) + " from working.", 0);
                        break;
                    case "lightning":
                        Inform("!1Your " + GetColoredNameFromID(cardObj1.id) + " shocks !2the !2enemy, stopping " + GetColoredNameFromID(cardObj2.id) + " from working.", 0);
                        break;
                }
            }
            
        }    

    } else if (ElementNullifies(GetTypeFromID(cardObj2.id)) == GetTypeFromID(cardObj1.id)){
        //only process card 2 except if effect 5
        if (HasEffect(cardObj1.user, 5) && GetTypeFromID(cardObj1.id) === "fire"){
            obj1Effect = processCard(cardObj1, cardObj2, cardObj2.id);
            obj2Effect = processCard(cardObj2, cardObj1, cardObj1.id);
        } else {
            obj2Effect = processCard(cardObj2, {id: -99, user: me, opponent: enemy}, cardObj1.id);
            if (obj2Effect[2].length !== 0){
                Inform(obj1Effect[2], 0);
            } else {
                switch (GetTypeFromID(cardObj2.id)){
                    case "fire":
                        Inform("!2The !2enemy's " + GetColoredNameFromID(cardObj2.id) + " scoraches !1you, stopping " + GetColoredNameFromID(cardObj1.id) + " from working.", 0);
                        break;
                    case "ice":
                        Inform("!2The !2enemy's " + GetColoredNameFromID(cardObj2.id) + " freezes !1you, stopping " + GetColoredNameFromID(cardObj1.id) + " from working.", 0);
                        break;
                    case "muscle":
                        Inform("!2The !2enemy's " + GetColoredNameFromID(cardObj2.id) + " pummels !1you, stopping " + GetColoredNameFromID(cardObj1.id) + " from working.", 0);
                        break;
                    case "lightning":
                        Inform("!2The !2enemy's " + GetColoredNameFromID(cardObj2.id) + " shocks !1you, stopping " + GetColoredNameFromID(cardObj1.id) + " from working.", 0);
                        break;
                }
            }
        }

    } else {
        //process 1 and 2
        obj1Effect = processCard(cardObj1, cardObj2, cardObj2.id);
        obj2Effect = processCard(cardObj2, cardObj1, cardObj1.id);
        if (obj1Effect[2].length !== 0){
            Inform(obj1Effect[2], 0);
        } else {
            Inform("!1You use " + GetColoredNameFromID(cardObj1.id) + " while !2the !2enemy uses " + GetColoredNameFromID(cardObj2.id), 0)
        }
    }
    
    if (cardObj1.id === 15){
        cardObj1.user.health += 1;
        if (cardObj1.user.health > cardObj1.user.maxhealth) {cardObj1.user.health = cardObj1.user.maxhealth};
    }
    if (cardObj2.id === 15){
        cardObj2.user.health += 1;
        if (cardObj2.user.health > cardObj2.user.maxhealth) {cardObj2.user.health = cardObj2.user.maxhealth};
    }
    UpdateHealthUI();

    if (obj1Effect.length === 0){
        Thunderstorm(cardObj1, {id: -99, user: me, opponent: enemy});
        obj1Effect = [[], []];
    } else {
        Thunderstorm(cardObj1, cardObj2);
    }
    if (obj2Effect.length === 0){
        Thunderstorm(cardObj2, {id: -99, user: enemy, opponent: me});
        obj2Effect = [[], []];
    } else {
        Thunderstorm(cardObj2, cardObj1);
    }

    CheckHp(cardObj1.user);
    CheckHp(cardObj2.user);
    UpdateHealthUI();
    
    if (obj1Effect[0].length !== 0) {
        AddEffect(obj1Effect[0], cardObj2.user);
    }
    if (obj2Effect[0].length !== 0) {
        AddEffect(obj2Effect[0], cardObj1.user);
    }
    if (obj1Effect[1].length !== 0) {
        AddEffect(obj1Effect[1], cardObj1.user);
    }
    if (obj2Effect[1].length !== 0) {
        AddEffect(obj2Effect[1], cardObj2.user);
    }

    let p1ToBeRem = [];
    document.getElementById("player-fx").innerText = "";
    document.getElementById("bot-fx").innerText = "";
    for (let i = 0; i < cardObj1.user.effects.length; i++) {
        if (cardObj1.user.effects[i][1] >= 0){
            cardObj1.user.effects[i][1] -= 1;
        }
        if (cardObj1.user.effects[i][1] === -1) {
            p1ToBeRem.push(i)
        }
        if (cardObj1.user.effects[i][1] >= 0 || cardObj1.user.effects[i][1] === -99){
            let leng = "(" + (cardObj1.user.effects[i][1] + 1).toString() + " turns)";
            if (cardObj1.user.effects[i][1] === 0) {leng = "(This turn)"}
            if (cardObj1.user.effects[i][0] === 5){
                Inform("!5Unblockable: Your !3Fire cards cannot be blocked and do +1 damage. " + leng, 1)
            } else if (cardObj1.user.effects[i][0] === 3){
                Inform("!5Retaliation: If hit, the attacker will take 1 damage. " + leng, 2)
            } else if (cardObj1.user.effects[i][0] === 7){
                Inform("!3Frozen: You can't move a muscle. Fire cards can thaw you. " + leng, 1)
            } else if (cardObj1.user.effects[i][0] === 8){
                Inform("!5Shielded: You are immune to all attacks except !6Lightning. (permanent)", 1)
            } else if (cardObj1.user.effects[i][0] === 9){
                Inform("!3Puddle: You suffer 1 damage each time you use a !6Lightning card. " + leng, 1)
            } else if (cardObj1.user.effects[i][0] === 13){
                Inform("!5Enraged: Your next attack does +1 damage (permanent)", 1)
            } else if (cardObj1.user.effects[i][0] === 15){
                Inform("!5Regeneration: Healing 1 life each turn. " + leng, 1)
            } else if (cardObj1.user.effects[i][0] === 17){
                Inform("!3Thunderstorm: Lightning will strike you for 1 damage every turn. Hit with a !5Muscle card to remove this. " + leng, 1)
            } else if (cardObj1.user.effects[i][0] === 18){
                Inform("!5Charged !5Up: Your !6Lightning cards deal +1 damage. (permanent)", 1)
            }
        }
        
    }
    let p2ToBeRem = [];
    for (let i = 0; i < cardObj2.user.effects.length; i++) {
        if (cardObj2.user.effects[i][1] >= 0){
            cardObj2.user.effects[i][1] -= 1;
        }
        if (cardObj2.user.effects[i][1] === -1) {
            p2ToBeRem.push(i) 
        }
        if (cardObj2.user.effects[i][1] >= 0 || cardObj2.user.effects[i][1] === -99){
            let leng = "(" + (cardObj2.user.effects[i][1] + 1).toString() + " turns)";
            if (cardObj2.user.effects[i][1] === 0) {leng = "(This turn)"}
            if (cardObj2.user.effects[i][0] === 5){
                Inform("!1Unblockable: Your !3Fire cards cannot be blocked and do +1 damage. " + leng, 2)
            } else if (cardObj2.user.effects[i][0] === 3){
                Inform("!5Retaliation: If hit, the attacker will take 1 damage. " + leng, 1)
            } else if (cardObj2.user.effects[i][0] === 7){
                Inform("!3Frozen: You can't move a muscle. Fire cards can thaw you. " + leng, 2)
            } else if (cardObj2.user.effects[i][0] === 8){
                Inform("!5Shielded: You are immune to all attacks except !6Lightning. (permanent)", 2)
            } else if (cardObj2.user.effects[i][0] === 9){
                Inform("!3Puddle: You suffer 1 damage each time you use a !6Lightning card. " + leng, 2)
            } else if (cardObj2.user.effects[i][0] === 13){
                Inform("!5Enraged: Your next attack does +1 damage (permanent)", 2)
            } else if (cardObj2.user.effects[i][0] === 15){
                Inform("!5Regeneration: Healing 1 life each turn. " + leng, 2)
            } else if (cardObj2.user.effects[i][0] === 17){
                Inform("!3Thunderstorm: Lightning will strike you for 1 damage every turn. Hit with a !5Muscle card to remove this. " + leng, 2)
            } else if (cardObj2.user.effects[i][0] === 18){
                Inform("!5Charged !5Up: Your !6Lightning cards deal +1 damage. (permanent)", 2)
            }
        }
    }
    for (let i = 0; i < p1ToBeRem.length; i++){
        cardObj1.user.effects.splice(p1ToBeRem[i], 1);
    }
    for (let i = 0; i < p2ToBeRem.length; i++){
        cardObj2.user.effects.splice(p2ToBeRem[i], 1);
    }


    if (me.megawatt === 18 && me.playedCards[2] === 18){
        me.megawatt = 0;
    }
    if (enemy.megawatt === 18 && enemy.playedCards[2] === 18){
        enemy.megawatt = 0;
    }
    cardObj2.user.playedCards.unshift(cardObj2.id);
    cardObj1.user.playedCards.unshift(cardObj1.id);
    //get next card for ai
    let selectable = [];
    for (let i = 0; i < enemy.cards.length; i++){
        if (!enemy.unavailableCards.includes(enemy.cards[i]) && enemy.permanentlyDisabled !== enemy.cards[i] && enemy.megawatt !== enemy.cards[i] && !(enemy.cards[i] === 12 && enemy.playedCards[1] === 12)) {
            selectable.push(enemy.cards[i]);
        }
    }
    if (selectable.length === 0) {selectable.push(0)}
    enemyNextCard = selectable[Math.floor(Math.random()*selectable.length)];

    if (me.superSpeedSawNextCard){
        Inform("Thanks to your Super Speed, you can see that !2the !2enemy is going to play " + GetColoredNameFromID(enemyNextCard) + " this turn...", 3);
        me.superSpeedSawNextCard = false;
    } else{ 
        supers.innerText = "";
    }
    
    //update ui buttons
    if (GameOn){
        for (let i = 0; i < cardButtons.length; i++){
            if (me.unavailableCards.includes(me.cards[i]) || me.permanentlyDisabled === me.cards[i] || me.megawatt === me.cards[i] || (me.cards[i] === 12 && me.playedCards[1] === 12) || (HasEffect(me, 7) && GetTypeFromID(me.cards[i]) !== "fire")){
                cardButtons[i].disabled = true;
                cardButtons[i].firstChild.classList.add("disabled");
                cardButtons[i].classList.remove("active");
            } else {
                cardButtons[i].disabled = false;
                cardButtons[i].firstChild.classList.remove("disabled");
                cardButtons[i].classList.add("active");
            }
        }
    }

    waitForInput = true;
}

function start(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const allCards = urlParams.get("c").split("_");
    const hp = urlParams.get("h").split("_");

    if (!(allCards.length === 10 || allCards.length === 6) || hp.length !== 2) {
        console.log("Invalid cards")
        return;
    }

    for (let i = 0; i < allCards.length; i++){
        if (i <= 4){
            me.cards.push(parseInt(allCards[i]));
        } else{
            if (allCards[i] === "x"){
                enemy.cards.push(Math.floor(Math.random() * (1 - 20 + 1)) + 20);
                enemy.cards.push(Math.floor(Math.random() * (1 - 20 + 1)) + 20);
                enemy.cards.push(Math.floor(Math.random() * (1 - 20 + 1)) + 20);
                enemy.cards.push(Math.floor(Math.random() * (1 - 20 + 1)) + 20);
                enemy.cards.push(Math.floor(Math.random() * (1 - 20 + 1)) + 20);
                break;
            } else {
                enemy.cards.push(parseInt(allCards[i]));
            }
        }
    }

    me.health = parseInt(hp[0]);
    me.maxhealth = parseInt(hp[0]);
    enemy.health = parseInt(hp[1]);
    enemy.maxhealth = parseInt(hp[1]);

    //generate enemy cards:
    //enemy.cards = [17, 19, 8, 6, 7];

    //me.cards = [18, 16, 17, 12, 15];

    enemyNextCard = enemy.cards[Math.floor(Math.random()*enemy.cards.length)];

    for (let i = 0; i < me.cards.length; i++){
        let b = document.createElement("button");
        b.classList.add("button");
        b.classList.add("active");
        let img = document.createElement("img");
        img.src = "../assets/" + me.cards[i] + ".png"
        img.classList.add("cardImg");
        b.appendChild(img);
        let text = document.createElement("div");
        text.innerText = GetNameFromID(me.cards[i]);
        text.classList.add("name")
        b.appendChild(text);
        //b.innerText = GetNameFromID(me.cards[i])
        b.addEventListener("click", function() {
            if (waitForInput === false) { return; }
            waitForInput = false
            useCards({id: me.cards[i], user: me, opponent: enemy}, {id: enemyNextCard, user: enemy, opponent: me});
        })
        document.getElementById("allbuttons").appendChild(b);
        cardButtons.push(b);
    }
    document.getElementById("not").addEventListener("click", function() {
        if (waitForInput === false) { return; }
        waitForInput = false
        useCards({id: 0, user: me, opponent: enemy}, {id: enemyNextCard, user: enemy, opponent: me});
    })
    UpdateHealthUI();
    Inform('!1You and !2the !2enemy stand face to face on an empty street. !2The !2enemy says, " !7*imagine !7something !7funny !7here* ".', 0)
    waitForInput = true;
}

//COLOR CODES: !1: YOU, !2: ENEMY, !3: FIRE, !4: ICE, !5: MUSCLE, !6: LIGHTNING


start();

