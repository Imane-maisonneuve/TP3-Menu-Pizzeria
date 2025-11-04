-- Création de la base de données
CREATE DATABASE IF NOT EXISTS livraison_pizza CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE livraison_pizza;

-- Table des pizzas
CREATE TABLE pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    prix DECIMAL(5,2) NOT NULL,
    image_url VARCHAR(255),
    ingredients TEXT,
    est_sans_gluten BOOLEAN DEFAULT FALSE,
    est_vegan BOOLEAN DEFAULT FALSE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insertion des pizzas
INSERT INTO pizzas (nom, description, prix, image_url, ingredients, est_sans_gluten, est_vegan) VALUES
('Margherita', 'La classique intemporelle ! Base de sauce tomate maison, mozzarella fondante et basilic frais du jardin. Simple, authentique et irrésistible.', 12.99, 'margherita.jpg', 'Sauce tomate, mozzarella, basilic frais', FALSE, FALSE),

('Pepperoni', 'Un grand classique américain ! Généreuse garniture de pepperoni croustillant sur une base de sauce tomate et mozzarella onctueuse.', 13.99, 'pepperoni.jpg', 'Sauce tomate, mozzarella, pepperoni', FALSE, FALSE),

('Végétarienne', 'L\'explosion de saveurs du jardin ! Poivrons colorés, champignons frais, oignons caramélisés et olives noires sur une base de sauce tomate et mozzarella. La pâte à base de chou-fleur est bien sûr sans gluten. Option de remplacer par du fromage vegan disponible.', 14.99, 'vegetarienne.jpg', 'Sauce tomate, mozzarella, poivrons, champignons, oignons, olives noires', TRUE, TRUE),

('Hawaïenne', 'Le voyage exotique parfait ! L\'alliance audacieuse du jambon savoureux et de l\'ananas juteux qui fait fondre les cœurs. Controversée mais délicieuse !', 14.99, 'hawaienne.jpg', 'Sauce tomate, mozzarella, jambon, ananas', FALSE, FALSE),

('Carnivore', 'Pour les vrais amateurs de viande ! Pepperoni épicé, saucisse italienne, bacon croustillant et bœuf haché sur une montagne de fromage fondant. Un festin !', 16.99, NULL, 'Sauce tomate, mozzarella, pepperoni, saucisse italienne, bacon, bœuf haché', FALSE, FALSE),

('Mexicaine', 'Ole ! Le feu du Mexique dans votre assiette ! Bœuf épicé relevé de jalapeños piquants et poivrons grillés. Pour ceux qui aiment les sensations fortes !', 15.99, 'mexicaine.jpg', 'Sauce tomate, mozzarella, bœuf épicé, jalapeños, poivrons', FALSE, FALSE),

('Toute garnie', 'La pizza des gourmands ! Pepperoni, saucisse, champignons, poivrons, oignons et olives. Tout ce que vous aimez sur une seule pizza !', 17.99, 'touteGarnie.jpg', 'Sauce tomate, mozzarella, pepperoni, saucisse, champignons, poivrons, oignons, olives noires', FALSE, FALSE);
