const key='jKvkhjaQJEMKEMLXoEGdoDYYbEfVuOCn';

//get weather info using city's location key
const getWeather=async (id)=>{
    //resource url
    const base='https://dataservice.accuweather.com/currentconditions/v1/';
    const query=`${id}?apikey=${key}`;

    const response=await fetch(base+query);
    const data=await response.json();

    // console.log(data[0]); 

    return data[0];//binded as promise to return
}



//get city info 
const getCity=async (city)=>{
    //resource url
    const base='https://dataservice.accuweather.com/locations/v1/cities/search';
    const query=`?apikey=${key}&q=${city}`;

    const response=await fetch(base+query);
    const data=await response.json();

    // console.log(data[0]); ye toh simple data hi hota hai

    return data[0];//binded as promise to return
}


// getCity('Indore')
//   .then((data)=>{
//     // console.log(data.Key);
//     //since promise is reutrned we can chain
//     return getWeather(data.Key);
//   }).then((data)=>{
//     // console.log(data);
//   })
//   .catch((err)=>{console.log(err)});