const name = document.getElementById('name-input');
const email = document.getElementById('email-input');
const message = document.getElementById('message-input');
const subject = document.getElementById('subject');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

const submit = document.getElementById('form-contact');

const formConfirm = `
  <div class="form__confirm">
    <span>E-mail enviado!</span>
  </div>
`;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

name.addEventListener('input', () => {
  if (name.value.trim().length >= 3) {
    nameError.classList.remove('show-error');
  } else {
    nameError.innerText = 'Nome deve conter pelo menos 3 caracteres';
    nameError.classList.add('show-error');
  }
});

email.addEventListener('input', () => {
  if (emailPattern.test(email.value)) {
    emailError.classList.remove('show-error');
  } else {
    emailError.innerText = 'Email inválido. Certifique-se de incluir o caractere @ e um domínio após ele';
    emailError.classList.add('show-error');
  }
});

message.addEventListener('input', () => {
  if(message.value.trim() !== '') {
    messageError.classList.remove('show-error');
  } else {
    messageError.innerText = 'Por favor, preencha o campo de mensagem';
    messageError.classList.add('show-error');
  }
});

submit.addEventListener('submit', (ev) => {
  ev.preventDefault();

  if (name.value.trim().length < 3 || !emailPattern.test(email.value) || message.value.trim() === '') {
    return;
  }

  let emailBody = `
    <b>Nome:</b> ${name.value}
    <br>
    <b>Email:</b> ${email.value}
    <br>
    <b>Message:</b>
    <br>
    ${message.value}
  `;

  Email.send({
    SecureToken : "4db073bd-905a-47ea-917a-5588bc2887ab",
    To : 'ablemosjunior@gmail.com',
    From : "ablemosjunior@gmail.com",
    Subject : `${name.value} ${subject.value}`,
    Body : emailBody
  }).then(
    submit.innerHTML = formConfirm
  );
});


/* SmtpJs.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };