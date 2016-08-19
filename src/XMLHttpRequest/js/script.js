/*
    Here is an example of using XMLHttpRequest to get a resource from a server. The process is:
        1. Create the XMLHttpRequest object
        2. Use onreadystatechange to do work based on readyState
        3. Open a connection to the server
        4. Send the request

    The readyState is an number and can be the following:

    readyState              description
    -------------------------------------------------------------------------------------
    0	UNSENT:	            Client has been created. open() not called yet.
    1	OPENED:             open() has been called.
    2	HEADERS_RECEIVED:	send() has been called, and headers and status are available.
    3	LOADING:	        Downloading; responseText holds partial data.
    4	DONE:	            The operation is complete.
*/

const url = "./data.json";

$("#btn-get").click(function() {
    // xhr is the standard variable name for a XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // when we get data
    xhr.onreadystatechange = function () {
        // if done and status is 200
        if (xhr.readyState === 4 && xhr.status === 200) {
            // parse to a JSON object
            var data = JSON.parse(xhr.responseText);
            writeToLog(data.message);
        }
    };

    // open the connection to the server
    xhr.open("GET", url);
    // send the request
    xhr.send();
});

$("#btn-clear").click(function() {
    $("#log").empty();
});

// Helpers
function writeToLog(message) {
    $("#log").append("<span>> " + message + "</span>");
}