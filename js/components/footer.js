class Footer extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    let content = await fetch('/components/footer.html')
    this.innerHTML = await content.text()
  }
}

customElements.define('footer-component', Footer)
