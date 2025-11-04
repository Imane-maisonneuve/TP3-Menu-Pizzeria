<!DOCTYPE html>
<html lang="fr">

<head>
    <!-- À modifier si votre application n'est pas à la racine du serveur web -->
    <!-- <base href="/appliLivraison/"> -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <!-- CSS principal -->
    <link rel="stylesheet" href="assets/css/styles.css" />
    <!-- JS principal -->
    <script type="module" src="assets/js/index.js"></script>
    <title>Pizzeria Livraison</title>
</head>

<body>
    <header>
        <div class="header-container">
            <h1>🍕 Pizzeria Livraison</h1>
            <nav>
                <ul>
                    <li><a href="/" data-link>Voir toutes nos pizzas</a></li>
                    <li><a href="/admin" data-link>Admin</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main data-application></main>
    <footer>
        <p>&copy; 2024 Pizzeria Livraison - Tous droits réservés</p>
    </footer>
</body>

</html>