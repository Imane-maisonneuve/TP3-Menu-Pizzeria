<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');

require_once __DIR__ . '/../config/database.php';

// Récupération des données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validation des données
if (empty($data['nom']) || empty($data['prix'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Données manquantes (nom et prix requis)']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "INSERT INTO pizzas (nom, description, prix, image_url) VALUES (:nom, :description, :prix, :image_url)";
    $stmt = $db->prepare($query);

    $nom = $data['nom'];
    $description = $data['description'] ?? null;
    $prix = $data['prix'];
    $image_url = $data['image_url'] ?? null;

    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':prix', $prix);
    $stmt->bindParam(':image_url', $image_url);

    $stmt->execute();

    $id = $db->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'message' => 'Pizza créée avec succès',
        'id' => $id
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'message' => 'Erreur lors de la création de la pizza',
        'error' => $e->getMessage()
    ]);
}
