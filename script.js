// Map Initialization 
var mapboxAccessToken = 'pk.eyJ1Ijoic3VwZXJ3YWloIiwiYSI6ImNrdDh1N3V1ZDE1cGEydWxhd2cycDg3aTMifQ._ghxAGgHLRNrRFnSmqSgmQ';
var map = L.map('map').setView([51.1657, 10.4515], 6);

// dark baseMap 
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


// Map Styles 
                            // Color Map for the Map (Recovered Tab)
function getColorRecovered(recovered) {
    return recovered > 288004 ? '#800026' :
           recovered > 180246  ? '#BD0026' :
           recovered > 127935  ? '#E31A1C' :
           recovered > 105655  ? '#FC4E2A' :
           recovered > 78205   ? '#FD8D3C' :
           recovered > 43568   ? '#FEB24C' :
           recovered > 27360   ? '#FED976' :
                      '#FFEDA0';
}
// Color Map for the Confirmed Cases
function getColorCases(cases) {
    return cases > 663195 ? '#EDF8FB' :
           cases > 300948  ? '#B3CDE3' :
           cases > 188656  ? '#8C96C6' :
           cases > 129758  ? '#8856A7' :
           cases > 82805   ? '#810F7C' :
           cases > 45481   ? '#810333':
           cases > 28564   ? '#805F45':

                      '#FFEDA0';
}
// Color Map for the Deaths
function getColorDeath(deaths) {
    return deaths > 10438 ? '#B3E2CD' :
           deaths > 7613  ? '#FDCDAC' :
           deaths > 5835  ? '#CBD538' :
           deaths > 4392 ? '#F4CAE4' :
           deaths > 1642   ? '#E6F5C9' :
           deaths > 1185   ? '#E6F5C9' :
           deaths > 497   ? '#E6F5C9' :
                      '#FFEDA0';
}
//  Style
function style(feature) {
    return {
    fillColor: getColorRecovered(feature.properties.recovered),
    weight: 1,
    opacity: 5,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
    };
}
//          The select options to change the styles
var selectBox = document.getElementById('select');

selectBox.onchange = function change(){
    var displaytext = selectBox.options[selectBox.selectedIndex].value;
    // console.log(displaytext)
    if(displaytext == 'confirmed'){
        function style(feature) {
            return {
                fillColor: getColorConfirmed(feature.properties.confirmed),
                weight: 1,
                opacity: 5,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        console.log('double')
        geojson = L.geoJson(germany, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
        
    } else if(displaytext == 'deaths'){
        function style(feature) {
            return {
                fillColor: getColorDeath(feature.properties.death),
                weight: 1,
                opacity: 5,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        console.log('death choke')
        geojson = L.geoJson(germany, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    }else{
        function style(feature) {
            return {
                fillColor: getColorRecovered(feature.properties.recovered),
                weight: 1,
                opacity: 5,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        geojson = L.geoJson(germany, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
        console.log('who cares')
        
    }
}





                                // Adding all the items to Map

// onEach feature function
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}



                // Mouse Events Function


// MouseOver Event
var geojson;

function highlightFeature(e) {
     var layer = e.target;
                
    layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
     });
                
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
    }
 }

// Mouseout Event
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
// Click Event
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// Adding the Functions 
function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.state);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


// The Map
geojson = L.geoJson(germany, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


// Adding to the dashboards

$.getJSON("germany.json", function(json){
   for(i = 0; i < json.length; i++){
    //    the divs where the data will be displayed
    var dash = document.getElementById('panel');
    var dashTwo = document.getElementById('dashTwo');
    var dashThree = document.getElementById('dashThree');
    //The divs for splitting and holding the data  
    var figureTwo = document.createElement('div');
    var figureThree = document.createElement('div');
    // The div for the confirmed, death and recovered numbers list 
    var div = document.createElement('div');
    var divTwo = document.createElement('div');
    var divThree = document.createElement('div');
    // Adding the classes for the css style
        div.classList.add('states')
        divTwo.classList.add('displayboardTwo')
        divThree.classList.add('displayBoardThree')
        // including the data into the 
        div.innerHTML = json[i].state;
        divTwo.innerHTML = json[i].state;
        divThree.innerHTML = json[i].state
        var figure = document.createElement('div')
        figure.innerHTML = ' ' + json[i].cases
        figureTwo.innerHTML = ' ' + json[i].deaths
        figureThree.innerHTML = ' ' + json[i].recovered
        dash.appendChild(div)
        dashTwo.appendChild(divTwo)
        dashThree.appendChild(divThree)
        div.appendChild(figure)
        divTwo.appendChild(figureTwo)
        divThree.appendChild(figureThree)
   }
})

// Mobile Section
const statsBtn = document.getElementById('stats')
statsBtn.onclick = () =>{

    
}





// for(i = 0; i < selectBox.length; i++){
//     if(selectBox.value[i] = 'Confirmed'){
//         console.log('Confirmed')
//     }else if(selectBox.value[i] = 'Deaths')
//     {
//         console.log('Deaths')
//     }else{
//         console.log('Recovered')
//     }
// }
// // const data = germany.features;
// for(i = 0; i < germany.features.length; i++){
//     console.log()
// //    var div = document.createElement('div');
//    div.innerHTML = data[i].state + data[i].recovered;
//    dash.appendChild(div);

// }
// method that we will use to update the control based on feature properties passed
