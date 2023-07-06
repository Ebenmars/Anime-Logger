import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://anime-logger-64da3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const animeListInDB = ref(database, "Anime")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const animeListEl = document.getElementById("anime-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(animeListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(animeListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearAnimeListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToAnimeListEl(currentItem)
        }    
    } else {
        animeListEl.innerHTML = "No items here... yet"
    }
})

function clearAnimeListEl() {
    animeListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToAnimeListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `Anime/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    animeListEl.append(newEl)
}