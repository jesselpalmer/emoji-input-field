class EmojiInputField extends HTMLElement {
  constructor() {
    super()

    this.isColonEntered = false

    const shadow = this.attachShadow({ mode: 'open' })

    const input = document.createElement('input')
    input.type = 'text'
    input.oninput = event => {
      const EMOJI_ESCAPE_KEY = ':'
      const BLANK_SPACE = ' '

      if (!this.isColonEntered && event.data === EMOJI_ESCAPE_KEY) {
        this.isColonEntered = true
        console.log('start escaping')
      } else if (this.isColonEntered && event.data === BLANK_SPACE) {
        this.isColonEntered = false
        console.log('not an emoji. exit escaping.')
      } else if (this.isColonEntered && event.data === EMOJI_ESCAPE_KEY) {
        console.log('exit escaping')
        this.isColonEntered = false
      } else if (this.isColonEntered) {
        console.log('validating emoji text')
      }

      console.log(this.isColonEntered)
    }

    shadow.appendChild(input)
  }
}

customElements.define('emoji-input-field', EmojiInputField)
