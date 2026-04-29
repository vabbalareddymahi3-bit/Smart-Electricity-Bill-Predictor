let appliances = [];

function addAppliance() {
    let name = document.getElementById("appliance").value;
    let watt = document.getElementById("watt").value;
    let hours = document.getElementById("hours").value;

    let units = (watt * hours * 30) / 1000;
    let bill = units * 6;

    appliances.push({
        name: name,
        units: units,
        bill: bill
    });

    document.getElementById("applianceList").innerHTML +=
    `${name} - ₹${bill.toFixed(2)} <br>`;
}

function calculateBill() {
    let totalBill = 0;

    appliances.forEach(item => {
        totalBill += item.bill;
    });

    let suggestion = "";

if(totalBill > 3000){
    suggestion = "⚠ High electricity usage! Reduce AC usage.";
}
else if(totalBill > 1500){
    suggestion = "💡 Moderate usage. Switch to LED bulbs.";
}
else{
    suggestion = "✅ Great! Your electricity usage is efficient.";
}

document.getElementById("result").innerHTML =
`
Total Monthly Bill: ₹${totalBill.toFixed(2)} <br>
${suggestion}
`;

let nextMonthBill = totalBill * 1.10;

document.getElementById("futurePrediction").innerHTML =
`

📈 Estimated Next Month Bill: ₹${nextMonthBill.toFixed(2)}
`;

let totalUnits = appliances.reduce((sum,item) => sum + item.units, 0);

let carbon = totalUnits * 0.82;

document.getElementById("carbonEmission").innerHTML =
`
🌍 Carbon Emission: ${carbon.toFixed(2)} kg CO₂
`;

let highest = appliances.reduce((a,b) => a.bill > b.bill ? a : b);
let lowest = appliances.reduce((a,b) => a.bill < b.bill ? a : b);

document.getElementById("applianceRanking").innerHTML =
`
⚡ Highest Consumer: ${highest.name} <br>
💡 Lowest Consumer: ${lowest.name}
`;
let labels = appliances.map(item => item.name);
let bills = appliances.map(item => item.bill);

if(window.myChart){
    window.myChart.destroy();
}

window.myChart = new Chart(document.getElementById("billChart"), {
    type: "bar",
    data: {
        labels: labels,
        datasets: [{
            label: "Appliance Bill Cost",
            data: bills
        }]
    }
});
}

function saveBill(){

    let currentBill = document.getElementById("result").innerText;

    document.getElementById("historyList").innerHTML +=
    currentBill + "<br><br>";

    alert("Bill saved successfully!");
}

function toggleTheme(){
    document.body.classList.toggle("dark-mode");

    let themeBtn = document.getElementById("themeBtn");

    if(document.body.classList.contains("dark-mode")){
        themeBtn.innerHTML = "☀ Light Mode";
    }
    else{
        themeBtn.innerHTML = "🌙 Dark Mode";
    }
}

function resetData(){
    appliances = [];

document.getElementById("applianceRanking").innerHTML = "";

document.getElementById("futurePrediction").innerHTML = "";

document.getElementById("carbonEmission").innerHTML = "";

    document.getElementById("applianceList").innerHTML = "";
    
    document.getElementById("result").innerHTML = "";
    
    document.getElementById("appliance").value = "";
    document.getElementById("watt").value = "";
    document.getElementById("hours").value = "";

    if(window.myChart){
        window.myChart.destroy();
    }

    alert("Data Reset Successfully!");
}
