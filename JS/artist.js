
//fa il fetch dall'url che è stato salvato nella sessionStorage durante l'ultima search
fetch(sessionStorage.getItem("urlLastSearch"))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(response => {
        console.log(response);
        /* qui metti il lavoro per l'impaginazione */



    }).catch(e => console.log(e));