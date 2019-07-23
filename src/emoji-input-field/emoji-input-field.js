class EmojiInputBox extends HTMLElement {
  constructor() {
    super();

    this.isColonEntered = false;

    const shadow = this.attachShadow({ mode: "open" });

    const input = document.createElement("input");
    input.type = "text";
    input.oninput = this.textChangeHandler;

    shadow.appendChild(input);
  }

  textChangeHandler(event) {
    if (!this.isColonEntered && event.data === ":") {
      this.isColonEntered = true;
      console.log("start escaping");
    } else if (this.isColonEntered && event.data === " ") {
      this.isColonEntered = false;
      console.log("not an emoji. exit escaping.");
    } else if (this.isColonEntered && event.data === ":") {
      console.log("exit escaping");
      this.isColonEntered = false;
    } else if (this.isColonEntered) {
      console.log("validating emoji text");
    }

    console.log(this.isColonEntered);
  }
}

customElements.define("emoji-input-box", EmojiInputBox);
