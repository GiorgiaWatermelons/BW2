import {loadAlbumArray, impaginaAlbumPagina, gestioneCanzoni} from './class.js';
 

let search = 75621062;

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${search}`)
    .then(response => {if (response.ok) {
        return response.json();
    }
    })
    .then(response => {
        
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
    ` <div class="col-2"><i class="bi bi-arrow-left" style="font-size:1.8rem"></i></div>` +
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