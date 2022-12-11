/* Global Variables */

// Personal API Key for OpenWeatherMap API
const myKey='7045a3ed52e1cbe5cab556b2f3c31fd2'; // personal API key
// define the generate button
const generate=document.getElementById('generate')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* event listner to generate button*/
generate.addEventListener('click',async ()=>{

try{
    /* entered zip code value  in the zip code feild after click the generate button */
    const zipCode=document.getElementById('zip').value;
    // console.log('zip code:',zipCode);

    /* get the entered text in the feelings feild after click the generate button */
    const content=document.getElementById('feelings').value
    // console.log('content:',content)

  /*check if the content field is empty*/
    if(!content) alert("you didn`t enter your feelings")
    
  /*check if the zip code field is empty*/
    if(!zipCode){ 
        alert("please enter a valied zip code ");
    }
    else {
    /* apiKey according to reqired zip code and content */
   const apiKey= `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${myKey}&units=metric`; // full URL to weather API
   
    /*send request to weather Api*/
     const res= await  fetch(apiKey); // response of the weather API

    const data=await res.json() //json formate of weather API response
    // console.log("data.main",data.main)  // show the main object content

    temp= await data.main.temp; // extract temprature from main object and save it at temp variable 
    // console.log('temp:',temp) // show temprature

    /*save the collected data locally at our server */
      await postData(temp,content,newDate)

      /* get saved data from local server*/
      const finalData= await collectData();
      console.log("final data",finalData)

     /*update the UI (index.html)*/
     await  updateUi(finalData);

    }
}catch(err){console.log('ERROR::',console.error())}
    
})

/*function to save data to our local server */
    async function postData(TEMP,Content,NewDate){
        await fetch('/addData',{
           'method':'POST',
           'headers':{
               'content-type':'application/json'},
           'body':JSON.stringify({
               date:NewDate,
               temp:TEMP,
               content:Content
    
           })
    
       })
    }
    /*function to retrive data from our local server */
    async function collectData(){
        const savedData= await fetch('/downloadData')
        const jsonSavedData= await savedData.json()
        console.log("jsonSavedData",jsonSavedData)
        return jsonSavedData;
      
      }
      /*function to show the retrived data dynamically at our web page */
      async function updateUi(fetchedData){
      document.getElementById('date').textContent= await fetchedData.date;
      document.getElementById('temp').textContent= await fetchedData.temp;
      document.getElementById('content').textContent= await fetchedData.content;
      }



 
 




