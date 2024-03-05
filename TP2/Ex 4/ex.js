
// function processData (csvText) {
//     // get every line and put them in object
//     var lines = csvText.split("\n");
//     var data = [];
//     for (var i = 0; i < lines.length; i++) {
//         var line = lines[i];
//         console.log(line);
//         var cells = line.split(",");
//         console.log(cells);
//         var website2 = cells[2] === "" ? null : cells[2];
//         console.log("Test here : ",cells[0]," | ",cells[1], " | ", website2," | ");
//         var obj = { username: cells[0], realName: cells[1], website: website2, projectName: cells[4] };
//         data.push(obj);
//     }
//     //print the 10 first objects
//     // for (var i = 0; i < 10; i++) {
//     //     console.log(data[i]);
//     // }
//     return data;
// }



// function processDataImperative (csvText) {
//     // get every line and put them in object
//     var lines = csvText.split("\n");
//     var data = [];
//     for (var i = 0; i < lines.length; i++) {
//         var line = lines[i];
//         var cells = line.split(",");
//         var website = cells[2] === "" ? null : cells[2];
//         var obj = { username: cells[0], realName: cells[1], website: website, projectName: cells[4] };
//         data.push(obj);
//     }
//     //print the 10 first objects
//     for (var i = 0; i < 10; i++) {
//         console.log(data[i]);
//     }
//     return data;
// }

// function processDataFunctionnal(csvText){
//     const lines = csvText.split("\n");
//     const data = [];
//     for (const i = 0; i < lines.length; i++) {
//         const line = lines[i];
//         const cells = line.split(",");
//         var website = cells.filter(x => x!== "")[2];
//         var obj = { username: cells[0], realName: cells[1], website: website, projectName: cells[4] };
//         data.push(obj);
//     }
//     //print the 10 first objects
//     for (var i = 0; i < 10; i++) {
//         console.log(data[i]);
//     }
//     return data;
// }


const fs = require('fs');

function processData(csvText) {
    // get every line and put them in object
    var lines = csvText.split("\n");
    var data = [];
    for (var i = 0; i < lines.length; i++) {
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
}

// Read the CSV file
fs.readFile('apache_people_projects.csv', 'utf8', (err, csvText) => {
    if (err) {
        console.error(err);
        return;
    }
    // Process the CSV data
    processData(csvText);
});



processData("apache_people_projects.csv");
// processDataImperative("apache_people_projects.csv");
// processDataFunctionnal("apache_people_projects.csv");

