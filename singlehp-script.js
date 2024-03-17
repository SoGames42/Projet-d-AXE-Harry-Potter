function FetchCharacter(){
    let url = window.location.search;
    let slug = new URLSearchParams(url).get("slug");
    return fetch("https://hp-api.lainocs.fr/characters/" + slug).
    then((response) => response.json());
}

async function DisplayCharacter(){
    const character = await FetchCharacter();
    let carte = document.body.querySelector("#Carte");
    let anniversaire = new Date(character.birthday);
    carte.innerHTML = `
    <div class="Carte Rounded">
        <div class="Id">
            <div class="Rond">
                <h3>${character.id}</h3>
            </div>  
        </div>
        <img src="${character.image}" class="ImageCarte">
        <div class="Information">
            <h3>Nom: ${character.name}</h3>
            <h3>Acteur/Actrice: ${character.actor}</h3>
            <h3>Maison: ${character.house == "" ? "Pas de maison" : character.house}</h3>
            <h3>Anniversaire: ${anniversaire.getFullYear()}</h3>
            <h3>Patronus: ${character.patronus == "" ? "Inconnu" : character.patronus}</h3>
        </div>
    </div>
    `
}

DisplayCharacter();