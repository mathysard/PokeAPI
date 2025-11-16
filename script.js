const copyrightElement = document.getElementById("copyright");
const date = new Date();

copyrightElement.textContent = `© 2024 — ${date.getFullYear()}.`;

function fetchAPI() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100";
    const pokemonsDiv = document.getElementById("pokemons");

    fetch(apiUrl)
    .then(response => response.ok ? response.json() : null)
    .then(data => {
        const results = data.results;
        const div = document.createElement("div");
        div.classList.add("grid", "grid-cols-4");

        results.forEach(pokemon => {               
            const pokemonUrl = pokemon.url;

            fetch(pokemonUrl)
            .then(response => response.ok ? response.json() : null)
            .then(data => {
                const types = data.types;
                const img = data.sprites.front_default;
                const firstDiv = document.createElement("div");
                const secondDiv = document.createElement("div");
                const imgMarkup = document.createElement("img");
                const thirdDiv = document.createElement("div");

                firstDiv.classList.add("max-w-sm", "rounded", "overflow-hidden", "shadow-lg", "text-xl", "font-semibold", "capitalize", "w-full", "text-center");
                firstDiv.innerText = `${pokemon.name}`;
                div.appendChild(firstDiv);
                secondDiv.classList.add("px-6", "py-4");
                firstDiv.appendChild(secondDiv);
                imgMarkup.classList.add("w-full");

                if(img == null) {
                    imgMarkup.alt = "Pokémon";
                } else {
                    imgMarkup.src = `${img}`;
                }

                firstDiv.appendChild(imgMarkup);
                thirdDiv.classList.add("px-6", "pt-4", "pb-2");
                firstDiv.appendChild(thirdDiv);

                types.map(type => {
                    const typeOutput = document.createElement("span");
                    typeOutput.classList.add("inline-block", "bg-gray-200", "rounded-full", "px-3", "py-1", "text-sm", "font-semibold", "text-gray-700","mr-2","mb-2", "mx-auto");
                    typeOutput.innerText = `${type.type.name}`;
                    thirdDiv.appendChild(typeOutput);
                })
                
                pokemonsDiv.appendChild(div);
            })
            .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
}