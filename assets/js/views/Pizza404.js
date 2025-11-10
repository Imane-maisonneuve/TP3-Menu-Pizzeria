class Pizza404 {
  #application = null;

  constructor(application) {
    this.#application = application;
  }
  // Rendre la vue 404
  render() {
    this.#application.conteneurHTML.innerHTML = "";
    const gabarit = `<div class ="image404">
      <img src="assets/img/page404.jpg" alt="">
     </div>`;

    this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
  }
}
export default Pizza404;
