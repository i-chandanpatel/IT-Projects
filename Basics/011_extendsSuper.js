// Base class: User
class User {
    constructor(name, color) {
        this.name = name;       // User's name
        this.color = color;     // Text color for writing
    }

    // Shared method: all users can write text
    write(text) {
        const h1 = document.createElement("h1");
        h1.style.color = this.color;
        h1.textContent = `${this.name} says: ${text}`;
        document.body.append(h1);
    }
}

// Admin class extends User and adds extra privileges
class Admin extends User {
    constructor(name, color) {
        super(name, color); // Call the parent constructor to set name and color
    }

    // Admin-only method: remove all text written in their color
    removeText() {
        document.querySelectorAll("h1").forEach(elem => {
            if (elem.style.color === this.color) {
                elem.remove();
            }
        });
    }
}

// Example usage
const user1 = new User("Alice", "blue");
const admin1 = new Admin("Bob", "red");

user1.write("Hello, I'm a regular user.");
admin1.write("Admin here. I can also remove text!");

// Admin removes their own text after 3 seconds
setTimeout(() => {
    admin1.removeText();
}, 3000);
