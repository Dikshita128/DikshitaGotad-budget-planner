let balance = 0;
const balanceDisplay = document.getElementById('balance');
const historyList = document.getElementById('history');

function addIncome() {
  const income = parseFloat(document.getElementById('income').value);
  if (!isNaN(income) && income > 0) {
    balance += income;
    updateDisplay(`+ ₹${income}`, "green");
  }
  document.getElementById('income').value = '';
}

function addExpense() {
  const expense = parseFloat(document.getElementById('expense').value);
  if (!isNaN(expense) && expense > 0) {
    balance -= expense;
    updateDisplay(`- ₹${expense}`, "red");
  }
  document.getElementById('expense').value = '';
}

function updateDisplay(text, color) {
  balanceDisplay.textContent = balance;
  const li = document.createElement('li');
  li.textContent = text;
  li.style.color = color;
  historyList.prepend(li);
}
<script>
  function calculateBalance() {
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);

    if (isNaN(income) || isNaN(expenses)) {
      document.getElementById('result').innerText = "Please enter valid numbers!";
      return;
    }

    const balance = income - expenses;
    const date = new Date().toLocaleDateString();

    document.getElementById('result').innerText = `Remaining Balance: ₹${balance}`;

    // Add row to report table
    const table = document.getElementById('reportBody');
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = date;
    newRow.insertCell(1).innerText = income;
    newRow.insertCell(2).innerText = expenses;
    newRow.insertCell(3).innerText = balance;
  }
</script>
function clearAllData() {
  localStorage.removeItem('financeData');
  document.getElementById('reportBody').innerHTML = '';
  document.getElementById('result').innerText = '';
}
updateChart(savedData);
updateChart(savedData);
const entry = {
  date: dateInput.value,
  amount: amountInput.value,
  category: document.getElementById("category").value,
  description: descriptionInput.value
};
const row = tableBody.insertRow();
row.innerHTML = `
  <td>${entry.date}</td>
  <td>${entry.amount}</td>
  <td>${entry.category}</td>
  <td>${entry.description}</td>
`;
const row = tableBody.insertRow();
row.innerHTML = `
  <td>${entry.date}</td>
  <td>${entry.amount}</td>
  <td>${entry.category}</td>
  <td>${entry.description}</td>
  <td>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </td>
`;
document.querySelectorAll(".delete-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    renderTable(); // Re-render the table
  });
});
document.querySelectorAll(".edit-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const entry = entries[index];

    // Fill form with selected entry
    dateInput.value = entry.date;
    amountInput.value = entry.amount;
    descriptionInput.value = entry.description;
    document.getElementById("category").value = entry.category;

    // Remove current entry temporarily
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    renderTable(); // Re-render table
  });
});
function renderMonthlySummary() {
  const summary = {};
  entries.forEach(entry => {
    const month = entry.date.slice(0, 7); // "YYYY-MM"
    summary[month] = (summary[month] || 0) + parseFloat(entry.amount);
  });

  const summaryElement = document.getElementById("monthly-summary");
  summaryElement.innerHTML = ""; // Clear before update

  for (const month in summary) {
    const li = document.createElement("li");
    li.textContent = `${month}: ₹${summary[month].toFixed(2)}`;
    summaryElement.appendChild(li);
  }
}
function renderTable() {
  tableBody.innerHTML = "";
  entries.forEach((entry, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.amount}</td>
      <td>${entry.category}</td>
      <td>${entry.description}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
  });

  // Re-bind buttons
  bindDeleteButtons();
  bindEditButtons();

  // Render monthly summary
  renderMonthlySummary();
}
document.getElementById("export-btn").addEventListener("click", () => {
  if (entries.length === 0) return;

  const header = "Date,Amount,Category,Description\n";
  const rows = entries.map(entry =>
    `${entry.date},${entry.amount},${entry.category},${entry.description}`
  );
  const csvContent = header + rows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "monthly_report.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
let chartInstance = null;

function renderMonthlyChart() {
  const summary = {};
  entries.forEach(entry => {
    const month = entry.date.slice(0, 7); // YYYY-MM
    summary[month] = (summary[month] || 0) + parseFloat(entry.amount);
  });

  const labels = Object.keys(summary);
  const data = Object.values(summary);

  const ctx = document.getElementById("monthlyChart").getContext("2d");

  if (chartInstance) chartInstance.destroy(); // Refresh chart

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Monthly Expenses (₹)',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => `₹${value}`
          }
        }
      }
    }
  });
}
renderMonthlySummary();
renderMonthlyChart();
const PASSWORD = "admin123"; // Change this to your password

function requestPassword() {
  let attempts = 3;
  while (attempts > 0) {
    const input = prompt("Enter password to access the Monthly Report:");
    if (input === PASSWORD) return true;
    attempts--;
    alert(`Wrong password. ${attempts} attempts left.`);
  }
  document.body.innerHTML = "<h2>Access Denied ❌</h2>";
  throw new Error("Unauthorized Access");
}

requestPassword(); // Require password at page load
