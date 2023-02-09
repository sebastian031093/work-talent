"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (startedIndex, mainIndex) {
    return [this.starterMenu[startedIndex], this.mainMenu[mainIndex]];
  },

  deliveryOrder: function (
    /* obj */ { time = "18", addres, mainIndex = 1, startedIndex = 0 }
  ) {
    console.log(
      `Order received ${this.starterMenu[startedIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${addres}, at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your deliciuos pasta whit ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredinent, ...otherIngredients) {
    console.log(mainIngredinent);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//////////////////////////////////////==========================The Nullish Coalesing Operator(??)======================////////////////////////////////////

restaurant.numGuests = 0;
const guest = restaurant.numGuests || 10;
console.log(guest);


const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//////////////////////////////////////=====================Short Circuiting( && and ||)===========================////////////////////////////////////


console.log(3 || "talent"); // 
console.log("" || "talent");
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || "" || "Hi 👻" || 23 || null);


console.log(0 && "talent");
console.log("talent" && "");
console.log(true && 0);
console.log(undefined && null);
console.log("Hi 👻" && 23 && true && "" && 23 && null);

restaurant.numGuests = 0;
const guest1 = restaurant?.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

// const guest2 = restaurant.numGuests || 10;
// console.log(guest2);

// //Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza("mushrooms", "spinach");
// }

// restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

//////////////////////////////////////=====================REST pattern and parameters===========================////////////////////////////////////


const [a, b, ...others] = [1, 2, 3, 4, 5, 6];
console.log(others);

//Objects

const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

//Function rest parameter

const add = (...numbers) => {
  //console.log(numbers);
  let sum = 0;
  numbers.forEach((element) => {
    sum += element;
  });
  return console.log(sum);
};

add(1, 2);
add(1, 2, 3, 4, 5, 6);
add(1, 2, 4, 5, 6, 7, 8, 89);
add(1, 2, 34, 5, 5, 5, 67, 77, 7, 7, 7, 7, 7, 4545);
*/

//////////////////////////////////////=====================Spreed Operator(...)===========================////////////////////////////////////

const arr = [7, 8, 9];
let badNewArr = [1, 2, 3, 5, 6, arr[0], arr[1], arr[2]];
console.log(badNewArr);

let coolArr = [1, 2, 3, 5, 6, ...arr];
console.log(coolArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

//Copy Array
const mainManuCopy = [...restaurant.mainMenu];

//Join 2 array
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// const ingredients = [
//   prompt("let's make pasta! Ingredient 1?"),
//   prompt("Ingredient 2"),
//   prompt("Ingredient 3"),
// ];

//console.log(ingredients);

//old school
//restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
//young blod
//restaurant.orderPasta(...ingredients);
*/
//////////////////////////////////////=====================Destructuring Objects===========================////////////////////////////////////

const { mainMenu, openingHours, name, categories } = restaurant;

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(name, hours, tags);

//Set defaul values

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Nested objects

const {
  fri: { open, close },
} = restaurant.openingHours;
console.log(open, close);

//Pass object as a parameter and destructuring
// pro tip : los parametro en el destructuring de la funcion no tienen que tener el mismo nombre de las propiedades del objeto.
restaurant.deliveryOrder({
  time: "22:30",
  addres: "Via del sole, 23",
  mainIndex: 2,
  startedIndex: 1,
});
*/

//////////////////////////////////////=====================Destructuring arrys===========================////////////////////////////////////

//Destructuring array
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

const [first, second] = restaurant.categories;
console.log(first, second);

// we can have a function,return an array and then we can immedietely destructuring the result into diferent variables;
const [secundary, main] = restaurant.order(2, 0);
console.log(secundary, main);

//Nested destructuring
const nested = [2, 3, [4, 5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j);

//Defaul values
const [p = 1, q = 1, r = 1] = [9, 8];
