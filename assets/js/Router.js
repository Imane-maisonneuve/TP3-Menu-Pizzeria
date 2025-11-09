import Accueil from "./views/Accueil.js";
import Pizza404 from "./views/Pizza404.js";
import PizzaAjout from "./views/PizzaAjout.js";
import PizzaDetail from "./views/PizzaDetail.js";
class Router {
  #application;
  #routes;
  #vueActuelle;
  #basename;

  constructor(application) {
    this.#application = application;
    this.#basename = "/appliLivraison";
    this.#routes = {
      "": Accueil,
      admin: PizzaAjout,
      pizza: PizzaDetail,
    };

    this.miseAJour();
    document.body.addEventListener("click", this.#onClicLien.bind(this));
    window.addEventListener("popstate", this.miseAJour.bind(this));
  }

  #onClicLien(evenement) {
    const declencheur = evenement.target;

    if (declencheur.closest("[data-link]")) {
      evenement.preventDefault();

      const url = new URL(declencheur.href);
      this.naviguer(url.pathname);
    }
  }

  naviguer(chemin) {
    const baseComplete = window.location.origin + this.#basename;
    const href = baseComplete + chemin;

    history.pushState({}, "", href);
    this.miseAJour();
  }

  miseAJour() {
    const url = new URL(window.location.href);
    let pathname = url.pathname;
    const searchParams = url.searchParams;

    if (pathname.startsWith(this.#basename)) {
      pathname = pathname.slice(this.#basename.length);
    }

    const tableau = pathname.split("/").filter((element) => {
      return element != "";
    });

    const route = tableau.length > 0 ? tableau[0] : "";
    const parametreDynamique = tableau[1];

    let Vue = this.#routes[route];

    if (Vue) {
      this.#vueActuelle = new Vue(this.#application, parametreDynamique);
    } else {
      this.#vueActuelle = new Pizza404(this.#application);
    }

    this.#vueActuelle.render();
  }
}

export default Router;
