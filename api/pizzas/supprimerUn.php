<?php
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../config/database.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['message' => 'ID invalide']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "DELETE FROM pizzas WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Pizza supprimée avec succès']);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Pizza non trouvée']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'message' => 'Erreur lors de la suppression de la pizza',
        'error' => $e->getMessage()
    ]);
}
?>