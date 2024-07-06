document
  .getElementById("check-btn")
  .addEventListener("click", validatePhoneNumber)
document.getElementById("clear-btn").addEventListener("click", clearResults)

function validatePhoneNumber() {
  const userInput = document.getElementById("user-input").value.trim()
  const resultsDiv = document.getElementById("results-div")

  if (userInput === "") {
    alert("Please provide a phone number")
    return
  }

  const patterns = [
    /^1?\s?\d{3}-\d{3}-\d{4}$/, // 1 555-555-5555 or 555-555-5555
    /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/, // 1 (555) 555-5555 or (555) 555-5555
    /^1?\s?\(\d{3}\)\d{3}-\d{4}$/, // 1(555)555-5555 or (555)555-5555
    /^1?\s?\d{3}\s\d{3}\s\d{4}$/, // 1 555 555 5555
    /^1?\d{10}$/, // 5555555555
  ]

  const isValid = patterns.some((pattern) => pattern.test(userInput))

  if (isValid) {
    resultsDiv.textContent = `Valid US number: ${userInput}`
  } else {
    resultsDiv.textContent = `Invalid US number: ${userInput}`
  }
}

function clearResults() {
  document.getElementById("results-div").textContent = ""
  document.getElementById("user-input").value = ""
}
