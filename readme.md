# BW2

//MODIFICHE EFFETTUATE DA LORENZO CORATZA
html:
RIGA 38-39-40-43-44 AGGIUNTA m-2
RIGA 31 CAMBIATO mx-2 in m-3
riga 30 CAMBIATO <IMG> IN <DIV>
riga 33 AGGIUNTO mx-2
RIGA 19 RIMOSSO d-flex
js:
aggiunta e richiamata funzione impaginaAlto().
aggiunta icona a riga 13.




Per far funzionare il fetch della pagina artist bisogna che ci si arrivi dalla pagina search. 
Infatti il js della pagina search salva nel sessionStorage l'url da cui fare il fetch della pagina artist, 
e il js della pagina artist riprende quell'url per fare la fetch!
