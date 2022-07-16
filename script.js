// const { v1: uuidv1 } = require("uuid");
const uid = new ShortUniqueId();
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
let colors = ["lightblue", "lightgreen", "lightpink", "black"];
let modalPriorityColor = colors[1];
let textAreaCont = document.querySelector(".textarea-cont");
let toolboxColorCont = document.querySelectorAll(".color");

let ticketsArr = [];

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

allPriorityColors.forEach((color) => {
    color.addEventListener("click", () => {
        allPriorityColors.forEach((priorityColor) => {
            priorityColor.classList.remove("active");
        });
        color.classList.add("active");
        modalPriorityColor = color.classList[0];
    });
});

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;

    if (key == "Shift") {
        createTicket(modalPriorityColor, textAreaCont.value);
        modalCont.style.display = "none";
        isModalPresent = false;
        textAreaCont.value = "";
    }
});

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

    if (!ticketId) {
        ticketsArr.push({ ticketColor, data, ticketId: id });
        localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    }
}

if (localStorage.getItem("tickets")) {
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach((ticketObj) => {
        createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
    });
}

for (let i = 0; i < toolboxColorCont.length; i++) {
    toolboxColorCont[i].addEventListener("click", (e) => {
        let currColor = toolboxColorCont[i].classList[0];

        let filterTickets = ticketsArr.filter((ticketObj) => {
            return currColor == ticketObj.ticketColor;
        });

        let allTickets = document.querySelectorAll(".ticket-cont");

        allTickets.forEach((e) => {
            e.remove();
        });

        filterTickets.forEach((e) => {
            createTicket(e.ticketColor, e.data, e.ticketId);
        });
    });

    toolboxColorCont[i].addEventListener("dblclick", (e) => {
        let allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach((e) => {
            e.remove();
        });
        ticketsArr.forEach((ticketObj) => {
            createTicket(
                ticketObj.ticketColor,
                ticketObj.data,
                ticketObj.ticketId
            );
        });
    });
}
