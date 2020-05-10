
const   { 
        validateUrl, 
        closeErrorMessage, 
        showErrorMessage, 
        loadingGif, 
        showOrHideResultBlock 
        
        } = require('./helpers');



/* Send POST request to local server with userUrl */
export const sendRequestOnLocalServer = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await res.json();
        return data; 
    } catch(err) {
        showErrorMessage(err);
    }
};

/* Add the API result on the page or show the errors */
const displayContentByText = (data) => {
    
    //check the response for errors
    if(data.error) {
        showErrorMessage(data.error);
    }
    else {
        //get the result insert block
        const resultBlock = document.getElementById('result-blocks');
        
        //create the result 
        let content = ` <div class="block">
                            <h3 class="block-title">Data</h3>
                            <div class="data-row">
                                <div class="data-icon">P</div>
                                <div class="data-data">
                                    <div class="data-label">Polarity: <span class="data-value">${data.polarity}</span></div>
                                    <div class="data-label">Confidence: <span class="data-value">${data.polarity_confidence}</span></div>
                                </div>
                            </div>
                            <div class="data-row">
                                <div class="data-icon">S</div>
                                <div class="data-data">
                                    <div class="data-label">Subjectivity: <span class="data-value">${data.subjectivity}</span></div>
                                    <div class="data-label">Confidence: <span class="data-value">${data.subjectivity_confidence}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="block">
                            <h3 class="block-title">Content</h3>
                            ${data.image ? `<div class="data-image">
                                                <img src="${data.image}" alt="${data.title}"/>
                                            </div>` : ``}
                            <h5 class="data-title">${data.title}</h5>
                            <div class="data-text">${data.text}</div>
                            <div class="data-cta"><a href="${data.url}" target="blank">Go to the article!</a></div>
                        </div>`;

        //add the result to the page
        resultBlock.innerHTML = content;
        showOrHideResultBlock(); //show
    }
}


/* =============   Execution part ============= */

document.addEventListener('DOMContentLoaded', () => {
    
    //get DOM
    const callApiBtn = document.getElementById('callApi');
    const closeErrMessageBtn = document.querySelector('.em-close');

    window.addEventListener('offline', function(e) { console.log('offline'); });

window.addEventListener('online', function(e) { console.log('online'); });

    //Event Listener: Click => on button
    callApiBtn.addEventListener('click', () => {
        
        //get the url from the user
        const userUrl = document.getElementById('url').value;

        //check if the URL is not empty or too short
        if(userUrl == '' || userUrl.length < 12){

            showErrorMessage('You didn\'t add the URL or is too short<br>Please check the URL and try again');
            return;

        }
        

        //validate the url from the user
        if(validateUrl(userUrl)){
            
            loadingGif(); //show loading gif
            showOrHideResultBlock('hide');
            
            // send the request to server
            sendRequestOnLocalServer('/apicall', { url: userUrl})
            .then((data) => {

                displayContentByText(data);
                loadingGif('hide'); //hide loading gif
            })
        }
        else {

            //the url from the user is not valid
            loadingGif('hide');
            showErrorMessage('Your URL is not valid<br>Please check the URL and try again');
            
        }
        
    });


    // Event Listener: Click => on closeErrMessageBtn and close the Error Message Block
    closeErrMessageBtn.addEventListener('click', closeErrorMessage);

});
