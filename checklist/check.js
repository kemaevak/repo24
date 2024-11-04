function updateProgress() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const totalCheckboxes = checkboxes.length;
    let checkedCount = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    const progressPercent = Math.round((checkedCount / totalCheckboxes) * 100);
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    progressBar.style.width = progressPercent + '%';
    progressText.innerText = 'Вы готовы на: ' + progressPercent + '%';

    // Если прогресс достигает 100%, показываем плашку
    if (progressPercent === 100) {
        showCompletionBanner();
    }
}

function showCompletionBanner() {
    // Проверяем, если баннер уже существует, чтобы не создавать его повторно
    if (document.getElementById('completion-banner')) {
        return;
    }

    // Создаем элемент баннера
    const banner = document.createElement('div');
    banner.id = 'completion-banner';
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.width = '400px';
    banner.style.backgroundColor = '#f0f0f0'; // Светло-серый цвет
    banner.style.color = 'black';
    banner.style.textAlign = 'center';
    banner.style.padding = '20px';
    banner.style.border = '1px solid #ccc'; // Светло-серая рамка
    banner.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.2)';
    banner.style.zIndex = '1000';
    banner.innerText = 'Поздравляем! Вы готовы, ждем вашего приезда. Прибудьте до 8 августа включительно в школу.';

    // Создаем кнопку "Хорошо"
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Хорошо';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = '#e0e0e0';
    closeButton.style.border = '1px solid #ccc';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        document.body.removeChild(banner);
    };

    // Добавляем кнопку в баннер
    banner.appendChild(document.createElement('br'));
    banner.appendChild(closeButton);

    // Добавляем баннер в начало body
    document.body.appendChild(banner);
}
