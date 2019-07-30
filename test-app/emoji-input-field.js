class EmojiInputField extends HTMLElement {
  constructor() {
    super()

    this.isTextEscaped = false

    const shadow = this.attachShadow({ mode: 'open' })
    const input = document.createElement('input')

    input.type = 'text'
    input.oninput = event => {
      const char = event.data
      let isTextEscaped = this.isTextEscaped

      if (this.shouldTextEscapingStart(isTextEscaped, char)) {
        isTextEscaped = true
        console.log('start escaping')
      } else if (this.shouldTextEscapingStopBlankSpace(isTextEscaped, char)) {
        TextEscaped = false
        console.log('not an emoji. exit escaping.')
      } else if (this.shouldTextEscapingStopClosingColon(isTextEscaped, char)) {
        console.log('exit escaping')
        isTextEscaped = false
      } else if (this.shouldSearchForEmoji(isTextEscaped)) {
        console.log('validating emoji text')
      }

      console.log(this.isTextEscaped)
    }

    shadow.appendChild(input)
  }

  shouldTextEscapingStart(isTextEscaped, char) {
    const EMOJI_ESCAPE_KEY = ':'
    return !isTextEscaped && char === EMOJI_ESCAPE_KEY
  }

  shouldTextEscapingStopBlankSpace(isTextEscaped, char) {
    const BLANK_SPACE = ' '
    return isTextEscaped && char === BLANK_SPACE
  }

  shouldTextEscapingStopClosingColon(isTextEscaped, char) {
    const EMOJI_ESCAPE_KEY = ':'
    return isTextEscaped && char === EMOJI_ESCAPE_KEY
  }

  shouldSearchForEmoji(isTextEscaped) {
    return isTextEscaped
  }
}

customElements.define('emoji-input-field', EmojiInputField)
