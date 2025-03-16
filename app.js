document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    const modal = document.getElementById("modal");
    const cancelButton = document.getElementById("cancel-button");
    const addItemButton = document.getElementById("add-item");
    const textInput = document.getElementById("text-input");
    const itemList = document.getElementById("item-list");
    const deleteButton = document.getElementById("delete-button");
    const undoButton = document.getElementById("undo-button")
    let actionStack = []
    
    addButton.addEventListener("click", () => {
        modal.style.display = "flex"; 
    });
    
    
    cancelButton.addEventListener("click", () => {
        modal.style.display = "none"; 
        textInput.value = ""; 
    });
    
    addItemButton.addEventListener("click", () => {
        const text = textInput.value.trim(); 
        const errorMessage = document.getElementById("error-message");
        
        if (text === "") {
            errorMessage.style.display = "block";
            return;
        }else{
            const item = document.createElement("span");
            item.textContent = text;
            
            item.classList.add("list-item");
            
            item.addEventListener("click", () => {
                item.classList.toggle("selected"); 
                deleteButton.disabled = !document.querySelector(".selected");
            });

            item.addEventListener("dblclick", ()=>{
                itemList.removeChild(item)
                actionStack.push({action:"delete", item: item})
            })
            
            itemList.appendChild(item);
            actionStack.push({action: "add", item: item})
            errorMessage.style.display= "none"
        } 
        textInput.value = ""; 
        modal.style.display = "none"; 
    });

    deleteButton.addEventListener("click", () => {
        selectedItems = document.querySelectorAll(".selected");
        if(selectedItems.length>0){
            const deletedItems = []
            selectedItems.forEach((item)=>{
                deletedItems.push(item)
                itemList.removeChild(item)
            })
        actionStack.push({action: "delete", item: deletedItems})
        }
    });

    undoButton.addEventListener("click", ()=> {
        const lastAction = actionStack.pop()

        if(lastAction){
            if (lastAction.action === "add") {
                itemList.removeChild(lastAction.item);
            } else if (lastAction.action === "delete") {
                const itemsToRestore = Array.isArray(lastAction.item) ? lastAction.item : [lastAction.item];
                 itemsToRestore.forEach(elm => {
                    elm.classList.remove("selected")
                    itemList.appendChild(elm);                   
                });
            }
        }
    })

});
