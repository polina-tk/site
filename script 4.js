document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.querySelector('.modal-close');

    function validateName(name) {
        const re = /^[а-яА-ЯёЁa-zA-Z\s]{2,30}$/;
        return re.test(name.trim());
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.trim());
    }

    function validatePhone(phone) {
        if (!phone) return true;
        const re = /^[\d\s\-\+\(\)]{10,15}$/;
        return re.test(phone.trim());
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    document.getElementById('name').addEventListener('blur', function() {
        const errorElement = this.nextElementSibling;
        if (!validateName(this.value)) {
            this.parentNode.classList.add('invalid');
            this.parentNode.classList.remove('success');
            errorElement.textContent = 'Введите имя (2-30 символов, только буквы)';
        } else {
            this.parentNode.classList.remove('invalid');
            this.parentNode.classList.add('success');
            errorElement.textContent = '';
        }
    });

    document.getElementById('email').addEventListener('blur', function() {
        const errorElement = this.nextElementSibling;
        if (!validateEmail(this.value)) {
            this.parentNode.classList.add('invalid');
            this.parentNode.classList.remove('success');
            errorElement.textContent = 'Введите корректный email';
        } else {
            this.parentNode.classList.remove('invalid');
            this.parentNode.classList.add('success');
            errorElement.textContent = '';
        }
    });

    document.getElementById('phone').addEventListener('blur', function() {
        const errorElement = this.nextElementSibling;
        if (!validatePhone(this.value)) {
            this.parentNode.classList.add('invalid');
            this.parentNode.classList.remove('success');
            errorElement.textContent = 'Введите корректный номер телефона';
        } else {
            this.parentNode.classList.remove('invalid');
            if (this.value.trim()) this.parentNode.classList.add('success');
            errorElement.textContent = '';
        }
    });

    document.getElementById('message').addEventListener('blur', function() {
        const errorElement = this.nextElementSibling;
        if (!validateMessage(this.value)) {
            this.parentNode.classList.add('invalid');
            this.parentNode.classList.remove('success');
            errorElement.textContent = 'Сообщение должно содержать минимум 10 символов';
        } else {
            this.parentNode.classList.remove('invalid');
            this.parentNode.classList.add('success');
            errorElement.textContent = '';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameValid = validateName(form.name.value);
        const emailValid = validateEmail(form.email.value);
        const phoneValid = validatePhone(form.phone.value);
        const messageValid = validateMessage(form.message.value);

        form.name.parentNode.classList.toggle('invalid', !nameValid);
        form.email.parentNode.classList.toggle('invalid', !emailValid);
        form.phone.parentNode.classList.toggle('invalid', !phoneValid);
        form.message.parentNode.classList.toggle('invalid', !messageValid);

        if (!nameValid) form.name.nextElementSibling.textContent = 'Введите имя (2-30 символов, только буквы)';
        if (!emailValid) form.email.nextElementSibling.textContent = 'Введите корректный email';
        if (!phoneValid) form.phone.nextElementSibling.textContent = 'Введите корректный номер телефона';
        if (!messageValid) form.message.nextElementSibling.textContent = 'Сообщение должно содержать минимум 10 символов';

        if (nameValid && emailValid && phoneValid && messageValid) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(function() {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                showModal('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
                form.reset();

                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'invalid');
                });
            }, 1500);
        } else {
            const firstError = document.querySelector('.form-group.invalid');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});