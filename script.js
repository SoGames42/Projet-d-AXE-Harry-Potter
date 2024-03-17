let originalData;
let houseData;
let modifiableData;
let sortOption;
let modeDeTri = document.querySelector("#Tri");
let recherche = document.querySelector("#Recherche");
modeDeTri.addEventListener("change", (event) => SortByType(event.target.value));
recherche.addEventListener("input", (event) => SortByName(event.target.value));

function Filtre(arr, requete, type) {
    if(type == "name"){
        return arr.filter(function (el) {
            return el.name.toLowerCase().indexOf(requete.toLowerCase()) != -1;
        });
    }
    else if(type == "house"){
        return arr.filter(function (el) {
            return el.house.toLowerCase().indexOf(requete.toLowerCase()) != -1;
        });
    }
  }

function FetchCharacters(){
    return fetch("https://hp-api.lainocs.fr/characters")
    .then((reponse) => reponse.json())
}

async function DisplayCharacters(){
    originalData = await FetchCharacters()
    modifiableData, houseData = originalData;
    SortByType();
}

function SortByName(value){
    modifiableData = Filtre(houseData, value, "name");
    Update(modifiableData);
}

function SortByType(value = "prenom"){
    houseData = originalData;
    sortOption = "name";
    switch(value){
        case "Prenom":
            sortOption = "name";
            break;
        case "DePrenom":
            sortOption = "-name";
            break;
        case "Age":
            sortOption = "birthday";
            break;
        case "DeAge":
            sortOption = "-birthday";
            break;
        case "Maison":
            sortOption = "house";
            break;    
        case "Id":
            sortOption = "id";
            break;    
        case "DeId":
            sortOption = "-id";
            break;    
        case "Gryffondor":
            houseData = Filtre(originalData, "Gryffindor", "house");
            break;
        case "Poufsouffle":
            houseData = Filtre(originalData, "Hufflepuff", "house");
            break;
        case "Serdaigle":
            houseData = Filtre(originalData, "Ravenclaw", "house");
            break;
        case "Serpentard":
            houseData = Filtre(originalData, "Slytherin", "house");
            break;
    }
    recherche.value = ""; //Reset la recherche
    modifiableData = houseData.sort(DynamicSort(sortOption));
    Update(modifiableData);
}

function Update(newArray){
    let cartes = document.querySelector('#Cartes');
    cartes.innerHTML = ``; //RESET
    newArray.forEach(character => {
        cartes.innerHTML += `
        <a href="singlehp.html?slug=${character.slug}">
            <div class="Carte Rounded">
                <div class="Id">
                    <div class="Rond">
                        <h3>${character.id}</h3>
                    </div>  
                </div>
                <div class="SubDiv">
                    <img src="${character.image}" class="ImageCarte">
                    <div class="TexteCarte">
                        <h3>${character.name}</h3>
                    </div>
                </div>
            </div>
        </a>
        `
    });
}

function DynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

DisplayCharacters();