class CreatePencil {
    // Constructor initializes pencil properties when a new object is created
    constructor(name, company, price, color) {
        this.name = name;         // Name of the pencil (e.g., "Natraj")
        this.company = company;   // Brand or manufacturer
        this.price = price;       // Cost of the pencil
        this.color = color;       // Color used for writing text
    }

    // Method to display text on the webpage in the pencil's color
    // We use this to simulate the pencil "writing" on the screen
    write(text) {
        let h1 = document.createElement("h1"); // Create a heading element
        h1.style.color = this.color;           // Set text color to pencil's color
        h1.textContent = text;                 // Set the text to be displayed
        document.body.append(h1);              // Add the element to the page
    }

    // Method to remove all text written in this pencil's color
    // Useful for simulating an "erase" action
    erase() {
        // Select all <h1> elements and check their color
        document.querySelectorAll("h1").forEach((elem) => {
            if (elem.style.color === this.color) {
                elem.remove(); // Remove the element if color matches
            }
        });
    }
}

// Creating two pencil objects with different properties
let pencil1 = new CreatePencil("Natraj", "Natraj", 10, "black");
let pencil2 = new CreatePencil("Doms", "Apsara", 15, "blue");

// Pencil 1 writes some text
pencil1.write("This is pencil 1 writing...");
pencil1.write("This is pencil 1 writing...");
pencil2.write("This is pencil 2 writing...");

// Set a timeout to erase pencil1's text after 3 seconds (3000 milliseconds)
setTimeout(() => {
    pencil1.erase(); // Calls the erase method to remove text written in pencil1's color
}, 3000);
