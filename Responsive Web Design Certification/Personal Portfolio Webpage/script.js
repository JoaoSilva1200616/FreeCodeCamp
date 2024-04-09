// Smooth scrolling for navbar links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href").substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

var cs = document.getElementById("contact-section")
var il = document.getElementById("icons-left")
var il1 = document.getElementById("icons-left-1")
var ir = document.getElementById("icons-right")

cs.onmouseenter = function () {
  il.classList.add("icons-left")
  il1.classList.add("icons-left")
  ir.classList.add("icons-right")
  il.classList.remove("opacity")
  il1.classList.remove("opacity")
  ir.classList.remove("opacity")
}
