/*
    Here is an example of calling the server using jQuery. It has the exact functionality the the XMLHttpRequest
    example but using jQuery we need less code. The two options we have are:
        1. $.get()      -   will return text
        2. $getJSON()   -   will return a JSON object

    Both options above return a promise. jQuery has this built in because server calls are potentially long running
    tasks. However we can use $.ajax to get you closer to the XMLHttpRequest object but you would be as well to use
    the XMLHttpRequest object.
*/

const url = "./data.json";

$("#btn-get").click(function() {
    // returns a promise so we can add done() inline. data contains our json
    $.getJSON(url).done(function (data) {
        writeToLog(data.message);
    });
});

$("#btn-clear").click(function() {
    $("#log").empty();
});

// Helpers
function writeToLog(message) {
    $("#log").append("<span>> " + message + "</span>");
}