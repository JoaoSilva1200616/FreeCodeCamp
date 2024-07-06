const price = 19.5
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
]

document.addEventListener("DOMContentLoaded", function () {
  const totalElement = document.getElementById("total")
  const cashDrawerElement = document.getElementById("cash-drawer")
  const changeDueElement = document.getElementById("change-due")

  // Display total and cash drawer on load
  totalElement.innerText = `Total: $${price.toFixed(2)}`
  updateCashDrawer()

  document
    .getElementById("purchase-btn")
    .addEventListener("click", function () {
      const cash = parseFloat(document.getElementById("cash").value)

      if (cash < price) {
        alert("Customer does not have enough money to purchase the item")
        return
      } else if (cash === price) {
        changeDueElement.classList.remove("hidden")
        changeDueElement.innerText =
          "No change due - customer paid with exact cash"
        return
      }

      function checkCashRegister(price, cash, cid) {
        const currencyUnit = [
          ["PENNY", 0.01],
          ["NICKEL", 0.05],
          ["DIME", 0.1],
          ["QUARTER", 0.25],
          ["ONE", 1],
          ["FIVE", 5],
          ["TEN", 10],
          ["TWENTY", 20],
          ["ONE HUNDRED", 100],
        ]
        let change = cash - price
        let changeArr = []
        let status = ""
        let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0)

        if (totalCid < change) {
          status = "INSUFFICIENT_FUNDS"
          changeArr = []
        } else if (totalCid === change) {
          status = "CLOSED"
          changeArr = cid
        } else {
          for (let i = currencyUnit.length - 1; i >= 0; i--) {
            let currencyValue = currencyUnit[i][1]
            let currencyName = currencyUnit[i][0]
            let currencyAvailable = cid[i][1]
            let currencyUsed = 0

            while (change >= currencyValue && currencyAvailable > 0) {
              change -= currencyValue
              change = Math.round(change * 100) / 100 // Rounding to avoid floating point issues
              currencyAvailable -= currencyValue
              currencyUsed += currencyValue
            }

            if (currencyUsed > 0) {
              changeArr.push([currencyName, currencyUsed])
            }
          }

          if (change > 0) {
            status = "INSUFFICIENT_FUNDS"
            changeArr = []
          } else {
            status = "OPEN"
          }
        }

        return { status: status, change: changeArr }
      }

      let result = checkCashRegister(price, cash, cid)
      changeDueElement.classList.remove("hidden")

      if (result.status === "CLOSED") {
        changeDueElement.innerHTML = `Status: ${result.status}`
        result.change.forEach((change) => {
          if (change[1] > 0) {
            changeDueElement.innerHTML += `<br>${
              change[0]
            }: $${change[1].toFixed(2)}`
          }
        })
      } else {
        changeDueElement.innerHTML = `Status: ${result.status}`
        result.change.forEach((change) => {
          if (change[1] > 0) {
            changeDueElement.innerHTML += `<br>${
              change[0]
            }: $${change[1].toFixed(2)}`
          }
        })
      }
    })

  function updateCashDrawer() {
    cashDrawerElement.innerHTML = "<p>Change in drawer:</p>"
    cid.forEach((currency) => {
      cashDrawerElement.innerHTML += `<p>${currency[0]}: $${currency[1].toFixed(
        2
      )}</p>`
    })
  }
})
