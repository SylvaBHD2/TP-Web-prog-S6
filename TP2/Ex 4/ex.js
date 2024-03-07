const fs = require('fs');

function processData(csvText) {
    // get every line and put them in object
    var lines = csvText.split("\n");
    var data = [];
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i].trim(); // Remove any leading/trailing spaces
        if (line === '') continue; // Skip empty lines
        var cells = line.split(",");
        var website2 = cells[2] === "" ? null : cells[2];
        var obj = { username: cells[0], realName: cells[1], website: website2, projectName: cells[3] }; // corrected index
        data.push(obj);
    }
    // print the 10 first objects
    for (var i = 0; i < 10 && i < data.length; i++) {
        console.log(data[i]);
    }
    return data;
};

function processDataF(csvText) {
    // get every line and put them in object
    const lines = csvText.split("\n");
    const data = lines.map(line => {
        const cells = line.split(",");
        // console.log("cells", cells);
        const website = cells[2] === "" ? null : cells[2];
        return { username: cells[0], realName: cells[1], website: website, projectName: cells[3] };
    });
    data.slice(1, 4).forEach(obj => console.log(obj)); // Print the first 10 objects
    return data;
};



// // Read the CSV file
// fs.readFile('./Ex 4/apache_people_projects.csv', 'utf8', (err, csvText) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     // Process the CSV data
//     // Console.log("Imperative programmation");
//     processData(csvText);
// });


fs.readFile('./Ex 4/apache_people_projects.csv', 'utf8', (err, csvText) => {
    if (err) {
        console.error(err);
        return;
    }
    // Process the CSV data
    // Console.log("Functionnal :  programmation");
    processDataF(csvText);
});

