// Modules to handle file operations
const fs = require('fs');
const path = require('path');

// Define file paths
const FILE_PATH = path.join(__dirname, 'university.json');
const BACKUP_PATH = path.join(__dirname, 'university_backup.json');

// Read data from the JSON file
function readData() {
    try {
        const rawData = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error("Couldn't read the file:", err.message);
        throw err;
    }
}

// Write data back to the JSON file
function writeData(data) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error("Failed to write data:", err.message);
        throw err;
    }
}

// Backup the current file before making changes
function createBackup() {
    try {
        fs.copyFileSync(FILE_PATH, BACKUP_PATH);
        console.log("Backup successfully created.");
    } catch (err) {
        console.error("Backup failed:", err.message);
        throw err;
    }
}

// Add a new entry (professor or student) to a department
function addEntry(departmentName, type, entry) {
    createBackup(); // Always back up before modifying data
    const data = readData();

    const department = data.university.departments.find(d => d.name === departmentName);
    if (!department) {
        console.error(`Department "${departmentName}" not found.`);
        return;
    }

    if (type === "professors" || type === "students") {
        department[type].push(entry);
        console.log(`Added new ${type.slice(0, -1)}:`, entry);
    } else {
        console.error("Invalid type. Use 'professors' or 'students'.");
    }

    writeData(data);
}

// Update an existing entry by ID
function updateEntry(departmentName, type, id, updatedData) {
    createBackup();
    const data = readData();

    const department = data.university.departments.find(d => d.name === departmentName);
    if (!department) {
        console.error(`Department "${departmentName}" not found.`);
        return;
    }

    const entry = department[type]?.find(item => item.id === id);
    if (!entry) {
        console.error(`No ${type.slice(0, -1)} found with ID ${id}.`);
        return;
    }

    Object.assign(entry, updatedData);
    console.log(`Updated ${type.slice(0, -1)} with ID ${id}:`, updatedData);

    writeData(data);
}

// Delete an entry by ID
function deleteEntry(departmentName, type, id) {
    createBackup();
    const data = readData();

    const department = data.university.departments.find(d => d.name === departmentName);
    if (!department) {
        console.error(`Department "${departmentName}" not found.`);
        return;
    }

    const index = department[type]?.findIndex(item => item.id === id);
    if (index === -1 || index === undefined) {
        console.error(`No ${type.slice(0, -1)} found with ID ${id}.`);
        return;
    }

    department[type].splice(index, 1);
    console.log(`Deleted ${type.slice(0, -1)} with ID ${id}.`);

    writeData(data);
}

// Search for entries with a specific key-value pair
function searchEntry(key, value) {
    const data = readData();
    const results = [];

    function deepSearch(obj) {
        if (typeof obj !== 'object' || obj === null) return;
        for (const [k, v] of Object.entries(obj)) {
            if (k === key && v === value) results.push(obj);
            if (typeof v === 'object') deepSearch(v);
        }
    }

    deepSearch(data);
    if (results.length > 0) {
        console.log("Search results:", results);
    } else {
        console.log(`No matches found for ${key} = ${value}.`);
    }
}

// Example usage

// Add a new professor to the "Computer Science and Engineering" department
addEntry("Computer Science and Engineering", "professors", { name: "Dr. Manoj Soni", id: 104 });

// Update the name of a student in the "Mechanical Engineering" department
updateEntry("Mechanical Engineering", "students", 1003, { name: "Ravi Reddy" });

// Remove a professor from the "Computer Science and Engineering" department by their ID
deleteEntry("Computer Science and Engineering", "professors", 101);

// Search for any entry (professor or student) with the name "Ravi Reddy"
searchEntry("name", "Ravi Reddy");
