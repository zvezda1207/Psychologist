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
    });

    // Закрытие меню при клике на ссылку (мобильные)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
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

            let error = form.querySelector('.form-message.error');
            if (!error) {
                error = document.createElement('div');
                error.className = 'form-message error';
                form.insertBefore(error, form.firstChild);
            }
            error.textContent = 'Пожалуйста, заполните все обязательные поля и подтвердите согласие.';
            error.style.display = 'block';

            if (!name) form.querySelector('#name').style.borderColor = 'var(--color-error)';
            if (!contact) form.querySelector('#contact').style.borderColor = 'var(--color-error)';
            if (!agree) form.querySelector('.checkbox-label').style.color = 'var(--color-error)';
            return;
        }

        const action = form.getAttribute('action');
        if (action.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            let success = form.querySelector('.form-message.success');
            if (!success) {
                success = document.createElement('div');
                success.className = 'form-message success';
                form.insertBefore(success, form.firstChild);
            }
            success.textContent = 'Форма пока в демо-режиме. Чтобы заявки отправлялись, нужно подключить Formspree.';
            success.style.display = 'block';
        }
    });

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

// Карусель в секции "Образование"
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

if (slides.length > 0) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
}