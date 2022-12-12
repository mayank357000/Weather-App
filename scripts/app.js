// //forcast.js upar placed and app.js nneeche in html so can
// //use forecast ke mehtods

// //git push origin [isme branch ka naam jisme push krna hai]

// const cityForm=document.querySelector('form');
// const card=document.querySelector('.card');
// const details=document.querySelector('.details');
// const time = document.querySelector('img.time');
// const icon = document.querySelector('.icon img');

// const updateUI=(data)=>{
//     // const cityDets=data.cityDets;
//     // const weather=data.weather;

//     //destructuring , properties of gets saved in variables of same names
//     const {cityDets,weather}=data;

//     //update details template
//     details.innerHTML=`
//     <h5 class="my-3">${cityDets.EnglishName}</h5>
//     <div class="my-3">${weather.WeatherText}</div>
//     <div class="display-4 my-4">
//         <span>${weather.Temperature.Metric.Value}</span>
//         <span>&deg;C</span>
//     </div>
//     `;

//     //update night/day & icon images//
//     const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
//     icon.setAttribute('src', iconSrc);
    
//     const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
//     time.setAttribute('src', timeSrc);

//     //remove the d-none class if present
//     if(card.classList.contains('d-none'))
//     {
//         card.classList.remove('d-none');
//     }
// };

// //we can use forecast js functions because
// //in scripts tages forecast comes before app.js
// const updateCity=async (city)=>{


//     //await are replacement of then yaad rkhna
//     const cityDets=await getCity(city);//ye jo promise return hoga func se uspr then lagkr data return 
//     const weather= await getWeather(cityDets.Key);



//     return {
//         cityDets : cityDets,
//         weather : weather
//     };

//     //using shorthand nottation when key and val naem same
//     // return {cityDets,weather};
// };

// cityForm.addEventListener('submit',e=>{
//     //handle form locally by 
//     e.preventDefault();

//     //get city value
//     const city=cityForm.city.value.trim();
//     cityForm.reset();

//     //update the ui with city info
//     // console.log(city);

//     updateCity(city)
//        .then(data=>{
//         console.log(data)
//         updateUI(data);
//        })
//       .catch(err=>console.log(err));

//       //setting local storage
//       //showing the last city searched whenever someone visits or refeshes site
//       localStorage.setItem('city',city);
// });


// //out of listener jab bhi load ho website
// if(localStorage.getItem('city'))//if null then false
// {
//     let city=localStorage.getItem('city');
//     updateCity(city)
//      .then(data=>{updateUI(data)})
//      .catch(err=>{console.log(err)});
// }





// app.js is for DOM manipulation
// forecast.js will finish running prior to app.js; ahead in html

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
// We want the image with a class of time
const time = document.querySelector('img.time');
// div with class of icon and the image inside of that div
const icon = document.querySelector('.icon img');

// !!UPDATE: We need to indicate the Forecast Class as a Const
// We're calling this new constructor form forecast.js
// Now, whenever we're calling a method, we need to call it from the Forecast constructor
const forecast = new Forecast();

// We're updating the user view with the input/retrieved values
// Created local consts of the data from getCity and getWeather data
// Local consts just provide ease of use for the programming end
// Then we included a template to update the details class in HTML
// We looked at the console to see the specific values we needed from our data
const updateUI = (data) => {
    // Destructure properties
    // The constants must be the same name as the property of the object
    // Tells JS to get the cityDets property from the data object
    // Also to get the weather property from the data object
    const {cityDets, weather} = data;

    // Update Details Template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="temp display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}&deg F</span>
    </div>
    `;
    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    // Ternary Operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

     time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    };


// !!UPDATE: COMMENTED OUT B/C ADDED THIS METHOD IN THE FORECAST CLASS!!
// !!FORECAST CLASS LOCATED ON forecast.js!!

// We're externalizing the function and calling it below later
// Within the function, we'll be calling getCity and getWeather
// const updateCity = async (city) => {
    // Here we get city details from getCity using the user input 'city'
    // const cityDets = await getCity(city);
    // // Here, we pass the city Key from getCity to getWeather 
    // // We thus will get the weather for that city Key
    // const weather = await getWeather(cityDets.Key);
    
    // // We're returning data in the form of an object with the city and the weather
    // return {cityDets, weather};
// };

// Here, we're listening for a user submitting a typed city value on the app
cityForm.addEventListener('submit', e => {
    // Prevent default webpage refresh
    e.preventDefault();
    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with the new city
    // Because async returns promises, we can tack on a .then method
    // !!UPDATE: MODIFYING WITH NEWLY CREATED FORECAST CLASS (forecast.js)
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // Set Local Storage
    localStorage.setItem('city', city);
});

// !!UPDATE: MODIFYING WITH NEWLY CREATED FORECAST CLASS (forecast.js)
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
