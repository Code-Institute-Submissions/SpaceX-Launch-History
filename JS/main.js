var years = []; // Var used to store years, used by getYears and displayYears
var locations = [] // Var used to store locations 
var rockets = [] // var used to store rocket types
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
 * 
 */
function getRocket(){
    rockets = []
    spacexData.forEach(element => {
        if(!(rockets.includes(element.rocket.rocket_name)) && (element.launch_year == $("#year-select").val())){
            rockets.push(element.rocket.rocket_name)
        }
    });
    $(".rocket-select").show();
}

function displayRockets(){

}

/**
 * Hides all selections until they are relevant.
 */
function hideSelection(){
    $(".rocket-select").hide();
    $(".location-select").hide();
    $(".mission-select").hide();
}


$(document).ready(function(){
    hideSelection()
    getData(storeData);
    $('.carousel').carousel('pause');
})
