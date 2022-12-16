/* materiale comune */

/* 1) variabili */
export class Track { //classe che gestisce la singola canzone
    constructor(title,title_short, author,anteprimaUrl,rank=0, img=null, duration=-1) {
        this.title = title;
        this.author = author;
        this.rank = rank;
        this.title_short = title_short;
        this.playing = false;
        this.selected = false; //indica se la Track compare nel testoCanzoneCorrente (vedi gestisciCanzoneSelezionata())
        this.img = img; //src per ottenere l'immagine
        this.duration = duration;
        this.anteprimaUrl = anteprimaUrl;
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

export let albumArray = []; //array di oggetti di tipo Track
export let divDeiBrani = document.getElementById("divBrani"); //un div del dom, padre dei div delle canzoni
export let currentTrack = null; //contiene l'oggetto di tipo Track che è stato selezionato dall'utente


/* 2) funzioni */

export function loadAlbumArray(tracksArray) { //carica albumArray, partendo da un tracksArray ottenuto da qualche fetch del sito
    
        
    for (let track of tracksArray) {
        
        let u = new Track(track.title,track.title_short, track.artist.name, track.preview, track.rank, track.album.cover_small, track.duration)
            
        albumArray.push(u);
    }
    console.log("ecco albumArray: ", albumArray);
}

/* ################################ */

export function selezionata(titoloCanzone) { 
    //imposta le features che seguono al mousedown sul div della canzone titoloCanzone:
    // 
    // 
    // 1)stoppare musica che eventualmente sta suonando
    // 2)aggiornare il testoCanzoneCorrente
    // 3)aggiornare l'event listener attaccato alla CTA play
    // 
    console.log("selezionata canzone: ", titoloCanzone); 
        //1)
        if (currentTrack!=null &&currentTrack.playing == true) { currentTrack.play(); }
        
        
        currentTrack = albumArray.find(track => { return track.title == titoloCanzone; });
        sessionStorage.setItem("currentTrack", JSON.stringify(currentTrack));
        
        
        //2)
        let testoCanzoneCorrente = document.querySelector("#testoCanzoneCorrente");
        testoCanzoneCorrente.innerHTML = currentTrack.title_short + " by " + currentTrack.author;  //setta testoCanzoneCorrente 
        console.log(testoCanzoneCorrente.innerHTML);

    let testoCanzoneCorrenteDesktop = document.querySelector("footer").children[0].children[1].children[0];
    testoCanzoneCorrenteDesktop.innerHTML=currentTrack.title_short + " " + currentTrack.author;  //setta testoCanzoneCorrente 
    let immagineCanzoneCorrente = document.querySelector("footer").children[0].children[0];
    immagineCanzoneCorrente.setAttribute("src", `${currentTrack.img}`);
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
    
    /* versione desktop  */



    //durata canzone
    let songDuration = document.getElementsByClassName("song-duration")[0];
    songDuration.innerHTML = secondsToTime(currentTrack.duration);
    console.log("currentTrackDuration:     ", currentTrack.song);

    //setto indice secondi trascorsi
    let currentTimeIndex = document.getElementsByClassName("song-progress")[0];
    currentTimeIndex.innerHTML = "0:00";

    //EL del tasto play
    let playCircle= document.getElementById("playCircle"); //tasto play della loadbar versione desktop
    let playCircle1 = playCircle.cloneNode(true);
    playCircle.parentNode.replaceChild(playCircle1, playCircle);
        //attacco il nuovo EL
    let interval = null; //davvero necessario?
    

    //Attenzione questo è il pallino Temporale di Gianfranco
    let pallinoTemporale = document.getElementById("rangeTempo"); //pallino che segna il tempo nella loadbar
    pallinoTemporale.setAttribute("min", "0");
    pallinoTemporale.setAttribute("max", `${currentTrack.song.duration}`);
        playCircle1.addEventListener("mousedown", function () { 
            currentTrack.play();
            if (currentTrack.playing == true) {
                interval = setInterval(function () { aggiorna(currentTimeIndex, currentTrack); pallinoTemporale.setAttribute("value", `${(currentTrack.song.currentTime / currentTrack.song.duration) * 100}`);}, 10);
            } else { clearInterval(interval); }
            console.log("playing in desktop version baby");
        });  
        //document.getElementById("rangeTempo").setAttribute("value", `${(currentTrack.song.currentTime / currentTrack.duration) * 100}`);
    

    
    
    
}
  


export function aggiorna(currentTimeIndex,currentTrack){ //mette in currentTimeIndex il valore corrente del tempo di currentTrack
    console.log("aggiornamento");
    currentTimeIndex.innerHTML = secondsToTime(currentTrack.song.currentTime);
}


export function secondsToTime(e) { //trasforma come da titolo
    const m = Math.floor(e % 3600 / 60).toString(),
        s = Math.floor(e % 60).toString().padStart(2, '0');

    return m + ':' + s;
}

export function gestioneCanzoni() {
    //setta come selezionata la prima canzone
    selezionata(divDeiBrani.querySelector(".titoloCanzone").innerHTML);
    
    //attacca EL alle canzoni che attivano il selezionata
    for (let albumEL of divDeiBrani.children) {
        albumEL.addEventListener("mousedown", function () { selezionata(albumEL.querySelector(".titoloCanzone").innerHTML); });
    }
}


export function impaginaAlbumPagina(p) {
    //impagina le tracks di albumArray nel divDeiBrani

    albumArray.forEach((track,i) => {

        if (p == "artist") {
            divDeiBrani.innerHTML+=`<div class="d-flex row align-items-center justify-content-between mt-3">
            <div class="col-1 col-lg-1 text-center">
                <p class="mb-0">${i+1}</p>
            </div>
            <div class="col-2 col-lg-1">
            <img src=${track.img} class="" alt="img_album">
            </div>
            <div class="col-8 col-lg-8 mt-3">
                <h2 class="titoloCanzone">${track.title}</h2>
                <p>${track.rank}</p>
            </div>
            <div class="col-1 col-lg-1">
                <i class="bi bi-three-dots-vertical"></i>
            </div>
            <div class="d-none d-lg-block col-lg-1 text-center">
            <p class="mb-0">${track.duration}</p>
            </div>
            </div>`;}
        
        
        
        if (p == "album") {
            divDeiBrani.innerHTML += `<div class="d-flex align-items-center justify-content-between mt-3">
            <div>
                <h2 class="titoloCanzone">${track.title}</h2>
                <p>${track.author}</p>
            </div>
            <div>
                <i class="bi bi-three-dots-vertical"></i>
            </div>
        </div> `
}  
    });
    console.log("titoli: ", divDeiBrani.querySelectorAll(".titoloCanzone"));

}