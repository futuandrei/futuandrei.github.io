/* data on the animals in zoo */
const zooAnimals = [
    { name: "Luna", age: 5, gender: "Female", species: "Tiger", type: "Mammal", description: "A majestic Bengal tiger known for her striking orange coat with black stripes. Luna loves to nap in the shade." },
    { name: "Rocky", age: 3, gender: "Male", species: "Penguin", type: "Bird", description: "A playful Emperor penguin who enjoys swimming and sliding on the ice. He's very social with his group." }
]

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', displayAnimals(zooAnimals));


// show the animals given as a parameter (array of objects) in the animal display area (#animalDisplay)
function displayAnimals(animals) {

    // Select DOM element <div> 
    const animalDisplay = document.getElementById('animalDisplay');
    // console.log(`Got ${animalDisplay}`); // -> Got [object HTMLDivElement]

    // Clear the element, only once
    animalDisplay.innerHTML = "";

    /* ------------ Add Card container ------------ */

    const cardContainer = document.createElement("div");
    cardContainer.className = "#container";  // Assign class for styling

    for (let i = 0; i < animals.length; i++) {
        // Create card item for each element
        const newCard = document.createElement("div");
        newCard.className = "card";  // Assign class for styling

        // Append content to card
        const itemData = document.createElement("p");
        itemData.textContent = `${animals[i].name} ${animals[i].age} ${animals[i].gender} ${animals[i].species} ${animals[i].type} ${animals[i].description}`;
        newCard.appendChild(itemData);

        // Add the content to each card
        newCard.appendChild(itemData);

        // Add element to DOM
        animalDisplay.appendChild(newCard);

    }

}

