
let search = 75621062;
let infoAlbum = document.querySelectorAll("div")[1];
let divDegliAlbum = document.body.children[3];
fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${search}`)
    .then(response => {if (response.ok) {
        return response.json();
    }
    })
    .then(response => {
        console.log(response);
        document.querySelector("div").innerHTML = `<img src=${response.cover} alt="img_album">`;
        infoAlbum.children[0].innerHTML = response.title;
        
        impaginaAlbum(response); //impagina gli album

        gestisciCanzoneSelezionata(response);

    });



function impaginaAlbum(response) {
    //impagina tutti gli album 
    let tracksArray = response.tracks.data;
    console.log(tracksArray);
    tracksArray.forEach(e => {
        
        
        
        divDegliAlbum.innerHTML += `<div class="d-flex align-items-center justify-content-between mt-3">
        <div>
            <h2>${e.title}</h2>
            <p>${response.artist.name}</p>
        </div>
        <div>
            <i class="bi bi-three-dots-vertical"></i>
        </div>
    </div> `;
    
    });
}

function gestisciCanzoneSelezionata(response) {
    //1) setta il nome di default della canzone selezionata che appare nella barra sotto
    //2) mette degli event listener sulle varie canzoni in modo che quando ci si clicca sopra
    //   cambia il nome della canzone selezionata
    
    let testoCanzoneCorrente = document.body.children[4].children[0].children[0];
    
    //sistemo il nome canzone nel caso di default
    testoCanzoneCorrente.innerHTML = response.tracks.data[0].title + " by " + response.artist.name;



    //metto EL alle tracks

    let albumArray = divDegliAlbum.children;
    
    console.log(albumArray);
    for (let e of albumArray){
        e.addEventListener("mousedown", function () {
            testoCanzoneCorrente.innerHTML = e.children[0].children[0].innerHTML + " by " + response.artist.name;
        });
    }
}





    
