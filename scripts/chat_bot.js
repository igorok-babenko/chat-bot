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

    firstQuestionVariants.appendChild(chatBotChoseTeacherButton);
    firstQuestionVariants.appendChild(chatBotChoseStudentButton);
    firstQuestionVariants.appendChild(chatBotChoseOutsideListenerButton);

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
    chatBotChoseAuthProblemsButton.onclick = choseSubcategoryForTeacherAuthProblems;

    let chatBotSetupElementsProblemButton = createChatBotButton("teachers-setup-elements-problem-btn", "Проблемы с настройкой элементов курса");
    chatBotSetupElementsProblemButton.onclick = choseSubcategoryForTeacherSetupElements;

    let chatBotEncrollmentProblemsButton = createChatBotButton("chat-bot-teachers-encrollment-problem-btn", "Проблемы с зачислением пользователей на курс/отчислением пользователей из курса");
    chatBotEncrollmentProblemsButton.onclick = choseSubcategoryForTeacherEncrollmentProblems;

    let chatBotTeachersGradebookProblemsButton = createChatBotButton("teachers-gradebook-problem-btn", "Как настроить журнал оценок?");
    chatBotTeachersGradebookProblemsButton.onclick = answerForTeacherGradebookProblems;

    let chatBotTeachersQuestionsBankProblemsButton = createChatBotButton("teachers-questions-bank-problem-btn", "Как настроить банк вопросов?");
    chatBotTeachersQuestionsBankProblemsButton.onclick = choseSubcategoryForTeacherQuestionsBankProblems;

    let chatBotTeachersGroupesBreakdownProblemsButton = createChatBotButton("teachers-groupes-breakdown-problem-btn", "Как разбить группы на подгруппы?");
    chatBotTeachersGroupesBreakdownProblemsButton.onclick = answerForTeacherGroupesBreakdownProblems;

    firstCategoryForTeachersVariants.appendChild(chatBotChoseAuthProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotSetupElementsProblemButton);
    firstCategoryForTeachersVariants.appendChild(chatBotEncrollmentProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotTeachersGradebookProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotTeachersQuestionsBankProblemsButton);
    firstCategoryForTeachersVariants.appendChild(chatBotTeachersGroupesBreakdownProblemsButton);

    currentQuestionsBlockId = "first-category-for-teachers-div";
    scrollDownChat();
}

// Begining of the block with qestions related to teacher auth problems
function choseSubcategoryForTeacherAuthProblems() {
    let userChose =  chatBotCreateUserMessage($("#chat-bot-teachers-auth-problem-btn").text());

    $("#first-category-for-teachers-variants").remove();

    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForTeachersAuthProblemsDiv = createChatbotDiv("subcategory-for-teachers-auth-problems-div");
    let subcategoryForTeachersAuthProblemsVariants = createChatbotDiv("subcategory-for-teachers-auth-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForTeachersAuthProblemsDiv);

    let subcategoryForTeacherAuthProblemsMessage = createChatBotMessage("Вы являетесь новым пользователем?");

    subcategoryForTeachersAuthProblemsDiv.appendChild(subcategoryForTeacherAuthProblemsMessage);
    subcategoryForTeachersAuthProblemsDiv.append(subcategoryForTeachersAuthProblemsVariants);

    let chatBotSubcategoryForNewAccountButton = createChatBotButton("chat-bot-new-account-btn", "Я новый пользователь");
    chatBotSubcategoryForNewAccountButton.onclick = subcategoryForNewAccountAuthQuestions;

    let chatBotSubcategoryForExistsAccountButton = createChatBotButton("chat-bot-exists-account-btn", "У меня уже есть аккаунт");
    chatBotSubcategoryForExistsAccountButton.onclick = subcategoryForExistsAccountAuthQuestions;
   
    subcategoryForTeachersAuthProblemsVariants.appendChild(chatBotSubcategoryForNewAccountButton);
    subcategoryForTeachersAuthProblemsVariants.appendChild(chatBotSubcategoryForExistsAccountButton);

    currentQuestionsBlockId = "subcategory-for-teachers-auth-problems-div";
    scrollDownChat();
}

function subcategoryForNewAccountAuthQuestions() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-new-account-btn").text());

    $("#subcategory-for-teachers-auth-problems-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForNewAccountAuthQuestionsDiv = createChatbotDiv("subcategory-for-new-account-auth-questions-div");
    let subcategoryForNewAccountAuthQuestionVariants = createChatbotDiv("subcategory-for-new-account-auth-questions-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForNewAccountAuthQuestionsDiv);

    let subcategoryForNewAccountAuthQuestionsMessage = createChatBotMessage("У Вас уже есть корпоративная почта?");

    subcategoryForNewAccountAuthQuestionsDiv.appendChild(subcategoryForNewAccountAuthQuestionsMessage);
    subcategoryForNewAccountAuthQuestionsDiv.append(subcategoryForNewAccountAuthQuestionVariants);

    let userHaveCorporateEmailButton = createChatBotButton("chat-bot-have-corporate-email-btn", "Да, у меня уже есть корпоративная почта");
    userHaveCorporateEmailButton.onclick = answerWhenUserHaveCorporateEmail;

    let userHaveNotCorporateEmailButton = createChatBotButton("chat-bot-have-not-corporate-email-btn", "Нет, у меня ещё нет корпоративной почты");
    userHaveNotCorporateEmailButton.onclick = answerWhenUserHaveNotCorporateEmail;

    subcategoryForNewAccountAuthQuestionVariants.appendChild(userHaveCorporateEmailButton);
    subcategoryForNewAccountAuthQuestionVariants.appendChild(userHaveNotCorporateEmailButton);

    currentQuestionsBlockId = "subcategory-for-new-account-auth-questions-div";
    scrollDownChat();
}

function answerWhenUserHaveCorporateEmail() {
    let userChoseText =  $("#chat-bot-have-corporate-email-btn").text(),
        removeVariantsID = "subcategory-for-new-account-auth-questions-variants",
        answerDivID = "answer-for-teachers-auth-problems-having-corporate-email-div",
        answerMessage = "Отправьте пожалуйста запрос на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerWhenUserHaveNotCorporateEmail() {
    let userChoseText =  $("#chat-bot-have-not-corporate-email-btn").text(),
    removeVariantsID = "subcategory-for-new-account-auth-questions-variants",
    answerDivID = "answer-for-teachers-auth-problems-have-not-corporate-email-div",
    answerMessage = "Вам необходимо заполнить <span><a href='docs/form-for-create-corporate-email.pdf'>форму</a></span> и отнести её в ДИС";

chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage); 
}

function subcategoryForExistsAccountAuthQuestions() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-exists-account-btn").text());

    $("#subcategory-for-teachers-auth-problems-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForExistsAccountAuthQuestionsDiv = createChatbotDiv("subcategory-for-exists-account-auth-questions-div");
    let subcategoryForExistsAccountAuthQuestionVariants = createChatbotDiv("subcategory-for-exists-account-auth-questions-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForExistsAccountAuthQuestionsDiv);

    let subcategoryForExistsAccountAuthQuestionsMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForExistsAccountAuthQuestionsDiv.appendChild(subcategoryForExistsAccountAuthQuestionsMessage);
    subcategoryForExistsAccountAuthQuestionsDiv.append(subcategoryForExistsAccountAuthQuestionVariants);

    let userForgotPasswordButton = createChatBotButton("chat-bot-teacher-forgot-password-btn", "Забыли пароль?");
    userForgotPasswordButton.onclick = answerWhenTeacherForgotPassword;

    let userBlockedButton = createChatBotButton("chat-bot-teacher-blocked-btn", "Моя учетная запись заблокирована");
    userBlockedButton.onclick = answerWhenTeacherBlocked;

    subcategoryForExistsAccountAuthQuestionVariants.appendChild(userForgotPasswordButton);
    subcategoryForExistsAccountAuthQuestionVariants.appendChild(userBlockedButton);

    currentQuestionsBlockId = "subcategory-for-exists-account-auth-questions-div";
    scrollDownChat();
}

function answerWhenTeacherForgotPassword() {
    let userChoseText =  $("#chat-bot-teacher-forgot-password-btn").text(),
        removeVariantsID = "subcategory-for-exists-account-auth-questions-variants",
        answerDivID = "answer-for-teacher-forgot-password-div",
        answerMessage = "Вопспользуйтесь функцией восстановления пароля (на странице авторизации)";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerWhenTeacherBlocked() {
    let userChoseText =  $("#chat-bot-teacher-blocked-btn").text(),
        removeVariantsID = "subcategory-for-exists-account-auth-questions-variants",
        answerDivID = "answer-for-teacher-blocked-div",
        answerMessage = "Отправьте пожалуйста запрос на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with qestions related to teacher auth problems

// Begining of the block with qestions related to setup elements
function choseSubcategoryForTeacherSetupElements() {
    let userChose =  chatBotCreateUserMessage($("#teachers-setup-elements-problem-btn").text());

    $("#first-category-for-teachers-variants").remove();

    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSetupElementsDiv = createChatbotDiv("subcategory-for-setup-elements-div");
    let subcategoryForSetupElementsVariants = createChatbotDiv("subcategory-for-setup-elements-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSetupElementsDiv);

    let subcategoryForSetupElementsMesage = createChatBotMessage("Уточните пожалуйста раздел элементов, с которыми возникла проблема:");

    subcategoryForSetupElementsDiv.appendChild(subcategoryForSetupElementsMesage);
    subcategoryForSetupElementsDiv.append(subcategoryForSetupElementsVariants);

    let subcategoryForSetupEvaluatedElementsButton = createChatBotButton("chat-bot-setup-evaluated-elements-btn", "Проблемы с оцениваемыми элементами");
    subcategoryForSetupEvaluatedElementsButton.onclick = choseSubcategoryForSetupEvaluatedElements;

    let subcategoryForSetupNonEvaluatedElementsButton = createChatBotButton("chat-bot-setup-non-evaluated-elements-btn", "Проблемы с неоцениваемыми элементами");
    subcategoryForSetupNonEvaluatedElementsButton.onclick = choseSubcategoryForSetupNonEvaluatedElements;

    let subcategoryForSetupExternalResourcesButton = createChatBotButton("chat-bot-setup-external-resources-btn", "Проблемы с настройкой элементов внешних ресурсов (BBB, ЭБС)");
    subcategoryForSetupExternalResourcesButton.onclick = choseSubcategoryForSetupExternalResources;

    let subcategoryForSetupInteractiveElementsButton = createChatBotButton("chat-bot-setup-interactive-elements-btn", "Проблемы с интерактивными элементами");
    subcategoryForSetupInteractiveElementsButton.onclick = choseSubcategoryForSetupInteractiveResources;

    subcategoryForSetupElementsVariants.appendChild(subcategoryForSetupEvaluatedElementsButton);
    subcategoryForSetupElementsVariants.appendChild(subcategoryForSetupNonEvaluatedElementsButton);
    subcategoryForSetupElementsVariants.appendChild(subcategoryForSetupExternalResourcesButton);
    subcategoryForSetupElementsVariants.appendChild(subcategoryForSetupInteractiveElementsButton);

    currentQuestionsBlockId = "subcategory-for-setup-elements-div";
    scrollDownChat();
}

function choseSubcategoryForSetupEvaluatedElements() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-setup-evaluated-elements-btn").text());

    $("#subcategory-for-setup-elements-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSetupEvaluatedElementsDiv = createChatbotDiv("subcategory-for-setup-evaluated-elements-div");
    let subcategoryForSetupEvaluatedElementsVariants = createChatbotDiv("subcategory-for-setup-evaluated-elements-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSetupEvaluatedElementsDiv);

    let subcategoryForSetupEvaluatedElementsMessage = createChatBotMessage("Выберите пожалуйста элемент, с которым возникли проблемы:");

    subcategoryForSetupEvaluatedElementsDiv.appendChild(subcategoryForSetupEvaluatedElementsMessage);
    subcategoryForSetupEvaluatedElementsDiv.append(subcategoryForSetupEvaluatedElementsVariants);

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

    subcategoryForSetupEvaluatedElementsVariants.appendChild(chatBotSetupExercisesButton);
    subcategoryForSetupEvaluatedElementsVariants.appendChild(chatBotSetupForumButton);
    subcategoryForSetupEvaluatedElementsVariants.appendChild(chatBotSetupLectureButton);
    subcategoryForSetupEvaluatedElementsVariants.appendChild(chatBotSetupSeminarButton);
    subcategoryForSetupEvaluatedElementsVariants.appendChild(chatBotSetupTestButton);

    currentQuestionsBlockId = "subcategory-for-setup-evaluated-elements-div";
    scrollDownChat();
}

function answerForSetupExercises() {
    let userChoseText =  $("#chat-bot-setup-exercises-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-evaluated-elements-variants",
        answerDivID = "answer-for-setup-exersizes-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1041'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupForum() {
    let userChoseText =  $("#chat-bot-setup-forum-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-evaluated-elements-variants",
        answerDivID = "answer-for-setup-forum-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1024'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupLecture() {
    let userChoseText =  $("#chat-bot-setup-lecture-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-evaluated-elements-variants",
        answerDivID = "answer-for-setup-lecture-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1036'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupSeminar() {
    let userChoseText =  $("#chat-bot-setup-seminar-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-evaluated-elements-variants",
        answerDivID = "answer-for-setup-seminar-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1043'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupTest() {
    let userChoseText =  $("#chat-bot-setup-test-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-evaluated-elements-variants",
        answerDivID = "answer-for-setup-test-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1057'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function choseSubcategoryForSetupNonEvaluatedElements() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-setup-non-evaluated-elements-btn").text());

    $("#subcategory-for-setup-elements-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSetupNonEvaluatedElementsDiv = createChatbotDiv("subcategory-for-setup-non-evaluated-elements-div");
    let subcategoryForSetupNonEvaluatedElementsVariants = createChatbotDiv("subcategory-for-setup-non-evaluated-elements-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSetupNonEvaluatedElementsDiv);

    let subcategoryForSetupNonEvaluatedElementsMessage = createChatBotMessage("Выберите пожалуйста элемент, с которым возникли проблемы:");

    subcategoryForSetupNonEvaluatedElementsDiv.appendChild(subcategoryForSetupNonEvaluatedElementsMessage);
    subcategoryForSetupNonEvaluatedElementsDiv.append(subcategoryForSetupNonEvaluatedElementsVariants);

    let chatBotSetupFileButton = createChatBotButton("chat-bot-setup-file-problem-btn", "Как настроить элемент 'Файл'?");
    chatBotSetupFileButton.onclick = answerForSetupFile;

    let chatBotSetupPageButton = createChatBotButton("chat-bot-setup-page-problem-btn", "Как настроить элемент 'Страница'?");
    chatBotSetupPageButton.onclick = answerForSetupPage;

    let chatBotSetupQuestionnaireButton = createChatBotButton("chat-bot-setup-questionnaire-problem-btn", "Как настроить элемент 'Анкета'?");
    chatBotSetupQuestionnaireButton.onclick = answerForSetupQuestionnaire;

    let chatBotSetupWikiButton = createChatBotButton("chat-bot-setup-wiki-problem-btn", "Как настроить элемент 'Вики'?");
    chatBotSetupWikiButton.onclick = answerForSetupWiki;

    let chatBotSetupHyperlinkButton = createChatBotButton("chat-bot-setup-hyperlink-problem-btn", "Как настроить элемент 'Гиперссылка'?");
    chatBotSetupHyperlinkButton.onclick = answerForSetupHyperlink;

    subcategoryForSetupNonEvaluatedElementsVariants.appendChild(chatBotSetupFileButton);
    subcategoryForSetupNonEvaluatedElementsVariants.appendChild(chatBotSetupPageButton);
    subcategoryForSetupNonEvaluatedElementsVariants.appendChild(chatBotSetupQuestionnaireButton);
    subcategoryForSetupNonEvaluatedElementsVariants.appendChild(chatBotSetupWikiButton);
    subcategoryForSetupNonEvaluatedElementsVariants.appendChild(chatBotSetupHyperlinkButton);

    currentQuestionsBlockId = "subcategory-for-setup-non-evaluated-elements-div";
    scrollDownChat();
}

function answerForSetupFile() {
    let userChoseText =  $("#chat-bot-setup-file-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-non-evaluated-elements-variants",
        answerDivID = "answer-for-setup-file-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1034'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupPage() {
    let userChoseText =  $("#chat-bot-setup-page-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-non-evaluated-elements-variants",
        answerDivID = "answer-for-setup-page-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1023'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupQuestionnaire() {
    let userChoseText =  $("#chat-bot-setup-questionnaire-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-non-evaluated-elements-variants",
        answerDivID = "answer-for-setup-questionnaire-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1045'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupWiki() {
    let userChoseText =  $("#chat-bot-setup-wiki-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-non-evaluated-elements-variants",
        answerDivID = "answer-for-setup-wiki-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1045'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupHyperlink() {
    let userChoseText =  $("#chat-bot-setup-hyperlink-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-non-evaluated-elements-variants",
        answerDivID = "answer-for-setup-hyperlink-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1045&pageid=1554'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function choseSubcategoryForSetupExternalResources() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-setup-external-resources-btn").text());

    $("#subcategory-for-setup-elements-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSetupExternalResourcesDiv = createChatbotDiv("subcategory-for-setup-external-resources-div");
    let subcategoryForSetupExternalResourcesVariants = createChatbotDiv("subcategory-for-setup-external-resources-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSetupExternalResourcesDiv);

    let subcategoryForSetupExternalResourcesMessage = createChatBotMessage("Выберите пожалуйста элемент, с которым возникли проблемы:");

    subcategoryForSetupExternalResourcesDiv.appendChild(subcategoryForSetupExternalResourcesMessage);
    subcategoryForSetupExternalResourcesDiv.append(subcategoryForSetupExternalResourcesVariants);

    let chatBotSetupBbbButton = createChatBotButton("chat-bot-setup-bbb-problem-btn", "Как настроить элемент 'Видеоконференция BigBlueButton'?");
    chatBotSetupBbbButton.onclick = answerForSetupBBB;

    let chatBotSetupExternalLibrariesButton = createChatBotButton("chat-bot-setup-external-libraries-problem-btn", "Как настраивать элементы внешних библиотечных систем? (Например ЭБС Лань, Юрайт и т.п.)");
    chatBotSetupExternalLibrariesButton.onclick = answerForSetupExternalLibraries;

    subcategoryForSetupExternalResourcesVariants.appendChild(chatBotSetupBbbButton);
    subcategoryForSetupExternalResourcesVariants.appendChild(chatBotSetupExternalLibrariesButton);

    currentQuestionsBlockId = "subcategory-for-setup-external-resources-div";
    scrollDownChat();
}

function answerForSetupBBB() {
    let userChoseText =  $("#chat-bot-setup-bbb-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-external-resources-variants",
        answerDivID = "answer-for-setup-bbb-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1030'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupExternalLibraries() {
    let userChoseText =  $("#chat-bot-setup-external-libraries-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-external-resources-variants",
        answerDivID = "answer-for-setup-external-libraries-div",
        answerMessage = "К сожалению лекция по настройке библиотечных систем пока ещё находится в разработке, а пока Вы можете ознакомиться со всеми нашими материалами по работе в СДО СЕВГУ.РУ в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function choseSubcategoryForSetupInteractiveResources() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-setup-interactive-elements-btn").text());

    $("#subcategory-for-setup-elements-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSetupInteractiveElementsDiv = createChatbotDiv("subcategory-for-setup-interactive-elements-div");
    let subcategoryForSetupInteractiveElementsVariants = createChatbotDiv("subcategory-for-setup-interactive-elements-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSetupInteractiveElementsDiv);

    let subcategoryForSetupInteractiveElementsMessage = createChatBotMessage("Выберите пожалуйста элемент, с которым возникли проблемы:");

    subcategoryForSetupInteractiveElementsDiv.appendChild(subcategoryForSetupInteractiveElementsMessage);
    subcategoryForSetupInteractiveElementsDiv.append(subcategoryForSetupInteractiveElementsVariants);

    let chatBotSetupH5pButton = createChatBotButton("chat-bot-setup-h5p-problem-btn", "Как настроить элемент 'H5P'?");
    chatBotSetupH5pButton.onclick = answerForSetupH5P;

    let chatBotSetupScormButton = createChatBotButton("chat-bot-setup-scorm-problem-btn", "Как настроить элемент 'Пакет SCORM'?");
    chatBotSetupScormButton.onclick = answerForSetupSCORM;

    subcategoryForSetupInteractiveElementsVariants.appendChild(chatBotSetupH5pButton);
    subcategoryForSetupInteractiveElementsVariants.appendChild(chatBotSetupScormButton);

    currentQuestionsBlockId = "subcategory-for-setup-interactive-elements-div";
    scrollDownChat();
}

function answerForSetupH5P() {
    let userChoseText =  $("#chat-bot-setup-h5p-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-interactive-elements-variants",
        answerDivID = "answer-for-setup-h5p-div",
        answerMessage = "К сожалению лекция по настройке библиотечных систем пока ещё находится в разработке, а пока Вы можете ознакомиться со всеми нашими материалами по работе в СДО СЕВГУ.РУ в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupSCORM() {
    let userChoseText =  $("#chat-bot-setup-scorm-problem-btn").text(),
        removeVariantsID = "subcategory-for-setup-interactive-elements-variants",
        answerDivID = "answer-for-setup-scorm-div",
        answerMessage = "К сожалению лекция по настройке библиотечных систем пока ещё находится в разработке, а пока Вы можете ознакомиться со всеми нашими материалами по работе в СДО СЕВГУ.РУ в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with qestions related to setup elements

// Begining of the block with qestions related to encrollment problems
function choseSubcategoryForTeacherEncrollmentProblems() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-teachers-encrollment-problem-btn").text());

    $("#first-category-for-teachers-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForTeachersEncrollmentDiv = createChatbotDiv("subcategory-for-teachers-encrollment-div");
    let subcategoryForTeachersEncrollmentVariants = createChatbotDiv("subcategory-for-teachers-encrollment-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForTeachersEncrollmentDiv);

    let subcategoryForTeachersEncrollentMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForTeachersEncrollmentDiv.appendChild(subcategoryForTeachersEncrollentMessage);
    subcategoryForTeachersEncrollmentDiv.append(subcategoryForTeachersEncrollmentVariants);

    let chatBotGlobalGroupEncrollmentButton = createChatBotButton("chat-bot-global-group-encrollment-problem-btn", "Как зачислить глобальную группу?");
    chatBotGlobalGroupEncrollmentButton.onclick = answerForGlobalGroupEncrollment;

    let chatBotSpecialUsersEncrollentButton = createChatBotButton("chat-bot-special-users-encrollment-problem-btn", "Как зачислить определенных пользователей?");
    chatBotSpecialUsersEncrollentButton.onclick = answerForSpecialUsersEncrollent;

    let chatBotDeleteExtraUsersButton = createChatBotButton("chat-bot-delete-extra-users-problem-btn", "Как удалить лишних пользователей пользователей?");
    chatBotDeleteExtraUsersButton.onclick = answerForDeleteExtraUsers;

    subcategoryForTeachersEncrollmentVariants.appendChild(chatBotGlobalGroupEncrollmentButton);
    subcategoryForTeachersEncrollmentVariants.appendChild(chatBotSpecialUsersEncrollentButton);
    subcategoryForTeachersEncrollmentVariants.appendChild(chatBotDeleteExtraUsersButton);

    currentQuestionsBlockId = "subcategory-for-teachers-encrollment-div";
    scrollDownChat();
}

function answerForGlobalGroupEncrollment() {
    let userChoseText =  $("#chat-bot-global-group-encrollment-problem-btn").text(),
        removeVariantsID = "subcategory-for-teachers-encrollment-variants",
        answerDivID = "answer-for-global-group-encrollment-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1052&pageid=1587'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSpecialUsersEncrollent() {
    let userChoseText =  $("#chat-bot-special-users-encrollment-problem-btn").text(),
        removeVariantsID = "subcategory-for-teachers-encrollment-variants",
        answerDivID = "answer-for-special-users-encrollment-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1052&pageid=1591'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForDeleteExtraUsers() {
    let userChoseText =  $("#chat-bot-delete-extra-users-problem-btn").text(),
        removeVariantsID = "subcategory-for-teachers-encrollment-variants",
        answerDivID = "answer-for-delete-extra-users-div",
        answerMessage = "К сожалению лекция по настройке библиотечных систем пока ещё находится в разработке, а пока Вы можете ознакомиться со всеми нашими материалами по работе в СДО СЕВГУ.РУ в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with qestions related to encrollment problems

function answerForTeacherGradebookProblems() {
    let userChoseText =  $("#teachers-gradebook-problem-btn").text(),
        removeVariantsID = "first-category-for-teachers-variants",
        answerDivID = "answer-for-teachers-gradebook-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1049'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

// Begining of the block with qestions related to questions bank problems
function choseSubcategoryForTeacherQuestionsBankProblems() {
    let userChose = chatBotCreateUserMessage($("#teachers-questions-bank-problem-btn").text());

    $("#first-category-for-teachers-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForTeachersQuestionsBankDiv = createChatbotDiv("subcategory-for-teachers-questions-bank-div");
    let subcategoryForTeachersQuestionsBankVariants = createChatbotDiv("subcategory-for-teachers-queestions-bank-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForTeachersQuestionsBankDiv);

    let subcategoryForTeachersQuestionsBankMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForTeachersQuestionsBankDiv.appendChild(subcategoryForTeachersQuestionsBankMessage);
    subcategoryForTeachersQuestionsBankDiv.append(subcategoryForTeachersQuestionsBankVariants);

    let chatBotSetupCategoriesButton = createChatBotButton("chat-bot-setup-categories-problem-btn", "Как настраивать категории?");
    chatBotSetupCategoriesButton.onclick = answerForSetupCategories;

    let chatBotSetupQuestionsButton = createChatBotButton("chat-bot-setup-questions-problem-btn", "Как настраивать вопросы?");
    chatBotSetupQuestionsButton.onclick = answerForSetupQuestions;

    subcategoryForTeachersQuestionsBankVariants.appendChild(chatBotSetupCategoriesButton);
    subcategoryForTeachersQuestionsBankVariants.appendChild(chatBotSetupQuestionsButton);

    currentQuestionsBlockId = "subcategory-for-teachers-questions-bank-div";
    scrollDownChat();
}

function answerForSetupCategories() {
    let userChoseText =  $("#chat-bot-setup-categories-problem-btn").text(),
        removeVariantsID = "subcategory-for-teachers-queestions-bank-variants",
        answerDivID = "answer-for-teachers-setup-categories-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1057&pageid=1604'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForSetupQuestions() {
    let userChoseText =  $("#chat-bot-setup-questions-problem-btn").text(),
        removeVariantsID = "subcategory-for-teachers-queestions-bank-variants",
        answerDivID = "answer-for-teachers-setup-questions-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1057&pageid=1605'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with qestions related to questions bank problems

function answerForTeacherGroupesBreakdownProblems() {
    let userChoseText =  $("#teachers-groupes-breakdown-problem-btn").text(),
        removeVariantsID = "first-category-for-teachers-variants",
        answerDivID = "answer-for-teachers-groupes-breakdown-div",
        answerMessage = "Вы можете посмотреть лекцию по настройке данного элемента <span><a href='https://do.sevsu.ru/mod/lesson/view.php?id=1053'>ЗДЕСЬ</a></span>. Все наши материалы по работе в СДО СЕВГУ.РУ находятся в <span><a href='https://do.sevsu.ru/course/view.php?id=1363'>электронном курсе</a></span>.";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with qestions related to teachers

// Begining of the block with qestions related to students
function choseCategoryForStudents() {
    $("#first-question-variants").remove();

    let userChose = chatBotCreateUserMessage("Студент");

    let messagesArea = $("#chat-bot-messages-area-div");
    let firstCategoryForStudentsDiv = createChatbotDiv("first-category-for-students-div");
    let firstCategoryForStudentsVariants = createChatbotDiv("first-category-for-students-variants");

    messagesArea.append(userChose);
    messagesArea.append(firstCategoryForStudentsDiv);

    let firstCategoryForStudentsMessage = createChatBotMessage("Выберите пожалуйста категорию, к которой относится Ваш вопрос:");

    firstCategoryForStudentsDiv.appendChild(firstCategoryForStudentsMessage);
    firstCategoryForStudentsDiv.append(firstCategoryForStudentsVariants);

    let studentsAuthProblemsButton = createChatBotButton("chat-bot-students-auth-problem-btn", "Проблемы с авторизацией");
    studentsAuthProblemsButton.onclick = choseSubcategoryForStudentsAuthProblems;

    let studentsCanNotFindCourceButton = createChatBotButton("students-can-not-find-cource-btn", "Не могу найти курс");
    studentsCanNotFindCourceButton.onclick = choseSubcategoryForStudentsCanNotFindCource;

    let complettingExercisesProblemsButton = createChatBotButton("chat-bot-completting-exercises-problem-btn", "Проблемы с выполнением заданий в курсе");
    complettingExercisesProblemsButton.onclick = choseSubcategoryForComplettingExercisesProblems;

    let studentsAttendanceProblemsButton = createChatBotButton("students-attendance-problem-btn", "Проблемы с посещаемостью");
    studentsAttendanceProblemsButton.onclick = choseSubcategoryForStudentsAttendanceProblems;

    let studentsMarksProblemsButton = createChatBotButton("students-marks-problem-btn", "Проблемы с оценками");
    studentsMarksProblemsButton.onclick = choseSubcategoryForStudentsMarksProblems;

    let studentsPhysicalCultureProblemsButton = createChatBotButton("students-physical-culture-problem-btn", "Проблемы с элективным курсом по физкультуре");
    studentsPhysicalCultureProblemsButton.onclick = choseSubcategoryForStudentsPhysicalCultureProblems;

    let students500ProblemsButton = createChatBotButton("students-500-problem-btn", "Не могу зайти на курс (ошибка 500-505)");
    students500ProblemsButton.onclick = answerForStudents500Problems;

    firstCategoryForStudentsVariants.appendChild(studentsAuthProblemsButton);
    firstCategoryForStudentsVariants.appendChild(studentsCanNotFindCourceButton);
    firstCategoryForStudentsVariants.appendChild(complettingExercisesProblemsButton);
    firstCategoryForStudentsVariants.appendChild(studentsAttendanceProblemsButton);
    firstCategoryForStudentsVariants.appendChild(studentsMarksProblemsButton);
    firstCategoryForStudentsVariants.appendChild(studentsPhysicalCultureProblemsButton);
    firstCategoryForStudentsVariants.appendChild(students500ProblemsButton);

    currentQuestionsBlockId = "first-category-for-students-div";
    scrollDownChat();
}

// Begining of the block related to students auth problems
function choseSubcategoryForStudentsAuthProblems() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-students-auth-problem-btn").text());

    $("#first-category-for-students-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForStudentsAuthProblemsDiv = createChatbotDiv("subcategory-for-students-auth-problemms-div");
    let subcategoryForStudentsAuthProblemsVariants = createChatbotDiv("subcategory-for-students-auth-problemms-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForStudentsAuthProblemsDiv);

    let subcategoryForStudentsAuthProblemsMessage = createChatBotMessage("Есть ли у Вас аккаунт?");

    subcategoryForStudentsAuthProblemsDiv.appendChild(subcategoryForStudentsAuthProblemsMessage);
    subcategoryForStudentsAuthProblemsDiv.append(subcategoryForStudentsAuthProblemsVariants);

    let newStudentAccountButton = createChatBotButton("chat-bot-new-student-account-btn", "Нет, я новый пользователь");
    newStudentAccountButton.onclick = subcategoryForNewStudentAccount;

    let existsStudentAccountButton = createChatBotButton("chat-bot-exists-student-account-btn", "Да, у меня уже есть аккаунт");
    existsStudentAccountButton.onclick = subcategoryForExistsStudentAccount;

    subcategoryForStudentsAuthProblemsVariants.appendChild(newStudentAccountButton);
    subcategoryForStudentsAuthProblemsVariants.appendChild(existsStudentAccountButton);

    currentQuestionsBlockId = "subcategory-for-students-auth-problemms-div";
    scrollDownChat();
}

function subcategoryForNewStudentAccount() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-new-student-account-btn").text());

    $("#subcategory-for-students-auth-problemms-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForNewStudentsAccountDiv = createChatbotDiv("subcategory-for-new-students-account-div");
    let subcategoryForNewStudentsAccountVariants = createChatbotDiv("subcategory-for-new-students-account-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForNewStudentsAccountDiv);

    let subcategoryForNewStudentsAccountMessage = createChatBotMessage("Создан ли уже приказ о зачислении?");

    subcategoryForNewStudentsAccountDiv.appendChild(subcategoryForNewStudentsAccountMessage);
    subcategoryForNewStudentsAccountDiv.append(subcategoryForNewStudentsAccountVariants);

    let orderOfAdmissionNotExistsButton = createChatBotButton("chat-bot-order-of-admission-not-exists-btn", "Приказ о зачислении ещё не создан");
    orderOfAdmissionNotExistsButton.onclick = answerForOrderOfAdmissionNotExists;

    let orderOfAdmissionIsExistsButton = createChatBotButton("chat-bot-order-of-admission-is-exists-btn", "Приказ о зачислении уже создан");
    orderOfAdmissionIsExistsButton.onclick = answerForOrderOfAdmissionIsExists;

    subcategoryForNewStudentsAccountVariants.appendChild(orderOfAdmissionNotExistsButton);
    subcategoryForNewStudentsAccountVariants.appendChild(orderOfAdmissionIsExistsButton);

    currentQuestionsBlockId = "subcategory-for-new-students-account-div";
    scrollDownChat();
}

function answerForOrderOfAdmissionNotExists() {
    let userChoseText =  $("#chat-bot-order-of-admission-not-exists-btn").text(),
        removeVariantsID = "subcategory-for-new-students-account-variants",
        answerDivID = "answer-for-order-of-admission-not-exists-div",
        answerMessage = "Подождите приказа о зачислении и обратитесь на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForOrderOfAdmissionIsExists() {
    let userChoseText =  $("#chat-bot-order-of-admission-is-exists-btn").text(),
        removeVariantsID = "subcategory-for-new-students-account-variants",
        answerDivID = "answer-for-order-of-admission-is-exists-div",
        answerMessage = "Обратитесь пожалуйста на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function subcategoryForExistsStudentAccount() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-exists-student-account-btn").text());

    $("#subcategory-for-students-auth-problemms-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForExistsStudentsAccountDiv = createChatbotDiv("subcategory-for-exists-students-account-div");
    let subcategoryForExistsStudentsAccountVariants = createChatbotDiv("subcategory-for-exists-students-account-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForExistsStudentsAccountDiv);

    let subcategoryForExistsStudentsAccountMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForExistsStudentsAccountDiv.appendChild(subcategoryForExistsStudentsAccountMessage);
    subcategoryForExistsStudentsAccountDiv.append(subcategoryForExistsStudentsAccountVariants);

    let studentForgotPasswordButton = createChatBotButton("chat-bot-student-forgot-password-btn", "Забыли пароль?");
    studentForgotPasswordButton.onclick = answerForStudentForgotPassword;

    let studentBlockedButton = createChatBotButton("chat-bot-student-blocked-btn", "Учетная запись заблокирована?");
    studentBlockedButton.onclick = answerForStudentBlocked;

    subcategoryForExistsStudentsAccountVariants.appendChild(studentForgotPasswordButton);
    subcategoryForExistsStudentsAccountVariants.appendChild(studentBlockedButton);

    currentQuestionsBlockId = "subcategory-for-exists-students-account-div";
    scrollDownChat();
}

function answerForStudentForgotPassword() {
    let userChoseText =  $("#chat-bot-student-forgot-password-btn").text(),
        removeVariantsID = "subcategory-for-exists-students-account-variants",
        answerDivID = "answer-for-student-forgot-password-div",
        answerMessage = "Вопспользуйтесь функцией восстановления пароля (на странице авторизации)";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentBlocked() {
    let userChoseText =  $("#chat-bot-student-blocked-btn").text(),
        removeVariantsID = "subcategory-for-exists-students-account-variants",
        answerDivID = "answer-for-student-blocked-div",
        answerMessage = "Отправьте пожалуйста запрос на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block related to students auth problems

// Beginning of the block related to students finding cource problems
function choseSubcategoryForStudentsCanNotFindCource() {
    let userChose = chatBotCreateUserMessage($("#students-can-not-find-cource-btn").text());

    $("#first-category-for-students-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForStudentsCanNotFindCourceDiv = createChatbotDiv("subcategory-for-students-can-not-find-cource-div");
    let subcategoryForStudentsCanNotFindCourceVariants = createChatbotDiv("subcategory-for-students-can-not-find-cource-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForStudentsCanNotFindCourceDiv);

    let subcategoryForStudentsCanNotFindCourceMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForStudentsCanNotFindCourceDiv.appendChild(subcategoryForStudentsCanNotFindCourceMessage);
    subcategoryForStudentsCanNotFindCourceDiv.append(subcategoryForStudentsCanNotFindCourceVariants);

    let studentFindingCourceByTimetableButton = createChatBotButton("chat-bot-student-finding-cource-by-timetable-btn", "Не могу найти дисциплины по расписанию");
    studentFindingCourceByTimetableButton.onclick = answerForStudentFindingCourceByTimetable;

    let studentFindingOutsideCourceButton = createChatBotButton("chat-bot-student-finding-outside-cource-btn", "Не могу найти курс на внешнем ресурсе");
    studentFindingOutsideCourceButton.onclick = answerForStudentFindingOutsideCource;

    subcategoryForStudentsCanNotFindCourceVariants.appendChild(studentFindingCourceByTimetableButton);
    subcategoryForStudentsCanNotFindCourceVariants.appendChild(studentFindingOutsideCourceButton);

    currentQuestionsBlockId = "subcategory-for-students-can-not-find-cource-div";
    scrollDownChat();
}

function answerForStudentFindingCourceByTimetable() {
    let userChoseText =  $("#chat-bot-student-finding-cource-by-timetable-btn").text(),
        removeVariantsID = "subcategory-for-students-can-not-find-cource-variants",
        answerDivID = "answer-for-student-finding-cource-by-timetable-div",
        answerMessage = "Обратитесь пожалуйста к преподавателю, чтобы он зачислил Вас на электронный курс";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentFindingOutsideCource() {
    let userChoseText =  $("#chat-bot-student-finding-outside-cource-btn").text(),
        removeVariantsID = "subcategory-for-students-can-not-find-cource-variants",
        answerDivID = "answer-for-student-finding-outside-cource-div",
        answerMessage = "Обратитесь пожалуйста к преподавателю, который ведет этот курс. Возможно название курса не совпадает с названием дисциплины";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block related to students finding cource problems

// Beginning of the block related to students completting exercises problems
function choseSubcategoryForComplettingExercisesProblems() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-completting-exercises-problem-btn").text());

    $("#first-category-for-students-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForComplettingExercisesDiv = createChatbotDiv("subcategory-for-completting-exercises-div");
    let subcategoryForComplettingExercisesVariants = createChatbotDiv("subcategory-for-completting-exercises-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForComplettingExercisesDiv);

    let subcategoryForComplettingExercisesMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForComplettingExercisesDiv.appendChild(subcategoryForComplettingExercisesMessage);
    subcategoryForComplettingExercisesDiv.append(subcategoryForComplettingExercisesVariants);

    let studentFindingExerciseButton = createChatBotButton("chat-bot-student-finding-exercise-btn", "Не могу найти задание");
    studentFindingExerciseButton.onclick = answerForStudentFindingExercise;

    let studentAttachingFilesProblemButton = createChatBotButton("chat-bot-student-attaching-files-problem-btn", "Не могу прикрепить файл в задании");
    studentAttachingFilesProblemButton.onclick = answerForStudentAttachingFilesProblem;

    let studentCantFindGuidelinesButton = createChatBotButton("chat-bot-student-cant-find-guidelines-btn", "Не могу найти методические указания/вариант");
    studentCantFindGuidelinesButton.onclick = answerForStudentCantFindGuidelines;

    let exerciseNotCheckingButton = createChatBotButton("chat-bot-exercise-not-checking-btn", "Задание долго не проверяется");
    exerciseNotCheckingButton.onclick = answerForExerciseNotChecking;

    subcategoryForComplettingExercisesVariants.appendChild(studentFindingExerciseButton);
    subcategoryForComplettingExercisesVariants.appendChild(studentAttachingFilesProblemButton);
    subcategoryForComplettingExercisesVariants.appendChild(studentCantFindGuidelinesButton);
    subcategoryForComplettingExercisesVariants.appendChild(exerciseNotCheckingButton);

    currentQuestionsBlockId = "subcategory-for-completting-exercises-div";
    scrollDownChat();
}

function answerForStudentFindingExercise() {
    let userChoseText =  $("#chat-bot-student-finding-exercise-btn").text(),
        removeVariantsID = "subcategory-for-completting-exercises-variants",
        answerDivID = "answer-for-student-finding-exercise-div",
        answerMessage = "Обратитесь пожалуйста к преподавателю дисциплины";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentAttachingFilesProblem() {
    let userChoseText =  $("#chat-bot-student-attaching-files-problem-btn").text(),
        removeVariantsID = "subcategory-for-completting-exercises-variants",
        answerDivID = "answer-for-student-attaching-files-problem-div",
        answerMessage = "Попробуйте вставить в ответ гиперсылку на документ";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentCantFindGuidelines() {
    let userChoseText =  $("#chat-bot-student-cant-find-guidelines-btn").text(),
        removeVariantsID = "subcategory-for-completting-exercises-variants",
        answerDivID = "answer-for-student-cant-find-guidelines-div",
        answerMessage = "Как правило МУ находятся в разделе Общее (в самом верху курса), или же в элементе задания (прикреплены документом или подсвечены гиперссылкой)";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForExerciseNotChecking() {
    let userChoseText =  $("#chat-bot-exercise-not-checking-btn").text(),
        removeVariantsID = "subcategory-for-completting-exercises-variants",
        answerDivID = "answer-for-exercise-not-checking-div",
        answerMessage = "Обратитесь пожалуйста к преподпвателю дисциплины, возможно требуется очная защита работы";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block related to students completting exercises problems

// Beginning of the block related to students problems with attendance
function choseSubcategoryForStudentsAttendanceProblems() {
    let userChose = chatBotCreateUserMessage($("#students-attendance-problem-btn").text());

    $("#first-category-for-students-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForStudentsAttendanceDiv = createChatbotDiv("subcategory-for-students-attendance-problems-div");
    let subcategoryForStudentsAttendanceVariants = createChatbotDiv("subcategory-for-students-attendance-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForStudentsAttendanceDiv);

    let subcategoryForStudentsAttendanceMessage = createChatBotMessage("Какая именно проблема возникла с посещаемостью?");

    subcategoryForStudentsAttendanceDiv.appendChild(subcategoryForStudentsAttendanceMessage);
    subcategoryForStudentsAttendanceDiv.append(subcategoryForStudentsAttendanceVariants);

    let studentCantCheckInButton = createChatBotButton("chat-bot-student-cant-check-in-btn", "Не могу отметиться");
    studentCantCheckInButton.onclick = subcategoryForStudentCantCheckIn;

    let studentCantFindAttendanceElementButton = createChatBotButton("chat-bot-student-cant-find-attendance-element-btn", "Не могу найти элемент посещаемости");
    studentCantFindAttendanceElementButton.onclick = answerForStudentCantFindAttendanceElement;

    let studentForgotToCheckInButton = createChatBotButton("chat-bot-student-forgot-to-check-in-btn", "Я забыл(a) отметиться на паре");
    studentForgotToCheckInButton.onclick = answerForStudentForgotToCheckIn;

    subcategoryForStudentsAttendanceVariants.appendChild(studentCantCheckInButton);
    subcategoryForStudentsAttendanceVariants.appendChild(studentCantFindAttendanceElementButton);
    subcategoryForStudentsAttendanceVariants.appendChild(studentForgotToCheckInButton);

    currentQuestionsBlockId = "subcategory-for-students-attendance-problems-div";
    scrollDownChat();
}

function subcategoryForStudentCantCheckIn() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-student-cant-check-in-btn").text());

    $("#subcategory-for-students-attendance-problems-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForStudentsCantCheckInDiv = createChatbotDiv("subcategory-for-students-cant-check-in-div");
    let subcategoryForStudentsCantCheckInVariants = createChatbotDiv("subcategory-for-students-cant-check-in-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForStudentsCantCheckInDiv);

    let subcategoryForStudentsAttendanceMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForStudentsCantCheckInDiv.appendChild(subcategoryForStudentsAttendanceMessage);
    subcategoryForStudentsCantCheckInDiv.append(subcategoryForStudentsCantCheckInVariants);

    let lessonIsAbsentInAttendanceButton = createChatBotButton("chat-bot-lesson-is-absent-in-attendance-btn", "Нет нужного занятия в посещаемости");
    lessonIsAbsentInAttendanceButton.onclick = answerForLessonIsAbsentInAttendanceButton;

    let studentCantSendAttendanceButton = createChatBotButton("student-cant-send-attendance-btn", "Занятие есть, но не могу отправить посещаемость");
    studentCantSendAttendanceButton.onclick = answerForStudentCantSendAttendanceButton;

    subcategoryForStudentsCantCheckInVariants.appendChild(lessonIsAbsentInAttendanceButton);
    subcategoryForStudentsCantCheckInVariants.appendChild(studentCantSendAttendanceButton);

    currentQuestionsBlockId = "subcategory-for-students-cant-check-in-div";
    scrollDownChat();
}

function answerForLessonIsAbsentInAttendanceButton() {
    let userChoseText =  $("#chat-bot-lesson-is-absent-in-attendance-btn").text(),
        removeVariantsID = "subcategory-for-students-cant-check-in-variants",
        answerDivID = "answer-for-leson-is-absent-in-attendance-div",
        answerMessage = "Обратитесь к преподавателю, ведущему курс";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentCantSendAttendanceButton() {
    let userChoseText =  $("#student-cant-send-attendance-btn").text(),
        removeVariantsID = "subcategory-for-students-cant-check-in-variants",
        answerDivID = "answer-for-student-cant-send-attendance-div",
        answerMessage = "Отправить посещаемость возможно только в первые 15 минут занятия. Обратитесь к старосте или преподавателю, они Вас отметят";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentCantFindAttendanceElement() {
    let userChoseText =  $("#chat-bot-student-cant-find-attendance-element-btn").text(),
        removeVariantsID = "subcategory-for-students-attendance-problems-variants",
        answerDivID = "answer-for-student-cant-find-attendance-element-div",
        answerMessage = "Обратитесь к преподавателю, ведущему курс";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentForgotToCheckIn() {
    let userChoseText =  $("#chat-bot-student-forgot-to-check-in-btn").text(),
        removeVariantsID = "subcategory-for-students-attendance-problems-variants",
        answerDivID = "answer-for-student-forgot-to-check-in-div",
        answerMessage = "Если Вы забыли отметиться - сообщите об этом старосте или преподавателю";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block related to students problems with attendance

// Beginning of the block related to students marks problems
function choseSubcategoryForStudentsMarksProblems() {
    let userChose = chatBotCreateUserMessage($("#students-marks-problem-btn").text());

    $("#first-category-for-students-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForStudentsMarksProblemsDiv = createChatbotDiv("subcategory-for-students-marks-problems-div");
    let subcategoryForStudentsMarksProblemsVariants = createChatbotDiv("subcategory-for-students-marks-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForStudentsMarksProblemsDiv);

    let subcategoryForStudentsMarksProblemsMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForStudentsMarksProblemsDiv.appendChild(subcategoryForStudentsMarksProblemsMessage);
    subcategoryForStudentsMarksProblemsDiv.append(subcategoryForStudentsMarksProblemsVariants);

    let studentCantFindMarksButton = createChatBotButton("chat-bot-student-cant-find-marks-btn", "Не могу найти свои оценки");
    studentCantFindMarksButton.onclick = answerForStudentCantFindMarks;

    let studentWhatIsLeftToFinishButton = createChatBotButton("student-what-is-left-to-finish-btn", "Не знаю что мне осталось досдать");
    studentWhatIsLeftToFinishButton.onclick = answerForStudentWhatIsLeftToFinish;

    let studentFindErrorInExerciseButton = createChatBotButton("student-find-error-in-exercise-btn", "Обнаружил ошибку в задании и меня неверно оценили");
    studentFindErrorInExerciseButton.onclick = answerForStudentFindErrorInExercise;

    subcategoryForStudentsMarksProblemsVariants.appendChild(studentCantFindMarksButton);
    subcategoryForStudentsMarksProblemsVariants.appendChild(studentWhatIsLeftToFinishButton);
    subcategoryForStudentsMarksProblemsVariants.appendChild(studentFindErrorInExerciseButton);

    currentQuestionsBlockId = "subcategory-for-students-marks-problems-div";
    scrollDownChat();
}

function answerForStudentCantFindMarks() {
    let userChoseText =  $("#chat-bot-student-cant-find-marks-btn").text(),
        removeVariantsID = "subcategory-for-students-marks-problems-variants",
        answerDivID = "answer-for-student-cant-find-marks-div",
        answerMessage = "Обратитесь к преподавателю, ведущему курс. Возможно до окончания курса оценки скрыты";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentWhatIsLeftToFinish() {
    let userChoseText =  $("#student-what-is-left-to-finish-btn").text(),
        removeVariantsID = "subcategory-for-students-marks-problems-variants",
        answerDivID = "answer-for-student-what-is-left-to-finish-div",
        answerMessage = "Информация о всех оцениваемых заданиях есть в разделе 'Оценки'";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForStudentFindErrorInExercise() {
    let userChoseText =  $("#student-find-error-in-exercise-btn").text(),
        removeVariantsID = "subcategory-for-students-marks-problems-variants",
        answerDivID = "answer-for-student-find-error-in-exercise-div",
        answerMessage = "Обратитесь к преподавателю, ведущему курс";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block related to students marks problems

// Beginning of the block related to students physical culture elective cource problems
function choseSubcategoryForStudentsPhysicalCultureProblems() {
    let userChose = chatBotCreateUserMessage($("#students-physical-culture-problem-btn").text());

    $("#first-category-for-students-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForStudentsPhysicalCultureProblemsDiv = createChatbotDiv("subcategory-for-students-physical-culture-problems-div");
    let subcategoryForStudentsPhysicalCultureProblemsVariants = createChatbotDiv("subcategory-for-students-physical-culture-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForStudentsPhysicalCultureProblemsDiv);

    let subcategoryForStudentsPhysicalCultureProblemsMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForStudentsPhysicalCultureProblemsDiv.appendChild(subcategoryForStudentsPhysicalCultureProblemsMessage);
    subcategoryForStudentsPhysicalCultureProblemsDiv.append(subcategoryForStudentsPhysicalCultureProblemsVariants);

    let studentCantEnrolToCourceButton = createChatBotButton("chat-bot-student-cant-enrol-to-cource-btn", "Не могу записаться на курс");
    studentCantEnrolToCourceButton.onclick = answerForStudentCantEnrolToCource;

    subcategoryForStudentsPhysicalCultureProblemsVariants.appendChild(studentCantEnrolToCourceButton);

    currentQuestionsBlockId = "subcategory-for-students-physical-culture-problems-div";
    scrollDownChat();
}

function answerForStudentCantEnrolToCource() {
    let userChoseText =  $("#chat-bot-student-cant-enrol-to-cource-btn").text(),
        removeVariantsID = "subcategory-for-students-physical-culture-problems-variants",
        answerDivID = "answer-for-student-cant-enroll-to-cource-div",
        answerMessage = "Обратитесь на кафедру 'Физкультура и спорт' в спорткомплексе (Университетская 33)";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

// End of the block related to students physical culture elective cource problems

function answerForStudents500Problems() {
    let userChoseText =  $("#students-500-problem-btn").text(),
        removeVariantsID = "first-category-for-students-variants",
        answerDivID = "answer-for-students-500-problems-div",
        answerMessage = "Наша команда разработчиков уже знает о проблеме и решит её в ближайшее время";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with qestions related to students

// Begining of the block with qestions related to outside listeners
function choseCategoryForOutsideListeners() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-outside-listener-button").text());

    $("#first-question-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForOutsideListenersProblemsDiv = createChatbotDiv("subcategory-for-outside-listeners-problemms-div");
    let subcategoryForOutsideListenersProblemsVariants = createChatbotDiv("subcategory-for-outside-listeners-problemms-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForOutsideListenersProblemsDiv);

    let subcategoryForOutsideListenersProblemsMessage = createChatBotMessage("Выберите пожалуйста категорию вопросов, относящуюся к Вашей проблеме");

    subcategoryForOutsideListenersProblemsDiv.appendChild(subcategoryForOutsideListenersProblemsMessage);
    subcategoryForOutsideListenersProblemsDiv.append(subcategoryForOutsideListenersProblemsVariants);

    let chatBotAuthProblemsButton = createChatBotButton("chat-bot-outside-users-auth-problem-btn", "Проблемы с авторизацией?");
    chatBotAuthProblemsButton.onclick = subcategoryForOutsideUsersAuthQuestions;

    let chatBotSupportInTheCourceProblemsButton = createChatBotButton("chat-bot-support-in-the-cource-problem-btn", "Проблемы с поддержкой в электронном курсе");
    chatBotSupportInTheCourceProblemsButton.onclick = subcategoryForSupportInTheCource;

    let chatBotSertificatesProblemsButton = createChatBotButton("chat-bot-sertificates-problem-btn", "Вопросы по сертификатам");
    chatBotSertificatesProblemsButton.onclick = subcategoryForSertificatesProblems;

    subcategoryForOutsideListenersProblemsVariants.appendChild(chatBotAuthProblemsButton);
    subcategoryForOutsideListenersProblemsVariants.appendChild(chatBotSupportInTheCourceProblemsButton);
    subcategoryForOutsideListenersProblemsVariants.appendChild(chatBotSertificatesProblemsButton);

    currentQuestionsBlockId = "subcategory-for-outside-listeners-problemms-div";
    scrollDownChat();
}

// Begining of the block with auth problems for outside listeners
function subcategoryForOutsideUsersAuthQuestions() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-outside-users-auth-problem-btn").text());

    $("#subcategory-for-outside-listeners-problemms-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForOutsideUsersAuthProblemsDiv = createChatbotDiv("subcategory-for-outside-users-auth-problems-div");
    let subcategoryForOutsideUsersAuthProblemsVariants = createChatbotDiv("subcategory-for-outside-users-auth-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForOutsideUsersAuthProblemsDiv);

    let subcategoryForOutsideUsersAuthProblemsMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForOutsideUsersAuthProblemsDiv.appendChild(subcategoryForOutsideUsersAuthProblemsMessage);
    subcategoryForOutsideUsersAuthProblemsDiv.append(subcategoryForOutsideUsersAuthProblemsVariants);

    let chatBotAuthProblemButton = createChatBotButton("chat-bot-auth-problem-btn", "Не могу авторизоваться");
    chatBotAuthProblemButton.onclick = subcategoryForAuthProblems;

    let chatBotRecieveConfirmationButton = createChatBotButton("chat-bot-recieve-confirmation-btn", "Мне не пришло подтверждение авторизации на email");
    chatBotRecieveConfirmationButton.onclick = answerForRecieveConfirmation;

    subcategoryForOutsideUsersAuthProblemsVariants.appendChild(chatBotAuthProblemButton);
    subcategoryForOutsideUsersAuthProblemsVariants.appendChild(chatBotRecieveConfirmationButton);

    currentQuestionsBlockId = "subcategory-for-outside-users-auth-problems-div";
    scrollDownChat();
}

function subcategoryForAuthProblems() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-auth-problem-btn").text());

    $("#subcategory-for-outside-users-auth-problems-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForAuthProblemsDiv = createChatbotDiv("subcategory-for-auth-problems-div");
    let subcategoryForAuthProblemsVariants = createChatbotDiv("subcategory-for-auth-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForAuthProblemsDiv);

    let subcategoryForAuthProblemsMessage = createChatBotMessage("Какая именно проблема возникла в процессе авторизации?");

    subcategoryForAuthProblemsDiv.appendChild(subcategoryForAuthProblemsMessage);
    subcategoryForAuthProblemsDiv.append(subcategoryForAuthProblemsVariants);

    let chatBotOutsideUserForgotPasswordButton = createChatBotButton("chat-bot-outside-user-forgot-password-btn", "Забыли пароль?");
    chatBotOutsideUserForgotPasswordButton.onclick = answerForOutsideUserForgotPassword;

    let chatBotOutsideUserBlockedButton = createChatBotButton("chat-bot-outside-user-blocked-btn", "Учетная запись заблокирована");
    chatBotOutsideUserBlockedButton.onclick = answerForOutsideUserBlocked;

    subcategoryForAuthProblemsVariants.appendChild(chatBotOutsideUserForgotPasswordButton);
    subcategoryForAuthProblemsVariants.appendChild(chatBotOutsideUserBlockedButton);

    currentQuestionsBlockId = "subcategory-for-auth-problems-div";
    scrollDownChat();
}

function answerForOutsideUserForgotPassword() {
    let userChoseText =  $("#chat-bot-outside-user-forgot-password-btn").text(),
        removeVariantsID = "subcategory-for-auth-problems-variants",
        answerDivID = "answer-for-outside-user-forgot-password-div",
        answerMessage = "Вопспользуйтесь функцией восстановления пароля (на странице авторизации)";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForOutsideUserBlocked() {
    let userChoseText =  $("#chat-bot-outside-user-blocked-btn").text(),
        removeVariantsID = "subcategory-for-auth-problems-variants",
        answerDivID = "answer-for-outside-user-blocked-div",
        answerMessage = "Отправьте пожалуйста запрос на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForRecieveConfirmation() {
    let userChoseText =  $("#chat-bot-recieve-confirmation-btn").text(),
        removeVariantsID = "subcategory-for-outside-users-auth-problems-variants",
        answerDivID = "answer-for-recieve-confirmation-div",
        answerMessage = "Отправьте пожалуйста запрос на moodle_support@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with auth problems for outside listeners

// Begining of the block with questions about support in the cource
function subcategoryForSupportInTheCource() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-support-in-the-cource-problem-btn").text());

    $("#subcategory-for-outside-listeners-problemms-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSupportInTheCourceProblemsDiv = createChatbotDiv("subcategory-for-support-in-the-cource-problems-div");
    let subcategoryForSupportInTheCourceVariants = createChatbotDiv("subcategory-for-support-in-the-cource-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSupportInTheCourceProblemsDiv);

    let subcategoryForSupportInTheCourceMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForSupportInTheCourceProblemsDiv.appendChild(subcategoryForSupportInTheCourceMessage);
    subcategoryForSupportInTheCourceProblemsDiv.append(subcategoryForSupportInTheCourceVariants);

    let chatBotCourceAccessProblemButton = createChatBotButton("chat-bot-cource-access-problem-btn", "Не могу попасть в электронный курс");
    chatBotCourceAccessProblemButton.onclick = answerForCourceAccessProblem;

    let chatBotFeedbackProblemButton = createChatBotButton("chat-bot-feedback-problem-btn", "Нет обратной связи в электронном курсе");
    chatBotFeedbackProblemButton.onclick = answerForFeedbackProblem;

    let chatBotPaperExtensionOfDeadlineButton = createChatBotButton("chat-bot-extension-of-deadline-question-btn", "Можно ли продлить сроки сдачи работ?");
    chatBotPaperExtensionOfDeadlineButton.onclick = answerForExtensionOfDeadlineQuestion;

    subcategoryForSupportInTheCourceVariants.appendChild(chatBotCourceAccessProblemButton);
    subcategoryForSupportInTheCourceVariants.appendChild(chatBotFeedbackProblemButton);
    subcategoryForSupportInTheCourceVariants.appendChild(chatBotPaperExtensionOfDeadlineButton);

    currentQuestionsBlockId = "subcategory-for-support-in-the-cource-problems-div";
    scrollDownChat();
}

function answerForCourceAccessProblem() {
    let userChoseText =  $("#chat-bot-cource-access-problem-btn").text(),
        removeVariantsID = "subcategory-for-support-in-the-cource-problems-variants",
        answerDivID = "answer-for-cource-access-problem-div",
        answerMessage = "Отправите пожалуйста запрос на kis_moodle@sevsu.ru";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForFeedbackProblem() {
    let userChoseText =  $("#chat-bot-feedback-problem-btn").text(),
        removeVariantsID = "subcategory-for-support-in-the-cource-problems-variants",
        answerDivID = "answer-for-feedback-problem-div",
        answerMessage = "Обратитесь пожалуйста к преподавателю, ведущему курс";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForExtensionOfDeadlineQuestion() {
    let userChoseText =  $("#chat-bot-extension-of-deadline-question-btn").text(),
        removeVariantsID = "subcategory-for-support-in-the-cource-problems-variants",
        answerDivID = "answer-for-extension-of-deadline-problem-div",
        answerMessage = "Этот вопрос решает только преподаватель, ведущий курс";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with questions about support in the cource

// Begining of the block with questions about sertificetes
function subcategoryForSertificatesProblems() {
    let userChose = chatBotCreateUserMessage($("#chat-bot-sertificates-problem-btn").text());

    $("#subcategory-for-outside-listeners-problemms-variants").remove();
    
    let messagesArea = $("#chat-bot-messages-area-div");
    let subcategoryForSertificatesProblemsDiv = createChatbotDiv("subcategory-for-sertificates-problems-div");
    let subcategoryForSertificatesProblemsVariants = createChatbotDiv("subcategory-for-sertificates-problems-variants");

    messagesArea.append(userChose);
    messagesArea.append(subcategoryForSertificatesProblemsDiv);

    let subcategoryForSertificatesProblemsMessage = createChatBotMessage("Уточните пожалуйста проблему:");

    subcategoryForSertificatesProblemsDiv.appendChild(subcategoryForSertificatesProblemsMessage);
    subcategoryForSertificatesProblemsDiv.append(subcategoryForSertificatesProblemsVariants);

    let chatBotWhenIGotSertificateButton = createChatBotButton("chat-bot-when-i-got-sertificate-btn", "Когда мне выдадут сертификат?");
    chatBotWhenIGotSertificateButton.onclick = answerForWhenIGotSertificate;

    let chatBotCanNotFindSertificateButton = createChatBotButton("chat-bot-can-not-find-sertificate-problem-btn", "Не могу найти сертификат");
    chatBotCanNotFindSertificateButton.onclick = answerForCanNotFindSertificate;

    let chatBotPaperSertificateQuestionButton = createChatBotButton("chat-bot-paper-sertificate-question-btn", "Будет ли бумажная версия сертификата?");
    chatBotPaperSertificateQuestionButton.onclick = answerForPaperSertificateQuestion;

    subcategoryForSertificatesProblemsVariants.appendChild(chatBotWhenIGotSertificateButton);
    subcategoryForSertificatesProblemsVariants.appendChild(chatBotCanNotFindSertificateButton);
    subcategoryForSertificatesProblemsVariants.appendChild(chatBotPaperSertificateQuestionButton);

    currentQuestionsBlockId = "subcategory-for-sertificates-problems-div";
    scrollDownChat();
}

function answerForWhenIGotSertificate() {
    let userChoseText =  $("#chat-bot-when-i-got-sertificate-btn").text(),
        removeVariantsID = "subcategory-for-sertificates-problems-variants",
        answerDivID = "answer-for-when-i-got-sertificate-div",
        answerMessage = "Если Ваша оценка в профиле по курсу больше 60-ти баллов, то в разделе аттестации после итогового тестирования вам доступен электронный сертификат";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForCanNotFindSertificate() {
    let userChoseText =  $("#chat-bot-can-not-find-sertificate-problem-btn").text(),
        removeVariantsID = "subcategory-for-sertificates-problems-variants",
        answerDivID = "answer-for-can-not-find-sertificate-problem-div",
        answerMessage = "Электронный сертификат располагается  в разделе аттестации после итогового тестирования";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}

function answerForPaperSertificateQuestion() {
    let userChoseText =  $("#chat-bot-paper-sertificate-question-btn").text(),
        removeVariantsID = "subcategory-for-sertificates-problems-variants",
        answerDivID = "answer-for-paper-sertificate-question-div",
        answerMessage = "Обучение на курсе не предполагает выдачу бумажного сертификата";

    chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage);
}
// End of the block with questions about sertificetes
// End of the block with qestions related to qoutside listeners

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

function chatBotCreateAnswer(userChoseText, removeVariantsID, answerDivID, answerMessage) {
    let userChose =  chatBotCreateUserMessage(`${userChoseText}`);

    $(`#${removeVariantsID}`).remove();

    let messagesArea = $("#chat-bot-messages-area-div");
    let answerDiv = createChatbotDiv(`${answerDivID}`);

    messagesArea.append(userChose);
    messagesArea.append(answerDiv);

    let answerSetupExersizesProblems = createChatBotMessage(answerMessage);
    answerDiv.appendChild(answerSetupExersizesProblems);

    setTimeout(renderBlockIsChatBotHelped, 5000);
    scrollDownChat();
}
