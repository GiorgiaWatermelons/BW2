


let search = document.querySelector("input");

let name = "queen";

function searchF(name) { 
//funzione per fetchare nel search
    fetch(` https://striveschool-api.herokuapp.com/api/deezer/search?q=${name}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(response => {
        console.log(response);
        
    });

}


searchF(name);

fetch("https://www.deezer.com/artist/412")
.then(response => {
    if (response.ok) {
        return response.json();
    }
})
.then(response => {
    console.log(response);
    
});
