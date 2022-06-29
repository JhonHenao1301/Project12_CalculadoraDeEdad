// let date = document.getElementById('date');
// date.innerText = `Fecha de hoy: ${new Date().toLocaleDateString()}`;

// Lifetime
const daySelect     = document.getElementById('day');
const monthSelect   = document.getElementById('month');
const yearSelect    = document.getElementById('year');

const months = [
    {"number": 1, "name": 'January', },
    {"number": 2, "name": 'February', },
    {"number": 3, "name": 'March',},
    {"number": 4, "name": 'April',},
    {"number": 5, "name": 'May',},
    {"number": 6, "name": 'June',},
    {"number": 7, "name": 'July',},
    {"number": 8, "name": 'August',},
    {"number": 9, "name": 'September',},
    {"number": 10, "name": 'October',},
    {"number": 11, "name": 'November',},
    {"number": 12, "name": 'December',},
];

(function populateMonths(){
    for(let i = 0; i < months.length; i++) {
        const option = document.createElement('option');
        option.textContent = months[i].name;
        monthSelect.appendChild(option);
    }
    monthSelect.value = 'January';
})();

let previousDay;

function populateDays(month){
    while(daySelect.firstChild){
        daySelect.removeChild(daySelect.firstChild);
    }    

    let dayNum;

    if(month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December'){
        dayNum = 31;
    }   else if(month === 'April' || month === 'June' || month === 'September' || month === 'November'){
        dayNum = 30;
        }   else { 
                //Check for a leap year
                if(new Date(year, 1, 29).getMonth() === 1){
                    dayNum = 29;
                } else {
                    dayNum = 28;
                }         
            }

    //Insert correct days into months
    for(let i = 1; i <= dayNum; i++){
        const option = document.createElement('option');
        option.textContent = i;
        daySelect.appendChild(option);
    }

    if(previousDay){
        daySelect.value = previousDay;
        if(daySelect.value === ''){
            daySelect.value = previousDay - 1;
        }
    }
}

function populateYears(){
    let year = new Date().getFullYear();

    for(let i=0; i < 101; i++){
        const option = document.createElement('option');
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function() {
    populateDays(monthSelect.value);
}

monthSelect.onchange = function() {
    populateDays(monthSelect.value);
}

daySelect.onchange = function() {
    previousDay = daySelect.value;
}


//Showing result interface
const addDate   = document.getElementById('addDate');
const lifeTime  = document.getElementById('lifeTime');
const years     = document.getElementById('desc-years');
const days      = document.getElementById('desc-days');
const hours     = document.getElementById('desc-hours');
const minutes   = document.getElementById('desc-minutes');
const seconds   = document.getElementById('desc-seconds');  

function checkMonth(month) {
    let valueM = 0; 

    switch(month) {
        case 'January': valueM = 1;
        break;

        case 'February': valueM = 2;
        break;

        case 'March': valueM = 3;
        break;

        case 'April': valueM = 4;
        break;

        case 'May': valueM = 5;
        break;

        case 'June': valueM = 6;
        break;

        case 'July': valueM = 7;
        break;

        case 'August': valueM = 8;
        break;

        case 'September': valueM = 9;
        break;

        case 'October': valueM = 10;
        break;

        case 'November': valueM = 11;
        break;

        case 'December': valueM = 12;
        break;
    }

    return valueM;
}

function showResult() {
    addDate.style.display   = 'none';
    lifeTime.style.display  = 'block'; 

    let monthV = checkMonth(monthSelect.value);

    let dateNow         = new Date();
    let dateSelected    = new Date(Number(yearSelect.value),monthV-1,Number(daySelect.value), 0, 0, 0);

    let resAnios      = Math.floor( (dateNow.getTime() - dateSelected.getTime()) / (1000 * 60 * 60 * 24 * 365)) ;
    let resDays        = Math.floor( (dateNow.getTime() - dateSelected.getTime()) / (1000 * 60 * 60 * 24)) ;
    let resHours      = Math.floor( (dateNow.getTime() - dateSelected.getTime()) / (1000 * 60 * 60)) ;
    let resMinutes      = Math.floor( (dateNow.getTime() - dateSelected.getTime()) / (1000 * 60)) ;
    let resSeconds      = Math.floor( (dateNow.getTime() - dateSelected.getTime()) / (1000)) ;

    years.textContent   = resAnios;
    days.textContent    = resDays;
    hours.textContent   = resHours;
    minutes.textContent = resMinutes;
    seconds.textContent = resSeconds;
}

function comeback() {    
    lifeTime.style.display  = 'none'; 
    addDate.style.display   = 'flex';
}
