import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase , ref , push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL : "https://playground-afd94-default-rtdb.firebaseio.com/",
}

const app = initializeApp(appSettings);
const database= getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const inputEl= document.getElementById("input-field")
const buttonEl=document.getElementById("add-button")
const shoppingListEl=document.getElementById("shopping-list")

buttonEl.addEventListener("click", function(){
    let inputValue=inputEl.value
    push(shoppingListInDB, inputValue)
    // showingItem(inputValue)
    console.log( inputValue );
    clear();

    

})

onValue(shoppingListInDB, function (snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue= currentItem[1]
            showingItem( currentItem ); 
    }
 }

 else {
    shoppingListEl.innerHTML="Add items in Shopping cart";
 }

    // console.log(itemsArray);
})

function showingItem(item) {

    let itemID = item[0];
    let itemValue= item[1]

    let newEl= document.createElement("li");
    newEl.textContent=itemValue;

    newEl.addEventListener("click", function(){
        // console.log(itemID);
        let exactLocation=ref(database,`shoppingList/${itemID}`)
        remove(exactLocation)
    })



    shoppingListEl.append(newEl);
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML="";
}

function clear() {
    inputEl.value= "";
}