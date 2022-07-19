const uid = new ShortUniqueId();
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");

let colors = ["lightblue", "lightgreen", "lightpink", "black"];
let modalPriorityColor = colors[1];
let textAreaCont = document.querySelector(".textarea-cont");
let toolboxColorCont = document.querySelectorAll(".color");
let ticketsArr = [];
let removeBtn = document.querySelector(".remove-btn");

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

    // extra functions on the tickets
    handleRemoval(ticketCont, id);
    handleColor(ticketCont, id);
    // handleLock(ticketCont, id);

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

//-------------------------Removing existing notes------------------------
let removeBtnActive = false;
removeBtn.addEventListener("click", () => {
    if (!removeBtnActive) {
        removeBtn.style.color = "red";
        removeBtn.style.border = "1px solid grey";
        removeBtn.style.backgroundColor = "#485460";
    } else {
        removeBtn.style.color = "white";
        removeBtn.style.border = "0px solid grey";
        removeBtn.style.backgroundColor = "#3d3d3d";
    }
    removeBtnActive = !removeBtnActive;
});

function handleRemoval(ticket, id) {
    ticket.addEventListener("click", () => {
        if (!removeBtnActive) return;
        let idx = getTicketIndex(id);
        let deletedTicket = ticketsArr.splice(idx, 1);

        // removed from local storage and ticketarrays updated
        let ticketArray = JSON.stringify(ticketsArr);
        localStorage.setItem("tickets", ticketArray);

        // Ticket removed from frontend
        ticket.remove();
    });
}

function getTicketIndex(id) {
    let ticketIdx = ticketsArr.findIndex((ticketObj) => {
        return ticketObj.ticketId == id;
    });
    return ticketIdx;
}

//--------------------------Change Priority of the Ticket color--------------------------
function handleColor(ticket, id) {
    let ticketColorStrip = ticket.querySelector(".ticket-color");

    ticketColorStrip.addEventListener("click", () => {
        let currTicketColor = ticketColorStrip.classList[1];
        let currTicketColorIdx = colors.indexOf(currTicketColor);

        // let newTicketColorIdx = (currTicketColorIdx + 1) % colors.length;

        let newTicketColorIdx = currTicketColorIdx + 1;

        newTicketColorIdx = newTicketColorIdx % colors.length;
        let newTicketColor = colors[newTicketColorIdx];

        ticketColorStrip.classList.remove(currTicketColor);
        ticketColorStrip.classList.add(newTicketColor);

        //local storage update
        let ticketIdx = getTicketIndex(id);

        ticketArr[ticketIdx].ticketColor = newTicketColor;
        localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    });
}

//--------------------------Handle Lock/Unlock to edit content--------------------------

function handleLock(ticket, id) {}
