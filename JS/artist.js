import {loadAlbumArray, impaginaAlbumPagina, gestioneCanzoni } from './class.js';

//fa il fetch dall'url che è stato salvato nella sessionStorage durante l'ultima search

let infoArtista = document.querySelectorAll("div")[0];
let ascoltatori = document.querySelectorAll("div")[1]
let immagineCerchio = document.body.children[3].children[0];
let autoreCerchio = document.body.children[3].children[1].children[1];
let url = sessionStorage.getItem("urlLastSearch");


//due fetch: 
// 1) per info artista
// 2) per brani artista

fetch(url) //fetch per info artista
    
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(response => {
    impaginazioneInfoArtista(response); //impagina info artista
        
        fetch(response.tracklist) //fetch per brani artista
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                console.log("response è: ", response);
               
                let tracksArray = response.data;
                loadAlbumArray(tracksArray); //riempie albumArray, l'array con gli oggetti Track
                impaginaAlbumPagina("artist"); //impagina i brani
                gestioneCanzoni();
                
        
            }).catch(e => console.log(e));
    }).catch(e => console.log(e));


function impaginazioneInfoArtista(response) { //impagina info artista
    infoArtista.innerHTML = `
    <div class="position-absolute top-0 start-30" onclick="history.back()"><i class="bi bi-arrow-left"></i></div>
    <img src=${response.picture_big} class="img-fluid" alt="img_artista">
    <h1 class="position-absolute bottom-0 start-30">${response.name}</h1>`;

        ascoltatori.innerHTML = `<p class="mx-2 mb-0 py-3">${response.nb_fan} ascoltatori mensili</p>`;

        immagineCerchio.innerHTML = `
                                    <img src=${response.picture_small} class="rounded-circle" alt="img_artista">
                                    <i class="bi bi-heart position-absolute bottom-0 end-0 text-white"></i>
                                    `;

        autoreCerchio.innerHTML = `<p>8 brani di ${response.name}</p>`;
}