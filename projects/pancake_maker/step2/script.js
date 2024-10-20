// 1. Listens for changes on the pancake type select box and all checkbox inputs.

/*
2. Calculates the total price based on selections:
- Pancake type has a base price.
- Each topping adds $1 to the base price.
- Extras have their specific prices. */

// 3. Displays the dynamically updated total price in the #totalPrice span.

// 4. Capture order info into array:
// - The customer’s name
// - Selected pancake details
// - Chosen delivery method
// - Total cost

// 5. Implement the button to show order info

"use strict";

const priceElement = document.querySelector('.price-display span'); /* Price text */
const priceBanner = document.querySelector('.price-banner'); /* Price text inside an image */

// ******************************************************************
// Array to store customer orders
// ******************************************************************
let customerOrders = [];


function calcPrice() {
    const pancakeType = document.getElementById('type');
    const toppingCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]');
    const extrasCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]');
    const deliveryOptions = document.querySelectorAll('.customization-section:nth-of-type(4) input[type="radio"]');
    const customerNameInput = document.getElementById('customerName'); // Customer name

    //Error handling
    // if (deliveryOptions === null) {
    //     console.log("Element not found");
    // } else {
    //     console.log("Element found:", priceElement);
    // }

    let pancakeBasePrice = 0;
    let toppingsPrice = 0;
    let extrasPrice = 0;
    let deliveryPrice = 0;
    let customerName; // Customer name
    let totalPrice = 0;

    // Get base price
    pancakeBasePrice = parseInt(pancakeType.value);

    // Get toppings price
    toppingCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            toppingsPrice += parseFloat(checkbox.value);
        }
    })

    // Get extras price
    extrasCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            extrasPrice += parseFloat(checkbox.value);
        }
    })

    // Get customer name
    customerName = customerNameInput.value; // Customer name

    // Get delivery options
    deliveryOptions.forEach(option => {
        if (option.checked) {
            deliveryPrice += parseFloat(option.value);
        }
    })

    totalPrice = pancakeBasePrice + toppingsPrice + extrasPrice + deliveryPrice;
    updatePrice(totalPrice);
}

// ******************************************************************
// Function to store the order details in the array
// ******************************************************************

function storeOrder() {
    // Get customer name
    const customerName = document.getElementById("customerName").value;

    // Get selected pancake and price
    const pancakeSelect = document.getElementById("type");
    const selectedPancake = pancakeSelect.options[pancakeSelect.selectedIndex].text;
    const pancakePrice = parseFloat(pancakeSelect.value);

    // Get selected toppings
    let selectedToppings = [];
    const toppings = document.querySelectorAll('.toppings input[type="checkbox"]');
    toppings.forEach(topping => {
        if (topping.checked) {
            selectedToppings.push(topping.id);
        }
    });

    // Get selected extras
    let selectedExtras = [];
    const extras = document.querySelectorAll('.extras input[type="checkbox"]');
    extras.forEach(extra => {
        if (extra.checked) {
            selectedExtras.push(extra.id);
        }
    });

    // Get selected delivery option
    let selectedDeliveryMethod = "";
    let deliveryPrice = 0;
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        if (option.checked) {
            selectedDeliveryMethod = option.nextSibling.textContent.trim();
            deliveryPrice = parseFloat(option.value);
        }
    });

    // Calculate total cost
    const totalCost = pancakePrice + selectedToppings.length + selectedExtras.reduce((sum, extraId) => sum + parseFloat(document.getElementById(extraId).value), 0) + deliveryPrice;

    // Create an order object
    const order = {
        customerName: customerName,
        pancake: selectedPancake,
        toppings: selectedToppings.length > 0 ? selectedToppings : ["None"],
        extras: selectedExtras.length > 0 ? selectedExtras : ["None"],
        deliveryMethod: selectedDeliveryMethod || "Not selected",
        totalCost: totalCost.toFixed(2)
    };

    // Add the order to the array
    customerOrders.push(order);

    // Show updated order list
    displayOrders();
}

// function to update price-display
function updatePrice(price) {
    priceElement.textContent = `$${price}`;
    priceBanner.textContent = `$${price}`;

    // Add the 'updated' class to trigger the animation
    priceBanner.classList.add('updated');

    // Remove the 'updated' class after the animation completes (e.g., 300ms)
    setTimeout(() => {
        priceBanner.classList.remove('updated');
    }, 300); // Match the transition duration

}

// *********************************
// Function to display the stored orders
// *********************************
function displayOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = ""; // Clear the current list

    customerOrders.forEach(order => {
        const orderInfo = `
            <div class="order">
                <p><strong>Customer:</strong> ${order.customerName}</p>
                <p><strong>Pancake:</strong> ${order.pancake}</p>
                <p><strong>Toppings:</strong> ${order.toppings.join(", ")}</p>
                <p><strong>Extras:</strong> ${order.extras.join(", ")}</p>
                <p><strong>Delivery:</strong> ${order.deliveryMethod}</p>
                <p><strong>Total Cost:</strong> $${order.totalCost}</p>
            </div>`;
        orderList.innerHTML += orderInfo;
    });
}



// Event listeners for automatic price calculation
window.onload = function () {

    // ------ Get DOM elements ------

    // Get input
    const pancakeType = document.getElementById('type');
    // Get toppings checkboxes
    const toppingCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]');
    // Get extras checkboxes
    const extrasCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]');
    // Get delivery options
    const deliveryOptions = document.querySelectorAll('.customization-section:nth-of-type(4) input[type="radio"]');
    // Get customer name input
    const customerNameInput = document.getElementById('customerName');
    // ** Get button
    const submitButton = document.getElementById("seeOrder");

    //  ------ Add event listeners ------

    // Event listener for pancake type
    pancakeType.addEventListener('change', calcPrice);
    // Event listener for toppings checkboxes
    toppingCheckboxes.forEach((toppings) => {
        toppings.addEventListener('change', calcPrice);
    });
    // Event listener for extras checkboxes
    extrasCheckboxes.forEach((extras) => {
        extras.addEventListener('change', calcPrice);
    });
    // Event listener for delivery radio buttons
    deliveryOptions.forEach((options) => {
        options.addEventListener('change', calcPrice);
    });
    // Event listener for customer name
    customerNameInput.addEventListener('change', calcPrice);
    // ** Add event listener for "See Order" button
    submitButton.addEventListener("click", function () {
        // Check if the array is not empty, then clear it
        if (customerOrders.length > 0) {
            customerOrders = [];  // Clear the array
            console.log("Previous orders cleared.");
        }
        storeOrder();  // Store the new order after clearing the previous ones
    });


}

// ------ Error check ------

// if (priceElement === null) {
//     console.log("Element not found");
// } else {
//     console.log("Element found:", priceElement);
// }

// if (priceBanner === null) {
//     console.log("Element not found");
// } else {
//     console.log("Element found:", priceElement);
// }


