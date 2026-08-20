const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const tableContainer = document.getElementById("tableContainer");

let dataLoaded = false;

loadBtn.addEventListener("click", function () {
    if (dataLoaded) {
        alert("You can only generate the data once, the program will not load again the data once it is loaded");
        return;
    }

    fetch("https://jsonplaceholder.typicode.com/todos/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load data");
            }

            return response.json();
        })
        .then(data => {
            dataLoaded = true;

            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Task ID</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(todo => {
                const status = todo.completed
                    ? `<span class="completed">Completed</span>`
                    : `<span class="not-completed">Not yet Completed</span>`;

                table += `
                    <tr>
                        <td>${todo.userId}</td>
                        <td>${todo.id}</td>
                        <td>${todo.title}</td>
                        <td>${status}</td>
                    </tr>
                `;
            });

            table += `
                    </tbody>
                </table>
            `;

            tableContainer.innerHTML = table;
        })
        .catch(error => {
            alert("Error loading data from API.");
            console.error(error);
        });
});

clearBtn.addEventListener("click", function () {
    tableContainer.innerHTML = "";
});