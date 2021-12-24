$(document).ready(function(){
    createChatBotIcon();
});

function createChatBotIcon() {
    let chatBotIconDiv = document.createElement("div");
    chatBotIconDiv.id = "chat-bot-icon-div";

    let chatBotIcon = document.createElement("img");
    chatBotIcon.id = "chat-bot-icon";
    chatBotIcon.src = "images/chat-bot-icon.jpg"
    chatBotIcon.alt = "Chat-bot";
    chatBotIcon.classList.add("chat-bot-icon");

    chatBotIconDiv.appendChild(chatBotIcon);
    document.body.append(chatBotIconDiv);

    let textNeedHelp = document.createElement("p");
    textNeedHelp.innerHTML = "Нужна помощь?";
    textNeedHelp.id = "need-help-text";
    textNeedHelp.hidden = true;
    chatBotIconDiv.appendChild(textNeedHelp);

    $("#chat-bot-icon").hover(function() {
        $("#need-help-text").fadeIn(1000);
    }, function() {
        $("#need-help-text").fadeOut(1000);
    });
}