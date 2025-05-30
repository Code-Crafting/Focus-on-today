const checkBox = document.querySelectorAll(".checkbox");
const inputs = document.querySelectorAll(".input");
const alertPara = document.querySelector(".alert");
const progressBar = document.querySelector(".progress-bar");
const progressBarText = document.querySelector(".progress-bar-text");
const progressLabel = document.querySelector(".progress-bar-label");
const footerPara = document.querySelector(".footer-1");
const overlay = document.querySelector(".overlay");
const dialogBoxButton = document.querySelector(".dialog-box-button");

const allTasks = JSON.parse(localStorage.getItem("allGoals")) || {};
let countCompletedGoals = Object.values(allTasks).filter((task) => task.isCompleted).length;

// dialog-box
if (allTasks) {
    const allTakCompleted = Object.values(allTasks).every(task => task.isCompleted === true);
    setTimeout(() => {
        if (allTakCompleted) {
            overlay.style.display = "flex";
        }
    }, 500)
}

const hideAlert = () => {
    alertPara.style.display = "none";
}

const switchFuction = (completedTasksNumber) => {
    if (completedTasksNumber > 0) {
        switch (completedTasksNumber) {
            case 1:
                progressBar.style.width = "40%";
                progressBarText.style.display = "block";
                progressBarText.innerText = "1/3 Completed";
                progressLabel.innerText = "Just a step away, keep going";
                footerPara.innerText = "Keep Going, You're making great progress!";
                break;
            case 2:
                progressBar.style.width = "75%";
                progressBarText.style.display = "block";
                progressBarText.innerText = "2/3 Completed";
                progressLabel.innerText = "Just a step away, keep going";
                footerPara.innerText = "Keep Going, You're making great progress!";
                break;
            case 3:
                progressBar.style.width = "100%";
                progressBarText.style.display = "block";
                progressBarText.innerText = "3/3 Completed";
                progressLabel.innerText = "Just a step away, keep going";
                footerPara.innerText = "Keep Going, You're making great progress!";
                break;
        }

    } else {
        progressBar.style.width = "0%";
        progressBarText.style.display = "none";
        progressLabel.innerText = "Raise the bar by completing your goals!";
        footerPara.innerText = "Move one step ahead, today!";
    }
}
switchFuction(countCompletedGoals);

checkBox.forEach((el) => {

    el.addEventListener("click", () => {

        // making input field non editable after completion of goal
        if (allTasks[el.nextElementSibling.id] && !allTasks[el.nextElementSibling.id].isCompleted) {
            el.nextElementSibling.readOnly = true;
        } else {
            el.nextElementSibling.readOnly = false;
        }

        // enabling goal completion after setting all three 
        const valueSatus = [...inputs].every((input) => input.value);

        if (valueSatus) {
            el.classList.toggle("checked");
            el.nextElementSibling.classList.toggle("line-through");
            allTasks[el.nextElementSibling.id].isCompleted = !allTasks[el.nextElementSibling.id].isCompleted;
            countCompletedGoals = Object.values(allTasks).filter((task) => task.isCompleted).length;
            switchFuction(countCompletedGoals);
            localStorage.setItem("allGoals", JSON.stringify(allTasks));
        } else {
            alertPara.style.display = "block";
        }

        // showing dialog box
        const allTakCompleted = Object.values(allTasks).every(task => task.isCompleted === true);
        setTimeout(() => {
            if (allTakCompleted) {
                overlay.style.display = "flex";
            }
        }, 500)

    })
})

inputs.forEach((el) => {
    if (allTasks[el.id]) {
        el.value = allTasks[el.id].taskName;
        if (allTasks[el.id].isCompleted) {
            el.previousElementSibling.classList.toggle("checked");
            el.classList.toggle("line-through");
        }
    }

    el.addEventListener("focus", (e) => {
        hideAlert();
        // making input field non editable after completion of goal
        if (allTasks[el.id] && allTasks[el.id].isCompleted) {
            el.readOnly = true;
        } else {
            el.readOnly = false;
        }
    })

    el.addEventListener("input", (e) => {
        hideAlert();
        allTasks[el.id] = {
            taskName: el.value,
            isCompleted: false,
        };
        localStorage.setItem("allGoals", JSON.stringify(allTasks));
    })
});

// back to initial phase
dialogBoxButton.addEventListener("click", () => {
    overlay.style.display = "none";

    inputs.forEach((el) => {
        el.value = "";
        el.classList.remove("line-through");
        progressBar.style.width = "00%";
        allTasks[el.id] = {
            taskName: el.value,
            isCompleted: false,
        };
        localStorage.setItem("allGoals", JSON.stringify(allTasks));

    })
    checkBox.forEach((el) => {
        el.className = "checkbox";
    })
})
