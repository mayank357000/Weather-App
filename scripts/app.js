const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI=(data)=>{


    // const cityDets=data.cityDets;
    // const weather=data.weather;

    //destructuring , properties of gets saved in variables of same names
    const {cityDets,weather}=data;

    //update details template
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update night/day & icon images//
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none');
    }
};

//we can use forecast js functions because
//in scripts tages forecast comes before app.js
const updateCity=async (city)=>{


    //await are replacement of then yaad rkhna
    const cityDets=await getCity(city);//ye jo promise return hoga func se uspr then lagkr data return 
    const weather= await getWeather(cityDets.Key);



    return {
        cityDets : cityDets,
        weather : weather
    };

    //using shorthand nottation when key and val naem same
    // return {cityDets,weather};
};

cityForm.addEventListener('submit',e=>{
    //handle form locally by 
    e.preventDefault();

    //get city value
    const city=cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with city info
    // console.log(city);

    updateCity(city)
       .then(data=>{
        console.log(data)
        updateUI(data);
       })
      .catch(err=>console.log(err));
});