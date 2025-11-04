/**
 * Classe utilitaire pour gérer le stockage local (localStorage)
 * Fournit des méthodes pour sauvegarder, récupérer et supprimer des données.
 * Les méthodes sont statiques et peuvent être appelées sans instancier la classe. EX: EnregistrementLocalStorage.sauvegarderCleValeur(cle, valeur)
 */
class EnregistrementLocal {
    static sauvegarderCleValeur(cle, valeur) {
        try {
            localStorage.setItem(cle, JSON.stringify(valeur));
        } catch (e) {
            console.error("Erreur lors de la sauvegarde dans le localStorage :", e);
        }
    }

    static recupererValeurParCle(cle) {
        try {
            const valeur = localStorage.getItem(cle);
            return valeur ? JSON.parse(valeur) : null;
        } catch (e) {
            console.error("Erreur lors de la récupération depuis le localStorage :", e);
            return null;
        }
    }

    static supprimerCle(cle) {
        try {
            localStorage.removeItem(cle);
        } catch (e) {
            console.error("Erreur lors de la suppression dans le localStorage :", e);
        }
    }

    static viderStorage() {
        localStorage.clear();
    }
}

export default EnregistrementLocal;
