'use strict';

var tableHeader = ['Fly From', 'Fly To', 'Capacity', 'Reserved', 'Available Seats']
var allFlights = [];
var table = document.getElementById('flightTable');

if(localStorage.getItem('flights')) {
    var allStorage = JSON.parse(localStorage.getItem('flights'));
    for( var i=0; i< allStorage.length; i++) {
        new Flight(allStorage[i].flyFrom, allStorage[i].flyTo, allStorage[i].capacity, allStorage[i].reservedSeats);
    }
}

function Flight(flyFrom, flyTo, capacity, reservedSeats) {
    this.flyFrom = flyFrom;
    this.flyTo = flyTo;
    this.capacity = capacity;
    this.reservedSeats = reservedSeats;
    this.availableSeats = 0;
    
    allFlights.push(this)
}

Flight.prototype.calculateAvailableSeat = function () {
    this.availableSeats = this.capacity - this.reservedSeats

}

Flight.prototype.addRow = function () {
    var row = document.createElement('tr');
    table.appendChild(row);


    var td1 = document.createElement('td');
    td1.textContent = this.flyFrom
    row.appendChild(td1);

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
    td5.textContent = this.availableSeats
    row.appendChild(td5);

}

//  first we create a header to the table 
function creatHeader() {
    var headRow = document.createElement('tr');
    table.appendChild(headRow);

    var firstTd;
    for (var i = 0; i < tableHeader.length; i++) {
        firstTd = document.createElement('td')
        firstTd.textContent = tableHeader[i];
        headRow.appendChild(firstTd);

    }
}
creatHeader();

var flightForm = document.getElementById('flightForm');
flightForm.addEventListener('submit', addFlight);

function addFlight(event) {
    event.preventDefault();

    var from = event.target.FlyFrom.value;
    var to = event.target.FlyTo.value;
    var capacity = event.target.capacity.value;
    var reserved = event.target.reserved.value;

    var addFlight = new Flight(from, to, capacity, reserved);
    addFlight.calculateAvailableSeat();
    addFlight.addRow();
    calculateOverAllCapacity();
    localStorage.setItem('flights', JSON.stringify(allFlights));

}
function calculateOverAllCapacity (){
    var  allCapacity = 0;
    for( var i=0; i< allFlights.length; i++){
    allCapacity +=  Number(allFlights[i].capacity);
    }
document.getElementById('overAllCapacity').textContent = 'Over All Capacity = ' + allCapacity;
}



for( var j =0; j< allFlights.length; j++){
    allFlights[j].calculateAvailableSeat();
    allFlights[j].addRow();
}
calculateOverAllCapacity();