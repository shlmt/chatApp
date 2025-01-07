const detectTextDirection = (text: string):'right'|'left' => {
    const rtlCharRange = /[\u0590-\u05FF]/
    const ltrCharRange = /[a-zA-Z]/
    const firstChar = text.split('').find(char => rtlCharRange.test(char) || ltrCharRange.test(char))
    return firstChar && rtlCharRange.test(firstChar) ? 'right' : 'left'
}

export default detectTextDirection
