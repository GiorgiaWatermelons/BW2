
/* materiale comune */
/* 1) variabili */
export class Track { 
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

export let albumArray = []; //array di oggetti di tipo Track, in cui salviamo le tracks di un album
export let divDeiBrani = document.getElementById("divBrani");
export let currentTrack = null;


/* 2) funzioni */

export function loadAlbumArray(tracksArray) {
    //carica albumArray, partendo da un tracksArray ottenuto da qualche fetch del sito
        
    for (let track of tracksArray) {
        
        let u = new Track(track.title,track.artist.name, track.preview)
            
        albumArray.push(u);
    }
    console.log("ecco albumArray: ", albumArray);
}

export function impaginaAlbum() { //impagina le tracks di albumArray nel divDeiBrani 

    albumArray.forEach(track => {
        
        
        
        divDeiBrani.innerHTML += `<div class="d-flex align-items-center justify-content-between mt-3">
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




export function selezionata(albumDiv) { 
    //imposta le features che seguono al mousedown su "albumDiv":
    // 
    // 
    // 1)stoppare musica che eventualmente sta suonando
    // 2)aggiornare il testoCanzoneCorrente
    // 3)aggiornare l'event listener attaccato alla CTA play
    // 
        
        
        
        //1)
        if (currentTrack!=null &&currentTrack.playing == true) { currentTrack.play(); }
        
        //2)
        let testoCanzoneCorrente = document.body.children[4].children[0].children[0];
        currentTrack = albumArray.find(track => { return track.title == albumDiv.children[0].children[0].innerHTML; });
        testoCanzoneCorrente.innerHTML = currentTrack.title + " by " + currentTrack.author;  //setta testoCanzoneCorrente 
    
        //3)
        let iconaPlayBassa = document.getElementsByClassName("bi-play-fill")[0];  
        //azzero gli EL attaccati a iconaPlayBassa con un trucco:
        let elClone = iconaPlayBassa.cloneNode(true);
        iconaPlayBassa.parentNode.replaceChild(elClone, iconaPlayBassa);
        //attacco il nuovo EL
        elClone.addEventListener("mousedown", function () { 
            currentTrack.play();
            console.log("playing");
        });    
        
}
    

export function gestioneCanzoni() {
    //setta come selezionata la prima canzone
    selezionata(divDeiBrani.children[0]);

    //attacca EL alle canzoni che attivano il selezionata
    for (let albumEL of divDeiBrani.children) {
        albumEL.addEventListener("mousedown", function () { selezionata(albumEL); });
    }
}