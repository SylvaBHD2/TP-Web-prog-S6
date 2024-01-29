function filter(array, predicate) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}


const array = [1, 2, 3, 4, 5]
const filteredArray = filter(array, item => item > 2) // [3, 4 5]
console.log(filteredArray)
console.log(filter([1, 2, 3, 4, 5], function (x) { return x % 2 == 0; }));