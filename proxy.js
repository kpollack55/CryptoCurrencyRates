const commandLineArgs = require("command-line-args");
const http = require("http");
const httpProxy = require("http-proxy");

// Port and target for the proxy server
const optionDefinitions = [
    {
        name: "port",
        alias: "p",
        type: Number,
        defaultValue: 3001
    },
    {
        name: "target",
        alias: "t",
        type: String,
        defaultValue: "https://coinmarketcap.com/"
    }
];
const options = commandLineArgs(optionDefinitions);

// Create the proxy
const proxy = httpProxy.createProxyServer({});

// Sets the HTTP error status for the response
const sendError = function(res, err) {
    return res.status(500).send({
        error: err,
        message: "The proxy has encountered an error"
    });
};

// Sends an error response to the client
proxy.on("error", function (err, req, res) {
    sendError(res, err);
});

// Set header value to get around CORS policy
var enableCors = function(req, res) {
    if (req.headers['access-control-request-method']) {
        res.setHeader('access-control-allow-methods', req.headers['access-control-request-method']);
    }

    if (req.headers['access-control-request-headers']) {
        res.setHeader('access-control-allow-headers', req.headers['access-control-request-headers']);
    }

    if (req.headers.origin) {
        res.setHeader('access-control-allow-origin', req.headers.origin);
        res.setHeader('access-control-allow-credentials', 'true');
    }
};

// If the proxy gets a response, enable CORS
proxy.on("proxyRes", function(proxyRes, req, res) {
    enableCors(req, res);
});


// Create the proxy server
const server = http.createServer(function(req, res) {
    if (req.method === 'OPTIONS') {
        enableCors(req, res);
        res.writeHead(200);
        res.end();
        return;
    }

    // Proxy a web request to the target passed from the options variable
    proxy.web(req, res, {
        target: options.target,
        changeOrigin: true // Change the origin of the host head to the target
    }, function(err) {
        sendError(res, err);
    });
});

// Start up the proxy
console.log("Starting proxy server on port", options.port, "for the target ", options.target);
server.listen(options.port);
