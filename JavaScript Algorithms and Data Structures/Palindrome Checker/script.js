document.getElementById("check-btn").addEventListener("click", function () {
  const input = document.getElementById("text-input").value
  const resultElement = document.getElementById("result")

  if (!input) {
    alert("Please input a value")
    return
  }

  const originalInput = input
  const processedInput = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  const reversedInput = processedInput.split("").reverse().join("")

  if (processedInput === reversedInput) {
    resultElement.textContent = `${originalInput} is a palindrome`
  } else {
    resultElement.textContent = `${originalInput} is not a palindrome`
  }
})
