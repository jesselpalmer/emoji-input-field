import emojis from './emojis.js'

class EmojiInputField extends HTMLElement {
  constructor() {
    super()

    this.isTextEscaped = false

    const shadow = this.attachShadow({ mode: 'open' })
    const input = document.createElement('input')

    input.type = 'text'
    input.oninput = event => {
      const char = event.data

      if (this.shouldTextEscapingStart(this.isTextEscaped, char)) {
        this.isTextEscaped = true
        console.log('start escaping')
      } else if (
        this.shouldTextEscapingStopBlankSpace(this.isTextEscaped, char)
      ) {
        this.isTextEscaped = false
        console.log('not an emoji. exit escaping.')
      } else if (
        this.shouldTextEscapingStopClosingColon(this.isTextEscaped, char)
      ) {
        console.log('exit escaping')
        this.isTextEscaped = false
      } else if (this.shouldSearchForEmoji(this.isTextEscaped)) {
        console.log('validating emoji text')
        const currentInputBoxText = input.value
        const locationOfLastColon = currentInputBoxText.lastIndexOf(':')
        const currentEmojiSearchText = currentInputBoxText.substring(locationOfLastColon + 1)

        if (currentEmojiSearchText.length >= 2) {
          console.log(currentEmojiSearchText)
          const matchingEmojis = this.getMatchingEmojis(currentEmojiSearchText)
          this.displayMatchingEmojis(matchingEmojis)
        }
      }

      console.log(this.isTextEscaped)
    }

    shadow.appendChild(input)
  }

  displayMatchingEmojis(matchingEmojis) {
    console.log(matchingEmojis)
  }

  getMatchingEmojis(text) {
    const matchingEmojiNames = Object.keys(emojis).filter(emojiName => {
      return emojiName.includes(text)
    })

    const matchingEmojis = matchingEmojiNames.map(emojiName => emojis[emojiName])

    return matchingEmojis
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
