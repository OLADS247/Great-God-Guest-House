/*==================================================
        HOTEL MANAGEMENT SYSTEM
        SHARED JAVASCRIPT
        PART 1
==================================================*/


"use strict";


/*==================================================
GLOBAL SELECTORS
==================================================*/

const sidebar = document.querySelector(".sidebar");

const menuButton = document.querySelector(".menu-btn");

const modals = document.querySelectorAll(".modal");

const cards = document.querySelectorAll(".card");

const counterElements = document.querySelectorAll("[data-counter]");


/*==================================================
ACTIVE SIDEBAR LINK
==================================================*/

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar nav a").forEach(link=>{

    const href = link.getAttribute("href");

    if(href===currentPage){

        link.classList.add("active");

    }

    else{

        link.classList.remove("active");

    }

});


/*==================================================
SIDEBAR TOGGLE
==================================================*/

function toggleSidebar(){

    sidebar.classList.toggle("show");

}


if(menuButton){

    menuButton.addEventListener("click",toggleSidebar);

}


/*==================================================
CLOSE SIDEBAR ON MOBILE
==================================================*/

document.addEventListener("click",function(e){

    if(window.innerWidth>768) return;

    if(!sidebar) return;

    if(!sidebar.contains(e.target) &&

       menuButton &&

       !menuButton.contains(e.target)){

        sidebar.classList.remove("show");

    }

});


/*==================================================
MODAL FUNCTIONS
==================================================*/

function openModal(id){

    const modal=document.getElementById(id);

    if(modal){

        modal.classList.add("active");

    }

}


function closeModal(id){

    const modal=document.getElementById(id);

    if(modal){

        modal.classList.remove("active");

    }

}


modals.forEach(modal=>{

    modal.addEventListener("click",function(e){

        if(e.target===modal){

            modal.classList.remove("active");

        }

    });

});


/*==================================================
TOAST NOTIFICATION
==================================================*/

function showToast(message,type="success"){

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}


/*==================================================
LOADING SPINNER
==================================================*/

function showLoader(){

    const loader=document.createElement("div");

    loader.className="spinner";

    loader.id="loader";

    document.body.appendChild(loader);

}


function hideLoader(){

    const loader=document.getElementById("loader");

    if(loader){

        loader.remove();

    }

}


/*==================================================
CONFIRM ACTION
==================================================*/

function confirmAction(message){

    return confirm(message);

}


/*==================================================
LIVE DATE & TIME
==================================================*/

function updateClock(){

    const clock=document.getElementById("liveClock");

    if(!clock) return;

    const now=new Date();

    clock.innerHTML=now.toLocaleString();

}

setInterval(updateClock,1000);


/*==================================================
COUNTER ANIMATION
==================================================*/

function animateCounter(element,target){

    let count=0;

    const speed=target/100;

    const update=()=>{

        count+=speed;

        if(count<target){

            element.innerHTML=Math.floor(count);

            requestAnimationFrame(update);

        }

        else{

            element.innerHTML=target;

        }

    };

    update();

}


counterElements.forEach(counter=>{

    animateCounter(counter,

    Number(counter.dataset.counter));

});


/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==================================================
PAGE LOADER
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


/*==================================================
UTILITY FUNCTIONS
==================================================*/

function formatCurrency(amount){

    return "₦"+Number(amount).toLocaleString();

}


function formatDate(date){

    return new Date(date).toLocaleDateString();

}


function randomID(){

    return Math.floor(Math.random()*1000000);

}


/*==================================================
DELETE BUTTONS
==================================================*/

document.querySelectorAll(".delete-btn").forEach(btn=>{

    btn.addEventListener("click",function(){

        if(confirmAction("Delete this record?")){

            showToast("Record deleted.","success");

        }

    });

});


/*==================================================
SUCCESS MESSAGE DEMO
==================================================*/

console.log("Hotel Management System Loaded Successfully");


/*==================================================
END OF PART 1
==================================================*/
/*==================================================
        HOTEL MANAGEMENT SYSTEM
        SHARED JAVASCRIPT
        PART 2
==================================================*/


"use strict";


/*==================================================
HOTEL DATA (TEMPORARY)

Replace with database/API later
==================================================*/

const hotelData = {

    totalRooms:50,

    occupiedRooms:18,

    availableRooms:32,

    todayBookings:6,

    checkOuts:3,

    guests:24,

    reservations:11,

    cancelled:1,

    revenueToday:450000,

    pendingPayments:120000

};


/*==================================================
UPDATE DASHBOARD CARDS
==================================================*/

function updateDashboard(){

    setValue("totalRooms",hotelData.totalRooms);

    setValue("occupiedRooms",hotelData.occupiedRooms);

    setValue("availableRooms",hotelData.availableRooms);

    setValue("todayBookings",hotelData.todayBookings);

    setValue("checkOuts",hotelData.checkOuts);

    setValue("currentGuests",hotelData.guests);

    setValue("reservations",hotelData.reservations);

    setValue("pendingPayments",

    formatCurrency(hotelData.pendingPayments));

    setValue("todayRevenue",

    formatCurrency(hotelData.revenueToday));

}


function setValue(id,value){

    const el=document.getElementById(id);

    if(el){

        el.innerHTML=value;

    }

}


updateDashboard();


/*==================================================
ROOM OCCUPANCY
==================================================*/

function occupancyRate(){

    const rate=

    (hotelData.occupiedRooms/

    hotelData.totalRooms)*100;

    return Math.round(rate);

}


const occupancy=document.getElementById("occupancyRate");

if(occupancy){

    occupancy.innerHTML=

    occupancyRate()+"%";

}


/*==================================================
CHECK IN
==================================================*/

function checkIn(){

    hotelData.occupiedRooms++;

    hotelData.availableRooms--;

    hotelData.guests++;

    updateDashboard();

    showToast("Guest Checked In");

}


/*==================================================
CHECK OUT
==================================================*/

function checkOut(){

    hotelData.occupiedRooms--;

    hotelData.availableRooms++;

    hotelData.guests--;

    hotelData.checkOuts++;

    updateDashboard();

    showToast("Guest Checked Out");

}


/*==================================================
NEW BOOKING
==================================================*/

function addBooking(amount){

    hotelData.todayBookings++;

    hotelData.revenueToday+=amount;

    updateDashboard();

    showToast("Booking Created");

}


/*==================================================
NEW RESERVATION
==================================================*/

function addReservation(){

    hotelData.reservations++;

    updateDashboard();

}


/*==================================================
PAYMENT
==================================================*/

function recordPayment(amount){

    hotelData.revenueToday+=amount;

    hotelData.pendingPayments-=amount;

    updateDashboard();

    showToast("Payment Recorded");

}


/*==================================================
SEARCH TABLE
==================================================*/

function searchTable(inputID,tableID){

    const input=

    document.getElementById(inputID);

    const table=

    document.getElementById(tableID);

    if(!input||!table) return;

    input.addEventListener("keyup",()=>{

        const value=

        input.value.toLowerCase();

        table.querySelectorAll("tbody tr")

        .forEach(row=>{

            row.style.display=

            row.innerText.toLowerCase()

            .includes(value)

            ? ""

            : "none";

        });

    });

}


/*==================================================
LIVE GREETING
==================================================*/

function greeting(){

    const hour=

    new Date().getHours();

    let text="";

    if(hour<12){

        text="Good Morning";

    }

    else if(hour<18){

        text="Good Afternoon";

    }

    else{

        text="Good Evening";

    }

    const greet=

    document.getElementById("greeting");

    if(greet){

        greet.innerHTML=text;

    }

}

greeting();


/*==================================================
AUTO REFRESH DASHBOARD
==================================================*/

setInterval(()=>{

    updateDashboard();

},5000);


/*==================================================
REVENUE CHART
Requires Chart.js
==================================================*/

const chartCanvas=

document.getElementById("revenueChart");

if(chartCanvas && typeof Chart!=="undefined"){

new Chart(chartCanvas,{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Revenue",

data:[

150000,

180000,

240000,

350000,

290000,

420000,

450000

],

borderWidth:3,

fill:false,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:true

}

}

}

});

}


/*==================================================
RECENT ACTIVITY
==================================================*/

const activity=[];

function addActivity(message){

    activity.unshift({

        text:message,

        time:new Date()

        .toLocaleTimeString()

    });

}


/*==================================================
SIMULATION
==================================================*/

setTimeout(()=>{

    addActivity("System Started");

},1000);


/*==================================================
END OF PART 2
==================================================*/

/*==================================================
        HOTEL MANAGEMENT SYSTEM
        PART 3
        INTERACTIVE FEATURES
==================================================*/

"use strict";


/*==================================================
LOCAL STORAGE SETUP
==================================================*/

function saveData(){

    localStorage.setItem(
        "hotelData",
        JSON.stringify(hotelData)
    );

}

function loadData(){

    const saved =
    localStorage.getItem("hotelData");

    if(saved){

        const parsed = JSON.parse(saved);

        Object.assign(hotelData, parsed);

    }

}

loadData();
updateDashboard();


/*==================================================
FORM VALIDATION HELPERS
==================================================*/

function getInput(id){

    return document.getElementById(id);

}

function getValue(id){

    const el = document.getElementById(id);

    return el ? el.value.trim() : "";

}

function showError(message){

    showToast("❌ " + message);

}


/*==================================================
BOOKING CREATION (REAL INPUT BASED)
==================================================*/

function createBooking(){

    const name = getValue("guestName");

    const room = getValue("roomNumber");

    const amount = parseFloat(getValue("amount"));

    if(!name || !room || isNaN(amount)){

        showError("Please fill all booking fields correctly");

        return;

    }

    hotelData.todayBookings++;

    hotelData.revenueToday += amount;

    hotelData.guests++;

    hotelData.occupiedRooms++;

    hotelData.availableRooms--;

    addActivity(`Booking created for ${name} (Room ${room})`);

    saveData();

    updateDashboard();

    showToast("Booking Successful ✅");

}


/*==================================================
RESERVATION CREATION
==================================================*/

function createReservation(){

    const name = getValue("resName");

    const date = getValue("resDate");

    if(!name || !date){

        showError("Reservation fields cannot be empty");

        return;

    }

    hotelData.reservations++;

    addActivity(`Reservation made by ${name} for ${date}`);

    saveData();

    updateDashboard();

    showToast("Reservation Added");

}


/*==================================================
GUEST REGISTRATION
==================================================*/

function registerGuest(){

    const name = getValue("guestRegName");

    const phone = getValue("guestPhone");

    if(!name || !phone){

        showError("Enter guest name and phone");

        return;

    }

    hotelData.guests++;

    addActivity(`Guest registered: ${name}`);

    saveData();

    updateDashboard();

    showToast("Guest Registered");

}


/*==================================================
ROOM MANAGEMENT
==================================================*/

function addRoom(){

    hotelData.totalRooms++;

    hotelData.availableRooms++;

    addActivity("New room added to system");

    saveData();

    updateDashboard();

    showToast("Room Added");

}

function removeRoom(){

    if(hotelData.availableRooms <= 0){

        showError("No available rooms to remove");

        return;

    }

    hotelData.totalRooms--;

    hotelData.availableRooms--;

    addActivity("Room removed from system");

    saveData();

    updateDashboard();

    showToast("Room Removed");

}


/*==================================================
DELETE / RESET ACTIONS
==================================================*/

function resetSystem(){

    if(!confirm("Reset all hotel data?")) return;

    localStorage.removeItem("hotelData");

    location.reload();

}


/*==================================================
TABLE SORTING (BASIC)
==================================================*/

function sortTable(tableID, colIndex){

    const table = document.getElementById(tableID);

    if(!table) return;

    const rows = Array.from(
        table.querySelectorAll("tbody tr")
    );

    const asc = table.dataset.sort !== "asc";

    rows.sort((a, b) => {

        const A = a.children[colIndex].innerText.toLowerCase();

        const B = b.children[colIndex].innerText.toLowerCase();

        return asc
        ? A.localeCompare(B)
        : B.localeCompare(A);

    });

    table.dataset.sort = asc ? "asc" : "desc";

    rows.forEach(row => table.querySelector("tbody").appendChild(row));

}


/*==================================================
CSV EXPORT (SIMULATED)
==================================================*/

function exportCSV(){

    let csv = "Metric,Value\n";

    for(const key in hotelData){

        csv += `${key},${hotelData[key]}\n`;

    }

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "hotel_data.csv";

    a.click();

    showToast("CSV Exported");

}


/*==================================================
PRINT RECEIPT
==================================================*/

function printReceipt(){

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`

        <html>
        <head>
        <title>Receipt</title>
        </head>

        <body style="font-family:Arial;padding:20px;">

            <h2>Hotel Receipt</h2>
            <hr>

            <p>Total Revenue: ₦${hotelData.revenueToday}</p>
            <p>Bookings Today: ${hotelData.todayBookings}</p>
            <p>Guests: ${hotelData.guests}</p>

            <hr>
            <p>Thank you for using our system</p>

        </body>
        </html>

    `);

    printWindow.document.close();

    printWindow.print();

}


/*==================================================
AUTO SAVE LOOP
==================================================*/

setInterval(() => {

    saveData();

}, 10000);


/*==================================================
END OF PART 3
==================================================*/    

/*==================================================
        HOTEL MANAGEMENT SYSTEM
        PART 4
        FINAL UPGRADE LAYER
==================================================*/

"use strict";


/*==================================================
ROLE SYSTEM (SIMULATED)
==================================================*/

let currentUserRole = "admin"; 
// admin | manager | receptionist


function hasAccess(role){

    const hierarchy = {
        admin: 3,
        manager: 2,
        receptionist: 1
    };

    return hierarchy[currentUserRole] >= hierarchy[role];

}

function restrictUI(){

    if(!hasAccess("admin")){

        document.querySelectorAll(".admin-only")
        .forEach(el => el.style.display = "none");

    }

    if(!hasAccess("manager")){

        document.querySelectorAll(".manager-only")
        .forEach(el => el.style.display = "none");

    }

}

restrictUI();


/*==================================================
NOTIFICATION SYSTEM (QUEUE BASED)
==================================================*/

const notifications = [];

function pushNotification(type, message){

    notifications.push({
        type,
        message,
        time: new Date().toLocaleTimeString()
    });

    renderNotifications();

}

function renderNotifications(){

    const box = document.getElementById("notificationBox");

    if(!box) return;

    box.innerHTML = notifications
    .slice(-5)
    .reverse()
    .map(n => `
        <div class="notif ${n.type}">
            <span>${n.message}</span>
            <small>${n.time}</small>
        </div>
    `).join("");

}


/*==================================================
ACTIVITY FEED RENDER
==================================================*/

function renderActivity(){

    const feed = document.getElementById("activityFeed");

    if(!feed) return;

    feed.innerHTML = activity
    .slice(0, 10)
    .map(a => `
        <li>
            <span>${a.text}</span>
            <small>${a.time}</small>
        </li>
    `).join("");

}

setInterval(renderActivity, 3000);


/*==================================================
ENHANCED TOAST (SAFE FALLBACK)
==================================================*/

function showToast(message){

    pushNotification("success", message);

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);

}


/*==================================================
MODAL SYSTEM
==================================================*/

function openModal(id){

    const modal = document.getElementById(id);

    if(modal) modal.style.display = "flex";

}

function closeModal(id){

    const modal = document.getElementById(id);

    if(modal) modal.style.display = "none";

}


/*==================================================
EDIT BOOKING (SIMULATED UPDATE FLOW)
==================================================*/

let editingIndex = null;

function editBooking(index){

    editingIndex = index;

    const modal = document.getElementById("editModal");

    if(!modal) return;

    modal.style.display = "flex";

    document.getElementById("editIndex").value = index;

}


/* SAVE EDIT */

function saveEdit(){

    const name = getValue("editName");
    const room = getValue("editRoom");
    const amount = parseFloat(getValue("editAmount"));

    if(!name || !room || isNaN(amount)){

        showError("Invalid edit data");
        return;

    }

    addActivity(`Booking updated for ${name}`);

    pushNotification("success", "Booking Updated");

    closeModal("editModal");

}


/*==================================================
FILTER SYSTEM
==================================================*/

function filterTable(){

    const status = getValue("filterStatus").toLowerCase();

    const table = document.getElementById("dataTable");

    if(!table) return;

    table.querySelectorAll("tbody tr")
    .forEach(row => {

        const match = row.innerText.toLowerCase().includes(status);

        row.style.display = match ? "" : "none";

    });

}


/*==================================================
PAGINATION SYSTEM (BASIC FRONTEND)
==================================================*/

let currentPage = 1;
const rowsPerPage = 5;

function paginateTable(){

    const table = document.getElementById("dataTable");

    if(!table) return;

    const rows = Array.from(table.querySelectorAll("tbody tr"));

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {

        row.style.display =
        index >= start && index < end ? "" : "none";

    });

}

function nextPage(){

    currentPage++;
    paginateTable();

}

function prevPage(){

    if(currentPage > 1){

        currentPage--;
        paginateTable();

    }

}


/*==================================================
BULK ACTIONS
==================================================*/

function deleteSelected(){

    const checkboxes =
    document.querySelectorAll(".rowCheck:checked");

    checkboxes.forEach(cb => {

        cb.closest("tr").remove();

    });

    pushNotification("success", "Selected rows deleted");

}


/*==================================================
EXPORT ENHANCED (FILTERED DATA)
==================================================*/

function exportFilteredCSV(){

    const rows =
    document.querySelectorAll("#dataTable tbody tr");

    let csv = "Row Data\n";

    rows.forEach(row => {

        if(row.style.display !== "none"){

            csv += row.innerText.replace(/\t/g, ",") + "\n";

        }

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "filtered_data.csv";

    a.click();

    pushNotification("success", "Filtered CSV Exported");

}


/*==================================================
AUTO UI SYNC LOOP
==================================================*/

setInterval(() => {

    renderActivity();
    renderNotifications();

}, 4000);


/*==================================================
BACKEND READY STRUCTURE (FUTURE PROOFING)
==================================================*/

async function apiRequest(endpoint, data = {}){

    // Placeholder for future backend

    console.log("API CALL:", endpoint, data);

    return new Promise(resolve => {

        setTimeout(() => {

            resolve({ success: true });

        }, 500);

    });

}


/*==================================================
INITIALIZE TABLE SYSTEM
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    paginateTable();

    renderActivity();

    renderNotifications();

});


/*==================================================
END OF PART 4 (FINAL)
==================================================*/