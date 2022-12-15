import {loadAlbumArray, impaginaAlbumPagina, gestioneCanzoni } from './class.js';

//fa il fetch dall'url che è stato salvato nella sessionStorage durante l'ultima search



let infoArtista = document.querySelector("#artist__header");
let ascoltatori = document.querySelector("ascoltatori");
let immagineCerchio = document.querySelector("immagine_circle");
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
        console.log("prima response: ", response);
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

    <div id="artist__arrow" onclick="history.back()"><i id="artist__arrow__color" class="bi bi-arrow-left-circle-fill"></i></div>
    <img src=${response.picture_big} id="artist__image"  width="1000" height="1000" alt="img_artista">
    <span id="artist__verificato" class="mx-2 mb-0 py-3"><i id="artist__verificato__icona" class="bi bi-patch-check-fill"></i><span> Artista verificato</span></span> 
    <h1 id="artist__name">${response.name}</h1>
    <p id="artist__ascoltatori1" class="mx-2 mb-0 py-3"> ${response.nb_fan} ascoltatori mensili</p>`;

        ascoltatori.innerHTML = ` <p id="artist__ascoltatori2" class="mx-2 mb-0 py-3">${response.nb_fan} ascoltatori mensili</p>`;

        immagineCerchio.innerHTML = `
                                    <img src=${response.picture_small} class="rounded-circle" alt="img_artista">
                                    <i id="immagine_circle_sfondo" class="bi bi-heart-fill position-absolute text-dark bottom-0 end-0"></i>
                                    

                                    `;

        autoreCerchio.innerHTML = `<p>8 brani di ${response.name}</p>`;
}