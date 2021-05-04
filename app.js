'use strict';
let tableContainer=document.getElementById('forTable');
let table=document.createElement('table');
tableContainer.appendChild(table);
let totalEl=document.createElement('h2');
tableContainer.appendChild(totalEl);
Donor.all=[];
let total=0;
// create constuctor function
function Donor(donorName,donorAge,amount){
  this.donorName=donorName;
  this.donorAge=donorAge;
  this.amount=amount;
  Donor.all.push(this);
}

// create header for the table
function headerTable(){
  let headerRow=document.createElement('tr');
  headerRow.appendChild(table);
  let headerArr=['Donor Name','Donor Age','Amount'];
  for(let i=0;i<headerArr.length;i++){
    let headEl=document.createElement('th');
    headerRow.appendChild(headEl);
    headEl.textContent=`${headerArr[i]}`;
    console.log(headerArr[i]);
  }
}
headerTable();
// create render function using prototype
Donor.prototype.render=function(){
  let rowEl=document.createElement('tr');
  table.appendChild(rowEl);
  let nameEl=document.createElement('td');
  rowEl.appendChild(nameEl);
  nameEl.textContent=this.donorName;
  let ageEl=document.createElement('td');
  rowEl.appendChild(ageEl);
  ageEl.textContent=this.donorAge;
  let amountEl=document.createElement('td');
  rowEl.appendChild(amountEl);
  amountEl.textContent=this.amount;
  totalEl.textContent=`Total = ${calcTotal()}`;
  saveToLs();
};
Donor.prototype.generateAge=function(){
  this.donorAge=Math.floor(Math.random()*(30-18+1)+18);
};
function calcTotal(){
  total=0;
  for(let i=0;i<Donor.all.length;i++) {
    total+=parseInt(Donor.all[i].amount);
  }
  return total;
}
let form=document.getElementById('forForm');
form.addEventListener('submit',showToTable);
function showToTable(event){
  event.preventDefault();
  // (donorName,donorAge,amount)
  let donorName=event.target.name.value;
  let donorAge='';
  let amount=event.target.amount.value;
  let appendToTable = new Donor(donorName,donorAge,amount);
  appendToTable.generateAge();
  appendToTable.render();
}
function saveToLs(){
  let storage=JSON.stringify(Donor.all);
  localStorage.setItem('donorsInfo',storage);
}
function getFromLs(){
  let oldData=localStorage.getItem('donorsInfo');
  let order=JSON.parse(oldData);
  if(order !== null){
    for(let i=0;i<order.length;i++){
      let reInstatiation= new Donor(order[i].donorName,order[i].donorAge,order[i].amount);
      reInstatiation.render();
    }
  }
}
getFromLs();
