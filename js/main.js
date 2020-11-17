/* Värden som behövs i början */
/* Skapar en array så man kan se hur listan ska se ut på skärmen */ 
let toDoList = [];
/* Array som lagrar min klass på alla checkbox-element som håller reda på ifall den i ibockad eller inte*/
let checkboxStatus = [];

let tbody = document.createElement("tbody");

/* Klassen Todo har en beskrivning på uppgiften, prioritet och deadlinedatum som egenskaper */
class Todo {
    constructor(description, priority, deadlineDate){
        this.description = description;
        this.priority = priority;
        this.deadlineDate = deadlineDate;
    }
}


/* Startar med att läsa in listan och visar den, sidan ska kolla ifall någon vill sortera listan eller ifall någon ska lägga till något nytt */ 
window.onload = function(){

    showAndRefreshList();

    /* Eventlistners för att ta bort och sortera min lista */
    document.getElementById("addToDoItemBtn").addEventListener('click', () => {getUserInput();});
    document.getElementById("sortToDoList").addEventListener('click', () => {sortToDoList();});

}

/* Denna funktionen ska kolla igenom listan och skapar element så webbläsaren kan visa todo-listan */
function showAndRefreshList(){

    tbody.innerHTML = "";

    for(let i=0; i<toDoList.length; i++){

        let trElement = document.createElement("tr");
        trElement.setAttribute("id", "item"+i);

        trElement.innerHTML = '<td><input type="checkbox" id="checkItem'+i+'"/></td> <td><label for="checkItem'+i+'">'+ 
                                toDoList[i].description +
                                '</label></td> <td><label for="checkItem'+i+'">' + 
                                toDoList[i].priority.toUpperCase() +'</label></td> <td><label for="checkItem'+i+'">'+ 
                                toDoList[i].deadlineDate + '</label></td> <td><button id="deleteItem'+i+'">x</button></td>';

        tbody.appendChild(trElement);
    }

    document.getElementById("todoTable").appendChild(tbody);

    /* Eventlistener som lyssar på checkboxen och ta bort knappen. Ifall man bockar i en checkbox eller på ta-bort knappen så anropas checkIfItemIsChecked och removeItem 
    funktionerna och skickar med indexnumret där elementet ligger i min array */
    for(let i=0; i<toDoList.length; i++){
        document.getElementById("checkItem"+i).addEventListener('click', () => {
            checkIfItemIsChecked(i);
            
            /* Jag har en lista som heter checkboxStatus som lagrar alla status på mina input-element ifall checkboxen är checkad eller inte och sedan uppdateras varje gång som jag klickar
            på någon av dem */
            for(let i=0; i<toDoList.length; i++){
                checkboxStatus[i] = document.getElementById("item"+i).className;   
            }
        });
        document.getElementById("deleteItem"+i).addEventListener('click', () => {removeItem(i);});   
    }

    /* Detta är en for-loop som uppdaterar klassen på mina checkboxar. Den sätter rätt klass på mina checkboxar som antingen gör så texten blir överstryken eller inte */
    for(let i=0; i<toDoList.length; i++){
        let tdElement = document.getElementById("item"+i);
        
        if(checkboxStatus[i] == "checkedCheckbox"){
            tdElement.setAttribute("class", "checkedCheckbox");
            document.getElementById("checkItem"+i).checked = true;
        }
        else {
            tdElement.setAttribute("class", "notCheckedCheckbox");
            document.getElementById("checkItem"+i).checked = false;
        }
    }    

    /* Läggs till sist för att ge en gemensam klass till mina ta-bort knappar och mina checkboxes så jag kan styla dem */
    for(let i=0; i<toDoList.length; i++){
        document.getElementById("deleteItem"+i).setAttribute("class", "deleteButton");
        document.getElementById("checkItem"+i).setAttribute("class", "checkboxes");
    }

}

/* Används för att hämta input-datan för min textruta så värdet hämtas. Sen anropar denna funktion addItem som lägger till sidan */
function getUserInput() {
    let inputDescription = document.getElementById("newToDoListDescription").value;
    let inputPriority = document.getElementById("newToDoListPriority").value;
    let inputDeadlineDate = document.getElementById("newToDoListDeadlineDate").value;

    /* Kollar så ingen ruta blir tom */
    if(inputDescription == "" || inputPriority == "" || inputDeadlineDate == ""){
        alert("Du glömde fylla i en eller flera av rutorna!!! Försök igen.")
    }
    else {
        /* Tvinga användaren att skriva in antingen hög eller låg */
        if(inputPriority.toLowerCase() == "hög" || inputPriority.toLowerCase() == "låg" ){
            addItem(inputDescription, inputPriority, inputDeadlineDate);
        }
        else {
            alert("Du måste skriva antigen hög eller låg!!!")
        }
    }
}

/* Funktionen hämtar ett input-värde från textrutan och lägger till den i arrayen todoList. Anropar sedan funktionen som ska "refresha listan och skriva ut den igen" */
function addItem(inputDescription, inputPriority, inputDeadlineDate){
    let newTodoListItem = new Todo(inputDescription, inputPriority, inputDeadlineDate)
    
    console.log("Du la till" + newTodoListItem.description + " i listan");
    toDoList.push(newTodoListItem);

    /* Rensar bara textrutorna */
    document.getElementById("newToDoListDescription").value = "";
    document.getElementById("newToDoListPriority").value = "";
    document.getElementById("newToDoListDeadlineDate").value = "";

    showAndRefreshList();
}

/*Tar bort ett element i min array och anropar sedan funktionen som refreshar sidan igen*/
function removeItem(itemIndex){
    console.log("Du tog bort " + toDoList[itemIndex].description);
    
    toDoList.splice(itemIndex,1);
    checkboxStatus.splice(itemIndex,1);

    showAndRefreshList();
}

/* Kollar ifall jag har klickat i min checkbox. Den hämtar mitt indexnummer var denna checkbox ligger bredvid i min array och byter className på det elementet.
Den får antingen ett streck över texten eller om den redan har det, så tar den bort den beroende på vad den hade tidigare */
function checkIfItemIsChecked(itemIndex){
    if(document.getElementById("item"+itemIndex).className == "checkedCheckbox"){
        document.getElementById("item"+itemIndex).className = "notCheckedCheckbox";
    }
    else {
        document.getElementById("item"+itemIndex).className = "checkedCheckbox";
    }
} 

/* Sorterar listan efter bokstavsordning på min prioritet. I detta fall blir det dem med prioritet "Hög" som blir först*/
function sortToDoList(){
    toDoList.sort(function(toDoItemA, toDoItemB){
        let obejctA = toDoItemA.priority.toLowerCase();
        let objectB = toDoItemB.priority.toLowerCase();
        if (obejctA < objectB) {return -1;}
        if (obejctA > objectB) {return 1;}
        return 0;
      });

    showAndRefreshList();
}

/* Funktion som lägger till exempelsaker i todo-listan så man kan se hur den kan se ut */
function addPreMadeItems(){
    let toDoItem1 = new Todo("Städa hemma", "Låg", "12 November");
    let toDoItem2 = new Todo("Handla mat", "Hög", "10 November"); 
    let toDoItem3 = new Todo("Plugga", "Hög", "21 November"); 

    toDoList.push(toDoItem1);
    toDoList.push(toDoItem2);
    toDoList.push(toDoItem3);
}
