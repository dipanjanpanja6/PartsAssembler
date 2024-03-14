export const getProps = () => {
  try {
    const state = document.getElementById('__DATA__')?.textContent
    return JSON.parse(state!)
  } catch (error) {
    console.error(error)
    return {}
  }
}
