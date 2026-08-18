// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Закрываем бургер, если открыт
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Бургер-меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        const isOpen = !nav.classList.contains('active');
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        burger.setAttribute('aria-expanded', isOpen.toString());

        // Блокируем/разблокируем прокрутку страницы
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню при клике на ссылку (мобильные)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// Валидация формы
const form = document.getElementById('feedbackForm');
if (form) {
    form.addEventListener('submit', function(e) {
        const name = form.querySelector('#name').value.trim();
        const contact = form.querySelector('#contact').value.trim();
        const agree = form.querySelector('input[name="agree"]').checked;

        if (!name || !contact || !agree) {
            e.preventDefault();

            // Показываем ошибку
            let error = form.querySelector('.form-message.error');
            if (!error) {
                error = document.createElement('div');
                error.className = 'form-message error';
                form.insertBefore(error, form.firstChild);
            }
            error.textContent = 'Пожалуйста, заполните все обязательные поля и подтвердите согласие.';
            error.style.display = 'block';

            // Подсвечиваем незаполненные поля
            if (!name) form.querySelector('#name').style.borderColor = 'var(--color-error)';
            if (!contact) form.querySelector('#contact').style.borderColor = 'var(--color-error)';
            if (!agree) form.querySelector('.checkbox-label').style.color = 'var(--color-error)';

            return;
        }

        // Если Formspree не настроен — показываем сообщение
        const action = form.getAttribute('action');
        if (action.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            let success = form.querySelector('.form-message.success');
            if (!success) {
                success = document.createElement('div');
                success.className = 'form-message success';
                form.insertBefore(success, form.firstChild);
            }
            success.textContent = 'Форма пока в демо-режиме. Чтобы заявки отправлялись, нужно подключить Formspree (см. инструкцию ниже).';
            success.style.display = 'block';
        }
    });

    // Сброс ошибок при вводе
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            const error = form.querySelector('.form-message.error');
            if (error) error.style.display = 'none';
        });
    });

    const agreeCheckbox = form.querySelector('input[name="agree"]');
    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', function() {
            form.querySelector('.checkbox-label').style.color = '';
        });
    }
}