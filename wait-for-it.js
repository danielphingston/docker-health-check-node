const { URL } = require("url");

function waitForIt(url) {
    let client;
    const options = new URL(url);
    if (options.protocol == "https:") {
        client = require("https");
    } else {
        client = require("http");
    }
    makeRequest(client, options);
}

function makeRequest(client, options) {
    const req = client.request(options, function (r) {
        console.log(JSON.stringify(r.headers));
    });
    req.on("error", () => {
        console.log(`host not up retrying`);
        setTimeout(() => {
            makeRequest(client, options);
        }, 1000);
    });
    req.end();
}

waitForIt(process.argv[2]);
