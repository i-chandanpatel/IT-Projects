    // Constructor function to create Pencil objects with name and color properties
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

    // Creating two instances of the Pencil using the constructor
    let pencil1 = new CreatePencil("Natraj", "Black");
    let pencil2 = new CreatePencil("Doms", "Red");

    // These lines will throw an error unless the write method is defined on the prototype first
    pencil1.write("Hello! How are you?");
    pencil2.write("I'm fine.");

    // If a property is added to the constructor's prototype,
    // all instances created from that constructor will share that property.
    // This is useful for shared values or methods.
    CreatePencil.prototype.price = 10;

    // Accessing shared prototype property 'price'
    console.log(pencil1.price);  // Output: 10
    console.log(pencil2.price);  // Output: 10

    // Defining the write method on the prototype so all instances can use it
    CreatePencil.prototype.write = function(text) {
        let h1 = document.createElement("h1");
        h1.style.color = this.color;     // Use the pencil's color for the text
        h1.textContent = text;           // Set the text content
        document.body.append(h1);        // Add the element to the page
    }
