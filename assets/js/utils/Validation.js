/**
 * Validation des données utilisateur
 * Fournit des fonctions pour valider les entrées courantes telles que le texte, les nombres, les e-mails, etc.
 * Les méthodes sont statiques et peuvent être appelées sans instancier la classe.
 * EX: Validation.estTexteValide("exemple", 1, 100);
 */
class Validation {
    static estVide(chaine) {
        return !chaine || chaine.trim().length === 0;
    }

    static estNonVide(chaine) {
        return !this.estVide(chaine);
    }

    static estTexteValide(texte, longueurMin = 1, longueurMax = 255) {
        if (typeof texte !== "string") return false;
        const longueur = texte.trim().length;
        return longueur >= longueurMin && longueur <= longueurMax;
    }

    static estNombreValide(nombre, min = null, max = null) {
        if (typeof nombre !== "number" || isNaN(nombre)) return false;
        if (min !== null && nombre < min) return false;
        if (max !== null && nombre > max) return false;
        return true;
    }

    static estBooleanValide(valeur) {
        return typeof valeur === "boolean";
    }

    static estEmailValide(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    static estUrlValide(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    static estNumeroTelephoneValide(numero) {
        const regexTelephone = /^\+?[0-9\s\-()]{7,15}$/;
        return regexTelephone.test(numero);
    }

    static estCodePostalValide(codePostal) {
        const regexCodePostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        return regexCodePostal.test(codePostal);
    }

    static formaterCodePostal(codePostal) {
        return codePostal
            .trim()
            .toUpperCase()
            .replace(/([A-Za-z]\d[A-Za-z])([ -]?)(\d[A-Za-z]\d)/g, "$1 $3");
    }

    static formaterNumeroTelephone(numero) {
        return numero
            .trim()
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
}

export default Validation;
