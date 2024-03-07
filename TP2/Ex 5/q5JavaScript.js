const fs = require('fs');

function processData(csvText) {
    // Convertir le CSV en tableau de lignes
    const lines = csvText.split('\n');

    // Supprimer l'en-tête du CSV
    const headers = lines.shift().split(',');

    // Fonction pour normaliser les noms
    const normalizeName = (name) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Fonction pour calculer la longueur moyenne des noms
    const averageNameLength = (names) => {
        const totalLength = names.reduce((acc, name) => acc + name.length, 0);
        return totalLength / names.length;
    };

    // Convertir le CSV en tableau d'objets
    const data = lines.map(line => {
        const values = line.split(',');
        const entry = {};
        headers.forEach((header, index) => {
            entry[header.trim()] = values[index].trim();
        });
        return entry;
    });

    // 1. Nom du premier projet par ordre alphabétique croissant
    const firstProject = data.map(entry => entry['Project']).sort((a, b) => normalizeName(a).localeCompare(normalizeName(b)))[0];

    // 2. Le nombre de contributeurs uniques
    const uniqueContributors = [...new Set(data.map(entry => entry['Contributor']))].length;

    // 3. La longueur moyenne du nom des contributeurs
    const contributorsNames = [...new Set(data.map(entry => entry['Contributor']))];
    const avgNameLength = averageNameLength(contributorsNames);

    // 4. Nom du contributeur le plus actif (par nombre de projets)
    const contributorActivity = data.reduce((acc, entry) => {
        acc[entry['Contributor']] = (acc[entry['Contributor']] || 0) + 1;
        return acc;
    }, {});
    const mostActiveContributor = Object.keys(contributorActivity).reduce((a, b) => contributorActivity[a] > contributorActivity[b] ? a : b);

    // 5. TOP 10 des projets les plus contribués
    const topProjects = data.reduce((acc, entry) => {
        acc[entry['Project']] = (acc[entry['Project']] || 0) + 1;
        return acc;
    }, {});
    const top10Projects = Object.keys(topProjects).sort((a, b) => topProjects[b] - topProjects[a]).slice(0, 10);

    // Afficher les résultats dans la console
    console.log("1. Nom du premier projet par ordre alphabétique croissant:", firstProject);
    console.log("2. Le nombre de contributeurs uniques:", uniqueContributors);
    console.log("3. La longueur moyenne du nom des contributeurs:", avgNameLength);
    console.log("4. Nom du contributeur le plus actif:", mostActiveContributor);
    console.log("5. TOP 10 des projets les plus contribués:", top10Projects);
}

fs.readFile('./apache_people_projects.csv', 'utf8', (err, csvText) => {
    if (err) {
        console.error(err);
        return;
    }
    // Process the CSV data
    processData(csvText);
});