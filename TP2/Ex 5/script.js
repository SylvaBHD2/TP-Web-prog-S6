const fs = require('fs');

function processData(csvText) {
    // get every line and put them in object
    var lines = csvText.split("\n");
    var data = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim(); // Remove any leading/trailing spaces
        if (line === '') continue; // Skip empty lines
        var cells = line.split(",");
        //var real_name = cells[1] === "" ? null : cells[1];
        var obj = { project_name: cells[3], real_name: cells[1] }; // corrected index
        data.push(obj);
    }
    return data;    
}

contributions = processData(fs.readFileSync('./apache_people_projects.csv', 'utf8'))
/*fs.readFile('./Ex 4/apache_people_projects.csv', 'utf8', (err, csvText) => {
    if (err) {
        console.error(err);
        return;
    }


    // Process the CSV data
    const contributions = processData(fs.readFile(csvText));
});
*/
//csvText = './Ex 4/apache_people_projects.csv'
//const contributions = processData(fs.readFile(csvText));

// 1. Nom du premier projet par ordre alphabétique croissant
//const firstProjectAlphabetically = contributions
 //   .map(contribution => contribution.project_name.toLowerCase()) // Ignorer la casse
   // .sort((a, b) => a.localeCompare(b))[0]; // Tri alphabétique

const firstProjectAlphabetically = contributions
.map(contribution => contribution.project ? contribution.project.toLowerCase() : null) // Ignorer la casse
.filter(project => project !== null) // Filtre les valeurs nulles
.sort((a, b) => a.localeCompare(b))[0]; // Tri alphabétique

console.log("1. Premier projet par ordre alphabétique :", firstProjectAlphabetically);

// 2. Le nombre de contributeurs uniques
const uniqueContributors = [...new Set(contributions.map(contribution => contribution.contributor))].length;

console.log("2. Nombre de contributeurs uniques :", uniqueContributors);

// 3. La longueur moyenne du nom des contributeurs
/*
const averageNameLength = contributions
    .map(contribution => contribution.contributor)
    .reduce((acc, name) => acc + name.length, 0) / uniqueContributors; // Utiliser uniqueContributors pour éviter la redondance
*/
const averageNameLength = contributions
.filter(contribution => contribution.contributor !== undefined) // Filtrer les contributions sans contributeur
.map(contribution => contribution.contributor)
.reduce((acc, name) => acc + name.length, 0) / uniqueContributors; // Utiliser uniqueContributors pour éviter la redondance


console.log("3. Longueur moyenne des noms des contributeurs :", averageNameLength);

// 4. Nom du contributeur le plus actif (par nombre de projets)
const mostActiveContributor = Object.entries(
    contributions.reduce((acc, contribution) => {
        acc[contribution.contributor] = (acc[contribution.contributor] || 0) + 1;
        return acc;
    }, {})
).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

console.log("4. Contributeur le plus actif :", mostActiveContributor);

// 5. TOP 10 des projets les plus contribués
const topContributedProjects = Object.entries(
    contributions.reduce((acc, contribution) => {
        acc[contribution.project] = (acc[contribution.project] || 0) + 1;
        return acc;
    }, {})
)
    .sort((a, b) => b[1] - a[1]) // Tri par nombre de contributions
    .slice(0, 10) // Prendre les 10 premiers
    .map(([project]) => project);

console.log("5. TOP 10 des projets les plus contribués :", topContributedProjects);


