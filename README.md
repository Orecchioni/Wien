# Vienna — 10/13 ottobre 2026

Web app statica con l'itinerario di quattro giorni a Vienna: timeline per giornata, spunte
persistenti, link diretti a Google Maps e una sezione per i biglietti da prenotare.

Pensata per essere usata camminando, con connessione scarsa: dopo il primo caricamento
funziona completamente offline e si può installare sulla schermata home come app.

## Com'è fatta

HTML, CSS e JavaScript vanilla. Nessun framework, nessun build step, nessuna dipendenza
esterna a runtime: i font sono self-hosted in `fonts/` e non viene fatta nessuna richiesta
a domini esterni.

```
index.html
css/style.css
js/data.js              tutti i contenuti dell'itinerario
js/app.js               rendering e interazioni
sw.js                   service worker, precache di tutti gli asset
manifest.webmanifest
fonts/                  Bodoni Moda e Archivo, woff2
icons/                  icone PWA 192 e 512 px
```

Tutti i percorsi sono relativi, così il sito funziona sia aperto da filesystem sia
pubblicato in una sottocartella su GitHub Pages.

## Modificare i contenuti

Tutto l'itinerario sta in [`js/data.js`](js/data.js). Per correggere un orario, un indirizzo
o un testo basta toccare quel file: la logica di rendering non va mai cambiata.

Ogni tappa è un oggetto:

| campo | tipo | a cosa serve |
|---|---|---|
| `id` | stringa | chiave della spunta salvata, deve restare stabile |
| `time` | stringa | orario mostrato in cima alla tappa |
| `name` | stringa | titolo |
| `subtitle` | stringa | riga sotto il titolo |
| `detail` | HTML | testo esteso, mostrato quando la tappa è aperta |
| `map` | stringa o `null` | ricerca da aprire in Google Maps |
| `phone` | stringa o `null` | numero, diventa un link `tel:` |
| `free` | booleano | `false` se c'è un ingresso a pagamento |
| `pay` | stringa o `null` | etichetta dell'ingresso |
| `booking` | booleano | `true` se va prenotato in anticipo |

Se cambi, aggiungi o togli file, ricordati di aggiornare l'elenco `ASSETS` e il numero di
versione `CACHE` in [`sw.js`](sw.js), altrimenti l'app offline continuerà a servire la
versione vecchia.

## Lanciarla in locale

Aprendo direttamente `index.html` col browser funziona già tutto, tranne il service worker
(i browser non lo registrano su `file://`). Per provare anche la modalità offline serve un
server locale:

```bash
python -m http.server 8000
```

Poi apri `http://localhost:8000`. Per verificare l'offline: carica la pagina due volte,
attiva la modalità aereo e ricarica.

## Pubblicare su GitHub Pages

Il workflow in `.github/workflows/deploy.yml` pubblica la root del repo a ogni push su
`main`. Restano due passaggi manuali da fare su GitHub:

1. **Creare il repository remoto** su GitHub e collegarlo a questa cartella.
2. **Settings → Pages → Build and deployment → Source: "GitHub Actions"**. Senza questo
   passaggio il workflow fallisce, perché Pages non è ancora abilitato sul repo.

Dopo il primo deploy il sito è su `https://<utente>.github.io/<nome-repo>/`.

## Dati salvati

Spunte e biglietti stanno nel `localStorage` del browser, quindi restano sul dispositivo e
non vengono sincronizzati fra telefoni. Il bottone in fondo alla pagina azzera solo le
spunte delle tappe: i codici di prenotazione restano.

Ai controlli serve comunque il QR dell'email di conferma: i codici scritti nell'app sono
solo un promemoria.
