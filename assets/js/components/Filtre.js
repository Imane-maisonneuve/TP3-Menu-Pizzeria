import filtre from "./Application.js";

/**
 * classe Filtre qui gère la logique de filtrage des livres
 */
class Filtre {
  #elementHTML;
  #application;
  #listeLivreClone;

  /**
   * Le constructeur reçoit une instance de l’application principale
   */
  constructor(application) {
    this.#application = application;

    // Sélection de l’élément HTML contenant les filtres
    this.#elementHTML = document.querySelector("[data-filtres]");

    // Ajout d’un écouteur d’événement sur les clics dans la zone des filtres
    this.#elementHTML.addEventListener("click", this.onClicFiltre.bind(this));
  }

  /**
   * Récupération de la catégorie du filtre cliqué et appel de la méthode de filtrage
   * @param {*} evenement
   */
  onClicFiltre(evenement) {
    const declencheur = evenement.target.closest("[data-categorie]");
    const listeLivreClone = [...this.#application.listeLivres];

    let categorie = declencheur.dataset.categorie;

    this.filtrer(categorie, listeLivreClone);
  }

  /**
   * Méthode de filtrage des livres selon la catégorie choisie
   * @param {string} categorie
   * @param {Array} listeLivres
   */
  filtrer(categorie, listeLivres) {
    // Si clique sur "Tous", on affiche la liste complète
    if (categorie === "Tous") {
      this.#application.afficherListeLivres();
    } else {
      const nouvelleListe = listeLivres.filter(function (livre) {
        // particulier : catégorie "nouveaute" correspond au booléen nouveaute
        if (categorie === "nouveaute") {
          return livre.nouveaute === true;
        } else {
          return livre.categorie === categorie;
        }
      });
      // Affichage de la nouvelle liste filtrée dans l’application
      this.#application.afficherListeFiltre(nouvelleListe);
    }
  }
}

export default Filtre;
