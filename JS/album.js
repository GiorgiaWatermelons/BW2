let search = 75621062;
let infoAlbum = document.querySelectorAll("div")[1];
let divDegliAlbum = document.body.children[3];
let albumArray = []; //array di oggetti contenente le Tracks
let currentTrack = null;
let iconaPlayBassa = null;
fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${search}`)
    .then(response => {if (response.ok) {
        return response.json();
    }
    })
    .then(response => {
    
        console.log("JSON fetchato",response);
        document.querySelector("div").innerHTML = `<div class="row">` +
            ` <div class="col-2"><i class="bi bi-arrow-left" style="font-size:1.8rem"></i></div>` +
            `<img src=${response.cover} alt="img_album" class="col-8"></div>`;
                                                           
        infoAlbum.children[0].innerHTML = response.title;
    

        let tracksArray=response.tracks.data;

       

        loadAlbumArray(tracksArray); //carica albumArray

        impaginaAlto(response); //impagina prima parte pagina 

        impaginaAlbum(); //impagina le tracks di albumArray nel divDegliAlbum

        gestisciCanzoneSelezionata(response); //gestisce il comportamento della scritta della canzone selezionata

        //albumArray[2].play(); funziona

    });






    function loadAlbumArray(tracksArray) { //carica albumArray

        
        for (let track of tracksArray) {
            
            let u = new Track(track.title,track.artist.name, track.preview)
                
            albumArray.push(u);
        }
        console.log("ecco albumArray: ", albumArray);
    }

function impaginaAlbum() { //impagina le tracks di albumArray nel divDegliAlbum 

    albumArray.forEach(track => {
        
        
        
        divDegliAlbum.innerHTML += `<div class="d-flex align-items-center justify-content-between mt-3">
        <div>
            <h2>${track.title}</h2>
            <p>${track.author}</p>
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
    testoCanzoneCorrente.innerHTML = albumArray[0].title + " by " + albumArray[0].author;

    //inizializzazione funzionalità tracklist 

    iconaPlayBassa = document.getElementsByClassName("bi-play-fill")[0];


    for (let albumEL of divDegliAlbum.children) {
        
        albumEL.addEventListener("mousedown", function () {
           
    
            // 1) aggiorno testoCanzoneCorrente e pongo selected ==true alla track corrispondente in albumArray
            testoCanzoneCorrente.innerHTML = albumEL.children[0].children[0].innerHTML + " by " + response.artist.name;
            albumArray.forEach(album => { album.selected = false; }); //resetto gli stati selected
            currentTrack = albumArray.find(track => { return track.title == albumEL.children[0].children[0].innerHTML; });
            currentTrack.selected = true;
            
            // 2) attacco EL all'icona play in modo che quando cliccata faccia funzionare audio
            // canzone selezionata bimba 
        
          
            iconaPlayBassa.addEventListener("mousedown", function () {
                currentTrack.play();
            });    
          



        });
    }
}

function impaginaAlto(response) {

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

function selezionata(albumDiv) { 
//imposta le features che seguono al mousedown su "albumDiv":
// 
// 
// 1) aggiornare il testoCanzoneCorrente
// 2) aggiornare l'event listener attaccato alla CTA play
// 
    
    let testoCanzoneCorrente = document.body.children[4].children[0].children[0];
    
    currentTrack = albumArray.find(track => { return track.title == albumDiv.children[0].children[0].innerHTML; });
    console.log("currentTrack: ", currentTrack);
    testoCanzoneCorrente.innerHTML = currentTrack.title + " by " + currentTrack.author;  //setta testoCanzoneCorrente 

    
    //aggiorno el dell'icona play
    let iconaPlayBassa = document.getElementsByClassName("bi-play-fill")[0];  
    //azzero gli EL attaccati a iconaPlayBassa con un trucco:
    let elClone = iconaPlayBassa.cloneNode(true);
    iconaPlayBassa.parentNode.replaceChild(elClone, iconaPlayBassa);
    //attacco il nuovo EL
    
    elClone.addEventListener("mousedown", function () { 
        currentTrack.play();
        console.log("playing??");
    });    
    
}


class Track { 
    constructor(title,author,anteprimaUrl) {
        this.title = title;
        this.author = author;
        this.playing = false;
        this.selected = false; //indica se la Track compare nel testoCanzoneCorrente (vedi gestisciCanzoneSelezionata())
        this.song = new Audio(anteprimaUrl); 
    }        
    play() { //gestisce il play/pause della canzone
        console.log("method called");
        if (this.playing == false) {
            this.song.play();           
            this.playing = true;
        }
        else {this.song.pause(); this.playing = false; }
    }
    
    //come si capta se un audio è finito?
    // song.onended = function () { console.log("song ended"); }

}
    
