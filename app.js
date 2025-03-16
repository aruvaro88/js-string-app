document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const addButton = document.getElementById("add-button");
    const modal = document.getElementById("modal");
    const cancelButton = document.getElementById("cancel-button");
    const addItemButton = document.getElementById("add-item");
    const textInput = document.getElementById("text-input");
    const itemList = document.getElementById("item-list");
    const deleteButton = document.getElementById("delete-button");
    const undoButton = document.getElementById("undo-button")
    let actionStack = []
    let lastDeletedItem = null
    
    addButton.addEventListener("click", () => {
        modal.style.display = "flex"; 
    });
    
    
    cancelButton.addEventListener("click", () => {
        modal.style.display = "none"; 
        textInput.value = ""; 
    });
    
    addItemButton.addEventListener("click", () => {
        const text = textInput.value.trim(); 
        
        if (text) {
            const li = document.createElement("li");
            li.textContent = text;
            li.classList.add("list-item");
            
            li.addEventListener("click", () => {
                li.classList.toggle("selected"); 
                deleteButton.disabled = !document.querySelector(".selected");
            });
            
            itemList.appendChild(li);
            actionStack.push({action: "add", item: li})
        } 
        textInput.value = ""; 
        modal.style.display = "none"; 
    });

    deleteButton.addEventListener("click", () => {
        selectedItem = document.querySelector(".selected");
        if (selectedItem) {
            lastDeletedItem = selectedItem
            itemList.removeChild(selectedItem)
            actionStack.push({action: "delete", item: selectedItem})
        }
    });

    undoButton.addEventListener("click", ()=> {
        const lastAction = actionStack.pop()
        if(lastAction){
            if (lastAction.action === "add") {
                itemList.removeChild(lastAction.item);
            } else if (lastAction.action === "delete") {
                itemList.appendChild(lastAction.item);
            }
        }
    })

});
