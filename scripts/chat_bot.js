$(document).ready(function(){
    runChatBot();
});

function runChatBot() {
    let currentQuestionsBlockId = "";

    createChatBotIcon();
    createChatBotDialogModal();
}

function createChatBotIcon() {
    let chatBotIconDiv = document.createElement("div");
    chatBotIconDiv.id = "chat-bot-icon-div";

    let chatBotIcon = document.createElement("img");
    chatBotIcon.id = "chat-bot-icon";
    chatBotIcon.src = "images/chat-bot-icon.jpg"
    chatBotIcon.alt = "Chat-bot";
    chatBotIcon.onclick = openChatBotDialog;

    chatBotIconDiv.appendChild(chatBotIcon);
    document.body.append(chatBotIconDiv);

    let textNeedHelp = document.createElement("p");
    textNeedHelp.innerHTML = "Нужна помощь?";
    textNeedHelp.id = "need-help-text";
    textNeedHelp.hidden = true;
    textNeedHelp.classList.add("chat-bot-text-need-help");
    chatBotIconDiv.appendChild(textNeedHelp);

    $("#chat-bot-icon").hover(function() {
        $("#need-help-text").fadeIn(1000);
    }, function() {
        $("#need-help-text").fadeOut(1000);
    });
}

function createChatBotDialogModal() {
    let chatBotDialogModal = document.createElement("div");
    chatBotDialogModal.id = "chat-bot-dialog-modal";
    chatBotDialogModal.hidden = true;

    document.body.append(chatBotDialogModal);

    let closeChatBotDialogModalButton = document.createElement("span");
    closeChatBotDialogModalButton.id = "close-chat-bot-dialog-modal-button";
    closeChatBotDialogModalButton.onclick = closeChatBotDialog;
    chatBotDialogModal.appendChild(closeChatBotDialogModalButton);

    let chatBotSendMessageDiv = document.createElement("div");
    chatBotSendMessageDiv.id = "chat-bot-send-message-div";

    chatBotDialogModal.appendChild(chatBotSendMessageDiv);

    let chatBotSendMessageText = document.createElement("input");
    chatBotSendMessageText.id = "chat-bot-send-message-text";
    chatBotSendMessageText.placeholder = "Как авторизоваться?";

    let chatBotSendMessageButton = document.createElement("img");
    chatBotSendMessageButton.id = "chat-bot-send-message-button";
    chatBotSendMessageButton.src = "images/chat-bot-send-message-button.png";
    chatBotSendMessageButton.alt = "Найти";
    chatBotSendMessageButton.onclick = chatBotFindQuestion;

    chatBotSendMessageDiv.appendChild(chatBotSendMessageText);
    chatBotSendMessageDiv.appendChild(chatBotSendMessageButton);

    let chatBotMessagesAreaDiv = document.createElement("div");
    chatBotMessagesAreaDiv.id = "chat-bot-messages-area-div";

    chatBotDialogModal.appendChild(chatBotMessagesAreaDiv);

    createFirstMessages();
}

function openChatBotDialog() {
    $("#chat-bot-icon-div").fadeOut(100);
    $("#chat-bot-dialog-modal").fadeIn(1000);
}

function closeChatBotDialog() {
    $("#chat-bot-dialog-modal").fadeOut(100);
    $("#chat-bot-icon-div").fadeIn(1000);
}

function chatBotFindQuestion() {
    let message = $("#chat-bot-send-message-text").val();
    $("#chat-bot-send-message-text").val("");
    chatBotCreateUserMessage(message);
    showResultsForUserMessage();
    scrollDownChat();
}

function chatBotCreateUserMessage(message) {
    if (message.length > 0) {
        let userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("user-message-div");

        let userMessage = document.createElement("p");
        userMessage.classList.add("chat-bot-user-message");
        userMessage.classList.add("chat-bot-messages");
        userMessage.innerHTML = message;

        userMessageDiv.appendChild(userMessage);

        $("#chat-bot-messages-area-div").append(userMessageDiv);
    }
}
function showResultsForUserMessage() {
    let messagesArea = $("#chat-bot-messages-area-div");
    let chatBotAnswer = createChatBotMessage("Извините, по данному запросу ничего не найдено");

    messagesArea.append(chatBotAnswer);

    let currentQestion = document.getElementById(currentQuestionsBlockId);
    currentQestion.remove();
    messagesArea.append(currentQestion);
}


function createFirstMessages() {
    let messagesArea = $("#chat-bot-messages-area-div");
    let firstMessagesDiv = createChatbotDiv("first-messages-div");
    let chatBotWelcomeText = createChatBotMessage("Я робот-помощник СЕВГУ.РУ, и попытаюсь помочь Вам решить возникающие вопросы");
    let chatBotFirstQestion = createChatBotMessage("Для начала мне нужно узнать вашу роль в системе дистанционного обучения. Кем вы являетесь?");

    messagesArea.append(firstMessagesDiv);
    firstMessagesDiv.append(chatBotWelcomeText);
    firstMessagesDiv.append(chatBotFirstQestion);

    let chatBotChoseTeacherButton = createChatBotButton("chat-bot-teacher-button", "Преподаватель");
    chatBotChoseTeacherButton.onclick = choseCategoryForTeachers;

    let chatBotChoseStudentButton = createChatBotButton("chat-bot-student-button", "Студент");
    chatBotChoseStudentButton.onclick = choseCategoryForStudents;

    let chatBotChoseOutsideListenerButton = createChatBotButton("chat-bot-outside-listener-button", "Внешний слушатель");
    chatBotChoseOutsideListenerButton.onclick = choseCategoryForOutsideListeners;

    let chatBotChoseTutorButton = createChatBotButton("chat-bot-tutor-button", "Тьютер");
    chatBotChoseTutorButton.onclick = choseCategoryForTutors;

    firstMessagesDiv.append(chatBotChoseTeacherButton);
    firstMessagesDiv.append(chatBotChoseStudentButton);
    firstMessagesDiv.append(chatBotChoseOutsideListenerButton);
    firstMessagesDiv.append(chatBotChoseTutorButton);

    currentQuestionsBlockId = "first-messages-div";

    scrollDownChat();
}

function choseCategoryForTeachers() { alert("Функционал ответов будет разработан позднее!"); }

function choseCategoryForStudents() { alert("Функционал ответов будет разработан позднее!"); }

function choseCategoryForOutsideListeners() { alert("Функционал ответов будет разработан позднее!"); }

function choseCategoryForTutors() { alert("Функционал ответов будет разработан позднее!"); }

function scrollDownChat() {
    $("#chat-bot-messages-area-div").scrollTop($("#chat-bot-messages-area-div")[0].scrollHeight);
}

function createChatBotButton(id, text) {
    let button = document.createElement("div");
    button.id = id;
    button.classList.add("chat-bot-variant-button");
    button.innerHTML = text;

    return button;
}

function createChatBotMessage(text) {
    let message = document.createElement("p");
    message.classList.add("chat-bot-messages");
    message.innerHTML = text;

    return message;
}

function createChatbotDiv(id) {
    let div = document.createElement("div");
    div.id = id;

    return div;
}
