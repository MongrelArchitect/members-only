function validateMessage() {
  const setCharCount = (count) => {
    const charCount = document.querySelector('#charCount');
    charCount.textContent = count.toString().padStart(3, '0');
  };

  const setSubmit = () => {
    const text = document.querySelector('#text');
    const title = document.querySelector('#title');
    const submit = document.querySelector('#submit');
    if (text.validity.valid && title.validity.valid) {
      submit.removeAttribute('disabled');
      submit.classList.remove('btn-secondary');
      submit.classList.add('btn-primary');
    } else {
      submit.setAttribute('disabled', true);
      submit.classList.remove('btn-primary');
      submit.classList.add('btn-secondary');
    }
  };

  const setInvalid = (input, message) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const errorMessage = message;
    errorMessage.className = 'text-danger';
  };

  const setValid = (input, message) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errorMessage = message;
    errorMessage.textContent = '';
    errorMessage.className = 'text-success';
  };

  const validateTitle = () => {
    const title = document.querySelector('#title');
    const titleError = document.querySelector('#titleError');
    title.addEventListener('input', (event) => {
      setSubmit();
      const { valid } = event.target.validity;
      if (valid) {
        setValid(title, titleError);
      } else {
        setInvalid(title, titleError);
        if (!title.value) {
          // title required
          titleError.textContent = 'Title required';
        } else {
          // 50 char limit
          titleError.textContent = '50 character limit';
        }
      }
    });
  };

  const validateText = () => {
    const text = document.querySelector('#text');
    const textError = document.querySelector('#textError');
    text.addEventListener('input', (event) => {
      setSubmit();
      setCharCount(event.target.value.length);
      const { valid } = event.target.validity;
      if (valid) {
        setValid(text, textError);
      } else {
        setInvalid(text, textError);
        if (!text.value) {
          // message required
          textError.textContent = 'Message required';
        } else {
          // 500 char limit
          textError.textContent = '500 character limit';
        }
      }
    });
  };

  setCharCount(document.querySelector('#text').value.length);
  validateTitle();
  validateText();
}

validateMessage();
