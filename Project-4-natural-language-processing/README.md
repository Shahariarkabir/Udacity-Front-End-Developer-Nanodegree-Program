# Natural Language Processing App
Udacity - Project 4<br>
HTML, CSS, SASS, JavaScript, Node.js, Express.js, Webpack, Jest, API


## Project requirements

1. Organised files and directories
2. Two webpack config files(dev and production)
3. Separated style folder for SASS files
4. Semantic HTML, src/client and src/server folders
5. Fetch data from [TEXT ANALYSIS API](https://aylien.com/text-api/) from the local server(Node.js)
6. Handle and display the errors
7. Update the UI with the result


## Project live link

[Visit NLP App](https://nlp-app.netlify.com/)<br>
* the app is not working because the server is not configured for Netlify, is fully  working on your local

## What the app is doing?
The app will extract meaning and insight from textual content with ease.
Add a post or page URL in the input and the app will give the insights. 


## How to install the app on your local
1. Download the files or clone the repo on your local machine
2. Add/Replace the API KEYS, see more below
3. In the root folder run: ``` npm run build-prod ``` and ``` npm run start ```
4. Open the browser http://localhost:8081
5. Add the Post/Page URL in the input.


#### Important!!!
To be able to use the app, you should repalce in the src/server/index.js file the ```process.env.API_ID ``` and ```process.env.API_KEY``` with your  API Key and API ID from [Aylien API](https://aylien.com/text-api/) or create a local env file with ```npm dotenv```


#### Development environment

If you want to run the app in development mode, in the root run: ```npm run build-dev```.
The browser automatically will be opened on http://localhost:8080


## Project review

> Well done! :star: <br>
You have done a great job on this project :fire: <br>
I really appreciate the efforts you have put into this project :clap: :clap:<br>
Congratulations on completing the project :+1: <br>
Keep Learning :smile:, Stay Udacious

Full project review: [click here](https://drive.google.com/file/d/1bNMbXhebpy3p71Tpdd9Y383fRnM4avTw/view?usp=sharing)

#### Thanks, Nick ;)
