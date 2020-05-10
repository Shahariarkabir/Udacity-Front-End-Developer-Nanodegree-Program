const {  validateUrl, showErrorMessage, closeErrorMessage } = require('./helpers');

test('Validate the URL => true', () => {
    expect(validateUrl('https://google.com/dfbb/fgmbnm.php')).toBe(true);
})

test('Close the error message by adding a class \"hide\"', () => {
    document.body.innerHTML = `<div id="error-message" class="full-screen">
                                    <div class="em-wrapper">
                                        <div class="em-close">&times;</div>
                                        <div class="em-text">
                                            <!-- the error message will be added here dynamically -->
                                        </div>
                                    </div>
                                </div>`;
    closeErrorMessage()
    expect(document.getElementById('error-message').classList.contains('hide')).toBe(true);
})

test('Show error message => remove class hide', () => {
    document.body.innerHTML = `<div id="error-message" class="full-screen hide">
                                    <div class="em-wrapper">
                                        <div class="em-close">&times;</div>
                                        <div class="em-text">
                                            <!-- the error message will be added here dynamically -->
                                        </div>
                                    </div>
                                </div>`;
    showErrorMessage('some text');
    expect(document.getElementById('error-message').classList.contains('hide')).toBe(false);
})