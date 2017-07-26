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


reqBtn.addEventListener('click', function() {
  if(dropDown.value === 'people') {

    fetch(swapiPeople + input.value)
    .then( res => {
      return res.json();
    })
    .then( data => {
    // name in h2
    // gender in p
    // first species value in a p
    const peopleName = document.createElement('h2');
    peopleName.innerHTML = data.name;

    const peopleGender = document.createElement('p');
    peopleGender.innerHTML = data.gender;

    const peopleContainer = document.createElement('div');
    peopleContainer.appendChild(peopleName);
    peopleContainer.appendChild(peopleGender);

    fetch(data.species)
    .then( res => {
      return res.json();
    })
    .then( data => {
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

  } else if (dropDown.value === 'planets') {
    //name in h2
    //terrain in p
    //population in p
    //film names in li wrapped in ul
    const planetContainer = document.createElement('div');

    fetch(swapiPlanets + input.value)
    .then( res => {
      return res.json();
    })
    .then( data => {
      const planetsName = document.createElement('h2');
      planetsName.innerHTML = data.name;

      const planetsTerrain = document.createElement('p');
      planetsTerrain.innerHTML = data.terrain;

      const planetsPopulation = document.createElement('p');
      planetsPopulation.innerHTML = 'Population: ' + data.population;

      const planetFilmUl = document.createElement('ul');

      planetContainer.appendChild(planetsName);
      planetContainer.appendChild(planetsTerrain);
      planetContainer.appendChild(planetsPopulation);
      planetContainer.appendChild(planetFilmUl);

      data.films.forEach( film => {
        fetch(film)
        .then( res => { return res.json(); })
        .then( data => {
          const planetFilm = document.createElement('li');
          planetFilm.innerHTML = data.title;
          planetContainer.appendChild(planetFilm);
        });

        if(contentDiv.children.length === 0) {
          contentDiv.appendChild(planetContainer);
        } else {
          contentDiv.replaceChild(planetContainer, contentDiv.children[0]);
        }
      });
    });

  } else if (dropDown.value === 'starships') {
    //name in h2
    //manufacturer in p
    //starship class in p
    //film names in li wrapped in ul

    fetch(swapiStarships + input.value)
    .then( res => {
      return res.json();
    })
    .then( data => {
      starshipsContainer = document.createElement('div');
      starshipsName = document.createElement('h2');
      starshipsName.innerHTML = data.name;

      starshipsManufacturer = document.createElement('p');
      starshipsManufacturer.innerHTML = 'Manufacturer: ' + data.manufacturer;

      starshipsClass = document.createElement('p');
      starshipsClass.innerHTML = 'Class: ' + data.starship_class;

      starshipsUl = document.createElement('ul');

      starshipsContainer.appendChild(starshipsName);
      starshipsContainer.appendChild(starshipsManufacturer);
      starshipsContainer.appendChild(starshipsClass);
      starshipsContainer.appendChild(starshipsUl);

      data.films.forEach( film => {
        starshipsLi = document.createElement('li');
        fetch(film)
        .then( res => {
          return res.json();
        })
        .then( data => {
          starshipsLi.innerHTML = data.title;
          starshipsContainer.appendChild(starshipsLi);
        });
      });

      if(contentDiv.children.length === 0) {
        contentDiv.appendChild(starshipsContainer);
      } else {
        contentDiv.replaceChild(starshipsContainer, contentDiv.children[0]);
      }
    });
  }
});
