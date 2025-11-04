<?php
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../config/database.php';

// Récupération des paramètres de tri et pagination
$tri = isset($_GET['tri']) ? $_GET['tri'] : 'nom';
$ordre = isset($_GET['ordre']) ? strtoupper($_GET['ordre']) : 'ASC';
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limite = isset($_GET['limite']) ? max(1, min(100, intval($_GET['limite']))) : 10;

// Validation du tri
$trisAutorises = ['nom', 'prix', 'id'];
if (!in_array($tri, $trisAutorises)) {
    $tri = 'nom';
}

// Validation de l'ordre
if (!in_array($ordre, ['ASC', 'DESC'])) {
    $ordre = 'ASC';
}

// Calcul de l'offset
$offset = ($page - 1) * $limite;

try {
    $database = new Database();
    $db = $database->getConnection();

    // Requête pour compter le total
    $queryCount = "SELECT COUNT(*) as total FROM pizzas";
    $stmtCount = $db->prepare($queryCount);
    $stmtCount->execute();
    $total = $stmtCount->fetch(PDO::FETCH_ASSOC)['total'];

    // Requête pour récupérer les pizzas avec tri et pagination
    $query = "SELECT * FROM pizzas ORDER BY {$tri} {$ordre} LIMIT :limite OFFSET :offset";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':limite', $limite, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $pizzas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calcul des métadonnées de pagination
    $totalPages = ceil($total / $limite);

    http_response_code(200);
    echo json_encode([
        'data' => $pizzas,
        'pagination' => [
            'page' => $page,
            'limite' => $limite,
            'total' => $total,
            'totalPages' => $totalPages,
            'hasNext' => $page < $totalPages,
            'hasPrev' => $page > 1
        ],
        'tri' => [
            'champ' => $tri,
            'ordre' => $ordre
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'message' => 'Erreur lors de la récupération des pizzas',
        'error' => $e->getMessage()
    ]);
}
?>