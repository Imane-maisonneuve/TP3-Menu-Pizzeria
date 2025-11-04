class Application {
    #conteneurHTML = null;

    constructor() {
        // Initialisation du DOM
        this.#conteneurHTML = document.querySelector("[data-application]");
    }
    get conteneurHTML() {
        return this.#conteneurHTML;
    }
}

export default Application;
