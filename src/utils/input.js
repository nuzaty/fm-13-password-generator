export async function copyInputText(input) {
  const text = input.value

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (_) {
      // continue to fallback
    }
  }

  // fallback
  input.select()
  input.setSelectionRange(0, text.length)
  return document.execCommand('copy')
}
