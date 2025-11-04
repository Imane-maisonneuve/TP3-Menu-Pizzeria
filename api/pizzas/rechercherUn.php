<?php

header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../config/database.php';

// Récupération de l'ID depuis l'URL (?id=1)
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['message' => 'ID invalide']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "SELECT * FROM pizzas WHERE id = ? LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->execute([$id]);

    $pizza = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($pizza) {
        http_response_code(200);
        echo json_encode($pizza);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Pizza non trouvée']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'message' => 'Erreur lors de la récupération de la pizza',
        'error' => $e->getMessage()
    ]);
}
?>