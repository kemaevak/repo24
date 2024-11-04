<?php
// Файл: students_api.php

header("Content-Type: application/json"); // тип контента как JSON

$method = $_SERVER['REQUEST_METHOD']; // Получение тип HTTP запроса (GET, POST, PUT, DELETE)
$conn = new mysqli("localhost", "root", "", "contact_form"); // Подключение к базе данных

if ($conn->connect_error) {
    die(json_encode(['error' => 'Ошибка подключения к базе данных']));
}

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM students");
        $students = [];
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
        echo json_encode($students);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $conn->real_escape_string($input['name']);
        $email = $conn->real_escape_string($input['email']);
        $conn->query("INSERT INTO students (name, email) VALUES ('$name', '$email')");
        echo json_encode(['message' => 'Студент добавлен']);
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $conn->real_escape_string($input['id']);
        $name = $conn->real_escape_string($input['name']);
        $email = $conn->real_escape_string($input['email']);
        $conn->query("UPDATE students SET name='$name', email='$email' WHERE id=$id");
        echo json_encode(['message' => 'Студент обновлён']);
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $input);
        $id = $conn->real_escape_string($input['id']);
        $conn->query("DELETE FROM students WHERE id=$id");
        echo json_encode(['message' => 'Студент удалён']);
        break;

    default:
        echo json_encode(['error' => 'Метод не поддерживается']);
        break;
}

$conn->close(); // Закрытие подключения к базе данных
?>
