// ✅ 1. Synchronous vs Asynchronous
console.log("Start"); // Executes first

setTimeout(() => {
    console.log("Async task (setTimeout)"); // Executes later due to delay
}, 1000);

console.log("End"); // Executes immediately after "Start"

// ✅ 2. Callback Pattern
function fetchDataCallback(callback) {
    setTimeout(() => {
        callback("Data from callback");
    }, 1000);
}

fetchDataCallback((data) => {
    console.log("Callback received:", data);
});

// ⚠️ Callback Hell Example
setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
        }, 1000);
    }, 1000);
}, 1000);

// ✅ 3. Promises
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("Data from promise");
            } else {
                reject("Error fetching data");
            }
        }, 1000);
    });
}

fetchDataPromise()
    .then((data) => {
        console.log("Promise resolved:", data);
    })
    .catch((error) => {
        console.error("Promise rejected:", error);
    });

// ✅ 4. async/await with try-catch
async function fetchAsyncData() {
    try {
        const data = await fetchDataPromise(); // Waits for promise to resolve
        console.log("Async/Await received:", data);
    } catch (error) {
        console.error("Async/Await error:", error);
    }
}

fetchAsyncData();

// ⚠️ Mixing async/await with then/catch (not recommended)
async function mixedApproach() {
    fetchDataPromise()
        .then((data) => console.log("Mixed then:", data))
        .catch((err) => console.error("Mixed catch:", err));
}
mixedApproach();

// 🧠 Mindset: Async isn’t magic – it’s just structured waiting
// Every async operation is just a delayed task that JS handles via the event loop

// 🛠️ Practice: Delay simulator using setTimeout + Promises
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateTyping() {
    console.log("Typing...");
    await delay(1000);
    console.log("Typed: Hello!");
}
simulateTyping();

// 🛠️ Practice: Fetch multiple users sequentially
function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`User ${id}`);
        }, 1000);
    });
}

async function fetchUsersSequentially() {
    const user1 = await getUser(1);
    console.log(user1);

    const user2 = await getUser(2);
    console.log(user2);

    const user3 = await getUser(3);
    console.log(user3);
}
fetchUsersSequentially();
