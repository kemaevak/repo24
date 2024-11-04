document.addEventListener('DOMContentLoaded', function () {
    const texts = [
      "Поступающие и их родители!",
      "Мы рады, что вы приняли приглашение на обучение в Колдовстворце . . .",
      ". . . в древнейшей школе магии, волшебства, колдовства и других искусств.",
      "Несомненно, первый шаг самый важный и волнительный . . .",
      ". . . и поэтому мы  подготовили для вас немного полезной информации.",
      "Листайте дальше."
    ];
  
    const typewriter = document.getElementById('typewriter-text');
    let cursor = document.createElement('span');
    cursor.classList.add('cursor');
    typewriter.parentNode.appendChild(cursor); // Добавляем курсор после текста
  
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Начальная скорость набора
    let deletingSpeed = 30; // Увеличенная скорость удаления текста (быстрее, чем скорость набора)
  
    function type() {
      const currentText = texts[textIndex];
      if (isDeleting) {
        typewriter.innerHTML = currentText.substring(0, charIndex).replace(/\n/g, '<br>');
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          textIndex++;
          if (textIndex === texts.length) {
            // Останавливаем анимацию на последнем тексте
            cursor.style.display = 'none'; // Оставляем текст без курсора на последнем этапе
            return;
          }
        }
      } else {
        typewriter.innerHTML = currentText.substring(0, charIndex).replace(/\n/g, '<br>');
        charIndex++;
        if (charIndex > currentText.length) {
          if (textIndex < texts.length - 1) {
            isDeleting = true;
            typingSpeed = deletingSpeed; // Устанавливаем скорость на более быструю для удаления
          } else {
            // Останавливаем анимацию на последнем тексте
            clearInterval(typeInterval);
            typewriter.innerHTML = currentText.replace(/\n/g, '<br>'); // Добавляем разрыв строк
            cursor.classList.add('end');
            return;
          }
        }
      }
      // Перемещаем курсор в конец текста
      cursor.style.display = 'inline-block';
    }
  
    // Запускаем анимацию текста с регулярным интервалом
    const typeInterval = setInterval(type, typingSpeed);
  });
  


  









  // акк
  function toggleItem(id) {
    const item = document.getElementById(`item-${id}`);
    const allItems = document.querySelectorAll(".timeline-item");
  
    allItems.forEach((element) => {
      if (element !== item) {
        element.classList.remove("open");
        element.querySelector(".icon").textContent = "ᐳ"; // Вернуть стрелку вправо
  
        // Сбросим max-height для скрытия текста плавно
        const text = element.querySelector(".timeline-text");
        text.style.maxHeight = null;
      }
    });
  
    item.classList.toggle("open");
    const icon = item.querySelector(".icon");
    icon.textContent = item.classList.contains("open") ? "ᐯ" : "ᐳ"; // Изменение стрелки
  
    // Устанавливаем max-height, чтобы обеспечить плавное раскрытие текста
    const text = item.querySelector(".timeline-text");
    if (item.classList.contains("open")) {
      text.style.maxHeight = text.scrollHeight + "px"; // Устанавливаем высоту в зависимости от контента
    } else {
      text.style.maxHeight = null;
    }
  }
  
  




  
  