var years = [];


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
        if(years.includes(element.launch_year)){
            // Do Nothing
        }else{
            years.push(element.launch_year)
        }
    });
    displayYears();
}

function displayYears(){
    const yearDiv = $(".year");
    years.forEach(year => {
        yearDiv.append(`<div class="card mb-3" style="width: 18rem;">
        <img src="" class="card-img-top" alt="launch from ${year}">
        <div class="card-body">
        <a href="#" class="btn btn-primary centre">${year}</a>
        </div>
        </div>`)
    })
};
// GetData which is passed returndata => 

$(document).ready(function(){
    getData(getYears);
})

const yearDiv = $(".year");
for(var i = 0; i > 4; i++){
    yearDiv.append();

}