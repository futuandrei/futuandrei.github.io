document.body.onload = generateCards;

async function generateCards() {

    // ------ User data
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();  // Convert the response to JSON
    console.log(data);  // Log the data

    /* ------------ Add DIV ------------ */
    const newDiv = document.createElement("div");
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    /* ------------ Add H1 ------------ */
    const newHeading = document.createElement("h1");
    const newHeadingContent = document.createTextNode("Cute cats");
    newHeading.appendChild(newHeadingContent);
    document.body.insertBefore(newHeading, newDiv);

    /* ------------ Add Card Container ------------ */
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";  // Assign class for styling

    /* ------------ Add Cards ------------ */

    data.forEach(element => {
        const newCard = document.createElement("div");
        newCard.className = "card";  // Assign class for styling
        // console.log(element);
        console.log(element.keys);

        // Add image placeholder with a unique RoboHash URL
        const imagePlaceholder = document.createElement("img");
        imagePlaceholder.src = `https://robohash.org/user${element.name}?set=set4&size=100x100`;  // RoboHash image with unique identifier
        newCard.appendChild(imagePlaceholder);

        // Add name
        const name = document.createElement("h3");
        name.textContent = `${element.name}`;
        newCard.appendChild(name);

        // Add username
        const username = document.createElement("p");
        username.textContent = `Username: ${element.username}`;
        newCard.appendChild(username);

        // Add email
        const email = document.createElement("p");
        email.textContent = `Email: ${element.email}`;
        newCard.appendChild(email);

        cardContainer.appendChild(newCard);

    });
    // for (let i = 0; i < 10; i++) {
    //     const newCard = document.createElement("div");
    //     newCard.className = "card";  // Assign class for styling

    //     // Add image placeholder with a unique RoboHash URL
    //     const imagePlaceholder = document.createElement("img");
    //     imagePlaceholder.src = `https://robohash.org/user${i + 1}?set=set4&size=100x100`;  // RoboHash image with unique identifier
    //     newCard.appendChild(imagePlaceholder);

    //     // Add name
    //     const name = document.createElement("h3");
    //     name.textContent = `Name ${i + 1}`;
    //     newCard.appendChild(name);

    //     // Add username
    //     const username = document.createElement("p");
    //     username.textContent = `Username: user${i + 1}`;
    //     newCard.appendChild(username);

    //     // Add email
    //     const email = document.createElement("p");
    //     email.textContent = `Email: user${i + 1}@example.com`;
    //     newCard.appendChild(email);

    //     cardContainer.appendChild(newCard);
    // }

    document.body.insertBefore(cardContainer, newDiv);  // Insert the card container
}