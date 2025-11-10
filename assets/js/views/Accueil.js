import Toast from "../components/Toast.js";
import ToastErreur from "../components/ToastErreur.js";
import Filtre from "../components/Filtre.js";

class Accueil {
  #application = null;
  #listePizzas = [];
  #filtre;

  constructor(application) {
    this.#application = application;
    window.addEventListener("changementFiltre", this.#trierListe.bind(this));
  }

  // Génèrer le gabarit HTML d'une carte de pizza
  #genererCarte(pizza) {
    const gabarit = `
      <div class="pizza-card">               
        ${
          pizza.image_url
            ? `
            <div class="pizza-card__image">
                <img src="assets/img/${pizza.image_url}" alt="${pizza.nom}">
            </div>
        `
            : `
            <div class="pizza-card__image">
                <img src="assets/img/carnivore.jpg" alt="${pizza.nom}">
            </div>
        `
        }
        <div class="pizza-card__content">
            <div>
                <h3 class="pizza-card__nom">${pizza.nom}</h3>
              ${
                pizza.description
                  ? `<p class="pizza-card__description">${pizza.description}</p>`
                  : ""
              }
            </div>
            <div class="pizza-card__footer">
                <span class="pizza-card__prix">${pizza.prix}$</span>
                <a href="/pizza/${
                  pizza.id
                }" data-link class="bouton">Voir détail</a>
            </div>
        </div>
      </div>`;
    return gabarit;
  }

  // Génèrer le gabarit HTML de la liste des pizzas
  #genererListe(liste) {
    let grille = '<div class="grille">';

    liste.forEach((pizza) => {
      grille += this.#genererCarte(pizza);
    });

    grille += "</div>";
    return grille;
  }

  // Mettre à jour l'affichage de la liste des pizzas en fonction du filtre
  #trierListe() {
    const conteneurListe = this.#application.conteneurHTML.querySelector(
      "[data-liste-pizzas]"
    );
    const nouvelleListe = this.#filtre.trier(this.#listePizzas);
    conteneurListe.innerHTML = this.#genererListe(nouvelleListe);
  }

  // Rendre la vue Accueil
  async render() {
    try {
      this.#listePizzas = await this.#application.rechercherListePizzas();

      this.#application.conteneurHTML.innerHTML = "";

      const gabarit = `
                <div class="accueil-container">
                    <div data-contenur-filtre>
                    </div>
                    <div class="pizzas-section" data-liste-pizzas>
                        ${this.#genererListe(this.#listePizzas)}
                    </div>
                </div>
            `;

      this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
      const contenurFiltre = this.#application.conteneurHTML.querySelector(
        "[data-contenur-filtre]"
      );
      this.#filtre = new Filtre(contenurFiltre);
    } catch (erreur) {
      new ToastErreur(erreur.message);
    }
  }
}

export default Accueil;
