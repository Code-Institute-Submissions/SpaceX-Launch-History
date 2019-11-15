/**
 * A callback function that calls the SpaceXdata api 
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

function getYears(data){
    const launchData = data[0].launch_year
    const yearDiv = $(".year");
    yearDiv.html(`<p> ${launchData}</p>`)
   
}

getData(getYears)
// GetData which is passed returndata => 