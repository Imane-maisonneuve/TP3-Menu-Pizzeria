class PizzaDetail {
  #application = null;
  #id;
  constructor(application, id) {
    this.#application = application;
    this.#id = id;
  }

  async render() {
    // Récupération des données de la pizza
    const pizza = await this.#application.rechercherPizzaParId(this.#id);
    this.#application.conteneurHTML.innerHTML = "";

    // Gestion de l'image si elle n'existe pas en base de données
    let image = "";
    if (!pizza.image_url) {
      image = `<img src="/assets/img/carnivore.jpg" alt="${pizza.nom}">`;
    } else {
      image = `<img src="/assets/img/${pizza.image_url}" alt="${pizza.nom}"/>`;
    }

    // Gestion des mentions sans gluten et vegan
    let mentionGluten = "";
    let mentionVegan = "";

    if (pizza.est_sans_gluten === 1) {
      mentionGluten = `<small>Sans gluten ✓</small>`;
    }

    if (pizza.est_vegan === 1) {
      mentionVegan = `<small>Vegan ✓</small>`;
    }

    // Génération du gabarit HTML
    const gabarit = `
      <div class="detail">
          <div class ="detail-image">
            ${image}
          </div>
          <div class ="detail-description">
            <h2>${pizza.nom}</h2>
            ${mentionGluten}
            ${mentionVegan}
            <p>${pizza.description}</p>
            <p>Ingrédients : ${pizza.ingredients}</p>
            <h3>${pizza.prix} $</h3>
          </div>
          <a class="lien" href="/" data-link>Retourner au menu</a>
      </div>
    `;
    this.#application.conteneurHTML.insertAdjacentHTML("beforeEnd", gabarit);
  }
}
export default PizzaDetail;
