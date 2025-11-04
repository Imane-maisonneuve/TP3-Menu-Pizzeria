<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST, PUT');

require_once __DIR__ . '/../config/database.php';

// Récupération des données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validation de l'ID
$id = isset($data['id']) ? intval($data['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['message' => 'ID invalide']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "UPDATE pizzas SET nom = :nom, description = :description, prix = :prix, image_url = :image_url WHERE id = :id";
    $stmt = $db->prepare($query);

    $stmt->bindParam(':nom', $data['nom']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':prix', $data['prix']);
    $stmt->bindParam(':image_url', $data['image_url']);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Pizza mise à jour avec succès']);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Pizza non trouvée ou aucune modification']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'message' => 'Erreur lors de la mise à jour de la pizza',
        'error' => $e->getMessage()
    ]);
}
?>