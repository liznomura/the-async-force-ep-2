/* jshint esversion:6 */

// DOM elements
const dropDown = document.getElementById('resourceType');
const input = document.getElementById('resourceId');
const reqBtn = document.getElementById('requestResourceButton');
const contentDiv = document.getElementById('contentContainer');


// SWAPI
const swapiPeople = 'http://swapi.co/api/people/';
const swapiPlanets = 'http://swapi.co/api/planets/';
const swapiStarships = 'http://swapi.co/api/starships/';

// function planetsReq() {
//     //name in h2
//     //terrain in p
//     //population in p

//     let planetsObj = JSON.parse(this.responseText);

//     const planetsName = document.createElement('h2');
//     planetsName.innerHTML = planetsObj.name;

//     const planetsTerrain = document.createElement('p');
//     planetsTerrain.innerHTML = planetsObj.terrain;

//     const planetsPopulation = document.createElement('p');
//     planetsPopulation.innerHTML = planetsObj.population;

//     const planetContainer = document.createElement('div');

//     const planetFilmUl = document.createElement('ul');

//     //film names in li wrapped in ul
//     for(let i = 0; i < planetsObj.films.length; i++) {
//       startXHR(HTTP_METHOD.GET, planetsObj[i].films, function() {
//         let filmObj = JSON.parse(this.responseText);
//         const planetFilm = document.createElement('li');
//         planetFilm.innerHTML = filmObj.name;
//         contentDiv.appendChild(planetsName);
//         contentDiv.appendChild(planetsTerrain);
//         contentDiv.appendChild(planetsPopulation);
//         contentDiv.appendChild(planetFilm);
//         if(contentDiv.children.length === 0) {
//           contentDiv.appendChild(planetContainer);
//         } else {
//           contentDiv.replaceChild(planetContainer, contentDiv.children[0]);
//         }
//       });
//     }
//   }

reqBtn.addEventListener('click', function() {
  if(dropDown.value === 'people') {

    fetch(swapiPeople + input.value)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
    // name in h2
    // gender in p
    // first species value in a p
    const peopleName = document.createElement('h2');
    peopleName.innerHTML = data.name;

    const peopleGender = document.createElement('p');
    peopleGender.innerHTML = data.gender;

    const peopleContainer = document.createElement('div');
    console.log(data);
    peopleContainer.appendChild(peopleName);
    peopleContainer.appendChild(peopleGender);

    fetch(data.species)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const peopleSpecies = document.createElement('p');
      peopleSpecies.innerHTML = data.name;
      peopleContainer.appendChild(peopleSpecies);
    });

    if(contentDiv.children.length === 0) {
      contentDiv.appendChild(peopleContainer);
    } else {
      contentDiv.replaceChild(peopleContainer, contentDiv.children[0]);
    }

  });
    // .then((data) => {
    //   console.log(data);
    // });


  } else if (dropDown === 'planets') {

  } else if (dropDown === 'starships') {
    //name in h2
    //manufacturer in p
    //starship class in p
    //film names in li wrapped in ul
  }
});
