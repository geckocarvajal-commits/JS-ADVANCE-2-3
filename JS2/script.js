let records = [];
let editIndex = -1;

const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const insertBtn = document.getElementById("insertBtn");
const recordsDiv = document.getElementById("records");

function displayRecords() {
    if (records.length === 0) {
        recordsDiv.innerHTML = '<div class="no-records">No Records...</div>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    records.forEach((record, index) => {
        html += `
            <tr>
                <td>${record.firstName}</td>
                <td>${record.middleName}</td>
                <td>${record.lastName}</td>
                <td>${record.age}</td>
                <td>
                    <button onclick="deleteRecord(${index})">Delete</button>
                    <button onclick="editRecord(${index})">Edit</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    recordsDiv.innerHTML = html;
}

function insertRecord() {
    const first = firstName.value.trim();
    const middle = middleName.value.trim();
    const last = lastName.value.trim();
    const userAge = age.value.trim();

    if (first === "" || middle === "" || last === "" || userAge === "") {
        alert("Please complete all fields.");
        return;
    }

    if (editIndex === -1) {
        records.push({
            firstName: first,
            middleName: middle,
            lastName: last,
            age: Number(userAge)
        });
    } else {
        records[editIndex] = {
            firstName: first,
            middleName: middle,
            lastName: last,
            age: Number(userAge)
        };

        editIndex = -1;
        insertBtn.textContent = "Insert";
    }

    clearForm();
    displayRecords();
}

function clearForm() {
    firstName.value = "";
    middleName.value = "";
    lastName.value = "";
    age.value = "";

    editIndex = -1;
    insertBtn.textContent = "Insert";
}

function deleteRecord(index) {
    records.splice(index, 1);
    displayRecords();
}

function editRecord(index) {
    const record = records[index];

    firstName.value = record.firstName;
    middleName.value = record.middleName;
    lastName.value = record.lastName;
    age.value = record.age;

    editIndex = index;
    insertBtn.textContent = "Update";
}

function clearRecords() {
    records = [];
    localStorage.removeItem("records");
    clearForm();
    displayRecords();
}

function saveToLocalStorage() {
    localStorage.setItem("records", JSON.stringify(records));
    alert("Records saved to Local Storage.");
}

function sortRecords() {
    const field = document.getElementById("sortField").value;
    const order = document.getElementById("sortOrder").value;

    if (field === "" || order === "") {
        return;
    }

    records.sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];

        if (field === "age") {
            valueA = Number(valueA);
            valueB = Number(valueB);

            return order === "asc"
                ? valueA - valueB
                : valueB - valueA;
        }

        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();

        if (valueA < valueB) {
            return order === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
            return order === "asc" ? 1 : -1;
        }

        return 0;
    });

    displayRecords();
}

function loadFromLocalStorage() {
    const savedRecords = localStorage.getItem("records");

    if (savedRecords) {
        records = JSON.parse(savedRecords);
    }

    displayRecords();
}

loadFromLocalStorage();