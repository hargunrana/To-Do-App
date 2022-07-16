const uid = new ShortUniqueId();
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");

let colors = ["lightblue", "lightgreen", "lightpink", "black"];
let modalPriorityColor = colors[1];
let textAreaCont = document.querySelector(".textarea-cont");
let toolboxColorCont = document.querySelectorAll(".color");
let ticketsArr = [];

//----------------------------To Display Modal on clicking +-------------------------

let isModalPresent = false;
addBtn.addEventListener("click", () => {
    if (!isModalPresent) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
    isModalPresent = !isModalPresent;
});

const allPriorityColors = document.querySelectorAll(".priority-color");

//----------------------------To select the note color of your choice-------------------------

allPriorityColors.forEach((color) => {
    // remove selection border from all colors
    color.addEventListener("click", () => {
        allPriorityColors.forEach((priorityColor) => {
            priorityColor.classList.remove("active");
        });

        // selecting clicked color
        color.classList.add("active");
        modalPriorityColor = color.classList[0];
    });
});

//----------------------------To save the note by pressing SHIFT key-------------------------

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;

    if (key == "Shift") {
        createTicket(modalPriorityColor, textAreaCont.value);
        modalCont.style.display = "none";
        isModalPresent = false;
        textAreaCont.value = "";
    }
});

//-------------------function to create a ticket-------------------------

function createTicket(ticketColor, data, ticketId) {
    let id = ticketId || uid();
    let ticketCont = document.createElement("div");

    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="task-area"> ${data} </div>

    `;

    mainCont.appendChild(ticketCont);
    
    // if already existing tickets are to be added 
    if (!ticketId) {
        ticketsArr.push({ ticketColor, data, ticketId: id });
        localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    }
}

//----------------------------To display all tickets from the local storage-------------------------

if (localStorage.getItem("tickets")) {
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach((ticketObj) => {
        createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
    });
}
//----------------------------To display only selected color notes by clicking-------------------------

for (let i = 0; i < toolboxColorCont.length; i++) {
    toolboxColorCont[i].addEventListener("click", (e) => {
        let currColor = toolboxColorCont[i].classList[0];

        //filtering based on clicked color
        let filterTickets = ticketsArr.filter((ticketObj) => {
            return currColor == ticketObj.ticketColor;
        });

        //removing all displayed tickets
        let allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach((e) => {
            e.remove();
        });

        // displaying all filtered tickets
        filterTickets.forEach((e) => {
            createTicket(e.ticketColor, e.data, e.ticketId);
        });
    });

    // to display all tickets again without filter
    toolboxColorCont[i].addEventListener("dblclick", (e) => {
        //removing all displayed tickets
        let allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach((e) => {
            e.remove();
        });

        // displaying all tickets
        ticketsArr.forEach((ticketObj) => {
            createTicket(
                ticketObj.ticketColor,
                ticketObj.data,
                ticketObj.ticketId
            );
        });
    });
}
