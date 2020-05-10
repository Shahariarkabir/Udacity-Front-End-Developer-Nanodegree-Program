const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv'); 
      dotenv.config();
var AYLIENTextAPI = require('aylien_textapi');
      
//declare variables
const port = process.env.PORT || 8081;
const app = express();
var nlp = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));


//start the server
app.listen(port, () => {
    console.log('The server is running on http://localhost:' + port);
})


app.get('/', (req, res) => {
    res.sendFile('dist/index.html') 
});


//send the API request to Aylien API server
app.post('/apicall', (req, res) => {
     
    //create an empty resultData object, which will be send back to the user/browser
    const resultData = {};
    resultData.url = req.body.url;

    //send the first API request to get the article content
    nlp.extract({
      url: req.body.url,
      best_image: true
    },
    (errExtract, resExtract) => {

      //check for errors, if no errors
      if (errExtract === null) {

        //add text/article, title and image to resultData object
        resExtract.article != '' ? resultData.text = resExtract.article.slice(0, 300) + '...' : '';
        resExtract.title != '' ? resultData.title = resExtract.title : '';
        resExtract.image != '' ? resultData.image = resExtract.image : '';
        
        if(resExtract.article != '') {
          
          //send the second API request if the article is not empty
          nlp.sentiment(
            {'text': resExtract.article},
            (errSentiment, resSentiment) => {
              
              //if not errors
              if (errSentiment === null) {
                console.log(resSentiment);
                //add new sentiment result to resultData object
                resultData.polarity = resSentiment.polarity;
                resultData.subjectivity = resSentiment.subjectivity;
                resultData.polarity_confidence = (resSentiment.polarity_confidence).toFixed(2);
                resultData.subjectivity_confidence = (resSentiment.subjectivity_confidence).toFixed(2);

                //send the resultData to the browser/user  
                res.send(resultData);
              }
            }
          );
        } //if end
        else {
           //send error message to the browser/use, the text is empty; 
          res.send({
            error: `Unfortunately, we couldn't find any text on this page<br>
                    Please, try another URL/Web Page!`
          });
        }
        
      }
      else {

         //send error message to the browser/user 
        res.send({
          error: `Requested URL was not found.<br>
                  Please, check the URL and try again!`
        });
      }

    });
}); // and APIcall