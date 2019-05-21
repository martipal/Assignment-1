let messages = [];

let storedMessages = JSON.stringify({
    "messages": ["Most recently added message",
        "This is a default message.",
        "Is this twitter?",
        "Message 2", "Hello!",
        "Is Pluto a planet again?",
        "Yes",
        "@#()!",
        "12345",
        "Oldest message"]
});

let MAX_LIST_LENGTH = 10000;

let messagesToDisplay = 10;

let displayDefaults = true;

let moveMessages = true;

displayMessages();

function displayMessages() {
    if (messages.length == 0 && displayDefaults == true) {
        // Initializes default messages into messages if the page was newly loaded (messages is empty). 
        initializeDisplayedMessagesWithDefaults();
    }

    displayAvailableMessages();
}

function displayAvailableMessages() {
    let ul = document.getElementById("message_list");
    let startingSize = determineStartingSize(messagesToDisplay);
    for (var i = 0; i < messagesToDisplay; i++) {
        if (messages[i]) {
            let li = document.createElement("li");
            li.innerHTML = createInnerLIHTML();
            formatMessageItem(li);
            startingSize = startingSize - 4;
            ul.appendChild(li);
        }
    }

    function formatMessageItem(li) {
        li.style.color = randomColour();
        li.style.fontSize = startingSize + "px";
        li.style.padding = "0px";
    }

    function createInnerLIHTML() {
        if (moveMessages == true) {
            return "<marquee behaviour=\"alternate\" onmouseover=\"this.stop();\" onmouseout=\"this.start();\" scrollamount=16>" + messages[i] + "</marquee>";
        } else {
            return messages[i];
        }
    }
}

function initializeDisplayedMessagesWithDefaults() {
    let defaultMessages = JSON.parse(storedMessages);
    messages = messages.concat(defaultMessages.messages);
}

function determineStartingSize(messagesToDisplay) {
    if (messages.length > 80) {
        return 300;
    } else {
        return 50;
    }
}

function randomColour() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function addText(textInput) {
    document.getElementById("form").reset();

    if (textInput !== "Insert Message Here...") {
        messages.unshift(textInput);
        clearUL();
        displayMessages();
    }
}

function clearUL() {
    document.getElementById("message_list").innerHTML = '';
}

function clearTextLog() {
    messages = [];
    displayDefaults = false;
    clearUL();
    displayMessages();
}

function expandMessages() {
    if (messagesToDisplay == 10) {
        messagesToDisplay = MAX_LIST_LENGTH;
        clearUL();
        displayMessages();

        hideExpandShowCollapse();
    }
}

function hideExpandShowCollapse() {
    document.getElementById("expand_button").style.visibility = 'hidden';
    document.getElementById("collapse_button").style.visibility = 'visible';
}

function collapseMessages() {
    if (messagesToDisplay == MAX_LIST_LENGTH) {
        messagesToDisplay = 10;
        clearUL();
        displayMessages();


        hideCollapseShowExpand();
    }
}

function hideCollapseShowExpand() {
    document.getElementById("collapse_button").style.visibility = 'hidden';
    document.getElementById("expand_button").style.visibility = 'visible';
}

function stopMovement() {
    let movementButton = document.getElementById("stop_movement");
    if (moveMessages == true) {
        movementButton.innerHTML = 'Start Scroll';
        moveMessages = false;
    } else {
        movementButton.innerHTML = 'Stop Scroll';
        moveMessages = true;
    }
    clearUL();
    displayMessages();
}

