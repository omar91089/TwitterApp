var App = {};

App.ws = null;
App.queueCount = 0;
App.isCreated = false;
App.connectionURL = "ws://localhost:3000/echo";
App.PAGE_TWEET_LIMIT = 10;  // simply display the count after the limit

// checks if param is a JSON obj ; returns false otherwise
App.checkJSON = function(data) {
    var retVal;
    try {
        retVal = JSON.parse(data);
    } catch(e) {
        retVal = false;
    }
    return retVal;
}

// creates a DOM element and appends to parent
App.createTweetBox = function(container, msg, styleClass) {
    var newElement = document.createElement("div");
    var elementText = document.createTextNode(msg);

    newElement.className = styleClass;
    newElement.appendChild(elementText);
    container.appendChild(newElement);
}

// handler for streaming tweets
App.handleClick = function(trendElement) {
    var trend = trendElement.text;
    var titleStr = "Tweets for " + trend;
    var tweetsTitle = document.getElementById("tweets-title");
    tweetsTitle.innerHTML = titleStr;

    App.queueCount = 0;
    App.isCreated = false;

    // use the same connection
    if (App.ws) {
        App.ws.send(trend);
    } else {
        App.ws = new WebSocket(App.connectionURL);
    }

    var divElement = document.getElementById("tweets-content");

    // remove tweets for previous trend
    while (divElement.hasChildNodes()) {
         divElement.removeChild(divElement.lastChild);
    }

    // WebSocket event handlers
    App.ws.onopen = function(event) {
       App.ws.send(trend);
    };

    App.ws.onmessage = function (event) {
       var msg = event.data;
       var data = App.checkJSON(msg);
       if (data) {
           tweetsTitle.innerHTML = titleStr + " : " + data.message;
       } else if (divElement.children && divElement.children.length > App.PAGE_TWEET_LIMIT) {
           App.queueCount++;
           msg = ' +' + App.queueCount + ' more';
           if (!App.isCreated) {
               App.createTweetBox(divElement, msg, "tweet-box");
               App.isCreated = true;
           } else {
               divElement.lastChild.innerHTML = msg;
           }
       } else {
           App.createTweetBox(divElement, msg, "tweet-box");
       }
    };

    App.ws.onerror = function(event) {
        var msg = "Websocket Error!";
        tweetsTitle.innerHTML = titleStr + " : " + msg;
    };

    App.ws.onclose = function(event) {
        var msg = "Websocket connection closed"
        tweetsTitle.innerHTML = titleStr + " : " + msg;
    };
}
