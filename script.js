const firstName = document.querySelector('#name');
const secondName = document.querySelector('#secondName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const agree = document.querySelector('#agree');
const sendButton = document.querySelector('.send-btn');
const clearButton = document.querySelector('.clear-btn');  
const messageBox = document.querySelector('.message');

const form = document.querySelector(".form");
form.addEventListener("submit", async (event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();
  
  if (!agree.checked) {
    showMessage("Вы должны согласиться с условиями");
    return;
  }
  try {
    const response = await fetch(`https://polinashneider.space/user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: zhyldyz09'
    },
     body: JSON.stringify({
        name: firstName.value,
        secondName: secondName.value,
        phone: phone.value,
        email: email.value,
        agree: agree.checked
      }),
    });

    const result = await response.json();  
    console.log(result);
    showMessage("Отправка была успешной!")
    event.target.reset();
   } catch (err) {
    console.log(err);
    showMessage("Ошибка, попробуйте еще раз")
   }
})
clearButton.addEventListener('click' , () => {
  form.reset();
});

function showMessage(text, type = "success") {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
  messageBox.classList.remove("hidden");

  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 4000);
}