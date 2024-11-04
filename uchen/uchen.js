document.addEventListener("DOMContentLoaded", function() {
    const cardsArray = [
      { name: "🔮", id: 1 },
      { name: "👻", id: 2 },
      { name: "🧙", id: 3 },
      { name: "🦄", id: 4 },
      { name: "🔮", id: 5 },
      { name: "👻", id: 6 },
      { name: "🧙", id: 7 },
      { name: "🦄", id: 8 }
    ];
  
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;
    let timer = 0;
    let timerInterval = null;
  
    // Получаем доступ к элементам экрана
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");
    const timerElement = document.getElementById("timer");
    const finalTimeElement = document.getElementById("final-time");
  
    // Кнопки
    document.getElementById("start-button").addEventListener("click", () => {
      showScreen(gameScreen);
      startGame();
    });
    document.getElementById("restart-button").addEventListener("click", startGame); // Обновлено
  
    // Запуск игры
    function startGame() {
      matchedPairs = 0;
      timer = 0;
      firstCard = null;
      secondCard = null;
      lockBoard = false;
  
      timerElement.textContent = `Время: ${timer} сек`;
      createBoard(); // Создание игрового поля
      showScreen(gameScreen); // Показать экран игры
  
      timerInterval = setInterval(() => {
        timer += 1;
        timerElement.textContent = `Время: ${timer} сек`;
      }, 1000);
    }
  
    // Функция переключения экранов
    function showScreen(screen) {
      startScreen.style.display = "none";
      gameScreen.style.display = "none";
      endScreen.style.display = "none";
      screen.style.display = "block";
    }
  
    // Создание игрового поля
    function createBoard() {
      const gameBoard = document.getElementById("game-board");
      gameBoard.innerHTML = ""; // Очистка игрового поля перед началом новой игры
      const shuffledCards = shuffle(cardsArray);
  
      shuffledCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id;
  
        // Лицевая и обратная стороны карточки
        cardElement.innerHTML = `
          <div class="card-front">✨</div>
          <div class="card-back">${card.name}</div>
        `;
  
        cardElement.addEventListener("click", () => handleCardClick(cardElement, card));
        gameBoard.appendChild(cardElement);
      });
    }
  
    // Обработка клика по карточке
    function handleCardClick(cardElement, card) {
      if (lockBoard || cardElement.classList.contains("flipped") || cardElement.classList.contains("matched")) return;
  
      cardElement.classList.add("flipped");
  
      if (!firstCard) {
        firstCard = { cardElement, card };
      } else {
        secondCard = { cardElement, card };
        lockBoard = true;
  
        if (firstCard.card.name === secondCard.card.name) {
          // Если карточки совпали
          setTimeout(() => {
            markCardsAsMatched();
            resetTurn();
          }, 500);
        } else {
          // Если карточки не совпали
          setTimeout(() => {
            unflipCards();
            resetTurn();
          }, 1000);
        }
      }
    }
  
    // Помечаем карточки как совпавшие
    function markCardsAsMatched() {
      firstCard.cardElement.classList.add("matched");
      secondCard.cardElement.classList.add("matched");
  
      matchedPairs += 1;
  
      // Проверяем, все ли пары совпали
      if (matchedPairs === cardsArray.length / 2) {
        clearInterval(timerInterval);
        setTimeout(() => {
          finalTimeElement.textContent = timer;
          showScreen(endScreen);
        }, 500);
      }
    }
  
    // Переворот карточек обратно
    function unflipCards() {
      if (firstCard && secondCard) {
        firstCard.cardElement.classList.remove("flipped");
        secondCard.cardElement.classList.remove("flipped");
      }
    }
  
    // Сброс после каждого хода
    function resetTurn() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }
  
    // Перемешивание карточек
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  });
  