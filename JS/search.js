import { settaLoadbar } from './class1.js';

/* logica funzionamento input search */
let searchInput = document.querySelector("input");
searchInput.addEventListener("keyup", function () {
    console.log(searchInput.value);
    search(searchInput.value);
});
function impagina(response) { //usa la response per creare la card dell'artista, e ci appiccica l'event listener per ridirezionare

    document.querySelector("div").innerHTML=" <div class='card' style='width: 18rem;'>"+
    "<div id='imgArtistaDiv' class='d-flex justify-content-center m-4'></div>"+
  "<div class='card-body'>"+
  "<h5 class='card-title'></h5>"+
    "<p class='card-text'>artista</p>"+
         "</div>"+
         "</div>";
    let imgArtistaDiv = document.getElementById("imgArtistaDiv");
    let card = document.getElementsByClassName("card")[0];
    imgArtistaDiv.innerHTML = `<img src=${response.data[0].artist.picture} alt="img_artista" class="rounded-circle">`;
    document.getElementsByClassName("card-title")[0].innerHTML = response.data[0].artist.name;
    card.addEventListener("mousedown", function () { window.location.href = "artist.html"; });

}
function search(name) { //carica la pagina con i dati dell'artista usando la func impagina, salva url per fetch pagina artista in localStorage 
     
    fetch(` https://striveschool-api.herokuapp.com/api/deezer/search?q=${name}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                let id = response.data[0].artist.id;
                url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`;
                sessionStorage.setItem("urlLastSearch", url);
                //1) otteniamo url per fetchare la pagina artista e lo salviamo nel sessionStorage
                
                //2)caricamento pagina 
                impagina(response);
            }).catch(error=>console.log(error));
    
}
    

settaLoadbar(); //setto la loadbar con l'ultima track selezionata

