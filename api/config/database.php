<?php
class Database
{
    private $host = "localhost";
    private $db = "livraison_pizza"; // Nom de la base de données
    private $nomUtilisateur = "root"; // Nom d'utilisateur de la base de données
    private $motDePasse = "admin"; //A MODIFIER SELON VOTRE CONFIGURATION
    private $port = "3306";
    private $charset = "utf8mb4";
    public $connexion;

    /**
     * Établit la connexion à la base de données
     * @return PDO|null
     */
    public function getConnection()
    {
        $this->connexion = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->connexion = new PDO($dsn, $this->nomUtilisateur, $this->motDePasse, $options);
        } catch (PDOException $e) {
            echo json_encode([
                'message' => 'Erreur de connexion à la base de données',
                'error' => $e->getMessage()
            ]);
            exit();
        }

        return $this->connexion;
    }
}
