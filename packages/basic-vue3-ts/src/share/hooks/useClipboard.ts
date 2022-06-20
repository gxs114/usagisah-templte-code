const input = document.createElement("input")
input.setAttribute("style", "position: absolute; top: -9999px; left: -9999px;")
document.body.appendChild(input)

export function useClipboard() {
  return function setCopyValue(value: string) {
    input.value = value
    input.select()
    const res = document.execCommand("copy")
    input.value = ""

    return res
  }
}
