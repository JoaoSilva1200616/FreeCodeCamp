// app.js
document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase()
  const pokemonNameElement = document.getElementById("pokemon-name")
  const pokemonIdElement = document.getElementById("pokemon-id")
  const spriteElement = document.getElementById("sprite")
  const weightElement = document.getElementById("weight")
  const heightElement = document.getElementById("height")
  const typesElement = document.getElementById("types")
  const hpElement = document.getElementById("hp")
  const attackElement = document.getElementById("attack")
  const defenseElement = document.getElementById("defense")
  const specialAttackElement = document.getElementById("special-attack")
  const specialDefenseElement = document.getElementById("special-defense")
  const speedElement = document.getElementById("speed")

  // Clear previous data
  pokemonNameElement.textContent = ""
  pokemonIdElement.textContent = ""
  spriteElement.style.display = "none"
  spriteElement.src = ""
  weightElement.textContent = ""
  heightElement.textContent = ""
  typesElement.innerHTML = ""
  hpElement.textContent = ""
  attackElement.textContent = ""
  defenseElement.textContent = ""
  specialAttackElement.textContent = ""
  specialDefenseElement.textContent = ""
  speedElement.textContent = ""

  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`
    )
    if (!response.ok) {
      throw new Error("Pokémon not found")
    }
    const data = await response.json()

    // Display Pokémon data
    pokemonNameElement.textContent = data.name.toUpperCase()
    pokemonIdElement.textContent = `#${data.id}`
    spriteElement.style.display = "block"
    spriteElement.src = data.sprites.front_default
    weightElement.textContent = `Weight: ${data.weight}`
    heightElement.textContent = `Height: ${data.height}`

    // Types
    data.types.forEach((typeInfo) => {
      const typeElement = document.createElement("div")
      typeElement.textContent = typeInfo.type.name.toUpperCase()
      typesElement.appendChild(typeElement)
    })

    // Stats
    data.stats.forEach((statInfo) => {
      const statName = statInfo.stat.name.replace("-", " ")
      const statElement = document.getElementById(statName)
      if (statElement) {
        statElement.textContent = `${statInfo.base_stat}`
      }
    })
  } catch (error) {
    alert(error.message)
  }
})

// Helper function to map API response to elements
function mapPokemonData(data) {
  document.getElementById("pokemon-name").textContent = data.name.toUpperCase()
  document.getElementById("pokemon-id").textContent = `#${data.id}`
  document.getElementById("sprite").style.display = "block"
  document.getElementById("sprite").src = data.sprites.front_default
  document.getElementById("weight").textContent = `Weight: ${data.weight}`
  document.getElementById("height").textContent = `Height: ${data.height}`
  document.getElementById("hp").textContent = data.stats[0].base_stat
  document.getElementById("attack").textContent = data.stats[1].base_stat
  document.getElementById("defense").textContent = data.stats[2].base_stat
  document.getElementById("special-attack").textContent =
    data.stats[3].base_stat
  document.getElementById("special-defense").textContent =
    data.stats[4].base_stat
  document.getElementById("speed").textContent = data.stats[5].base_stat

  // Clear previous types
  const typesElement = document.getElementById("types")
  typesElement.innerHTML = ""
  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("div")
    typeElement.textContent = typeInfo.type.name.toUpperCase()
    typesElement.appendChild(typeElement)
  })
}

// Handle search button click
document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase()
  if (!searchInput) return

  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`
    )
    if (!response.ok) {
      throw new Error("Pokémon not found")
    }
    const data = await response.json()
    mapPokemonData(data)
  } catch (error) {
    alert(error.message)
  }
})
