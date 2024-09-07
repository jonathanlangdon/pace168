let totalHours = 0;
const maxHours = 168;
let isWeekly = true;

const defaultTableItems = [
  { category: 'Work', hours: null },
  { category: 'Sleep', hours: null },
  { category: 'Children', hours: null },
  { category: 'Spouse', hours: null },
  { category: 'Driving (commute, taxiing)', hours: null },
  { category: 'Personal care', hours: null },
  { category: 'Exercise', hours: null },
  { category: 'Reading', hours: null },
  { category: 'Social media', hours: null },
  { category: 'Relatives', hours: null },
  { category: 'Care for loved one', hours: null },
  { category: 'Meditation', hours: null },
  { category: 'Service', hours: null },
  { category: 'Shopping', hours: null },
  { category: 'Hobbies', hours: null },
  { category: 'Entertainment (TV, concerts, etc)', hours: null },
  { category: 'Religious services', hours: null },
  { category: 'Travel', hours: null },
  { category: 'Preparing meals, eating', hours: null },
  { category: 'Time with friends', hours: null },
  { category: 'Medical/Health Care', hours: null },
  { category: 'Vacation/Get-a-way', hours: null }
];

function createInitialTable() {
  const tableBody = document.querySelector('#categoryTable tbody');
  tableBody.innerHTML = '';

  const savedCategories = localStorage.getItem('timeCategories168');
  const categories = savedCategories
    ? JSON.parse(savedCategories)
    : defaultTableItems;

  categories.forEach(item => {
    const newRow = tableBody.insertRow();
    const categoryCell = newRow.insertCell(0);
    const hoursCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);
    categoryCell.textContent = item.category;
    if (item.hours === null) {
      hoursCell.innerHTML = `<input type="number" class="form-control" placeholder="Hours" min="0" onblur="saveRow(this)">`;
      actionCell.innerHTML = `<span class="delete-btn ml-2" onclick="deleteRow(this)">&#10006;</span>`;
    } else {
      hoursCell.textContent = item.hours;
      hoursCell.setAttribute('saved-hours', item.hours);
      actionCell.innerHTML = `<span class="delete-btn ml-2" onclick="deleteRow(this)">&#10006;</span>`;
    }

    // Add onclick event to hours cell to enable editing
    hoursCell.onclick = function () {
      editRow(this);
    };

    // Update total hours if item.hours is not null
    if (item.hours !== null) {
      totalHours += parseFloat(item.hours);
    }
  });

  updateTotalHours(totalHours);
}

function toggleInput() {
  const toggleWeekly = document.getElementById('toggleWeekly');
  const toggleDaily = document.getElementById('toggleDaily');
  const toggleSlider = document.querySelector('.toggle-slider');

  isWeekly = !isWeekly;

  if (isWeekly) {
    toggleWeekly.classList.add('selected');
    toggleDaily.classList.remove('selected');
    toggleSlider.style.left = '0';
  } else {
    toggleWeekly.classList.remove('selected');
    toggleDaily.classList.add('selected');
    toggleSlider.style.left = '50%';
  }
}

function addCategory() {
  const category = document.getElementById('categoryInput').value;
  const hoursInput = parseFloat(document.getElementById('hoursInput').value);
  const hoursPerWeek = isWeekly ? hoursInput : hoursInput * 7;

  if (category && !isNaN(hoursPerWeek)) {
    const table = document
      .getElementById('categoryTable')
      .getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const categoryCell = newRow.insertCell(0);
    const hoursCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);

    categoryCell.textContent = category;
    hoursCell.textContent = hoursPerWeek;
    hoursCell.setAttribute('saved-hours', hoursPerWeek);

    // Add onclick event to hours cell to enable editing
    hoursCell.onclick = function () {
      editRow(this);
    };

    const deleteButton = document.createElement('span');
    deleteButton.className = 'delete-btn ml-2';
    deleteButton.innerHTML = '&#10006;';
    deleteButton.onclick = function () {
      deleteRow(deleteButton);
    };

    actionCell.appendChild(deleteButton);

    totalHours += hoursPerWeek;
    updateTotalHours(totalHours);

    document.getElementById('categoryInput').value = '';
    document.getElementById('hoursInput').value = '';
  }
}

function saveRow(inputField) {
  const row = inputField.parentNode.parentNode;
  const newHours = parseFloat(inputField.value);

  if (!isNaN(newHours) && newHours >= 0) {
    totalHours -= parseFloat(row.cells[1].getAttribute('saved-hours')) || 0;
    row.cells[1].innerHTML = newHours;
    row.cells[1].setAttribute('saved-hours', newHours);
    totalHours += newHours;
    updateTotalHours(totalHours);

    // Re-enable editing on cell click
    row.cells[1].onclick = function () {
      editRow(this);
    };
  }
}

function editRow(cell) {
  const hours = parseFloat(cell.innerHTML);
  cell.innerHTML = `<input type="number" class="form-control" value="${hours}" min="0" onblur="saveRow(this)">`;
  cell.onclick = null; // Remove the onclick to prevent further edits while editing
}

let rowToDelete; // Variable to store the row to be deleted

function deleteRow(button) {
  rowToDelete = button.parentNode.parentNode; // Store the row to be deleted
  $('#deleteModal').modal('show'); // Show the modal
}

function updateTotalHours(newTotalHours) {
  const totalHoursElement = document.getElementById('totalHours');
  const fillMeter = document.getElementById('fillMeter');

  gsap.to(totalHoursElement, {
    duration: 2,
    innerHTML: newTotalHours,
    roundProps: 'innerHTML',
    onUpdate: function () {
      totalHoursElement.innerText =
        Math.round(this.targets()[0].innerText) + '/168 Hours Used';
    }
  });

  const fillPercentage = Math.min((newTotalHours / maxHours) * 100, 100);
  fillMeter.style.width = fillPercentage + '%';
  fillMeter.style.backgroundColor = newTotalHours > maxHours ? 'red' : 'green';
}

function saveCategories() {
  const tableBody = document.querySelector('#categoryTable tbody');
  const rows = tableBody.rows;
  const categories = [];

  for (let i = 0; i < rows.length; i++) {
    const category = rows[i].cells[0].textContent;
    const hours = parseFloat(rows[i].cells[1].getAttribute('saved-hours'));

    categories.push({
      category: category,
      hours: isNaN(hours) ? null : hours
    });
  }

  localStorage.setItem('timeCategories168', JSON.stringify(categories));
  $('#successModal').modal('show'); // Show the success modal
}

function restoreDefaults() {
  $('#restoreDefaultsModal').modal('show');
}
function isSafari() {
  return (
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor)
  );
}

function downloadPDF() {
  const element = document.getElementById('categoryTableContainer');

  if (isSafari()) {
    const opt = {
      margin: 0.5,
      filename: '168_hours_calculator.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  } else {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Your 168 Hours Calculator', 14, 20);

    // Add total hours
    doc.setFontSize(14);
    doc.text(`Total Hours: ${totalHours}/168`, 14, 30);

    // Add table
    const table = document.getElementById('categoryTable');
    const tableData = [];
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      tableData.push([row.cells[0].textContent, row.cells[1].textContent]);
    }

    doc.autoTable({
      startY: 40,
      head: [['Category', 'Hours/Week']],
      body: tableData
    });

    // Save the PDF
    doc.save('168_hours_calculator.pdf');
  }
}

// Event Listeners

document
  .getElementById('confirmRestoreDefaultsButton')
  .addEventListener('click', function () {
    localStorage.removeItem('timeCategories168'); // Remove the saved categories from local storage
    totalHours = 0; // Reset totalHours to 0
    createInitialTable(); // Re-run createInitialTable to restore defaults
    $('#restoreDefaultsModal').modal('hide'); // Hide the modal
  });

document
  .getElementById('confirmDeleteButton')
  .addEventListener('click', function () {
    const hours = parseFloat(rowToDelete.cells[1].textContent);

    if (!isNaN(hours) && hours > 0) {
      totalHours -= hours;
      updateTotalHours(totalHours);
    }
    rowToDelete.remove();
    $('#deleteModal').modal('hide'); // Hide the modal
  });
