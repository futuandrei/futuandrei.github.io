/* data on the animals in zoo */
const zooAnimals = [
	{ name: "Luna", age: 5, gender: "Female", species: "Tiger", type: "Mammal", description: "A majestic Bengal tiger known for her striking orange coat with black stripes. Luna loves to nap in the shade." },
	{ name: "Rocky", age: 3, gender: "Male", species: "Penguin", type: "Bird", description: "A playful Emperor penguin who enjoys swimming and sliding on the ice. He's very social with his group." },
	{ name: "Sally", age: 2, gender: "Female", species: "Iguana", type: "Reptile", description: "A calm green iguana who loves basking under the sun. Sally is often seen lounging on rocks." },
	{ name: "Charlie", age: 4, gender: "Male", species: "Elephant", type: "Mammal", description: "A young and curious elephant with large ears. Charlie enjoys splashing in the water and playing with his herd." },
	{ name: "Zara", age: 1, gender: "Female", species: "Zebra", type: "Mammal", description: "A young zebra foal with bold black-and-white stripes. Zara loves to run around the grasslands with her family." },
	{ name: "Oscar", age: 7, gender: "Male", species: "Parrot", type: "Bird", description: "A colorful macaw parrot with vibrant blue and yellow feathers. Oscar is known for mimicking sounds and words." },
	{ name: "Bella", age: 6, gender: "Female", species: "Red Panda", type: "Mammal", description: "A small, reddish-brown red panda with a bushy tail. Bella is shy and loves eating bamboo leaves." },
	{ name: "Spike", age: 4, gender: "Male", species: "Tortoise", type: "Reptile", description: "A slow-moving tortoise with a hard, dome-shaped shell. Spike enjoys munching on leafy greens and sunbathing." },
	{ name: "Milo", age: 2, gender: "Male", species: "Meerkat", type: "Mammal", description: "A mischievous meerkat who is always on the lookout. Milo loves digging burrows and foraging for insects." }
];

// Added class Animal
class Animal {
	constructor(name, age, gender, species, type, description) {
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.species = species;
		this.type = type;
		this.description = description;
	}
}

/* when HTML page is first loaded, show all animals */
// Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', function () {
// 	displayAnimals(zooAnimals);
// })
document.addEventListener('DOMContentLoaded', displayAnimals(zooAnimals));


/* functions */

// show the animals given as a parameter (array of objects) in the animal display area (#animalDisplay)
function displayAnimals(animals) {

	// Select DOM element <div> 
	const animalDisplay = document.getElementById('animalDisplay');
	// console.log(`Got ${animalDisplay}`); // -> Got [object HTMLDivElement]

	// Clear the element, only once
	animalDisplay.innerHTML = "";

	/* ------------ Add Card container ------------ */

	const cardContainer = document.createElement("div");
	cardContainer.className = "animalDisplay";  // Assign class for styling

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

// add an animal with the given parameters to the zooAnimals array (don't forget to call the displayAnimals function to refresh the list)
function addAnimal(name, age, gender, species, type, description) {
	// YOUR CODE HERE
	console.log(`Received parameters: ${name} ${age} ${gender} ${species} ${type} ${description}`);

	// create a new object and push it to the array
	const newAnimal = new Animal(name, age, gender, species, type, description);
	zooAnimals.push(newAnimal);
	// console.log(newAnimal);
	// console.log(zooAnimals);
	// display all animals and reset filters
	displayAnimals(zooAnimals);

	//Empty values
	name = document.getElementById('name').value = '';
	age = document.getElementById('age').value = '';
	gender = document.getElementById('gender').value = '';
	species = document.getElementById('species').value = '';
	type = document.getElementById('type').value = '';
	description = document.getElementById('description').value = '';
}

/* event listeners */

// "filterType" dropdown should filter by type and update the animal list when its value changes (if you'd like a bit more challenge, you can also filter by all selections at the same time)
document.querySelector("#filterType").addEventListener("change", function () {
	// get selected type
	const type = document.querySelector("#filterType").value;

	// if there is a selection (something else than "Select type" with value ""), filter by type
	if (type != "") {
		const selectedAnimals = zooAnimals.filter((animal) => animal.type == type);
		displayAnimals(selectedAnimals);
	}
	// if not, show all
	else {
		displayAnimals(zooAnimals);
	}

	// reset other filter fields
	document.querySelector("#filterGender").value = "";
	document.querySelector("#animalSearch").value = "";
});

// "filterGender" dropdown should filter by gender (Male / Female)
// YOUR CODE HERE
document.querySelector("#filterGender").addEventListener("change", function () {
	console.log("gender changed.");
	// get selected type
	const gender = document.querySelector("#filterGender").value;

	// 
	if (gender != "") {
		const selectedAnimals = zooAnimals.filter((animal) => animal.gender == gender);
		displayAnimals(selectedAnimals);
	}
	// if not, show all
	else {
		displayAnimals(zooAnimals);
	}

	// reset other filter fields
	document.querySelector("#filterType").value = "";
	document.querySelector("#animalSearch").value = "";
})

// "animalSearch" input should allow searching for specific name or species (or part of one)
// YOUR CODE HERE (use "input" event to react as the user types)
document.querySelector("#animalSearch").addEventListener("input", function () {
	const searchQuery = document.querySelector("#animalSearch").value.toLowerCase();

	// 
	if (searchQuery != "") {
		const selectedAnimals = zooAnimals.filter((animal) =>
			animal.name.toLowerCase().includes(searchQuery) ||
			animal.age.toString().includes(searchQuery) ||
			animal.gender.toLowerCase().includes(searchQuery) ||
			animal.species.toLowerCase().includes(searchQuery) ||
			animal.description.toLowerCase().includes(searchQuery)

		);
		displayAnimals(selectedAnimals);
	}
	// if not, show all
	else {
		displayAnimals(zooAnimals);
	}

	// reset other filter fields
	document.querySelector("#filterType").value = "";
	document.querySelector("#filterGender").value = "";

});


// clicking "Add animal" button should collect the values from the form and call addAnimal function
document.querySelector("#addAnimalButton").addEventListener("click", function (ev) {
	ev.preventDefault();    // by naming the event parameter (ev) in the line above, we can access it and prevent the default behavior of a submit button, i.e. sending the form, from happening

	// YOUR CODE HERE
	let name = document.getElementById('name').value;
	let age = document.getElementById('age').value;
	let gender = document.getElementById('gender').value;
	let species = document.getElementById('species').value;
	let type = document.getElementById('type').value;
	let description = document.getElementById('description').value;

	addAnimal(name, age, gender, species, type, description);

	// console.log(`Got: ${name} ${age} ${gender} ${species} ${type} ${description}`);

});


// don't touch these - they show and hide the form to add a new animal
document.querySelector("#toggleSidebar").addEventListener("click", function () {
	const sidebar = document.querySelector("#sidebar");
	const animalForm = document.querySelector("#animalForm");
	// sidebar is hidden - show it
	if (animalForm.classList.contains("hidden")) {
		animalForm.classList.remove("hidden");
		sidebar.style.width = "330px";
		document.querySelector("#toggleSidebar").textContent = "Hide form";
	}
	// sidebar is visible - hide it
	else {
		animalForm.classList.add("hidden");
		sidebar.style.width = "30px";
		document.querySelector("#toggleSidebar").textContent = "Show form";
	}
})
