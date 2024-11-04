<?php
// submit.php

// Подключаем файл db.php для подключения к базе данных
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Проверка данных
    if (empty($name) || empty($email) || empty($message)) {
        echo "Пожалуйста, заполните все поля.";
        exit;
    }

    // Подготовка SQL-запроса для вставки данных в таблицу
    $stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    // Выполнение запроса и проверка результата
    if ($stmt->execute()) {
        echo "Ваше сообщение успешно отправлено!";
    } else {
        echo "Ошибка: " . $conn->error;
    }

    // Закрываем подключение
    $stmt->close();
    $conn->close();
}
?>
