document.addEventListener('DOMContentLoaded', function() {
    const mainElement = document.querySelector('main');

    if (mainElement) {
        mainElement.addEventListener('wheel', function(e) {
            
            if (e.deltaY !== 0) {
                e.preventDefault();
                mainElement.scrollLeft += e.deltaY; 
            }
        });
    }
});


alert('Можно ли эту страницу скроллить по горизонтали колесиком мышки? Да! Просто попробуйте');

