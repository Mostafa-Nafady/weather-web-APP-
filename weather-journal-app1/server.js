// Setup empty JS object to act as endpoint for all routes
projectData = {

};
const port=8000;

// Require Express to run server and routes
const express= require('express');

//body-parser require
const bodyParser=require('body-parser')

// cors require
const cors=require('cors')

// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // convert all request to the server to json format

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{
    console.log(`server is listening to port: ${port}`)
})

//download Data when get request send from client side at /downloadData
app.get('/downloadData',(request,response)=>{
    // projectData=request.body.json()
    console.log('project Dataaa download',projectData)
    response.send(projectData)
})
// save data which recieved (from post request) from client side at route /addData
app.post('/addData',(req,res)=>{
    projectData={...req.body}
    console.log("project Data addData",projectData)
    res.send() // provide resolved feedback to the client side 
})