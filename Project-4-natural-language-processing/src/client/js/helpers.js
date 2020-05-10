/* =============   Declaration part ============= */

/* Validate the URL */
export const validateUrl = (str) => {
    const urlRegex = /^(http|https):\/\/+(www.)*([a-z0-9]{2})\S*\.[a-z]{2,10}(\/)*(\S)*?$/gm;
    const url = new RegExp(urlRegex, 'i');
    return url.test(str);
}

/* Close the error message */
export const closeErrorMessage = () => {
    document.getElementById('error-message').classList.add('hide');
}

/* Show errors message block */
export const showErrorMessage = (msg) => {
    document.querySelector('.em-text').innerHTML = msg;
    document.getElementById('error-message').classList.remove('hide');
}

export const toggleHideClassToElement = (elementID, hide = '') => {
    hide === 'hide' ? document.getElementById(elementID).classList.add('hide') : document.getElementById(elementID).classList.remove('hide');
}
/* Show & hide loading gif */
export const loadingGif = (hide = '') => toggleHideClassToElement('loading-gif', hide);


/* Show & hide Result Blocks */
export const showOrHideResultBlock = (hide = '') => toggleHideClassToElement('result-blocks', hide);
