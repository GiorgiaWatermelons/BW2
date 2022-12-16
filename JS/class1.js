import { Track } from './class.js';


//utilizzata nella versione desktop, fa quello che dice il suo nome
export function settaLoadbar() { 
    console.log("attivato");
    let track = JSON.parse(sessionStorage.getItem("currentTrack"));
    if (track != null) {
        
        /* gestione titolo e immagine */
        track = new Track(track.title, track.title_short, track.author, track.anteprimaUrl, 0, track.img, -1);
        console.log(track);
        let testoCanzoneCorrenteDesktop = document.querySelector("footer").children[0].children[1].children[0];
        testoCanzoneCorrenteDesktop.innerHTML = track.title_short + " " + track.author;  //setta testoCanzoneCorrente 
        let immagineCanzoneCorrente = document.querySelector("footer").children[0].children[0];
        immagineCanzoneCorrente.setAttribute("src", `${track.img}`);
        
        /* gestione audio */
        let audio = document.getElementById("Audio");
        console.log("l'audio corrente: ", audio);
        audio.setAttribute("src",track.anteprimaUrl);
        
    } else { document.querySelector("footer").innerHTML='';;}
}