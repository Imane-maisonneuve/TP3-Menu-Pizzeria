import Router from "./Router.js";
import Toast from "./components/Toast.js";
import ToastErreur from "./components/ToastErreur.js";
import ToastSucces from "./components/ToastSucces.js";

class Application {
  #conteneurHTML = null;
  #router;
  #listePizzas;

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

  async rechercherListePizzas() {
    try {
      const reponse = await fetch("api/pizzas/RechercherTout.php");
      const resultat = await reponse.json();
      return resultat.data;
    } catch (erreur) {
      new Toast(document.body, erreur.message);
    }
  }

  // async rechercherServiceParId(id) {
  //   try {
  //     const reponse = await fetch(`api/pizzas/RechercherUn.php?id=${id}`);
  //     const resultat = await reponse.json();

  //     return resultat.donnees;
  //   } catch (erreur) {
  //     new Toast(document.body, erreur.message);
  //   }
  // }

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

  // modifierService() {}

  // async supprimerService(id) {
  //   try {
  //     const reponse = await fetch(`api/pizzas/SupprimerUn.php?id=${id}`);
  //     const resultat = await reponse.json();

  //     if (!reponse.ok) {
  //       throw new Error(resultat);
  //     }

  //     return resultat;
  //   } catch (erreur) {
  //     new Toast(document.body, erreur.message);
  //   }
  // }
}

export default Application;
