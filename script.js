document.addEventListener("DOMContentLoaded", function () { 
    const progressBar = document.getElementById('progress-bar');
    const progressSection = document.querySelector('.progress-section');
    const milestones = document.querySelectorAll('.milestone');
    const progressTitle = document.querySelector('.progress-title');
    let animationStartTime = null;
    let animationFrameId = null;

    // Данные для этапов
    const milestoneData = [
        {
            percent: 0,
            title: "КОЛДОВСТВОРЕЦ - САМЫЙ ДРЕВНЕЙШИЙ ЦЕНТР РУССКОЙ МАГИИ, СТИХИЙНО ОБРАЗОВАННЫЙ В 988 ГОДУ В РЕЗУЛЬТАТЕ ГОНЕНИЙ И СТАВШИЙ ЛУЧШИМ ИСТОЧНИКОМ ЗНАНИЙ"
        },
        {
            percent: 30,
            title: "5 БОТАНИЧЕСКИХ САДОВ, 5 ОТДЕЛЕНИЙ ДЛЯ ЖИВОТНЫХ, БОЛЕЕ 6 000 КОМНАТ И КАБИНЕТОВ, 6 ПОЛЕЙ ДЛЯ КВИДДИЧА, 2 КЛЮЧЕВЫЕ ТЕРРИТОРИИ"
        },
        {
            percent: 70,
            title: "ПОСТОЯННО В ШКОЛЕ ПРЕБЫВАЕТ НЕ МЕНЕЕ 5000 УЧЕНИКОВ, ДЛЯ КОТОРЫХ СТАРАЮТСЯ 48 ПРОФЕССОРОВ, 40 МАГИЧЕСКИХ СПЕЦИАЛИСТОВ И 20 АССИСТЕНТОВ ИЗ ИМПЕРСКОГО УПРАВЛЕНИЯ"
        },
        {
            percent: 100,
            title: "400 МАГИЧЕСКИХ СУЩЕСТВ, 300 МАГИЧЕСКИХ РАСТЕНИЙ, 20% ИЗ КОТОРЫХ НАХОДЯТСЯ В ЗАПРЕТНОЙ МАГИЧЕСКОЙ КНИГЕ И КОТОРЫЕ СОДЕРЖАТСЯ ЛУЧШИМИ МАГАМИ БОТАНИКИ И ЖИВОТНИЧЕСТВА"
        }
    ];

    // Функция для сброса анимации
    function resetAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationStartTime = null;
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%'; // Сбросить ширину прогресс-бара

        milestones.forEach((milestone) => {
            milestone.classList.remove('milestone-reached');
        });

        // Сброс текста над прогресс-баром
        progressTitle.textContent = milestoneData[0].title;
    }

    // Функция для запуска анимации
    function startAnimation(timestamp) {
        if (!animationStartTime) {
            animationStartTime = timestamp;
        }

        const duration = 30000; // Длительность анимации в миллисекундах (30 секунд)
        const elapsed = timestamp - animationStartTime;
        const progress = Math.min(elapsed / duration, 1);

        // Обновляем ширину прогресс-бара
        progressBar.style.width = (progress * 100) + '%';

        // Обновляем состояние ножек и текст над прогресс-баром
        milestones.forEach((milestone, index) => {
            const milestonePercent = milestoneData[index].percent;

            if (progress * 100 >= milestonePercent) {
                milestone.classList.add('milestone-reached');
                progressTitle.textContent = milestoneData[index].title;
            }
        });

        // Если анимация не завершена, продолжаем
        if (progress < 1) {
            animationFrameId = requestAnimationFrame(startAnimation);
        }
    }

    // IntersectionObserver для запуска и сброса анимации при появлении и исчезновении элемента
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                resetAnimation(); // Сбрасываем перед началом новой анимации
                animationFrameId = requestAnimationFrame(startAnimation);
            } else {
                resetAnimation(); // Сбросить анимацию, когда элемент выходит из видимости
            }
        });
    }, { threshold: 0.5 });

    observer.observe(progressSection);
});





















document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('.particles canvas');
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };

    // Инициализация размера canvas
    updateCanvasSize();

    // Обновляем размеры canvas при изменении окна
    window.addEventListener('resize', updateCanvasSize);

    const SNOWFLAKE_COUNT = 200;
    const r = (n = 1) => Math.random() * n;
    const PI = Math.PI;

    const snowflakePrototype = () => ({
        x: Math.random() * canvas.width,
        y: -10,
        speed: 1 + Math.random() * 3,
        radius: 1 + Math.random() * 3,
        oscillation: 0.5 + Math.random() * 2,
        oscillationSpeed: 0.01 + Math.random() * 0.02
    });

    const snowflakes = (new Array(SNOWFLAKE_COUNT)).fill({}).map(snowflakePrototype);

    const updateSnowflakes = () => {
        snowflakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += Math.sin(flake.y * flake.oscillationSpeed) * flake.oscillation;

            if (flake.y > canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * canvas.width;
                flake.speed = 1 + Math.random() * 3;
            }
        });
    };

    const renderSnowflakes = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, PI * 2, true);
            ctx.fill();
        });
    };

    const loop = () => {
        updateSnowflakes();
        renderSnowflakes();
        requestAnimationFrame(loop);
    };

    loop();
});







document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Останавливает стандартную отправку формы

        const formData = new FormData(form);

        fetch('submit.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Показать сообщение о результате
            alert(data);

            // Сбросить форму, если сообщение успешно отправлено
            form.reset();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке сообщения.');
        });
    });
});














