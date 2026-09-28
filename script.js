const animals = [
	{ id: 1, name: "Luna", species: "cat", age: 3, adopted: false },
	{ id: 2, name: "Biscuit", species: "dog", age: 7, adopted: true },
	{ id: 3, name: "Pepper", species: "cat", age: 1, adopted: true },
	{ id: 4, name: "Moose", species: "dog", age: 5, adopted: false },
	{ id: 5, name: "Charly", species: "dog", age: 4, adopted: false },
	{ id: 6, name: "Bill", species: "cat", age: 0.5, adopted: true },
	{ id: 7, name: "Chompers", species: "rabbit", age: 0.5, adopted: false },
	{ id: 8, name: "Beowulf", species: "dog", age: 7, adopted: true },
];

// animalNames: every animal's name, pulled out with .map() since we want
// one new value per animal rather than filtering anything out.
const animalNames = animals.map((animal) => animal.name);
console.log(animalNames);

// Print a name/species line per animal. .forEach() is the right tool here
// because we only need a side effect (logging), not a new array back.
animals.forEach((animal) => {
	console.log(`Name: ${animal.name} Species: ${animal.species}`);
});

// Same idea as above, but with a for...of loop instead of .forEach(), to
// show the two approaches produce the same result.
for (const animal of animals) {
	console.log(`Age: ${animal.age} Adopted: ${animal.adopted}`);
}

// adoptedAnimals / availableAnimals: split the animals into two groups
// based on their adopted flag using .filter(), which keeps only the
// entries where the callback returns true.
const adoptedAnimals = animals.filter((animal) => animal.adopted);
const availableAnimals = animals.filter((animal) => !animal.adopted);
console.log(adoptedAnimals);
console.log(availableAnimals);

// availableDogs: the names of dogs that haven't been adopted yet.
// Chaining .filter() into .map() lets us narrow down to the right animals
// first, then transform what's left into just the field we care about.
const availableDogs = animals
	.filter((animal) => animal.species === "dog" && !animal.adopted)
	.map((animal) => animal.name);
console.log(availableDogs);

// averageAge: the mean age of all the animals. .reduce() collapses the
// array down to a single running total, which we then divide by
// animals.length to turn a sum into an average.
const totalAge = animals.reduce((sum, animal) => sum + animal.age, 0);
const averageAge = totalAge / animals.length;
console.log(averageAge);

// These three functions are written as named declarations, rather than
// inline arrow functions, so they can be reused and passed around by name
// in the tasks below (e.g. animals.filter(isCat)) instead of rewritten
// each time.
function isCat(animal) {
	return animal.species === "cat";
}

function isAdopted(animal) {
	return animal.adopted;
}

function getName(animal) {
	return animal.name;
}

// adoptedCatNames: reuses isCat, isAdopted, and getName above instead of
// writing new anonymous callbacks. Passing the functions by name (not
// calling them) lets .filter()/.map() invoke each one per animal.
const adoptedCatNames = animals
	.filter(isCat)
	.filter(isAdopted)
	.map(getName);
console.log(adoptedCatNames);

// makeSpeciesChecker: a factory function that returns a new function
// instead of a plain value. The inner function closes over "species",
// so each function it produces remembers which species it was built to
// check for, without needing isCat/isDog/isRabbit to be written by hand.
function makeSpeciesChecker(species) {
	return function (animal) {
		return animal.species === species;
	};
}

// Build isDog and isRabbit from the closure above instead of duplicating
// isCat's logic, then reuse getName to log each group's names.
const isDog = makeSpeciesChecker("dog");
const isRabbit = makeSpeciesChecker("rabbit");

const dogNames = animals.filter(isDog).map(getName);
const rabbitNames = animals.filter(isRabbit).map(getName);
console.log(dogNames);
console.log(rabbitNames);
