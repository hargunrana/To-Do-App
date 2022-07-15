const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");

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
    });
});
