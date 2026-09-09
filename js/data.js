/* Tutti i contenuti dell'itinerario vivono qui.
   Per correggere un orario, un indirizzo o un testo basta toccare questo file. */

const TRIP = {
  title: "Vienna",
  dates: "10 – 13 ottobre 2026",
  people: "2 persone",
  base: {
    name: "Blackhome Wien",
    address: "Neulinggasse 29, 1030 Wien",
    map: "Neulinggasse 29, 1030 Wien, Austria"
  }
};

const NOTICE = {
  title: "Lavori sulla S-Bahn Hauptbahnhof – Praterstern",
  body:
    "<p>Dal <strong>7 settembre 2026 a fine ottobre 2027</strong> la tratta della S-Bahn tra Wien Hauptbahnhof e Praterstern è chiusa per lavori.</p>" +
    "<p>Il collegamento aeroporto–centro resta garantito, ma cambiano alcune modalità: il <strong>CAT opera con autobus sostitutivi verso Wien Mitte</strong>.</p>" +
    "<p>Va ricontrollato il collegamento esatto pochi giorni prima della partenza.</p>"
};

const TICKETS = [
  {
    id: "light-of-creation",
    name: "Light of Creation",
    when: "Sabato 10 ottobre, ore 21:00",
    place: "Votivkirche, Rooseveltplatz 8, 1090 Wien",
    map: "Votivkirche, Rooseveltplatz 8, 1090 Wien, Austria",
    note: "Appuntamento fisso della serata: tutta la sera di sabato è costruita attorno a questo orario."
  },
  {
    id: "schonbrunn",
    name: "Schönbrunn Palace",
    when: "Domenica 11 ottobre, ore 12:30",
    place: "Schloss Schönbrunn, Schönbrunner Schlossstraße 47, 1130 Wien",
    map: "Schloss Schönbrunn, Schönbrunner Schlossstraße 47, 1130 Wien, Austria",
    note: "Ingresso a orario fisso. Una delle poche visite interne importanti del viaggio."
  },
  {
    id: "belvedere",
    name: "Upper Belvedere",
    when: "Lunedì 12 ottobre, ore 10:00",
    place: "Oberes Belvedere, Prinz-Eugen-Straße 27, 1030 Wien",
    map: "Oberes Belvedere, Prinz-Eugen-Straße 27, 1030 Wien, Austria",
    note: "Ingresso a orario fisso. Klimt e Schiele nelle sale principali."
  },
  {
    id: "prunksaal",
    name: "Prunksaal",
    when: "Martedì 13 ottobre, ore 09:00",
    place: "Österreichische Nationalbibliothek, Josefsplatz 1, 1010 Wien",
    map: "Prunksaal Österreichische Nationalbibliothek, Josefsplatz 1, 1010 Wien, Austria",
    note: "Ultima mattina, prima del check-out logistico. Apertura alle 09:00."
  }
];

const DAYS = [
  {
    id: "sab",
    label: "Sab",
    long: "Sabato",
    date: "10 ottobre",
    theme: "Arrivo, primo assaggio di Vienna, Light of Creation",
    color: "#C9A227",
    notice: false,
    stops: [
      {
        id: "sab-01",
        time: "14:05",
        name: "Arrivo a Vienna",
        subtitle: "Atterraggio e trasferimento verso l'appartamento",
        detail:
          "<p>Atterraggio a Vienna-Schwechat. Dall'aeroporto si raggiunge la città e da lì l'appartamento nel terzo distretto.</p>" +
          "<p>Verificare il collegamento aggiornato: nel 2026 la S-Bahn tra Hauptbahnhof e Praterstern è interrotta per lavori e il CAT viaggia con autobus sostitutivi verso Wien Mitte.</p>",
        map: "Vienna International Airport, Schwechat, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "sab-02",
        time: "16:00",
        name: "Arrivo in appartamento",
        subtitle: "Check-in, valigie, breve pausa",
        detail:
          "<p>Blackhome Wien, Neulinggasse 29, 1030 Wien. Terzo distretto, a piedi dal centro in una ventina di minuti.</p>" +
          "<p>Il tempo di lasciare i bagagli e rimettersi in piedi: la serata è già impegnata.</p>",
        map: "Neulinggasse 29, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "sab-03",
        time: "16:30",
        name: "Bitzinger — Albertinaplatz",
        subtitle: "Primo Würstel viennese, 20–25 minuti",
        detail:
          "<p>Käsekrainer nel panino. Una delle Würstelstand più note della città, in piedi al banco come si deve.</p>" +
          "<p>Posizione comoda: da qui si è già dentro il centro storico, quindi la sosta porta dritti al giro successivo senza spostamenti aggiuntivi.</p>",
        map: "Bitzinger Würstelstand Albertina, Albertinaplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "sab-04",
        time: "17:00",
        name: "Primo giro nel centro storico",
        subtitle: "Albertina, Staatsoper, Burggarten, Hofburg, Heldenplatz",
        detail:
          "<p>Percorso: Albertina → Wiener Staatsoper → Burggarten → Hofburg → Heldenplatz.</p>" +
          "<p><strong>Solo esterni.</strong> Serve a prendere le misure della città e a capire le distanze, non a visitare.</p>",
        map: "Albertinaplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "sab-05",
        time: "17:45",
        name: "Karlsplatz e Stadtpark",
        subtitle: "Passeggiata tranquilla verso est",
        detail:
          "<p>Percorso: Hofburg → Opera → Schwarzenbergplatz → Karlskirche → Stadtpark.</p>" +
          "<p>Ritmo lento, nessuna visita interna. La Karlskirche vista dallo specchio d'acqua davanti alla facciata è il momento migliore.</p>",
        map: "Karlskirche, Kreuzherrengasse 1, 1040 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "sab-06",
        time: "19:00",
        name: "Golden Frites — Neubaugasse",
        subtitle: "Cena rapida, 30–40 minuti",
        detail:
          "<p>Cena molto rapida: alle 21 c'è l'appuntamento alla Votivkirche e non si può sforare.</p>" +
          "<p>Non è vicinissimo, ma in metro è fattibile senza affanno. Da qui alla Votivkirche si torna verso il Ring.</p>",
        map: "Golden Frites, Neubaugasse, 1070 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "sab-07",
        time: "21:00",
        name: "Light of Creation — Votivkirche",
        subtitle: "Appuntamento fisso della serata",
        detail:
          "<p>Installazione di luce dentro la Votivkirche. È l'unico impegno a orario della giornata: tutto il resto del sabato è costruito attorno a questo.</p>" +
          "<p>Arrivare con qualche minuto di margine.</p>",
        map: "Votivkirche, Rooseveltplatz 8, 1090 Wien, Austria",
        phone: null,
        free: false,
        pay: "Ingresso a pagamento",
        booking: true
      },
      {
        id: "sab-08",
        time: "21:45",
        name: "Vienna by night",
        subtitle: "Il Ring e il centro illuminati",
        detail:
          "<p>Percorso: Votivkirche → Universität → Rathaus → Burgtheater → Hofburg → Michaelerplatz → Kohlmarkt → Graben → Stephansplatz.</p>" +
          "<p>Se restano energie: Schwedenplatz → Donaukanal. Altrimenti si chiude a Stephansplatz e si rientra.</p>",
        map: "Rathausplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      }
    ]
  },

  {
    id: "dom",
    label: "Dom",
    long: "Domenica",
    date: "11 ottobre",
    theme: "Zentralfriedhof, Villa Wagner, Schönbrunn, Vienna imperiale, Prater",
    color: "#35563F",
    notice: false,
    stops: [
      {
        id: "dom-01",
        time: "07:30",
        name: "Joseph Brot — Wien Bio Bäckerei",
        subtitle: "Colazione sostanziosa, 60 minuti",
        detail:
          "<p>Colazione in stile bakery viennese: pane, pasticceria, uova. Serve a reggere una giornata lunga.</p>" +
          "<p>Landstraßer Hauptstraße 4, 1030 Wien. A pochi minuti dall'appartamento.</p>",
        map: "Joseph Brot, Landstraßer Hauptstraße 4, 1030 Wien, Austria",
        phone: "+43 1 7102881",
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-02",
        time: "09:00",
        name: "Zentralfriedhof",
        subtitle: "Fino alle 10:15, solo la zona monumentale",
        detail:
          "<p>Concentrarsi sul gruppo delle tombe d'onore: <strong>Beethoven, Brahms, Schubert, Johann Strauss II, Arnold Schönberg, Falco</strong> e la <strong>Karl-Borromäus-Kirche</strong>.</p>" +
          "<p>Non serve visitarlo tutto: è enorme e il resto è cimitero ordinario. Un'ora abbondante nella zona giusta basta.</p>",
        map: "Wiener Zentralfriedhof Tor 2, Simmeringer Hauptstraße 234, 1110 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-03",
        time: "10:45",
        name: "Villa Wagner I",
        subtitle: "Fino alle 11:30, visita prevalentemente esterna",
        detail:
          "<p>Hüttelbergstraße 26, 1140 Wien. Villa di Otto Wagner ai piedi del Wienerwald.</p>" +
          "<p>Tappa particolare e poco turistica: si guarda da fuori, vale per l'architettura e per il contrasto con il resto della giornata.</p>",
        map: "Villa Wagner, Hüttelbergstraße 26, 1140 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-04",
        time: "12:30",
        name: "Schönbrunn — palazzo",
        subtitle: "Ingresso alle 12:30, fino alle 13:45",
        detail:
          "<p>Ingresso a orario fisso. È una delle poche visite interne importanti del viaggio, <strong>da tenere assolutamente</strong>.</p>" +
          "<p>Il percorso interno è a senso unico e scorre: un'ora e un quarto è la durata reale, non una stima ottimistica.</p>",
        map: "Schloss Schönbrunn, Schönbrunner Schlossstraße 47, 1130 Wien, Austria",
        phone: null,
        free: false,
        pay: "Ingresso a pagamento",
        booking: true
      },
      {
        id: "dom-05",
        time: "13:45",
        name: "Giardini di Schönbrunn",
        subtitle: "Fino alle 15:45, senza correre",
        detail:
          "<p>Percorso: giardini → Fontana di Nettuno → salita alla Gloriette → panorama sulla città.</p>" +
          "<p>La salita alla Gloriette è l'unico tratto in pendenza della giornata. Due ore sono abbondanti e permettono di sedersi.</p>",
        map: "Gloriette Schönbrunn, 1130 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-06",
        time: "16:00",
        name: "Hotel Sacher",
        subtitle: "Sachertorte e Melange",
        detail:
          "<p>Philharmoniker Straße 4, 1010 Wien, dietro l'Opera.</p>" +
          "<p>Sachertorte originale e Wiener Melange. Può esserci coda: è parte dell'esperienza, non un imprevisto.</p>",
        map: "Hotel Sacher Wien, Philharmoniker Straße 4, 1010 Wien, Austria",
        phone: "+43 1 514560",
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-07",
        time: "17:00",
        name: "Grande passeggiata imperiale",
        subtitle: "Dal Ring al Graben, tutto a piedi",
        detail:
          "<p>Percorso: Opera → Albertina → Burggarten → Volksgarten → Parlamento (esterno) → <strong>Palazzo di Giustizia</strong> (Schmerlingplatz 10-11, 10–15 minuti) → Heldenplatz → Hofburg → Michaelerplatz → Looshaus → Kohlmarkt → Graben.</p>" +
          "<p>Il Palazzo di Giustizia merita la deviazione: l'atrio monumentale è visitabile ed è una delle cose meno battute del centro.</p>",
        map: "Justizpalast, Schmerlingplatz 10-11, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-08",
        time: "19:30",
        name: "Pürstner — Riemergasse 10",
        subtitle: "Cena viennese vera",
        detail:
          "<p>Wiener Schnitzel come si deve, ed eventualmente Apfelstrudel se resta spazio.</p>" +
          "<p>Riemergasse 10, 1010 Wien. Interno di legno, porzioni serie. Meglio prenotare un tavolo.</p>",
        map: "Pürstner, Riemergasse 10, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "dom-09",
        time: "21:00",
        name: "Prater di sera",
        subtitle: "Ruota panoramica illuminata e passeggiata",
        detail:
          "<p>Non servono attrazioni né biglietti: basta vedere il parco illuminato e la Riesenrad da sotto.</p>" +
          "<p>Chiusura leggera di una giornata molto piena.</p>",
        map: "Wiener Riesenrad, Riesenradplatz 1, 1020 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      }
    ]
  },

  {
    id: "lun",
    label: "Lun",
    long: "Lunedì",
    date: "12 ottobre",
    theme: "Belvedere, Hundertwasser, centro storico, Augarten",
    color: "#2C4A6E",
    notice: false,
    stops: [
      {
        id: "lun-01",
        time: "08:00",
        name: "Café Benedikt",
        subtitle: "Brunch sostanzioso",
        detail:
          "<p>Sechskrügelgasse 2, 1030 Wien. A due passi dall'appartamento.</p>" +
          "<p>Colazione seria prima di una giornata con quindici tappe: la prossima sosta vera è a metà pomeriggio.</p>",
        map: "Café Benedikt, Sechskrügelgasse 2, 1030 Wien, Austria",
        phone: "+43 1 7107225",
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-02",
        time: "10:00",
        name: "Upper Belvedere",
        subtitle: "Ingresso alle 10:00, fino alle 11:15",
        detail:
          "<p>Klimt e <strong><em>Il Bacio</em></strong>, Schiele, le sale principali del piano nobile.</p>" +
          "<p>Un'ora e un quarto è sufficiente se ci si tiene alle sale principali senza inseguire tutta la collezione.</p>",
        map: "Oberes Belvedere, Prinz-Eugen-Straße 27, 1030 Wien, Austria",
        phone: null,
        free: false,
        pay: "Ingresso a pagamento",
        booking: true
      },
      {
        id: "lun-03",
        time: "11:15",
        name: "Giardini del Belvedere",
        subtitle: "Fino alle 11:45, passeggiata breve",
        detail:
          "<p>Discesa dal palazzo superiore verso quello inferiore lungo l'asse dei giardini. Foto dalla terrazza alta con la città sullo sfondo.</p>",
        map: "Belvedere Garten, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-04",
        time: "12:15",
        name: "Hundertwasserhaus",
        subtitle: "Visita esterna: facciata e cortili",
        detail:
          "<p>Kegelgasse 36-38, 1030 Wien. Non si entra: è un condominio abitato, si guarda dalla strada.</p>",
        map: "Hundertwasserhaus, Kegelgasse 36-38, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-05",
        time: "12:30",
        name: "Hundertwasser Village",
        subtitle: "Passaggio veloce",
        detail:
          "<p>Di fronte alla casa, dall'altro lato della strada. Dieci minuti, giusto per il pavimento ondulato e il cortile interno.</p>",
        map: "Hundertwasser Village, Kegelgasse 37-39, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-06",
        time: "13:00",
        name: "Kunst Haus Wien",
        subtitle: "Solo esterno",
        detail:
          "<p>Untere Weißgerberstraße 13, 1030 Wien. Stessa mano di Hundertwasser, facciata a scacchi irregolari.</p>" +
          "<p>Nessun ingresso: si guarda e si prosegue verso il Donaukanal.</p>",
        map: "Kunst Haus Wien, Untere Weißgerberstraße 13, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-07",
        time: "13:15",
        name: "Passeggiata verso il centro",
        subtitle: "Donaukanal, Schwedenplatz, Judenplatz",
        detail:
          "<p>Percorso: Donaukanal → Schwedenplatz → Ruprechtskirche → Hoher Markt → Ankeruhr → Judenplatz.</p>" +
          "<p>La Ruprechtskirche è la chiesa più antica di Vienna. All'Ankeruhr, se si capita a mezzogiorno, passa tutta la sfilata di figure: a quest'ora se ne vede una sola.</p>",
        map: "Schwedenplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-08",
        time: "14:15",
        name: "Peterskirche",
        subtitle: "Visita breve",
        detail:
          "<p>Petersplatz, 1010 Wien. Interno barocco molto denso, a un passo dal Graben.</p>" +
          "<p>Dieci o quindici minuti: è piccola e si vede tutta da dentro l'ingresso.</p>",
        map: "Peterskirche, Petersplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-09",
        time: "14:35",
        name: "Stephansdom",
        subtitle: "15–20 minuti all'interno",
        detail:
          "<p>Senza torri, senza catacombe, senza visita guidata: solo la navata.</p>" +
          "<p>La visita autonoma è prevista nel pomeriggio fino alle 16:30, salvo variazioni per funzioni liturgiche.</p>" +
          "<p>Stephansplatz 3, 1010 Wien.</p>",
        map: "Stephansdom, Stephansplatz 3, 1010 Wien, Austria",
        phone: "+43 1 515523530",
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-10",
        time: "15:00",
        name: "Centro storico",
        subtitle: "Graben, Kohlmarkt, Michaelerplatz, Freyung",
        detail:
          "<p>Percorso: Stephansplatz → Graben → Kohlmarkt → Michaelerplatz → Hofburg → Freyung.</p>" +
          "<p>Di giorno le stesse strade viste di sabato sera cambiano completamente carattere.</p>",
        map: "Graben, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-11",
        time: "15:40",
        name: "Palais Kinsky",
        subtitle: "5–10 minuti, per la facciata",
        detail:
          "<p>Freyung 4, 1010 Wien. Facciata barocca e cortile interno, se aperto.</p>",
        map: "Palais Kinsky, Freyung 4, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-12",
        time: "16:00",
        name: "Demel",
        subtitle: "45–60 minuti, torta e caffè viennese",
        detail:
          "<p>Kohlmarkt 14, 1010 Wien. Ex pasticceria di corte, vetrine e laboratorio a vista.</p>" +
          "<p>Torta o pasticcino con un caffè viennese. Seconda e ultima grande sosta dolce del viaggio dopo Sacher.</p>",
        map: "Demel, Kohlmarkt 14, 1010 Wien, Austria",
        phone: "+43 1 5351717",
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-13",
        time: "17:00",
        name: "Augarten",
        subtitle: "Parco e Flaktürme",
        detail:
          "<p>Passeggiata nel parco e vista esterna dei <strong>Flaktürme</strong>, le torri contraeree lasciate in piedi dal 1945.</p>" +
          "<p>Tappa completamente diversa dal centro: vale per l'atmosfera e per la scala fuori misura delle torri.</p>",
        map: "Augarten Flakturm, Obere Augartenstraße, 1020 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-14",
        time: "18:00",
        name: "Karmeliterviertel",
        subtitle: "Senza tabella di marcia",
        detail:
          "<p>Percorso libero: Karmelitermarkt → vie del quartiere → Donaukanal.</p>" +
          "<p>Quartiere vissuto, non turistico. Qui non c'è niente da spuntare: si cammina e basta.</p>",
        map: "Karmelitermarkt, 1020 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "lun-15",
        time: "20:00",
        name: "Great Amritsar — Marxergasse 7",
        subtitle: "Cena indiana vicino a casa",
        detail:
          "<p>Marxergasse 7, 1030 Wien. Dopo una giornata da quindici tappe non serve riattraversare Vienna per cena.</p>",
        map: "Great Amritsar, Marxergasse 7, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      }
    ]
  },

  {
    id: "mar",
    label: "Mar",
    long: "Martedì",
    date: "13 ottobre",
    theme: "Biblioteca, ultimo giro, Kaiserschmarrn, aeroporto",
    color: "#7A2E39",
    notice: true,
    stops: [
      {
        id: "mar-01",
        time: "08:00",
        name: "Check-out",
        subtitle: "Valigie in deposito presso l'alloggio",
        detail:
          "<p>Si lascia la stanza ma non i bagagli: restano in deposito e si recuperano alle 14:15.</p>" +
          "<p>Giornata volutamente molto più leggera delle precedenti.</p>",
        map: "Neulinggasse 29, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "mar-02",
        time: "09:00",
        name: "Prunksaal",
        subtitle: "Fino alle 10:00, Biblioteca Nazionale Austriaca",
        detail:
          "<p>La sala barocca della Österreichische Nationalbibliothek, Josefsplatz 1.</p>" +
          "<p>È la visita culturale principale dell'ultima mattina. Un'ora è la misura giusta: è una sala sola, ma va guardata con calma.</p>",
        map: "Prunksaal Österreichische Nationalbibliothek, Josefsplatz 1, 1010 Wien, Austria",
        phone: null,
        free: false,
        pay: "Ingresso a pagamento",
        booking: true
      },
      {
        id: "mar-03",
        time: "10:15",
        name: "Ultima passeggiata imperiale",
        subtitle: "Da Josefsplatz a Franziskanerplatz",
        detail:
          "<p>Percorso: Josefsplatz → Augustinerkirche → Hofburg → Heldenplatz → Burggarten → monumento a Sisi → Opera → Kärntner Straße → Neuer Markt → Franziskanerplatz.</p>" +
          "<p>Si esce direttamente dalla biblioteca e si prosegue: nessuno spostamento con i mezzi.</p>",
        map: "Josefsplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "mar-04",
        time: "11:30",
        name: "Chilai",
        subtitle: "Ultimo brunch, fino alle 12:30",
        detail:
          "<p>Ungargasse 66, 1030 Wien. Brunch sostanzioso, l'ultimo pasto seduto prima del viaggio.</p>",
        map: "Chilai, Ungargasse 66, 1030 Wien, Austria",
        phone: "+43 1 7104836",
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "mar-05",
        time: "12:30",
        name: "Ultima passeggiata (opzionale)",
        subtitle: "Karlsplatz e Stadtpark, oppure niente",
        detail:
          "<p>Karlsplatz → Karlskirche → Stadtpark. Oppure semplicemente il centro, senza aggiungere visite.</p>" +
          "<p>Tappa dichiaratamente saltabile: se la stanchezza dei giorni precedenti si fa sentire, si va direttamente alla sosta successiva.</p>",
        map: "Karlskirche, Kreuzherrengasse 1, 1040 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "mar-06",
        time: "13:30",
        name: "Kaiser's — Kaiserschmarrn",
        subtitle: "Fino alle 14:15, Schwedenplatz",
        detail:
          "<p>Ultima esperienza gastronomica viennese: Kaiserschmarrn appena fatto, servito in padella.</p>" +
          "<p>Si prepara al momento, quindi mettere in conto l'attesa dentro i 45 minuti previsti.</p>",
        map: "Kaiser's Kaiserschmarrn, Schwedenplatz, 1010 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "mar-07",
        time: "14:15",
        name: "Recupero bagagli",
        subtitle: "Rientro all'appartamento",
        detail:
          "<p>Da Schwedenplatz all'appartamento e ritiro delle valigie lasciate in deposito la mattina.</p>",
        map: "Neulinggasse 29, 1030 Wien, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      },
      {
        id: "mar-08",
        time: "15:00",
        name: "Partenza verso l'aeroporto",
        subtitle: "In aeroporto per le 16:00–16:15, volo alle 18:00",
        detail:
          "<p>Obiettivo: essere a Vienna-Schwechat entro le 16:15 per un volo alle 18:00.</p>" +
          "<p><strong>Ricontrollare il collegamento pochi giorni prima</strong>: con i lavori sulla S-Bahn il CAT viaggia con autobus sostitutivi verso Wien Mitte e i tempi cambiano.</p>",
        map: "Vienna International Airport, Schwechat, Austria",
        phone: null,
        free: true,
        pay: null,
        booking: false
      }
    ]
  }
];
