document.addEventListener('DOMContentLoaded', () => {
    async function addStudent() {
        const name = document.getElementById('name').value.trim();
        const assessments = document.getElementById('assessments').value.split(',').map(Number);
        const exam = parseInt(document.getElementById('exam').value.trim(), 10);

        if (!name || assessments.some(isNaN) || isNaN(exam)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        try {
            const response = await fetch('/add_student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, assessments, exam })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Display the result in an alert
            alert(`Student added successfully!\n\nName: ${result[0].Name}\nAssessments: ${result[0].Assessments.map(a => a.score).join(', ')}\nExam: ${result[0].Exam}\nFinal Score: ${result[0]['Final Score']}\nResult: ${result[0].Result}`);

        } catch (error) {
            console.error('Error adding student:', error);
            alert('Error adding student: ' + error.message);
        }
    }

    async function viewRecords() {
        try {
            const response = await fetch('/view_records');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the JSON response
            const records = await response.json();

            console.log('Records fetched from server:', records); // Debugging line

            const tableBody = document.querySelector('#studentTable tbody');
            tableBody.innerHTML = ''; // Clear existing content

            // Check if records is an array and has data
            if (Array.isArray(records) && records.length > 0) {
                records.forEach(student => {
                    const row = document.createElement('tr');

                    // Create table cells for student data
                    const nameCell = document.createElement('td');
                    nameCell.textContent = student[0].Name || 'N/A'; // Match the exact key name

                    const assessmentsCell = document.createElement('td');
                    assessmentsCell.textContent = student[0].Assessments ? student[0].Assessments.map(a => a.score).join(', ') : 'N/A';

                    const examCell = document.createElement('td');
                    examCell.textContent = student[0].Exam !== undefined ? student[0].Exam : 'N/A';

                    const finalScoreCell = document.createElement('td');
                    finalScoreCell.textContent = student[0]['Final Score'] !== undefined ? student[0]['Final Score'] : 'N/A';

                    const resultCell = document.createElement('td');
                    resultCell.textContent = student[0].Result || 'N/A';

                    // Append cells to row
                    row.appendChild(nameCell);
                    row.appendChild(assessmentsCell);
                    row.appendChild(examCell);
                    row.appendChild(finalScoreCell);
                    row.appendChild(resultCell);

                    // Append row to table body
                    tableBody.appendChild(row);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="5">No records found</td></tr>';
            }
        } catch (error) {
            console.error('Error viewing records:', error);
            document.getElementById('result').innerText = 'Error viewing records: ' + error.message;
        }
    }




    async function findStudent() {
        const name = document.getElementById('find-name').value.trim();

        if (!name) {
            document.getElementById('result').innerText = 'Please enter a student name.';
            return;
        }

        try {
            const response = await fetch(`/find_student/${name}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            console.log('Student found:', result); // Debugging line

            const tableBody = document.querySelector('#studentTable tbody');
            tableBody.innerHTML = ''; // Clear existing content

            // Check if result has the expected data
            if (result.Name) {
                const row = document.createElement('tr');

                // Create table cells for student data
                const nameCell = document.createElement('td');
                nameCell.textContent = result.Name || 'N/A';

                const assessmentsCell = document.createElement('td');
                assessmentsCell.textContent = result.Assessments ? result.Assessments.map(a => a.score).join(', ') : 'N/A';

                const examCell = document.createElement('td');
                examCell.textContent = result.Exam !== undefined ? result.Exam : 'N/A';

                const finalScoreCell = document.createElement('td');
                finalScoreCell.textContent = result['Final Score'] !== undefined ? result['Final Score'] : 'N/A';

                const resultCell = document.createElement('td');
                resultCell.textContent = result.Result || 'N/A';

                // Append cells to row
                row.appendChild(nameCell);
                row.appendChild(assessmentsCell);
                row.appendChild(examCell);
                row.appendChild(finalScoreCell);
                row.appendChild(resultCell);

                // Append row to table body
                tableBody.appendChild(row);
            } else {
                tableBody.innerHTML = '<tr><td colspan="5">No record found for the given name.</td></tr>';
            }
        } catch (error) {
            console.error('Error finding student:', error);
            document.getElementById('result').innerText = 'Error finding student: ' + error.message;
        }
    }


    // Attach functions to global scope if needed
    window.addStudent = addStudent;
    window.viewRecords = viewRecords;
    window.findStudent = findStudent;
});
