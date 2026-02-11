/**************************************************************
 * Constructor function to create Pencil objects
 * with name and color properties
 **************************************************************/

class CreatePencilConstructor {

    // Constructor runs when object is created using 'new'
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    // Method defined inside class (goes to prototype automatically)
    write(text) {
        let h1 = document.createElement("h1");
        h1.style.color = this.color;
        h1.textContent = text;
        document.body.append(h1);
    }
}

let classPencil1 = new CreatePencilConstructor("Apsara", "blue");
let classPencil2 = new CreatePencilConstructor("Camlin", "green");

classPencil1.write("Writing using ES6 Class - Blue");
classPencil2.write("Writing using ES6 Class - Green");


/**************** CONSTRUCTOR FUNCTION VERSION ****************/

function CreatePencil(name, color) {
    this.name = name;       // Assign pencil name
    this.color = color;     // Assign pencil color

    // Initially, we could define the write method here (per instance),
    // but it's better to attach it to the prototype for memory efficiency.
    // Example (commented out):

    /*
    this.write = function(text) {
        let h1 = document.createElement("h1");
        h1.style.color = this.color;
        h1.textContent = text;
        document.body.append(h1);
    }
    */
}


/**************************************************************
 * If a property is added to the constructor's prototype,
 * all instances created from that constructor will share
 * that property.
 * This is useful for shared values or methods.
 **************************************************************/

CreatePencil.prototype.price = 10;


/**************************************************************
 * Defining the write method on the prototype so all instances
 * can use it.
 * This makes it memory efficient because all objects share
 * the same function instead of creating a new copy per object.
 **************************************************************/

CreatePencil.prototype.write = function(text) {
    let h1 = document.createElement("h1");
    h1.style.color = this.color;     // Use the pencil's color for the text
    h1.textContent = text;           // Set the text content
    document.body.append(h1);        // Add the element to the page
};


/**************************************************************
 * Creating two instances of the Pencil using the constructor
 **************************************************************/

let pencil1 = new CreatePencil("Natraj", "black");
let pencil2 = new CreatePencil("Doms", "red");


// Using shared prototype method

pencil1.write("Hello! How are you?");
pencil2.write("I'm fine.");


// Accessing shared prototype property 'price'

console.log(pencil1.price);  // Output: 10
console.log(pencil2.price);  // Output: 10


/*
  1. Constructor Function:
     - Creates objects.
     - 'this' refers to the new object.
 
  2. Prototype:
     - Shared memory space for methods & properties.
     - All instances link to it via __proto__.
 
  3. Class:
     - Syntactic sugar over constructor + prototype.
     - Methods automatically go to prototype.
 */
