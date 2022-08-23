let currentTheme = true

function getCurrentTheme() {
  return currentTheme
}

function setCurrentTheme(val: boolean) {
  currentTheme = val
}

export {
  getCurrentTheme,
  setCurrentTheme
}
