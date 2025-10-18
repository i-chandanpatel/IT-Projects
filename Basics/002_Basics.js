// let: It's block scoped
// var: It's funtion scoped
// Primitive Data Types:They are immutable, if value changed they created at a new memory address. They follow copy by value. i.e let a=1; let b=a; b=2; even than a will be 1
var a=1;
var b="a10.5";  //String
var bool=true;
var c;  //Undefined: Absence of value
var d=null; //NULL: Explicitely define absence of value but its type of "null" is "object"


//String to Number
console.log(typeof +b);
console.log(typeof Number(b));
console.log(parseInt(b));   //It only keeps int part gives NaN if char is present
console.log(parseFloat(b)); //Gives NaN if char is present


//Number to String
console.log(typeof String(a));
console.log(typeof (b+""));


// Check Nan
console.log("'10' is NaN ",isNaN("10"),"10 is NaN ", isNaN(10),"'a10 is NaN '", isNaN("a10"));


//Tricky questions
console.log(`\n\n\n11-"10"= `, 11-"10", ". Type is of type", typeof(11-"10") );
console.log(`\n11+"10"= `, 11+"10", ". Type is of type", typeof(11+"10"));
console.log(`\n"11"+10= `, "11"+10, ". Type is of type", typeof("11"+10));
console.log(`\n"11"-10= `, "11"-10, ". Type is of type", typeof("11"-10));  
console.log(`\n"11"-"10"= `, "11"-"10", ". Type is of type", typeof("11"-"10"));
console.log("\ntrue+true= ", true+true, ". Type is of type", typeof(true+true))
console.log("\nfalse+false= ", false+false, ". Type is of type", typeof(false+false));
console.log("\ntrue+false= ", true+false, ". Type is of type", typeof(true+false));
console.log("\ntrue-false= ", true-false, ". Type is of type", typeof(true-false))


//if-else
var a=81
if(a<60){
    console.log("Average")
}else if(a>=60 && a<80){
    console.log("Good");
}else{
    console.log("Excellent");
}

//Switch Statement
switch (a) {
    case (a<60):
        console.log("Average");
        break;
    case (a>=60 && a<80):
        console.log("Good");
        break;
    case(a>=80):
    console.log("Excellent");
    default:
        console.log("Good luck");
        break;
}

//Loops
//while Loop
var a=6;
while(a>3){
    //console.log(a);
    a--
}

//do...while loop
var a=6;
do {
    //console.log(a);
    a--
} while (a>3);

//for loop
for (let i = 0; i < 5; i++) {
    //console.log(i);
}


//Function
function sum(a, b=5) {
    return a+b;
}
//if function hold within a variable than it can only be executed below its declaration
//Function expression
let multiply=function multipling(a,b) {
    return a*b;
}

//Function expression with Anonymos function
let add=function(a,b){
    return a+b;
}

//IIFE- Immediately invoked function expression
var f=(function (a) {
    console.log("Hello! from IIFE to ", a);
})("Denver")

//Arrow function
var sum=(a,b)=>{
    return a+b
}
var sum=(a,b)=> console.log(`The sum is ${a+b}`);   //Only one liner code is possible but not works with return



//Strings:It is immutable
var a="    This is a string th    ";
console.log(`\n\n\nString interpolation: ${a}`);
console.log(`\na.charAt(2) "${a.charAt(5)}" its charCode is "${a.charCodeAt(5)}"`);
console.log(`\na.endsWith("ing") ${a.endsWith("ing")}`);
console.log(`\na.indexOf("is",3) ${a.indexOf("is",3)}`);
console.log(`\na.trimEnd() ${a.trimEnd()}`);
console.log(`\na.trimStart() ${a.trimStart()}`);
console.log(`\na.trim() ${a.trim()}`);
console.log(`\na.substring(4,8) ${a.substring(4,8)}`);
console.log(`\na.toUpperCase() ${a.toUpperCase()}`);
console.log(`\na.toLowerCase() ${a.toLowerCase()}`);
console.log(`\na.replace("This","That") {a.replace("This","That")}`);
console.log(`\na.length ${a.length}`);
console.log(`\na.at(-1) ${a.at(-9)}`);
console.log(`\na.search(/th/i)[/th/ -> its a regular ecpression] ${a.search(/th/i)}; i means its not case sensitive`);
var m=a.match(/th/ig)   //g means global search for all occurences; return array
console.log(m);
var m=a.matchAll(/th/ig)
console.log(...m);
//Iterables= Objects where we can use the for-of loop



//Array is also an object in JS
let arr1=[5,6,7,8,5]
let arr2=new Array(4,5,6)
console.log("\n\n\nArray 1: ",arr1);
console.log("Array 2: ",arr2);
console.log(`\narr1.at(1) gives according to normal index ${arr1.at(1)}; But useful if want to search with -ve index arr1.at(-1) ${arr1.at(-1)}`);

arr1.push(9)    //Insert at end
console.log("\nAfter arr1.push(9): ",arr1);

arr1.pop()  //Deletes from end
console.log("\nAfter arr1.pop(): ",arr1);

arr1.unshift(2)     //Add at starting
console.log("\narr1.unshift(2) adds element at starting ",arr1);

arr1.shift()    //Remove from starting
console.log("\narr1.shift() removes from starting",arr1);

console.log("\narr1.includes(5) ",arr1.includes(5));

console.log("\narr1.indexOf(5) ",arr1.indexOf(5,1),"\n. arr1.lastIndexOf(5) ",arr1.lastIndexOf(5,1));   //Start index 1 is given indexOf goes fwd 1 to 4 and lastIndexOf goes backword 1 to 0

var a=arr1.join()
console.log("\nJoin makes Array into string",a);

//Slice doesn't change actual array
slicee=arr1.slice(1,3);     //Returns elements from index 1 to index 3
console.log("\nslice array: ",slicee);

console.log("\nOriginal array before Splice",arr1);

//splice changes actual Array
splicee=arr1.splice(1,3,"Adds Element","After two entries");    //Remove 3 elements from index 1 & add 2 values specified
console.log("splice(modifies the original array): ",splicee);
console.log("Original array after Splice",arr1);
splicee=arr1.splice(1,3);    //Delete values from original array & adds nothing 

console.log(arr1.toSpliced(1,1,"15"))    //Starts deleting from index 1 and delets 1 val and puts 15 at that position

console.log("\nArray1: ",arr1,"\nArray2: ",arr2);
arr1.push(arr2);
console.log("\nArray1 after push",arr1)
arr3=arr1.concat(arr2);
console.log(`\nArray3 after Concate `,arr3);

const new_arr=[...arr1,...arr2]
console.log("\nNew array after Spread: ",new_arr);
arr1=arr1.flat(3);
console.log("\nArray1 after flat: ",arr1);

var string1="Denver";
console.log("\nstring1='Denver' is Array.isArray(string1): ",Array.isArray(string1));
console.log("\nArray.from(string1) converted into Array ",Array.from(string1));

var a1=100;
var a2=[200,600];
var a3=300;
console.log("\nCreated array using Array.of(a1,a2,a3): ",Array.of(a1,a2,a3));

var fruits=["Apple","Banana","Grapes","Mango"]

//.reverse()    ->Changes actual array
//Destructuring array
var [a,b,,c]=fruits;   //Stored the first two value of the array as a & b and 4th value as c
console.log(a);

var a=[1,[2,3,[4]],5]
console.log(a.flat(Infinity))

// console.log("\nfor-of loop used to iterate over iterables(array, string, maps, sets and nodelist):");
// for (const item of fruits) {
//     console.log(item);
// }
// console.log("\nfor-of loop with .entries(): ");
// for (const item of fruits.entries()) {
//     console.log(item);
// }

// console.log("\n for-in loop gives index: ");
// for (const item in fruits) {
//     console.log(item);
//     if (Object.hasOwnProperty.call(fruits, item)) {
//         console.log(fruits[item]);
//     }
// }


//Difference: forEach-can't return, map can return; if changes made forEach will change original array
//forEach Loop 
// fruits.forEach(function(curVal, index, array){
//     console.log(curVal);
//     console.log(index);
//     console.log(array);
// })


// //map:Only use when have to create a new array on the basis of old array. Doesn't change original array
var a=[10,12,10,13]
// var loop=a.map((curVal,index,array)=>{
//     if (curVal%2==0) {
//         return curVal*curVal;
//     }
// }).filter((curVal)=> curVal!=undefined);
// console.log(loop);


// //filter:Not change original. As map can return value but it can only return true or false
// var ans=a.filter((cur,ind,arr)=>{
//     return cur>11;
// })
// console.log(ans);


// //sort:ascending
// a.sort((b,c)=>{
//     if (b>c) return 1;      //Change the order
//     if (b<c) return -1;     //Don't change the order
// })
// console.log(a);


// a.sort((a,b)=>{
//     return a-b;   //For Ascending and b-a for Descending Order
// })


// //Reduce: Ek array se ek single value banana
// var initialAccumulatorVal=0;
// var total=a.reduce((accumulator,crr,ind,arr)=>{
//     return accumulator+crr;
// },initialAccumulatorVal);
// console.log(total);


// find -> Returns first value that matched
var a=[
    {id:1,key:1},
    {id:2,key:2},
    {id:3,key:1},
]
var ans=a.find((val)=>{
    return val.key===1;
});
console.log(ans);   //{id:1,key:1}


//some ->returns bool value if the particular condition is valid by any value, even if one value pass the condition it returns true
var a=[1,3,65,90];
ans=a.some((val)=>{
    return val>85;
});
console.log(ans);   //true

//every ->returns bool value if the particular condition is valid by all value, even if one value fails the condition it returns false
ans=a.every((val)=>{
    return val>85;
});
console.log(ans);   //false


//Maths
console.log("Absoulute of -43: ",Math.abs(-43));
console.log("Round of -43.5: ",Math.round(-43.5));
console.log("Round of 43.5: ",Math.round(43.5));
console.log("Ceil of 43.2: ",Math.ceil(43.2));
console.log("Floor of 43.2: ",Math.floor(43.2));
console.log("Sqrt of 4: ",Math.sqrt(4));
console.log("PI function: ",Math.PI);
console.log("Power 3^3: ",Math.pow(3,3));
console.log("Random: ",Math.random());
console.log("Random: ",Math.random()*10);



//Dates
//In JS Dates Months starts from 0
//Formate: new Date(year, month, day, hours, minutes, seconds ,milliseconds)
var d=new Date();
console.log(d);
console.log(d.toString());
console.log(d.toDateString());
console.log(d.toLocaleDateString());
console.log(d.toLocaleString());
console.log(d.getDate());
console.log(d.getDay());
console.log(d.getFullYear());
console.log(d.getHours());
console.log(d.getMonth());
console.log(d.toISOString());
console.log(d.toJSON());

let myDate=new Date(2020,2,28,18,23,15);
console.log(myDate.toTimeString());
console.log(myDate.toLocaleTimeString());
console.log(myDate.toLocaleString());




//Objects
console.log("\n\n\n Objects");
const sym=Symbol("AK");
console.log(sym.prototype.description)
var role="admin"
// Object using Literal 
let obj1={
    Name:"Denver",
    [role]:"Raj",
    //sym:"AK-47", //Wrong method to acces Symbol it returns string
    [sym]:"AK-47",
    Profession:"Coding",
    Age:"20",
    "Location":"Delhi",
    greet: function (){
        return "Hello! from obj1"
    }
    //greetShortHand(){
        //return "Hello! from obj1"
    //}
}

console.log(obj1.hasOwnProperty("Name"))    //Only works for property that was created at the time of creation
obj1.class=12;
console.log(obj1.hasOwnProperty("class"))    //False
console.log(Object.hasOwn(obj1,"Name"))
console.log(obj1.Name);
console.log(obj1["Age"]);
console.log(obj1["Location"]);
console.log(typeof obj1.sym);
console.log(obj1[sym]);
console.log(obj1.greet())
obj1.Age=21;
// Object.freeze(obj1); //Doesn't let to change properties of object
obj1.Profession="Gaming";
console.log(obj1.Profession);
obj1.func=  function(){
    console.log("Hello I'm a function");
}
console.log(obj1.func); //Function not exectued only its reference returned
console.log(obj1.func());

obj1.funcc=function(){
    console.log(`Access Age through this function ,${this.Age}`);
}
console.log(obj1.funcc())




var a=new Object()      //Singlton Object
a.FullName={
    FirstName:"Raj",
    LastName:"Tiwari"
}
a.isIn=false;
console.log(a);
var b=new Object()
b.FullName={
    FirstName:"Saurabh",
    LastName:"Verma",
    address:{
        city:"NYC",
        zip:1234
    }
}
var c={a,b}     //c obj{a obj, b obj}
console.log("Combined: ",c);
var d=Object.assign({},a,b)     //a and b added in {} and then returned to d
console.log("Combined using assign: ",d);

console.log(d.address ? d.address.city : "City is not present")
console.log("Keys: ",Object.keys(a));
console.log("Values: ",Object.values(a));
console.log("Entries: ",Object.entries(a));
console.log("Object have this property: ",a.hasOwnProperty('FirstName'));
console.log("Object have this property: ",a.hasOwnProperty('FullName'));
console.log("Object have this property: ",a.propertyIsEnumerable('FullName'));
console.log("Object have this property: ",a.propertyIsEnumerable('FirstName'));

//Object Destructuring
var a={
    name:"Web Dev",
    price:"999",
    instructor:"Denver"
}
var {instructor:i}=a;
console.log("var {instructor:i}=a; now can acces using only i ",i);

var b={address:{
        city:"NYC",
        zip:1234,
        locations:{
            lat:23.2,
            lng:77.4
        }
    }
}
console.log(b.address ? b.address.city : "City is not present")
console.log(b.address?.city ?? "City is not present")    //Optional Chaining

var{lat,lng}=b.address.locations;
console.log(lat);   //Can directly access this value

// this keyword
//         In an object methode, this refers to the object
//         Alone, this refers to the global object
//         In a function, this refers to the global object
//         In a function in strict mode, this is undefined
//         In an event, this refers to the element that received the event
//         Methodes like call(), apply(), and bind() can refer to any object

//Padding
var a="GitHub"
console.log(a.padStart(15,"*"))
console.log(a.padEnd(15,"*"))

//Entries   -> Converts obj to array
//fromEntries   -> Converts array to obj
var a={name:"Denver", age:25}
var entries=Object.entries(a);
console.log(entries)
console.log(Object.fromEntries(entries))

// Object.keys(obj) -> Makes the array of the keys only
var key=Object.keys(a);
console.log(key);
//Nullish Coalescing Operator= Returns RHS value if LHA have null or undefined value otherwise  retruns LHS
 var a=0;
console.log("a || 10 ",a || 10)
console.log("a ?? 10 ",a ?? 10)

var obj={
    name:"Random",
    age:25,
    email:"test@test.com"
}

for (var key in obj) {
    var element = obj[key];     //obj.key will not work
    console.log(element);
}

var newObj=Object.assign({newProp:"daf"}, obj);     //Adds all the props of obj with the first provided obj and returns a obj

var b={
    name:"Raghav",
    address:{
        city:"NYC",
        zip:1234,
        locations:{
            lat:23.2,
            lng:77.4
        }
    }
}

var c={...b};   //The non nested value will have different copies but the nested ones will have the same reference

//Deep copy is used to solve this problem. Deep copy is done like this
var str=JSON.stringify(b);
var newObj=JSON.parse(str);

