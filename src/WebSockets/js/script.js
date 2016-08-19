// Web Sockets has its own protocol (ws and wss) on port 80 and wss on port 443
var url = "ws://" + window.location.hostname + ":" + window.location.port + "/api/wschat";
var ws;

$().ready(function() {
    $("#btn-disconnect").hide();
});

$("#btn-connect").click(function() {

    writeToLog("connecting...");
    ws = new WebSocket(url);

    // when the connection is opened
    ws.onopen = function() {
        writeToLog("connected");
        $("#btn-connect").hide();
        $("#btn-disconnect").show();
        $("#btn-send").removeAttr("disabled");
    };

    // when we recieve a message from the server
    ws.onmessage = function(e) {
        writeToLog(e.data);
    };

    // when an error occors
    ws.onerror = function(e) {
        writeToLog(e.message);
    };

    // when the connection with the server is closed
    ws.onclose = function() {
        writeToLog("disconnected");
        $("#btn-connect").show();
        $("#btn-disconnect").hide();
        $("#btn-send").attr("disabled", "disabled");
    };
});

$("#btn-disconnect").click(function () {
    writeToLog("disconnecting...");
    ws.close();
});

$("#btn-send").click(function() {
    /*
        Constant	Value	Description
        ----------------------------------------------------------------------
        CONNECTING  0	    The connection is not yet open.
        OPEN	    1	    The connection is open and ready to communicate.
        CLOSING	    2	    The connection is in the process of closing.
        CLOSED	    3	    The connection is closed or couldn't be opened.
    */
    if (ws.readyState === WebSocket.OPEN) {
        ws.send($("#input").val());
        $("#input").val("");
    }
});

$("#btn-clear").click(function() {
    $("#log").empty();
});

// Helpers
function writeToLog(message) {
    $("#log").append("<span>> " + message + "</span>");
}