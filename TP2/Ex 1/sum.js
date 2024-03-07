//Sylvan Buhard

function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    if (arguments.length == 0) {
        throw "Error : sum requires at least one argument";
    }
    return sum;
}


// function sum(a,b){
//     return a + b;
// }

// console.log("Hello World");
console.log(sum(1, 2, 3, 4, 5));