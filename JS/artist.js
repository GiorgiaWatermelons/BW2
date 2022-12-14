import {loadAlbumArray, albumArray, divDeiBrani, impaginaAlbum } from './class.js';

//fa il fetch dall'url che è stato salvato nella sessionStorage durante l'ultima search

let infoArtista = document.querySelectorAll("div")[0];
let ascoltatori = document.querySelectorAll("div")[1]
let divDeiBrani = document.getElementById("divBrani");
let immagineCerchio = document.body.children[3].children[0];
let autoreCerchio = document.body.children[3].children[1].children[1];
let url = sessionStorage.getItem("urlLastSearch");
fetch(url)
    //fetch(sessionStorage.getItem("urlLastSearch"))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(response => {
        console.log("response", response);
        /* qui metti il lavoro per l'impaginazione */

        impaginazioneInfoArtista(response); //impagina info artista
        

        fetch(response.tracklist) //fetch del JSON della tracklist dell'artista
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                console.log("response è: ", response);
                /* qui metti il lavoro per l'impaginazione */
        
                impaginaBrani(response); //impagina i brani
        
                gestisciCanzoneSelezionata(response);
        
        
            }).catch(e => console.log(e));
    }).catch(e => console.log(e));


    

function impaginazioneInfoArtista(response) { //impagina info artista
    infoArtista.innerHTML = `<img src=${response.picture_big} class="img-fluid" alt="img_artista">
        <h1 class="position-absolute bottom-0 start-30">${response.name}</h1>`;

        ascoltatori.innerHTML = `<p class="mx-2 mb-0 py-3">${response.nb_fan} ascoltatori mensili</p>`;

        immagineCerchio.innerHTML = `
                                    <img src=${response.picture_small} class="rounded-circle" alt="img_artista">
                                    <i class="bi bi-heart position-absolute bottom-0 end-0 text-white"></i>
                                    `;

        autoreCerchio.innerHTML = `<p>8 brani di ${response.name}</p>`;
}


    function impaginaBrani(response) {
        //impagina tutti i brani
        let tracksArray = response.data;
        console.log(tracksArray);
        tracksArray.forEach((e,i) => {
            
            
            
            divDeiBrani.innerHTML += 
            `<div class="d-flex align-items-center justify-content-between mt-3">
            <div>
                <p>${i+1}</p>
            </div>
            <div>
            <img src=${e.album.cover_small} class="" alt="img_artista">
            </div>
            <div>
                <h2>${e.title_short}</h2>
                <p>${e.rank}</p>
            </div>
            <div>
                <i class="bi bi-three-dots-vertical"></i>
            </div>
            </div>`;

        });
    }



    function gestisciCanzoneSelezionata(response) {
        //1) setta il nome di default della canzone selezionata che appare nella barra sotto
        //2) mette degli event listener sulle varie canzoni in modo che quando ci si clicca sopra
        //   cambia il nome della canzone selezionata
        
        let testoCanzoneCorrente = document.body.children[6].children[0].children[0];
        
        //sistemo il nome canzone nel caso di default
        testoCanzoneCorrente.innerHTML = response.data[0].title_short + " by " + response.data[0].artist.name;
    
    
    
        //metto EL alle tracks
    
        let braniArray = divDeiBrani.children;
        
        console.log(braniArray);
        for (let e of braniArray){
            e.addEventListener("mousedown", function () {
                testoCanzoneCorrente.innerHTML = e.children[2].children[0].innerHTML + " by " + response.data[0].artist.name;
            });
        }
    }