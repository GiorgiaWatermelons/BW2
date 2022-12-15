import {loadAlbumArray, impaginaAlbumPagina, gestioneCanzoni} from './class.js';
 

let search = 230935602;

fetch(sessionStorage.getItem("selectedAlbum"))
    .then(response => {if (response.ok) {
        return response.json();
    }
    })
    .then(response => {

    
        console.log("JSON fetchato",response);  ///CAMBIATO IL QUERYSELECTOR///
        document.querySelector("#immagine_album").innerHTML = `<div class="row" id="immagine_album">
                                                   <div class="col-sm-2 col-md-2 col-lg-1" onclick="history.back()"><i class="bi bi-arrow-left freccia_indietro_album" "></i></div>
                                                   <img src=${response.cover} alt="img_album" class="col-sm-8 col-md-8 col-lg-4">
                                                   <div class="d-none d-lg-block col-lg-6 d-flex flex-column">
                                                    <div class="col-12 h-25">
                                                    </div>
                                                    <p class="d-none d-lg-block col-12">ALBUM</p>
                                                    <h1 class="d-none d-lg-block col-12">${response.title}</h1>
                                                    <div class="d-none d-lg-block col-12 d-flex flex-row">
                                                       <img src="${response.artist.picture_small}" class="rounded-circle" alt="img_artista">
                                                       <span>${response.artist.name} • ${response.release_date} • ${response.nb_tracks}, ${response.duration} </span>
                                                      </div>
                                                   
                                                    </div>
                                                   </div> 
                                                   `;        
        infoAlbum.children[0].innerHTML = response.title;
        console.log(response);
        let tracksArray = response.tracks.data;
        console.log(tracksArray);
        loadAlbumArray(tracksArray); //carica albumArray
        
        impaginaAlto(response); //impagina prima parte pagina 

        impaginaAlbumPagina("album"); //impagina le tracks di albumArray nel divDeiBrani

        gestioneCanzoni(); //gestisce il comportamento della scritta della canzone selezionata

        //albumArray[2].play(); funziona

    });

 
function impaginaAlto(response) {
    let infoAlbum = document.querySelectorAll("div")[1];
    document.querySelector("div").innerHTML = `<div class="row">` +
    ` <div class="col-2"><i class="bi bi-arrow-left"></i></div>` +
    `<img src=${response.cover} alt="img_album" class="col-8"></div>`;
                                                   
infoAlbum.children[0].innerHTML = response.title;


//INSERISCO IL NOME ALBUM DINAMICO
    let nomeAlbum = document.body.children[1].children[0];
nomeAlbum.innerHTML = `<h1 id="nome_album">${response.title}</h1>`;


//inserisco anche nome artista e anno
let nomeArtista = document.body.children[1].children[1].children[1];
nomeArtista.innerHTML =`${response.artist.name}`;
console.log("nomeArtista",nomeArtista.innerHTML)

let annoAlbum = document.body.children[1].children[2].children[1];
annoAlbum.innerHTML = `${response.release_date}`;

//inserisco l'IMMAGINE ARTISTA
let fotoArtista = document.body.children[1].children[1].children[0];
fotoArtista.innerHTML =`<img src="${response.artist.picture_small}" class="rounded-circle" alt="img_artista">`
}

