var years = []; // Var used to store years, used by getYears and displayYears
var locations = [] // Var used to store locations 
var rockets = [] // var used to store rocket types
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
 * 
 * @param {*} data 
 */
function getYears(data){
    const launchData = data; 
    launchData.forEach(element => {
        if(years.includes(element.launch_year[2])){
            // Do Nothing
        }else{
            years.push(element.launch_year)
        }
    });
    displayYears();
}

/**
 * Appends years found in API to year-select 
 */

function displayYears(){
    const yearDiv = $("#year-select");
    years.forEach(year => {
       yearDiv.append(`<option>${year}</option>`)
    })
};


/**
 * 
 * @param {*} data 
 */
function getLocation(data){
    const launchData = data; 
    launchData.forEach(element => {
        if(locations.includes(element.launch_site.site_name_long)){
            // Do Nothing
        }else{
            locations.push(element.launch_site.site_name_long)
        }
    });
    displayLocation();
}

/**
 * Appends years found in API to year-select 
 */

function displayLocation(){
    const locationDiv = $("#location-select");
    locations.forEach(location => {
       locationDiv.append(`<option>${location}</option>`)
    })
};


/**
 * 
 * @param {*} data 
 */
function getRocket(data){
    const rocketData = data; 
    rocketData.forEach(element => {
        if(rockets.includes(element.rocket.rocket_name)){
            // Do Nothing
        }else{
            rockets.push(element.rocket.rocket_name)
        }
    });
    displayRockets();
}

/**
 * Appends years found in API to year-select 
 */

function displayRockets(){
    const rocketDiv = $(".rockets");
    rockets.forEach(rocket => {
       rocketDiv.append(`<div class="form-check">
       <input class="form-check-input " type="radio" name="gridRadios"
           id="${rocket}" value="option1" checked>
       <label class="form-check-label" for="gridRadios1">
           ${rocket}
       </label>
   </div>`)
    })
};



// When doc ready 
$(document).ready(function(){
    getData(getYears);
    getData(getLocation);
    getData(getRocket)
    $('.carousel').carousel('pause');
})











// Scrap for Later

var yearSelected = $("#year-select").val()