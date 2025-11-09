import Router from "./Router.js";
import Toast from "./components/Toast.js";

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

  async rechercherServiceParId(id) {
    try {
      const reponse = await fetch(`api/pizzas/RechercherUn.php?id=${id}`);
      const resultat = await reponse.json();

      return resultat.donnees;
    } catch (erreur) {
      new Toast(document.body, erreur.message);
    }
  }

  async ajouterService(donnees) {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
      };

      const reponse = await fetch("api/pizzas/AjouterUn.php", config);
      const resultat = await reponse.json();

      return resultat.id;
    } catch (erreur) {
      new Toast(document.body, erreur.message);
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
