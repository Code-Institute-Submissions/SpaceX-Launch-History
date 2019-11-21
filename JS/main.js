var years = []; // Var used to store years, used by getYears and displayYears
var locations = [] // Var used to store locations 
var rockets = [] // var used to store rocket types
var missions = [] // var for storing mission info
var spacexData = [] // used to store all data pulled from API. 

/**
 * API called and parsed to JSON
 * @param {*} cb 
 */
function getData(cb){
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.spacexdata.com/v3/launches/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

/**
 * Stores Dara in a global variable to allow it to be searched. Calls get years function.
 * @param {*} data 
 */
function storeData(data){
    spacexData = data; 
    getYears();
}

/**
 * Searches API data and stores data in years array.
 */
function getYears(){
    spacexData.forEach(element => {
        if(!(years.includes(element.launch_year))){
            years.push(element.launch_year)
        }
    });
    displayYears();
}

/**
 * Appends years found in API to HTML.
 */
function displayYears(){
    const yearDiv = $("#year-select");
    years.forEach(year => {
       yearDiv.append(`<option>${year}</option>`)
    })
};

/**
 * Gets rockets from spaceXdata and stores them in the rockets array
 */
function getRocket(){
    rockets = [] //Clears rockets already in array
    spacexData.forEach(element => {
        if(!(rockets.includes(element.rocket.rocket_name)) && (element.launch_year == $("#year-select").val())){ //If rocket name not in array and selected year is equal to the year of cuurent element.
            rockets.push(element.rocket.rocket_name)
        }
    });
    if(rockets.length > 1){
        displayRockets();
    }else{
        hideSelection();
    }
}

/**
 * Displays rockets on page
 */
function displayRockets(){
    const rocketDiv = $("#rocket-select");
    rocketDiv.empty(); //Removes child elements.
    rockets.forEach(rocket => {
       rocketDiv.append(`<option>${rocket}</option>`)
    })
    $(".rocket-select").show();
}


function getMissions(){
    missions = [] //Clears missions already in array
    spacexData.forEach(element => {
        if(!(missions.includes(element.mission_name)) 
            && (element.launch_year == $("#year-select").val()) 
            && (element.rocket.rocket_name == $("#rocket-select").val()))
         { //If rocket name not in array and selected year is equal to the year of cuurent element.
            missions.push(element.mission_name)
        }
    });
    displayMissions()
}

function displayMissions(){
    const missionForm = $("#missions");
    missionForm.empty()
    missions.forEach(mission => {
        missionForm.append(`<option>${mission}</option>`)
    })
    $(".mission-select").show();
}


/**
 * Hides all selections until they are relevant.
 */
function hideSelection(){
    $(".rocket-select").hide();
    $(".mission-select").hide();
}




//Event Listerners. 
$("#year-select").change(function(){
    $(".choose").hide();
    getRocket();
});

$("#rocket-select").change(function(){
    getMissions()
})


$(document).ready(function(){
    hideSelection()
    getData(storeData);
    $('.carousel').carousel('pause');
})
