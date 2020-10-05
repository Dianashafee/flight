'use strict';

var allFlights = [];
var tableHeader = ['Fly From', 'Fly To', 'Capacity', 'Reserved Seats', 'Available Seats'];
var table = document.getElementById('flightTable');

if (localStorage.getItem('flights')) {
  var flightStorage = JSON.parse(localStorage.getItem('flights'))
  for (var i = 0; i < flightStorage.length; i++) {
    new Flight(flightStorage[i].flyFrom, flightStorage[i].flyTo, flightStorage[i].capacity, flightStorage[i].reservedSeats);
  }
}

//  creating a constructor 

function Flight(flyFrom, flyTo, capacity, reservedSeats) {
  this.flyFrom = flyFrom;
  this.flyTo = flyTo;
  this.capacity = capacity;
  this.reservedSeats = reservedSeats;
  this.availableSeats = 0;
  allFlights.push(this);
}

Flight.prototype.calculateAvailableSeats = function () {
  this.availableSeats = this.capacity - this.reservedSeats

};
Flight.prototype.addRow = function () {
  // cresting an empty row
  var row = document.createElement('tr');
  table.appendChild(row);

  //  now it's time to create a td and fill it with the data that was entered to the form

  var td = document.createElement('td');
  td.textContent = this.flyFrom;
  row.appendChild(td);

  var td2 = document.createElement('td');
  td2.textContent = this.flyTo;
  row.appendChild(td2);

  var td3 = document.createElement('td');
  td3.textContent = this.capacity;
  row.appendChild(td3);

  var td4 = document.createElement('td');
  td4.textContent = this.reservedSeats;
  row.appendChild(td4);

  var td5 = document.createElement('td');
  td5.textContent = this.availableSeats;
  row.appendChild(td5);




}


function craeteHeader() {
  var tableRow = document.createElement('tr');
  table.appendChild(tableRow);

  var fisrtTd;
  for (var i = 0; i < tableHeader.length; i++) {
    fisrtTd = document.createElement('td');
    fisrtTd.textContent = tableHeader[i];
    tableRow.appendChild(fisrtTd);
  }
}
craeteHeader();

// creating a form 
var flightForm = document.getElementById('flightForm');

// creating ((addlistener))
flightForm.addEventListener('submit', addFlight)

function addFlight(event) {
  event.preventDefault();
  var from = event.target.flyFrom.value;
  var to = event.target.flyTo.value;
  var capacity = event.target.capacity.value;
  var reserved = event.target.reserved.value;

  var addFlight = new Flight(from, to, capacity, reserved);
  addFlight.calculateAvailableSeats();
  addFlight.addRow();
  calculateOverAllCapacity();
  localStorage.setItem('flights', JSON.stringify(allFlights));
}


function calculateOverAllCapacity() {
  var overAllCapacity = 0;
  for (var i = 0; i < allFlights.length; i++) {

    overAllCapacity += Number(allFlights[i].capacity);
  }
  document.getElementById('overAllCapacity').textContent = 'Over All Capacity = ' + overAllCapacity
}



for (var j = 0; j < allFlights.length; j++) {
  allFlights[j].calculateAvailableSeats();
  allFlights[j].addRow();
}

calculateOverAllCapacity();