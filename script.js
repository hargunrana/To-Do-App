const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
let colors = ["lightblue", "lightgreen", "lightpink", "black"];
let modalPriorityColor = colors[1];
let textAreaCont = document.querySelector(".textarea-cont");

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
    }
});

function createTicket(ticketColor, data) {
    let ticketCont = document.createElement("div");

    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id"></div>
        <div class="task-area"> ${data} </div>

    `;

    mainCont.appendChild(ticketCont);
}
