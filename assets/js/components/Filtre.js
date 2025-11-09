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

  onClicFiltre(evenement) {
    const option = evenement.target.selectedOptions[0]; // recherche avec chatGPt pour voir comment on selectionne les options du <select>
    if (option) {
      this.#tri = option.dataset.tri;
      this.#ordre = option.dataset.ordre;
      const nouvelEvenement = new CustomEvent("changementFiltre");
      window.dispatchEvent(nouvelEvenement);
    }
  }

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

  #render() {
    const gabarit = `
      <div class="entete">
        <h1>Menu<h1>
        <select data-filtres>
          <option data-tri="prix" data-ordre="asc">Trier par prix ascendant</option>
          <option data-tri="prix" data-ordre="desc">Trier par prix descendant</option>
        </select>
      </div>
    `;

    this.#conteneur.insertAdjacentHTML("beforeend", gabarit);
    this.#element = this.#conteneur.querySelector("[data-filtres]");
    console.log(this.#element);

    this.#element.addEventListener("change", this.onClicFiltre.bind(this)); // Recherche avec chatGPt pour déterminer quel évènement est déclenché car le click ne marchait pas pour le <select>
  }
}

export default Filtre;
