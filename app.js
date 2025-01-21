window.onload = () => {
    let items = document.getElementById("items");
    let submit = document.getElementById("submit");
    let editItem = null;

    // Attach the click event to the "Add" button
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        addItem();
    });

    items.addEventListener("click", removeOrEditItem);
};

function addItem() {
    const itemInput = document.getElementById("item");
    const newItem = itemInput.value.trim();

    if (!newItem) return;

    if (submit.value === "Edit") {
        editItem.target.parentNode.firstChild.data = newItem;
        submit.value = "Add";
        displayMessage("Task updated successfully!", "success");
    } else {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.appendChild(document.createTextNode(newItem));
        li.appendChild(createButton("Edit", "btn-success btn-sm edit"));
        li.appendChild(createButton("Delete", "btn-danger btn-sm delete"));

        document.getElementById("items").appendChild(li);
        displayMessage("Task added successfully!", "success");
    }

    itemInput.value = "";
    toggleButton(itemInput, "submit");
}

function createButton(text, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    return button;
}

function removeOrEditItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentNode.remove();
            displayMessage("Task deleted successfully!", "success");
        }
    } else if (e.target.classList.contains("edit")) {
        const itemInput = document.getElementById("item");
        itemInput.value = e.target.parentNode.firstChild.data;
        submit.value = "Edit";
        editItem = e;
        toggleButton(itemInput, "submit");
    }
}

function toggleButton(ref, btnID) {
    document.getElementById(btnID).disabled = !ref.value.trim();
}

function displayMessage(msg, type) {
    const lbl = document.getElementById("lblsuccess");
    lbl.textContent = msg;
    lbl.className = `alert alert-${type}`;
    lbl.style.display = "block";

    setTimeout(() => {
        lbl.style.display = "none";
    }, 3000);
}
