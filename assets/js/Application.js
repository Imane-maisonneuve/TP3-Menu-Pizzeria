import Router from "./Router.js";
import Toast from "./components/Toast.js";
import ToastErreur from "./components/ToastErreur.js";
import ToastSucces from "./components/ToastSucces.js";

class Application {
  #conteneurHTML = null;
  #router;

  constructor() {
    this.#conteneurHTML = document.querySelector("[data-application]");
    this.#router = new Router(this);
  }

  get conteneurHTML() {
    return this.#conteneurHTML;
  }

  get router() {
    return this.#router;
  }

  // rechercher toutes les pizzas pour les afficher dans la page d'accueil
  async rechercherListePizzas() {
    try {
      const reponse = await fetch("/api/pizzas/RechercherTout.php");
      const resultat = await reponse.json();
      if (!resultat.data) {
        throw new Error(resultat.message);
      }
      return resultat.data;
    } catch (erreur) {
      new ToastErreur(erreur.message);
    }
  }

  // rechercher une pizza par son id pour l'afficher dans la page de détail
  async rechercherPizzaParId(id) {
    try {
      const reponse = await fetch(`/api/pizzas/rechercherUn.php?id=${id}`);
      const resultat = await reponse.json();

      if (resultat.message) {
        throw new Error(resultat.message);
      }

      return resultat;
    } catch (erreur) {
      new ToastErreur(erreur.message);
    }
  }

  // ajouter une nouvelle pizza
  async ajouterPizza(nouvellePizza) {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(nouvellePizza),
      };

      const reponse = await fetch("api/pizzas/ajouterUn.php", config);
      const resultat = await reponse.json();

      if (!resultat.id) {
        throw new Error(resultat.message);
      } else {
        new ToastSucces(resultat.message);
      }

      return resultat.id;
    } catch (erreur) {
      new ToastErreur(erreur.message);
    }
  }
}

export default Application;
