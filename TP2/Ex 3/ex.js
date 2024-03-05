// Implémentez une fonction map(array, transform) qui renvoie un nouveau tableau
// avec chaque item de array remplacé par transform(item). Le array d’origine
// ne doit pas être modifié (aucun effet de bord autorisé).

function map(array, transform) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray.push(transform(array[i]));
    }
    return newArray;
}


const array = [1, 2, 3, 4, 5]
const doubled = map(array, item => item * 2) // [2, 4, 6, 8, 10]

console.log(doubled)