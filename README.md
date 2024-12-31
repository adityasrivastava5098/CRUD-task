

# University Management System 
###### (ADS-CRUD-Task)



A Node.js application to manage university data, including CRUD operations for departments, professors, and students stored in a JSON file.

## Features
- **Add Entries**: Add professors or students to a specific department.
- **Update Entries**: Modify existing records using unique IDs.
- **Delete Entries**: Remove professors or students by their ID.
- **Search Entries**: Look for records based on key-value pairs.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/adityasrivastava5098/crud-task
   cd crud-task
   ```
2. Install Node.js if not already installed.
3. Place a `university.json` file in the project directory with the required structure:
   ```json
   {
     "university": {
       "departments": [
         {
           "name": "Computer Science and Engineering",
           "professors": [],
           "students": []
         }
       ]
     }
   }
   ```
4. Run the application using:
   ```bash
   node index.js
   ```

## Usage
### Add Entry
Add a professor or student to a department:
```js
addEntry("Computer Science and Engineering", "professors", { name: "Dr. Manoj Soni", id: 104 });
```

### Update Entry
Update an existing record by ID:
```js
updateEntry("Mechanical Engineering", "students", 1003, { name: "Ravi Reddy" });
```

### Delete Entry
Remove a professor or student by ID:
```js
deleteEntry("Computer Science and Engineering", "professors", 101);
```

### Search Entry
Find records by key-value pair:
```js
searchEntry("name", "Ravi Reddy");
```

## Dependencies
No external dependencies required. Uses Node.js core modules (`fs`, `path`).

## Notes
- Always ensure `university.json` exists with the correct structure.
- The application creates a backup (`university_backup.json`) before modifying the data.

