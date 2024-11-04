document.querySelectorAll('.news-item h2').forEach((header) => {
    header.addEventListener('click', () => {
        const newsItem = header.parentElement;
        const isActive = newsItem.classList.contains('active');

        // Закрыть все открытые элементы
        document.querySelectorAll('.news-item').forEach((item) => {
            item.classList.remove('active');
        });

        // Открыть или закрыть текущий элемент
        if (!isActive) {
            newsItem.classList.add('active');
        }
    });
});
