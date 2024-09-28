document.addEventListener("DOMContentLoaded", () => {
    const inventoryForm = document.getElementById("inventoryForm");
    const inventoryTableBody = document.getElementById("inventoryTableBody");

    let inventoryList = [];

    // Add new inventory item
    inventoryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const itemName = document.getElementById("itemName").value.trim();
        const category = document.getElementById("category").value.trim();
        const quantity = document.getElementById("quantity").value;
        const unit = document.getElementById("unit").value.trim();

        if (itemName && category && quantity && unit) {
            const newItem = {
                id: Date.now(),
                itemName,
                category,
                quantity,
                unit,
            };

            inventoryList.push(newItem);
            renderInventoryTable();

            // Clear form fields after submission
            inventoryForm.reset();
        }
    });

    // Render inventory table
    function renderInventoryTable() {
        inventoryTableBody.innerHTML = "";

        inventoryList.forEach((item) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.itemName}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td class="actions">
                    <button onclick="editItem(${item.id})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteItem(${item.id})"><i class="fas fa-trash"></i></button>
                </td>
            `;

            inventoryTableBody.appendChild(row);
        });
    }

    // Edit an existing inventory item
    window.editItem = (id) => {
        const item = inventoryList.find((item) => item.id === id);
        if (item) {
            document.getElementById("itemName").value = item.itemName;
            document.getElementById("category").value = item.category;
            document.getElementById("quantity").value = item.quantity;
            document.getElementById("unit").value = item.unit;

            deleteItem(id); // Remove item from the list to allow updating
        }
    };

    // Delete an inventory item
    window.deleteItem = (id) => {
        inventoryList = inventoryList.filter((item) => item.id !== id);
        renderInventoryTable();
    };
});