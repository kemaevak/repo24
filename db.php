<?php
// db.php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact_form";

// Создаем подключение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем подключение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
