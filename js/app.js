/* jshint esversion:6 */
const HTTP_METHOD = {
  GET : "GET",
};

function startXHR(method, source, cb) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', cb);
  oReq.open(method, source);
  oReq.send();

  return oReq;
}

// DOM elements
const dropDown = document.getElementById('resourceType');
const input = document.getElementById('resourceId');
const reqBtn = document.getElementById('requestResourceButton');
const contentDiv = document.getElementById('contentContainer');


// SWAPI
const swapiPeople = 'http://swapi.co/api/people/';
const swapiPlanets = 'http://swapi.co/api/planets/';
const swapiStarships = 'http://swapi.co/api/starships/';

//callbacks
function peopleReq() {
    // name in h2
    // gender in p
    // first species value in a p
  let peopleObj = JSON.parse(this.responseText);

const peopleName = document.createElement('h2');
peopleName.innerHTML = peopleObj.name;

const peopleGender = document.createElement('p');
peopleGender.innerHTML = peopleObj.gender;

//only get first species and only the name
startXHR(HTTP_METHOD.GET, peopleObj.species, function() {
  let speciesObj = JSON.parse(this.responseText);
  const peopleSpecies = document.createElement('p');
  peopleSpecies.innerHTML = speciesObj.name;
contentDiv.appendChild(peopleSpecies);
});

contentDiv.appendChild(peopleName);
contentDiv.appendChild(peopleGender);
}

reqBtn.addEventListener('click', function() {
  if(dropDown.value === 'people') {
    startXHR(HTTP_METHOD.GET, swapiPeople + input.value, peopleReq);


  } else if (dropDown === 'planets') {
    //name in h2
    //terrain in p
    //population in p
    //film names in li wrapped in ul
    startXHR(HTTP_METHOD.GET, swapiPlanets + input.value, planetsReq);

  } else if (dropDown === 'starships') {
    //name in h2
    //manufacturer in p
    //starship class in p
    //film names in li wrapped in ul
    startXHR(HTTP_METHOD.GET, swapiStarships + input.value, starshipsReq);
  }
});
