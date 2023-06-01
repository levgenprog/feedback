// Открытие и закрытие модального окна
function openModal() {
    const modal = document.getElementById("feedbackModal");
    modal.style.display = "block";
    // Для определения закрытия
    modal.addEventListener("click", outsideClickHandler);
}

function closeModal() {
    const modal = document.getElementById("feedbackModal");
    modal.style.display = "none";
    modal.removeEventListener("click", outsideClickHandler);
}

// Проверяем куда тыкнул пользователь
function outsideClickHandler(event) {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent.contains(event.target)) {
        closeModal();
    }
}

// Вешаем обработчики событий при клике и вводе в поле телефона
const number = document.getElementById('phone');
number.addEventListener('click', checkNumber);
number.addEventListener('input', checkNumber);

function checkNumber() {
    //Очищаем значения от лишних символов (НЕ ЦИФРЫ)
    const rawNumber = number.value.replace(/\D/g, '');
    console.log(rawNumber);
    //+7 (999) 999-99-99

    //Возвращаемая строка
    let formatedNumber = '+7 (9';

    //Проверяем на количество введенных символов
    //Начинаем отсчет с первых 2-х 7-ок, игнорируя не цифры
    if (rawNumber.length >= 1) {
        formatedNumber += `${rawNumber.slice(2, 4)}`;
    }
    if (rawNumber.length > 4) {
        formatedNumber += `) ${rawNumber.slice(4, 7)}`;
    }
    if (rawNumber.length > 7) {
        formatedNumber += `-${rawNumber.slice(7, 9)}`;
    }
    if (rawNumber.length > 9) {
        formatedNumber += `-${rawNumber.slice(9, 11)}`;
    }

    //Изменяем значение у ввода
    number.value = formatedNumber;
}

function validateInput(input) {
    // Проверка наличия специальных символов
    const pattern = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    return !pattern.test(input);
}

function submitForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    const errorName = document.getElementById("errorName");
    const successMessage = document.getElementById("successMessage");
    const errorPhone = document.getElementById("errorPhone");

    const name = nameInput.value;
    const message = messageInput.value;

    const rawNumber = number.value.replace(/\D/g, '');
    const startIndex = 2;
    const preparedNumber = number.value.substring(0, startIndex) + rawNumber.substring(startIndex - 1);

    if (!preparedNumber || preparedNumber.length < 12) {
        errorPhone.innerText = 'Пожалуйста, введите корректный номер телефона.';
        errorPhone.style.display = 'inline';
        successMessage.style.display = 'none';
        return;
    }
    else if (!validateInput(name) || name.length === 0) {
        errorPhone.style.display = 'none';
        successMessage.style.display = 'none';
        errorName.innerText = 'Пожалуйста, заполните имя корректно.';
        errorName.style.display = 'inline';
        return;
    }
    else {
        errorName.style.display = 'none';
        errorPhone.style.display = 'none';
        successMessage.innerText = 'Форма зполнена верно';
        successMessage.style.display = 'block';
    }

    const formData = {
        phone: preparedNumber,
        name: name,
        message: message
    };

    const jsonResponce = JSON.stringify(formData, null, 2);
    const form = document.getElementById('feedbackForm');
    const jsonUser = document.getElementById('json');

    form.style.display = 'none';

    const jsonText = document.createElement('p');
    jsonText.innerText = jsonResponce;
    const jsonButton = document.createElement('button');
    jsonButton.innerText = 'Вернуться на форму';
    jsonButton.addEventListener('click', hideJson);

    jsonUser.appendChild(jsonText);
    jsonUser.appendChild(jsonButton);
    jsonUser.style.display = 'block';
}

function hideJson() {
    const jsonUser = document.getElementById('json');
    const form = document.getElementById('feedbackForm');
    jsonUser.style.display = 'none';
    form.style.display = 'block';
}
