class Filtre {
  #conteneur;
  #element;
  #ordre;
  #tri;

  constructor(conteneur) {
    this.#conteneur = conteneur;
    this.#ordre = "asc";
    this.#tri = "prix";

    this.#render();
  }

  // Méthode appelée lors du changement de sélection dans le <select> pour la gestion du tri
  onChangeFiltre(evenement) {
    const option = evenement.target.selectedOptions[0]; // recherche avec chatGPt pour voir comment on selectionne les options du <select>
    if (option) {
      this.#tri = option.dataset.tri;
      this.#ordre = option.dataset.ordre;
      const nouvelEvenement = new CustomEvent("changementFiltre");
      window.dispatchEvent(nouvelEvenement);
    }
  }

  // Tri de la liste en fonction du critère et de l'ordre sélectionnés
  trier(listePizzas) {
    const liste = [...listePizzas];

    liste.sort(
      function (a, b) {
        let comparaison = 0;
        if (this.#tri == "prix") {
          comparaison = a.prix - b.prix;
        }

        if (this.#ordre == "desc") {
          comparaison = comparaison * -1;
        }
        return comparaison;
      }.bind(this)
    );

    return liste;
  }

  // Méthode de rendu du composant Filtre
  #render() {
    const gabarit = `
      <div class="entete">
        <h1>Nos pizzas<h1>
        <select data-filtres>
          <option data-tri="prix" data-ordre="asc">Trier par prix ascendant</option>
          <option data-tri="prix" data-ordre="desc">Trier par prix descendant</option>
        </select>
      </div>
    `;

    this.#conteneur.insertAdjacentHTML("beforeend", gabarit);
    this.#element = this.#conteneur.querySelector("[data-filtres]");
    // Ajouter l'écouteur d'évènement sur le <select>
    this.#element.addEventListener("change", this.onChangeFiltre.bind(this)); // Recherche avec chatGPt pour déterminer quel évènement est déclenché car le click ne marchait pas pour le <select>
  }
}

export default Filtre;
