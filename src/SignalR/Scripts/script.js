$(function() {
    // declare a proxy reference to the hub
    var chat = $.connection.chatHub;

    // create a function that the hub can call to broadcast messages
    chat.client.broadcastMessage = function (name, message) {

        // HTML encode display name and message
        var encodedName = $("<div />").text(name).html();
        var encodedMessage = $("<div />").text(message).html();

        // add message to the page
        $("#discussion").append("<li><strong>" + encodedName + "</strong>:&nbsp;&nbsp;" + encodedMessage + "</li>");
    };

    // get the user name and store it to prepend to messages
    $("#displayname").val(prompt("Enter your name:", ""));

    // set initial focus to the message input box
    $("#message").focus();

    // start the connection
    $.connection.hub.start().done(function() {
        $("#sendmessage").click(function() {
            // call the Send method on the hub
            chat.server.send($("#displayname").val(), $("#message").val());
            // Clear text box and reset focus for next comment. 
            $("#message").val("").focus();
        });
    });
});