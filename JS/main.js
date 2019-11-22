let years = []; // Var used to store years, used by getYears and displayYears
var locations = [] // Var used to store locations 
var rockets = [] // var used to store rocket types
var missions = [] // var for storing mission info
var spacexData = [] // used to store all data pulled from API. 
const missionDiv = $(".mission-div");


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
            displayRockets();
        }
    });
}

/**
 * Displays rockets on page unless there is only one rocket
 */
function displayRockets(){
    const rocketDiv = $("#rocket-select");
    rocketDiv.empty(); //Removes child elements.
    rockets.forEach(rocket => {
       rocketDiv.append(`<option>${rocket}</option>`)
    })
    if(rockets.length > 1){
        $(".rocket-select").show();
    }else{
    getMissions();
    } 
}

/**
 * Gets missions of year and rocket selected.
 */
function getMissions(){
    missions = [] //Clears missions already in array
    spacexData.forEach(element => {
        if(!(missions.includes(element.mission_name)) 
            && (element.launch_year == $("#year-select").val()) //Check launch year current value
            && (element.rocket.rocket_name == $("#rocket-select").val())) //checks current rocket value
         { //If rocket name not in array and selected year is equal to the year of cuurent element.
            missions.push(element.mission_name)
        }
    });
    displayMissions()
}

/**
 * Displays missions on page
 */
function displayMissions(){
    const missionForm = $("#missions");
    missionForm.empty()
    missions.forEach(mission => {
        missionForm.append(`<option>${mission}</option>`)
    })
    $(".mission-select").show();
    updateMissionInfo();
}

/**
 * Displays relevant information on page about currently selected mission
 */
function updateMissionInfo(){    
    missionDiv.empty()
    spacexData.forEach(element => {
        if(element.mission_name === $("#missions").val()){ 
            missionDiv.append(`<h3 class="text-center pb-3">${element.mission_name}</h3>`);
            if(element.links.video_link){
                missionDiv.append(`<div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${element.links.youtube_id}" allowfullscreen></iframe>
              </div>`)
            }else if(element.links.mission_patch){
                missionDiv.append(`<img src=${element.links.mission_patch} class="" id="mission-patch" alt="">`)
            }else{
                missionDiv.append(`<img src="img/${element.rocket.rocket_id}.jpg" class="img-fluid" id="mission-patch" alt="">`)
            }
            missionDiv.append(`<h4 class="mission-info pt-3">Mission Information:</h4>`)
            missionDiv.append(`<p class="mission-date">Date: ${element.launch_date_utc}</p>`)
            missionDiv.append(`<p class="mission-date">Location: ${element.launch_site.site_name_long}</p>`)
            if(element.details){
                missionDiv.append(`<p>${element.details}</p>`)
            }
        
        }
    });
    
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
    hideSelection()
    getRocket();
});

$("#rocket-select").change(function(){
    getMissions();
})

$("#missions").change(function(){
    updateMissionInfo();
})

$(document).ready(function(){
    hideSelection()
    getData(storeData);
    $('.carousel').carousel('pause');
})
