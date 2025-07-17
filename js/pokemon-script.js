// Variabili globali tematiche
let menteAllenata = false;
let tempoTurnoAttivo = false;
let sfidaPsicoInCorso = false;
let livelloMemoriaAttuale = "facile";
let recordPersonale = 0;
let tempoUltimaSfida = 0;

// Funzione per caricare header e footer
async function caricaComponentiPokemon() {
  try {
    const headerRisposta = await fetch("header-pokemon.html");
    const footerRisposta = await fetch("footer-pokemon.html");

    if (headerRisposta.ok) {
      const headerContenuto = await headerRisposta.text();
      document.getElementById("pokemon-header-container").innerHTML =
        headerContenuto;
      inizializzaMenuMobile();
    }

    if (footerRisposta.ok) {
      const footerContenuto = await footerRisposta.text();
      document.getElementById("pokemon-footer-container").innerHTML =
        footerContenuto;
      aggiornaCopyrightPokemon();
    }
  } catch (errore) {
    console.error("Errore nel caricamento dei componenti:", errore);
  }
}

// Funzione per inizializzare il menu mobile
function inizializzaMenuMobile() {
  const burgerMenu = document.querySelector(".burger-menu");
  const navPokemon = document.querySelector(".nav-pokemon");

  if (burgerMenu && navPokemon) {
    burgerMenu.addEventListener("click", function () {
      toggleMenuMobile();
    });
  }

  // Aggiungi event listener per chiudere menu quando si clicca su un link
  const navLinks = document.querySelectorAll(".nav-pokemon .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      chiudiMenuMobile();
    });
  });
}

// Funzione per aprire/chiudere il menu mobile
function toggleMenuMobile() {
  const navPokemon = document.querySelector(".nav-pokemon");
  const burgerMenu = document.querySelector(".burger-menu");

  if (navPokemon && burgerMenu) {
    const isOpen = navPokemon.classList.contains("nav-mobile-attivo");

    if (isOpen) {
      chiudiMenuMobile();
    } else {
      apriMenuMobile();
    }
  }
}

// Funzione per aprire il menu mobile
function apriMenuMobile() {
  const navPokemon = document.querySelector(".nav-pokemon");
  const burgerMenu = document.querySelector(".burger-menu");

  if (navPokemon) {
    navPokemon.classList.add("nav-mobile-attivo");
  }
  if (burgerMenu) {
    burgerMenu.classList.add("burger-attivo");
  }

  // Blocca lo scroll
  document.body.classList.add("menu-aperto");
}

// Funzione per chiudere il menu mobile
function chiudiMenuMobile() {
  const navPokemon = document.querySelector(".nav-pokemon");
  const burgerMenu = document.querySelector(".burger-menu");

  if (navPokemon) {
    navPokemon.classList.remove("nav-mobile-attivo");
  }
  if (burgerMenu) {
    burgerMenu.classList.remove("burger-attivo");
  }

  // Riabilita lo scroll
  document.body.classList.remove("menu-aperto");
}

// Funzione per aggiornare il copyright
function aggiornaCopyrightPokemon() {
  const copyrightElement = document.querySelector(".copyright-pokemon");
  if (copyrightElement) {
    const annoCorrente = new Date().getFullYear();
    copyrightElement.textContent = `© ${annoCorrente} Pokémon Memory Time. Tutti i diritti riservati.`;
  }
}

// Funzione per avviare la sfida psico
function avviaSfidaPsico() {
  if (!sfidaPsicoInCorso) {
    sfidaPsicoInCorso = true;
    menteAllenata = true;
    tempoTurnoAttivo = true;

    // Simulazione di avvio gioco
    mostraMessaggioPsico("Sfida avviata! Preparati per l'allenamento mentale!");

    setTimeout(() => {
      sfidaPsicoInCorso = false;
      tempoTurnoAttivo = false;
    }, 3000);
  }
}

// Funzione per mostrare messaggi psico
function mostraMessaggioPsico(messaggio) {
  const messaggioElement = document.createElement("div");
  messaggioElement.className = "messaggio-psico";
  messaggioElement.textContent = messaggio;
  messaggioElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--colore-psico), var(--colore-psichico));
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInPsico 0.5s ease-out;
    `;

  document.body.appendChild(messaggioElement);

  setTimeout(() => {
    messaggioElement.style.animation = "slideOutPsico 0.5s ease-in";
    setTimeout(() => {
      document.body.removeChild(messaggioElement);
    }, 500);
  }, 3000);
}

// Funzione per caricare contenuto da JSON
async function caricaContenutoJSON(nomeFile, elementoTarget, tipoContenuto) {
  try {
    const risposta = await fetch(`data/${nomeFile}.json`);
    if (risposta.ok) {
      const dati = await risposta.json();
      visualizzaContenutoPokemon(dati, elementoTarget, tipoContenuto);
    }
  } catch (errore) {
    console.error(`Errore nel caricamento di ${nomeFile}:`, errore);
  }
}

// Funzione per visualizzare contenuto Pokémon
function visualizzaContenutoPokemon(dati, elementoTarget, tipoContenuto) {
  const targetElement = document.getElementById(elementoTarget);
  if (!targetElement) return;

  switch (tipoContenuto) {
    case "istruzioni":
      visualizzaIstruzioniPokemon(dati, targetElement);
      break;
    case "recensioni":
      visualizzaRecensioniPokemon(dati, targetElement);
      break;
    case "notizie":
      visualizzaNotiziePokemon(dati, targetElement);
      break;
    case "contatti":
      visualizzaContattiPokemon(dati, targetElement);
      break;
  }
}

// Funzione per visualizzare istruzioni
function visualizzaIstruzioniPokemon(dati, elemento) {
  let htmlContenuto = "";
  // Показываем только первые 3 инструкции
  dati.istruzioni.slice(0, 3).forEach((istruzione, indice) => {
    htmlContenuto += `
            <div class="istruzione-item">
                <div class="numero-passo">${indice + 1}</div>
                <h3>${istruzione.titolo}</h3>
                <p>${istruzione.descrizione}</p>
                ${
                  istruzione.suggerimenti
                    ? `<ul>${istruzione.suggerimenti
                        .map((s) => `<li>${s}</li>`)
                        .join("")}</ul>`
                    : ""
                }
            </div>
        `;
  });
  elemento.innerHTML = htmlContenuto;
}

// Funzione per visualizzare recensioni
function visualizzaRecensioniPokemon(dati, elemento) {
  let htmlContenuto = "";
  // Показываем только первые 6 отзывов
  dati.recensioni.slice(0, 6).forEach((recensione) => {
    htmlContenuto += `
            <div class="recensione-carta">
                <div class="nome-allenatore">${recensione.nome}</div>
                <div class="testo-recensione">"${recensione.testo}"</div>
            </div>
        `;
  });
  elemento.innerHTML = htmlContenuto;
}

// Funzione per visualizzare notizie
function visualizzaNotiziePokemon(dati, elemento) {
  let htmlContenuto = "";

  // Aggiornamenti di gioco
  if (dati.aggiornamenti) {
    htmlContenuto +=
      '<div class="sezione-notizie"><h3>Aggiornamenti di Gioco</h3>';
    dati.aggiornamenti.forEach((aggiornamento) => {
      htmlContenuto += `
                <div class="notizia-carta">
                    <h4>${aggiornamento.titolo}</h4>
                    <p>${aggiornamento.descrizione}</p>
                    <span class="data-notizia">${aggiornamento.data}</span>
                </div>
            `;
    });
    htmlContenuto += "</div>";
  }

  // Diari di allenamento
  if (dati.diari) {
    htmlContenuto +=
      '<div class="sezione-notizie"><h3>Diari di Allenamento</h3>';
    dati.diari.forEach((diario) => {
      htmlContenuto += `
                <div class="diario-carta">
                    <h4>${diario.titolo}</h4>
                    <p>${diario.contenuto}</p>
                    <span class="autore-diario">${diario.autore}</span>
                </div>
            `;
    });
    htmlContenuto += "</div>";
  }

  elemento.innerHTML = htmlContenuto;
}

// Funzione per visualizzare contatti
function visualizzaContattiPokemon(dati, elemento) {
  let htmlContenuto = `
        <div class="info-contatti">
            <div class="contatto-item">
                <strong>Email:</strong> ${dati.email}
            </div>
            <div class="contatto-item">
                <strong>Telefono:</strong> ${dati.telefono}
            </div>
            <div class="contatto-item">
                <strong>Indirizzo:</strong> ${dati.indirizzo}
            </div>
        </div>
        <div class="mappa-container">
            <iframe src="${dati.mappa}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    `;
  elemento.innerHTML = htmlContenuto;
}

// Funzione per gestire il form di contatto
function inviaFormContatto(evento) {
  evento.preventDefault();

  const formDati = new FormData(evento.target);
  const nomeContatto = formDati.get("nome");
  const telefonoContatto = formDati.get("telefono");
  const messaggioContatto = formDati.get("messaggio");

  if (nomeContatto && telefonoContatto && messaggioContatto) {
    mostraMessaggioPsico(
      "Messaggio inviato con successo! Ti risponderemo presto."
    );
    evento.target.reset();
  } else {
    mostraMessaggioPsico("Per favore compila tutti i campi.");
  }
}

// Funzione per animare elementi al scroll
function animaElementiScroll() {
  const elementiDaAnimare = document.querySelectorAll(
    ".caratteristica-carta, .recensione-carta, .tipo-carta, .meccanica-carta"
  );

  const osservatore = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  elementiDaAnimare.forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    osservatore.observe(elemento);
  });
}

// Funzione per gestire la navigazione smooth
function navigazioneSmooth() {
  const linkInterni = document.querySelectorAll('a[href^="#"]');

  linkInterni.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Funzione per inizializzare tutte le funzionalità
function inizializzaPokemonMemory() {
  caricaComponentiPokemon();

  // Carica contenuto JSON per la pagina corrente
  const paginaCorrente =
    window.location.pathname.split("/").pop() || "index.html";

  if (paginaCorrente === "index.html") {
    caricaContenutoJSON("istruzioni", "istruzioni-contenuto", "istruzioni");
    caricaContenutoJSON("recensioni", "recensioni-griglia", "recensioni");
  } else if (paginaCorrente === "notizie-gioco.html") {
    caricaContenutoJSON("notizie", "notizie-contenuto", "notizie");
  } else if (paginaCorrente === "contatti.html") {
    caricaContenutoJSON("contatti", "contatti-contenuto", "contatti");
  }

  // Inizializza animazioni e navigazione
  setTimeout(() => {
    animaElementiScroll();
    navigazioneSmooth();
  }, 1000);

  // Gestisci form di contatto se presente
  const formContatto = document.getElementById("form-contatto");
  if (formContatto) {
    formContatto.addEventListener("submit", inviaFormContatto);
  }
}

// Aggiungi stili CSS per animazioni
const stiliAnimazioni = `
    @keyframes slideInPsico {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutPsico {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = stiliAnimazioni;
document.head.appendChild(styleSheet);

// Inizializza quando il DOM è caricato
document.addEventListener("DOMContentLoaded", inizializzaPokemonMemory);
