const { sendRequestOnLocalServer } = require('./app');



test('Send request to local server', () => {
    expect(
        sendRequestOnLocalServer({url: 'https://blog.udacity.com/2019/09/introducing-the-new-front-end-and-full-stack-web-developer-nanodegree-programs.html'})
        );
})