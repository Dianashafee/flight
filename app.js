'use strict';

var tableHead = ['Flying From', 'Flying To', 'capacity', 'Reserved Seats', 'Available Seats'];
var table = document.getElementById('flightTable');
var allFlights = [];

if (localStorage.getItem('flights')) {
    var storageFlight = JSON.parse(localStorage.getItem('flights'));
    for (var i = 0; i < storageFlight.length; i++) {
        // create to the whole object that exsits in the local storage, and put them in the allflight 
        new Flight(storageFlight[i].flyFrom, storageFlight[i].flyTo, storageFlight[i].capacity, storageFlight[i].reservedSeats);
    }
}


//  creating a constructor

function Flight(flyFrom, flyTo, capacity, reservedSeats) {
    this.flyFrom = flyFrom;
    this.flyTo = flyTo;
    this.capacity = capacity;
    this.reservedSeats = reservedSeats;
    this.availableSeat = 0;
    this.tickets = [];
    allFlights.push(this);

}


//  creating an OBJECT 



// creating a function (( Method )) to calculate available seats which is in the object , the funtion conrols to the object properties 

Flight.prototype.availableFuntion = function () {
    this.availableSeat = this.capacity - this.reservedSeats
    // return this.availableSeat;

}


Flight.prototype.fillTicket = function () {
    for (var i = 0; i < this.capacity; i++) {
        this.tickets.push(i);

    }

};

Flight.prototype.addRow = function () {
    var row = document.createElement('tr');
    table.appendChild(row);


    var td = document.createElement('td');
    td.textContent = this.flyFrom
    row.appendChild(td)

    var td2 = document.createElement('td');
    td2.textContent = this.flyTo
    row.appendChild(td2);

    var td3 = document.createElement('td');
    td3.textContent = this.capacity
    row.appendChild(td3);

    var td4 = document.createElement('td');
    td4.textContent = this.reservedSeats
    row.appendChild(td4);

    var td5 = document.createElement('td');
    td5.textContent = this.availableSeat
    row.appendChild(td5);

}


//  creating a table ,, we creat it inside of a function 

// creatig header using a global array 
function creatHeader() {
    // <tr> </tr>
    var td = document.createElement('td')
    //  creaating the header row (( empty tr))
    var headRow = document.createElement('tr');
    table.appendChild(headRow);


    //   this is how we fill the table we creat a var to hold the content 
    var firstTd;
    for (var i = 0; i < tableHead.length; i++) {
        // creating  cells inside the table to fill the global array in the header row 
        firstTd = document.createElement('td');
        firstTd.textContent = tableHead[i];
        headRow.appendChild(firstTd);

    }

}
// creatHeader(); 

//  creating FORM 

var flightForm = document.getElementById('flightForm');
flightForm.addEventListener('submit', addFlight);

function addFlight(event) {
    event.preventDefault();
    console.log(event);

    var from = event.target.flyFrom.value;
    var to = event.target.flyTo.value;
    var capacity = event.target.capacity.value;
    var reserved = event.target.reserved.value;
    //  why did we used value ?


    //  this is an object 

    var addFlight = new Flight(from, to, capacity, reserved);
    addFlight.availableFuntion();
    addFlight.fillTicket();
    addFlight.addRow();
    calculateOverAllCapacity();
    localStorage.setItem('flights', JSON.stringify(allFlights));
}


function calculateOverAllCapacity() {
    var overAllCapacity = 0;
    for (var i = 0; i < allFlights.length; i++) {
        overAllCapacity += Number(allFlights[i].capacity);

    }
    document.getElementById('overAll_Capacity').textContent = 'over all capacity = ' + overAllCapacity
}

creatHeader();

for (var j = 0; j < allFlights.length; j++) {
    allFlights[j].availableFuntion();
    allFlights[j].addRow();
}

calculateOverAllCapacity();



