'use strict';

// All variables should be as up as possible
const searchCarForm = document.querySelector('#searchCar');
const addCarForm = document.querySelector('#addCar');
const cars = [];
let current_year = new Date().getFullYear(); // added current year. Replace this with dynamic, auto-updated value!  

// Declare car class 
class Car {
    constructor(license, maker, model, year, owner, price, discPrice, color) {
        this.license = license;
        this.maker = maker;
        this.model = model;
        this.year = year; // added year variable as required
        this.owner = owner;
        this.price = price;
        this.discPrice = discPrice;
        this.color = color;
    }
}

// Search function
const searchCar = (e) => {
    e.preventDefault();
    const license = document.querySelector('#license_plate').value;
    let carFound = false;

    // Regex to match valid license plates (letters, numbers, hyphens)
    const licenseRegex = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/;

    // try / catch
    try {
        if (!license) {
            throw "License can not be empty!"
        }
        // check if database is empty
        if (cars.length === 0) {
            throw "Database is empty! Add car to database before search!"
        }
        // Regex testing
        if (!licenseRegex.test(license)) {
            throw "Invalid license plate format. Only letters, numbers, and hyphens are allowed."
        }

        for (let i = 0; i < cars.length; i++) {
            // If car is found and has discounted price
            if (cars[i].license === license && cars[i].discPrice) {
                console.log("car found");
                console.log(cars[i]);
                document.querySelector('#searchResult').innerHTML = `Car found: <p>Maker: ${cars[i].maker}</p> 
                <p>Model: ${cars[i].model}</p> 
                <p>Owner: ${cars[i].owner}</p>
                <p>Discounted price: ${cars[i].discPrice}</p>
                `;
                carFound = true;
            }
            else if (cars[i].license === license) {
                document.querySelector('#searchResult').innerHTML = `Car found: Maker: ${cars[i].maker}, Model: ${cars[i].model}, Owner: ${cars[i].owner}`;
                carFound = true; // Car is found, so set 
                // return;
            }
            else if (!carFound) {
                // When no car is found, this is returned after looping through all cars
                // document.querySelector('#searchResult').style.color = "red";
                console.log("Car not found")
                document.querySelector('#searchResult').innerHTML = "No car found with the given license plate";
            }
        }
    }
    catch (error) {
        // alert(error);
        // document.querySelector('#searchResult').style.color = "red";
        document.querySelector('#searchResult').innerHTML = error;
        // console.log(error);
    }

};


// Function to calculater discounted price
function calcDiscPrice(year, price) {
    // if to check the age of car age is more than 10 years. If so, car price is lower by 15 %.
    if (year < (current_year - 10)) {
        const discounted = price * 0.85;
        return discounted;
    } else {
        return "No discount";
    }
}

const displayMessage = (message, type = "success") => {
    const messageElement = document.querySelector("#message");
    messageElement.textContent = message;
    messageElement.className = type;
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.className = "";
    }, 3000);
};

const addCar = (e) => {
    e.preventDefault();
    // console.log('add car was triggered');
    // get elements
    let license = document.getElementById('license').value;
    let maker = document.getElementById('maker').value;
    let model = document.getElementById('model').value;
    let year = document.getElementById('year').value; // added year variable
    let owner = document.getElementById('current_owner').value;
    let price = document.getElementById('price').value;
    // let discPrice = "discounted price"; // added discounted price variable
    let color = document.getElementById('color').value;

    // creating new object
    try {

        if (!license & !maker & !model & price) {
            throw "All fields (license plate, maker, model and price) must be filled."
        }
        if (isNaN(price)) {
            throw "price should be a number!"
        }
        if (isNaN(year)) {
            throw "year should be a number!"
        }
        if (year < 0) {
            throw "year should be a positive number!"
        }
        if ((year < 1886) || (year > current_year)) {
            throw "year should be between 1886 - 2024!"
        }

        // Adding the car to array cars
        const newCar = new Car(license, maker, model, year, owner, price, calcDiscPrice(year, price), color);
        cars.push(newCar);
        displayTable();

        // Adding the car object to local storage
        const stringifiedCars = JSON.stringify(cars); // Changing car object to string 
        localStorage.setItem("cars", stringifiedCars); // Storing locally

        // Add car message
        displayMessage("Car added successfully!");

        // Empty values
        license = document.getElementById('license').value = '';
        maker = document.getElementById('maker').value = '';
        model = document.getElementById('model').value = '';
        year = document.getElementById('year').value = '';
        owner = document.getElementById('current_owner').value = '';
        price = document.getElementById('price').value = '';
        color = document.getElementById('color').value = '';
    }
    catch (error) {
        alert(error);
        // console.log(error);
    }

}

// Load cars object from local storage and update table
const loadCarsFromLocalStorage = () => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
        const parsedCars = JSON.parse(storedCars);
        parsedCars.forEach(carData => {
            cars.push(new Car(carData.license,
                carData.maker,
                carData.model,
                carData.year,
                carData.owner, // Updated to use correct owner property
                carData.price,
                carData.discPrice, // Added discount price
                carData.color));
        });
        displayTable();
    }
};

// Triggered every time new car is added
const displayTable = () => {
    const table = document.querySelector('#carsTable');
    table.innerHTML = table.rows[0].innerHTML;
    cars.forEach((car, index) => {
        // creates row for every element
        const row = table.insertRow(-1);

        // adds value for every cell
        Object.values(car).forEach(text => {
            const cell = row.insertCell(-1);
            cell.textContent = text;
        })

        // Delete button
        const deleteButton = document.createElement("button_table");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => deleteCar(index));
        row.insertCell(-1).appendChild(deleteButton);
    })
}

// Delete car function
const deleteCar = (index) => {
    cars.splice(index, 1);
    localStorage.setItem('cars', JSON.stringify(cars));
    displayTable();
    displayMessage("Car deleted successfully!");
};

// Event listeners
addCarForm.addEventListener('submit', addCar);
searchCarForm.addEventListener('submit', searchCar);
window.addEventListener('load', loadCarsFromLocalStorage);