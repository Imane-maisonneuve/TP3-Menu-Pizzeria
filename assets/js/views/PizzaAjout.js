import Toast from "../components/Toast.js";
import ToastErreur from "../components/ToastErreur.js";
import ToastSucces from "../components/ToastSucces.js";

class PizzaAjout {
  #application = null;
  #formulaire;

  constructor(application) {
    this.#application = application;
  }

  async #onSubmit(evenement) {
    evenement.preventDefault();
    const champs = this.#formulaire.querySelectorAll("[name]");
    const nouvellePizza = {};
    champs.forEach(
      function (champ) {
        nouvellePizza[champ.name] = champ.value;
      }.bind(this)
    );

    const id = await this.#application.ajouterPizza(nouvellePizza);
    if (id) {
      this.#formulaire.resert;
      this.#application.router.naviguer("/");
    }
  }

  async render() {
    this.#application.conteneurHTML.innerHTML = "";
    const gabarit = `
        <div>
            <form class="form">
                <h2>Ajouter une Pizza!</h2>
                <label for="nom">Nom</label>
                <input id="nom" name="nom" type="text" required>

                <label for="description">Description</label>
                <input id="description" name="description" type="text" required>

                <label for="prix">Prix</label>
                <input id="prix" name="prix" type="number" required>

                <label for="image_url">Image</label>
                <input id="image_url" name="image_url" type="text" required>

                <input type="submit" value="Ajouter" class="bouton">
            </form>
        </div>
            `;

    this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    this.#formulaire = this.#application.conteneurHTML.querySelector("form");
    this.#formulaire.addEventListener("submit", this.#onSubmit.bind(this));
  }
}
export default PizzaAjout;
