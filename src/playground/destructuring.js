// console.log("destructuring")

// const person={
//    name: "Jimbo",
//    age: 55,
//    location: {
//       city: "Beavercreek",
//       temp: 81
//    }
// };

// const { age, name} = person;

// console.log(name, age);

// const book = {
//    title: 'Ego is the Enemy',
//    autho: 'Ryan Holiday',
//    publisher: {
//       name: 'Penguin'
//    }
// };

// const { name: publisherName = 'Self-PUblished' } = book.publisher;
// console.log(publisherName);

const foodItem = [ 'coffee (hot)', '$2.00', '$2.50', '$2.75' ];
const [itemName, , medPrice] = foodItem;
console.log("itemName:", itemName, "medPrice:", medPrice);


// const address = [
//    '1823 Andrea Cir',
//    'Beavercreek',
//    'Ohio',
//    '45432' ];

//    console.log(address);
//    console.log(...address);