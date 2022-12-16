import { Track } from './class.js';



let albumImgsArray = document.getElementsByClassName("album");


const preferredAlbumsArray = [
    230935602, //la voce del padrone ---> Battiato
    723861, //immaculate ---> Madonna
    1075407, //born this way --->Lady Gaga
    1121401, //jazz--->Queen
    103636, //dresse4d to kill you --->Kiss
    86933072, //reise reise --->Rammstein
    111209, //volta la carta --->De André
    111211,
    328641,
    12047952
];

preferredAlbumsArray.forEach((e, i) => { 
    let url = `https://striveschool-api.herokuapp.com/api/deezer/album/${e}`;
    fetch(url).then(response => { if (response.ok) { return response.json(); } })
        .then(response => {

           // albumImgsArray[i].setAttribute("src", response.cover);


        }).catch(error => console.log(error));
    
    albumImgsArray[i].addEventListener("mousedown", function () { 
        
        sessionStorage.setItem("selectedAlbum", url);
        window.location.href = "album.html";
    });

});

//fa quello che dice il suo nome
function settaLoadbar() { 

    let track = JSON.parse(sessionStorage.getItem("currentTrack"));
    if (track != null) {
        
        let track = new Track(track.title, "Carlino", track.author, track.anteprimaUrl, rank = 0, track.img, duration = -1);
        console.log(track);
        let testoCanzoneCorrenteDesktop = document.querySelector("footer").children[0].children[1].children[0];
        testoCanzoneCorrenteDesktop.innerHTML = track.title_short + " " + track.author;  //setta testoCanzoneCorrente 
        
        let immagineCanzoneCorrente = document.querySelector("footer").children[0].children[0];
        immagineCanzoneCorrente.setAttribute("src", `${track.img}`);
        
        let song = new Audio(track.anteprimaUrl);
        console.log(song);
        let i = -1;
        document.getElementById("playCircle").addEventListener("mousedown", function () { 
            if (i = -1) {
                song.play();
                i = 1;
            } else { song.pause(); i = -1;}
        });
        
    } else { document.querySelector("footer").innerHTML='';;}
}
settaLoadbar();




