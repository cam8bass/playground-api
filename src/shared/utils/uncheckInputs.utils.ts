export const uncheckInputs = (className: string) => {
  const input = document.querySelectorAll(className) as NodeListOf<HTMLInputElement>
  input.forEach((value) => {
    value.checked = false
  })
}
