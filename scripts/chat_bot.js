$(document).ready(function(){
    runChatBot();
});

function runChatBot() {
    let currentQuestionsBlockId = "";
    let chatBotIconLocation = "images/chat-bot-icon.jpg";
    let chatBotSendMessageIconLocation = "images/chat-bot-send-message-button.png";

    createChatBotIcon(chatBotIconLocation);
    createChatBotDialogModal(chatBotSendMessageIconLocation);
}

function createChatBotIcon(chatBotIconLocation) {
    let chatBotIconDiv = document.createElement("div");
    chatBotIconDiv.id = "chat-bot-icon-div";

    let chatBotIcon = document.createElement("img");
    chatBotIcon.id = "chat-bot-icon";
    chatBotIcon.src = chatBotIconLocation;
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

function createChatBotDialogModal(chatBotSendMessageIconLocation) {
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
    chatBotSendMessageButton.src = chatBotSendMessageIconLocation;
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
    let firstQuestionVariants = createChatbotDiv("first-question-variants");

    messagesArea.append(firstMessagesDiv);
    firstMessagesDiv.append(chatBotWelcomeText);
    firstMessagesDiv.append(chatBotFirstQestion);
    firstMessagesDiv.append(firstQuestionVariants);

    let chatBotChoseTeacherButton = createChatBotButton("chat-bot-teacher-button", "Преподаватель");
    chatBotChoseTeacherButton.onclick = choseCategoryForTeachers;

    let chatBotChoseStudentButton = createChatBotButton("chat-bot-student-button", "Студент");
    chatBotChoseStudentButton.onclick = choseCategoryForStudents;

    let chatBotChoseOutsideListenerButton = createChatBotButton("chat-bot-outside-listener-button", "Внешний слушатель");
    chatBotChoseOutsideListenerButton.onclick = choseCategoryForOutsideListeners;

    let chatBotChoseTutorButton = createChatBotButton("chat-bot-tutor-button", "Тьютер");
    chatBotChoseTutorButton.onclick = choseCategoryForTutors;

    firstQuestionVariants.appendChild(chatBotChoseTeacherButton);
    firstQuestionVariants.appendChild(chatBotChoseStudentButton);
    firstQuestionVariants.appendChild(chatBotChoseOutsideListenerButton);
    firstQuestionVariants.appendChild(chatBotChoseTutorButton);

    currentQuestionsBlockId = "first-messages-div";
    scrollDownChat();
}

// Begining of the block with qestions related to teachers

function choseCategoryForTeachers() { 
    $("#first-question-variants").remove();

    let userChose = chatBotCreateUserMessage("Преподаватель");

    let messagesArea = $("#chat-bot-messages-area-div");
    let firstCategoryForTeachersDiv = createChatbotDiv("first-category-for-teachers-div");
    let firstCategoryForTeachersVariants = createChatbotDiv("first-category-for-teachers-variants");

    messagesArea.append(userChose);
    messagesArea.append(firstCategoryForTeachersDiv);

    let firstCategoryForTeachersMessage = createChatBotMessage("Выберите пожалуйста категорию, к которой относится Ваш вопрос:");

    firstCategoryForTeachersDiv.appendChild(firstCategoryForTeachersMessage);
    firstCategoryForTeachersDiv.append(firstCategoryForTeachersVariants);

    let chatBotChoseAuthProblemsButton = createChatBotButton("chat-bot-teachers-auth-problem-btn", "Проблемы с авторизацией");
    chatBotChoseAuthProblemsButton.onclick = answerForTeacherAuthProblem;

    let chatBotSetupElementsProblemButton = createChatBotButton("teachers-setup-elements-problem-btn", "Проблемы с настройкой элементов курса");
    chatBotSetupElementsProblemButton.onclick = choseSubcategoryForTeacherSetupElements;

    let chatBotEncrollmentProblemsButton = createChatBotButton("chat-bot-teachers-encrollment-problem-btn", "Проблемы с зачислением пользователей на курс/отчислением пользователей из курса");
    chatBotEncrollmentProblemsButton.onclick = choseSubcategoryForTeacherEncrollmentProblems;

    let chatBotTeachersGradebookProblemsButton = createChatBotButton("teachers-gradebook-problem-btn", "Проблемы с настройкой журнала оценок");
    chatBotTeachersGradebookProblemsButton.onclick = choseSubcategoryForTeacherGradebookProblems;

    let chatBotTeachersQuestionsBankProblemsButton = createChatBotButton("teachers-questions-bank-problem-btn", "Проблемы с настройкой банка вопросов");
    chatBotTeachersQuestionsBankProblemsButton.onclick = choseSubcategoryForTeacherQuestionsBankProblems;

    let chatBotTeachersGroupesBreakdownProblemsButton = createChatBotButton("teachers-groupes-breakdown-problem-btn", "Проблемы с разбиением групп на подгруппы");
    chatBotTeachersGroupesBreakdownProblemsButton.onclick = choseSubcategoryForTeacherGroupesBreakdownProblems;

    firstCategoryForTeachersVariants.appendChild(chatBotChoseAuthProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotSetupElementsProblemButton);
    firstCategoryForTeachersVariants.appendChild(chatBotEncrollmentProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotTeachersGradebookProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotTeachersQuestionsBankProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotTeachersGroupesBreakdownProblemsButton);

    currentQuestionsBlockId = "first-category-for-teachers-div";
    scrollDownChat();
}

function answerForTeacherAuthProblem() {
    let userChose =  chatBotCreateUserMessage($("#chat-bot-teachers-auth-problem-btn").text());

    $("#first-category-for-teachers-variants").remove();

    let messagesArea = $("#chat-bot-messages-area-div");
    let answerForTeacherAuthProblemDiv = createChatbotDiv("answer-for-teachers-auth-problems-div");

    messagesArea.append(userChose);
    messagesArea.append(answerForTeacherAuthProblemDiv);

    let answerForTeacherAuthProblems = createChatBotMessage("Тут будет стандартный ответ на вопрос об авторизации");
    answerForTeacherAuthProblemDiv.appendChild(answerForTeacherAuthProblems);

    setTimeout(renderBlockIsChatBotHelped, 5000);
    scrollDownChat();
}


// Begining of the block with qestions related to setup elements
function choseSubcategoryForTeacherSetupElements() {
    let userChose = chatBotCreateUserMessage($("#teachers-setup-elements-problem-btn").text());

    $("#first-category-for-teachers-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSetupElementsDiv = createChatbotDiv("subcategory-for-setup-elements-div");
    let subcategoryForSetupElementsVariants = createChatbotDiv("subcategory-for-setup-elements-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSetupElementsDiv);

    let subcategoryForSetupElementsMessage = createChatBotMessage("Выберите пожалуйста элемент, с которым возникли проблемы:");

    subcategoryForSetupElementsDiv.appendChild(subcategoryForSetupElementsMessage);
    subcategoryForSetupElementsDiv.append(subcategoryForSetupElementsVariants);

    let chatBotSetupExercisesButton = createChatBotButton("chat-bot-setup-exercises-problem-btn", "Как настроить элемент 'Задание'?");
    chatBotSetupExercisesButton.onclick = answerForSetupExercises;

    let chatBotSetupForumButton = createChatBotButton("chat-bot-setup-forum-problem-btn", "Как настроить элемент 'Форум'?");
    chatBotSetupForumButton.onclick = answerForSetupForum;

    let chatBotSetupLectureButton = createChatBotButton("chat-bot-setup-lecture-problem-btn", "Как настроить элемент 'Электронная лекция'?");
    chatBotSetupLectureButton.onclick = answerForSetupLecture;

    let chatBotSetupSeminarButton = createChatBotButton("chat-bot-setup-seminar-problem-btn", "Как настроить элемент 'Семинар'?");
    chatBotSetupSeminarButton.onclick = answerForSetupSeminar;

    let chatBotSetupTestButton = createChatBotButton("chat-bot-setup-test-problem-btn", "Как настроить элемент 'Тест'?");
    chatBotSetupTestButton.onclick = answerForSetupTest;

    subcategoryForSetupElementsVariants.appendChild(chatBotSetupExercisesButton);
    subcategoryForSetupElementsVariants.appendChild(chatBotSetupForumButton);
    subcategoryForSetupElementsVariants.appendChild(chatBotSetupLectureButton);
    subcategoryForSetupElementsVariants.appendChild(chatBotSetupSeminarButton);
    subcategoryForSetupElementsVariants.appendChild(chatBotSetupTestButton);

    currentQuestionsBlockId = "subcategory-for-setup-elements-div";
    scrollDownChat();
}

function answerForSetupExercises() { console.log("Exersizes!"); }

function answerForSetupForum() { console.log("Forum!"); }

function answerForSetupLecture() { console.log("Lecture!"); }

function answerForSetupSeminar() { console.log("Seminar!"); }

function answerForSetupTest() { console.log("Test!"); }

// End of the block with qestions related to setup elements

function choseSubcategoryForTeacherEncrollmentProblems() {}

function choseSubcategoryForTeacherGradebookProblems() {}

function choseSubcategoryForTeacherQuestionsBankProblems() {}

function choseSubcategoryForTeacherGroupesBreakdownProblems() {}

// End of the block with qestions related to teachers

function choseCategoryForStudents() { alert("Функционал ответов на данную категорию будет разработан позднее!"); }

function choseCategoryForOutsideListeners() { alert("Функционал ответов на данную категорию будет разработан позднее!"); }

function choseCategoryForTutors() { alert("Функционал ответов на данную категорию будет разработан позднее!"); }

function scrollDownChat() {
    $("#chat-bot-messages-area-div").scrollTop($("#chat-bot-messages-area-div")[0].scrollHeight);
}

function createChatBotButton(id, text) {
    let button = document.createElement("button");
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

function renderBlockIsChatBotHelped() {
    let messagesArea = $("#chat-bot-messages-area-div");
    let isChatBotHelpedQuestion = createChatBotMessage("Помог ли Вам мой ответ?");
    let yesNoButtonsDiv = createChatbotDiv("chat-bot-yes-no-buttons");

    messagesArea.append(isChatBotHelpedQuestion);
    messagesArea.append(yesNoButtonsDiv);

    let yesAnswerButton = createChatBotButton("chat-bot-yes-answer", "Да");
    yesAnswerButton.onclick = yesUserAnswer;

    let noAnswerButton = createChatBotButton("chat-bot-no-answer", "Нет");
    noAnswerButton.onclick = noUserAnswer;

    yesNoButtonsDiv.append(yesAnswerButton);
    yesNoButtonsDiv.append(noAnswerButton);

    scrollDownChat();
}

function yesUserAnswer() {
    let messagesArea = $("#chat-bot-messages-area-div");
    let choseAnswer = chatBotCreateUserMessage("Да");
    let gladForHelpMessage = createChatBotMessage("Я очень рад что смог помочь! Нужна ли ещё моя помощь?");
    let yesNoButtonsDiv = createChatbotDiv("chat-bot-yes-no-buttons");

    messagesArea.append(choseAnswer);
    messagesArea.append(gladForHelpMessage);
    messagesArea.append(yesNoButtonsDiv);

    let yesAnswerButton = createChatBotButton("user-yes-answer", "Да");
    yesAnswerButton.onclick = clearChatAndRenderFirstMessages;

    let noAnswerButton = createChatBotButton("user-no-answer", "Нет");
    noAnswerButton.onclick = closeChatBotDialogModalAndClearChat;

    yesNoButtonsDiv.append(yesAnswerButton);
    yesNoButtonsDiv.append(noAnswerButton);

    scrollDownChat();
}

function noUserAnswer() {
    let messagesArea = $("#chat-bot-messages-area-div");
    let choseAnswer = chatBotCreateUserMessage("Нет");
    let sorryForUnhelpMessage = createChatBotMessage("Мне очень жаль что не смог помочь, но я всё время учусь! Нужна ли ещё моя помощь?");
    let yesNoButtonsDiv = createChatbotDiv("chat-bot-yes-no-buttons");

    messagesArea.append(choseAnswer);
    messagesArea.append(sorryForUnhelpMessage);
    messagesArea.append(yesNoButtonsDiv);

    let yesAnswerButton = createChatBotButton("user-yes-answer", "Да");
    yesAnswerButton.onclick = clearChatAndRenderFirstMessages;

    let noAnswerButton = createChatBotButton("user-no-answer", "Нет");
    noAnswerButton.onclick = closeChatBotDialogModalAndClearChat;

    yesNoButtonsDiv.append(yesAnswerButton);
    yesNoButtonsDiv.append(noAnswerButton);

    scrollDownChat();
}

function clearChatAndRenderFirstMessages() {
    let messagesArea = $("#chat-bot-messages-area-div");
    messagesArea.empty();
    createFirstMessages();
}

function closeChatBotDialogModalAndClearChat() {
    let messagesArea = $("#chat-bot-messages-area-div");
    closeChatBotDialog();
    messagesArea.empty();
    createFirstMessages();
}
