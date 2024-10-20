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

    for (let i = 0; i < animals.length; i++) {
        // Create list item for each element
        const listItem = document.createElement('li');

        // Create variable to assign text Node + content to
        const newContent = document.createTextNode(`${animals[i].name} ${animals[i].age} ${animals[i].gender} ${animals[i].species} ${animals[i].type} ${animals[i].description}`);
        // const newContent = document.createTextNode(Object.values(animals[i]));

        // Add the content to each list item
        listItem.appendChild(newContent);

        // Add element to DOM
        animalDisplay.appendChild(listItem);

    }

}

