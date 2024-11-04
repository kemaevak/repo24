<?php
// Файл: students_console.php

require 'db.php'; // Подключение файла для подключения к базе данных

if ($argc < 2) {
    echo "Использование: php students_console.php [команда]\n";
    echo "Команды: add, list, delete\n";
    exit(1);
}

$command = $argv[1];

switch ($command) {
    case "add":
        echo "Введите имя студента: ";
        $name = trim(fgets(STDIN));
        echo "Введите email студента: ";
        $email = trim(fgets(STDIN));
        $stmt = $conn->prepare("INSERT INTO students (name, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $email);
        $stmt->execute();
        echo "Студент $name добавлен!\n";
        break;

    case "list":
        $result = $conn->query("SELECT * FROM students");
        echo "Список студентов:\n";
        while ($row = $result->fetch_assoc()) {
            echo $row['id'] . ". " . $row['name'] . " - " . $row['email'] . "\n";
        }
        break;

    case "delete":
        echo "Введите ID студента для удаления: ";
        $id = trim(fgets(STDIN));
        $stmt = $conn->prepare("DELETE FROM students WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo "Студент с ID $id удалён!\n";
        break;

    default:
        echo "Неизвестная команда: $command\n";
        exit(1);
}

$conn->close();
?>
