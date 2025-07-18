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
    copyrightElement.textContent = `© ${annoCorrente} getpayots.com | Tutti i diritti riservati`;
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

  // Aggiornamenti di gioco - Due grandi carte
  if (dati.aggiornamenti) {
    htmlContenuto +=
      '<div class="sezione-notizie"><h3>Aggiornamenti di Gioco</h3>';
    htmlContenuto += '<div class="aggiornamenti-griglia">';

    // Prima carta grande con первыми двумя обновлениями
    htmlContenuto += `
      <div class="aggiornamento-carta-grande">
        <div class="aggiornamento-header">
          <h4>Ultime Novità</h4>
          <div class="aggiornamento-icona">🎮</div>
        </div>
        <div class="aggiornamento-contenuto">
    `;

    dati.aggiornamenti.slice(0, 2).forEach((aggiornamento) => {
      htmlContenuto += `
        <div class="aggiornamento-item">
          <h5>${aggiornamento.titolo}</h5>
          <p>${aggiornamento.descrizione}</p>
          <span class="data-notizia">${aggiornamento.data}</span>
        </div>
      `;
    });

    htmlContenuto += `
        </div>
        <div class="aggiornamento-footer">
          <span class="aggiornamento-stato">Attivo</span>
          <span class="aggiornamento-categoria">Gioco</span>
        </div>
      </div>
    `;

    // Вторая большая карта с остальными обновлениями
    htmlContenuto += `
      <div class="aggiornamento-carta-grande">
        <div class="aggiornamento-header">
          <h4>Miglioramenti Tecnici</h4>
          <div class="aggiornamento-icona">⚡</div>
        </div>
        <div class="aggiornamento-contenuto">
    `;

    dati.aggiornamenti.slice(2, 4).forEach((aggiornamento) => {
      htmlContenuto += `
        <div class="aggiornamento-item">
          <h5>${aggiornamento.titolo}</h5>
          <p>${aggiornamento.descrizione}</p>
          <span class="data-notizia">${aggiornamento.data}</span>
        </div>
      `;
    });

    htmlContenuto += `
        </div>
        <div class="aggiornamento-footer">
          <span class="aggiornamento-stato">Completato</span>
          <span class="aggiornamento-categoria">Tecnico</span>
        </div>
      </div>
    `;

    htmlContenuto += "</div></div>";
  }

  // Diari di allenamento - Due grandi carte
  if (dati.diari) {
    htmlContenuto +=
      '<div class="sezione-notizie diari-sezione"><h3>Diari di Allenamento</h3>';
    htmlContenuto += '<div class="diari-griglia">';

    // Prima carta grande con первыми тремя дневниками
    htmlContenuto += `
      <div class="diario-carta-grande">
        <div class="diario-header">
          <h4>Esperienze degli Allenatori</h4>
          <div class="diario-icona">📚</div>
        </div>
        <div class="diario-contenuto">
    `;

    dati.diari.slice(0, 3).forEach((diario) => {
      htmlContenuto += `
        <div class="diario-item">
          <h5>${diario.titolo}</h5>
          <p>${diario.contenuto}</p>
          <span class="autore-diario">${diario.autore}</span>
        </div>
      `;
    });

    htmlContenuto += `
        </div>
        <div class="diario-footer">
          <span class="diario-stato">Attivo</span>
          <span class="diario-categoria">Esperienze</span>
        </div>
      </div>
    `;

    // Вторая большая карта с остальными дневниками
    htmlContenuto += `
      <div class="diario-carta-grande">
        <div class="diario-header">
          <h4>Testimonianze Speciali</h4>
          <div class="diario-icona">🌟</div>
        </div>
        <div class="diario-contenuto">
    `;

    dati.diari.slice(3, 6).forEach((diario) => {
      htmlContenuto += `
        <div class="diario-item">
          <h5>${diario.titolo}</h5>
          <p>${diario.contenuto}</p>
          <span class="autore-diario">${diario.autore}</span>
        </div>
      `;
    });

    htmlContenuto += `
        </div>
        <div class="diario-footer">
          <span class="diario-stato">Completato</span>
          <span class="diario-categoria">Testimonianze</span>
        </div>
      </div>
    `;

    htmlContenuto += "</div></div>";
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
  const nomeContatto = formDati.get("nome").trim();
  const telefonoContatto = formDati.get("telefono").trim();
  const messaggioContatto = formDati.get("messaggio").trim();

  // Validazione semplice - controlla se i campi sono vuoti
  if (!nomeContatto || !telefonoContatto || !messaggioContatto) {
    mostraMessaggioPsico("Per favore compila tutti i campi obbligatori.");
    return;
  }

  // Se tutti i campi sono compilati, mostra messaggio di successo
  evento.target.reset();

  // Scroll in cima alla pagina
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Mostra notifica a schermo intero
  setTimeout(() => {
    mostraNotificaSchermoIntero(
      "Messaggio inviato con successo! Ti risponderemo presto."
    );
  }, 500);
}

// Funzione per mostrare notifica a schermo intero
function mostraNotificaSchermoIntero(messaggio) {
  // Crea overlay
  const overlay = document.createElement("div");
  overlay.className = "notifica-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Crea notifica
  const notifica = document.createElement("div");
  notifica.className = "notifica-schermo-intero";
  notifica.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(135deg, var(--colore-psico), var(--colore-psichico));
    color: white;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(100%);
    transition: transform 0.5s ease;
    z-index: 10001;
  `;

  notifica.innerHTML = `
    <div style="font-size: 1.2rem; margin-bottom: 5px;">✅</div>
    <p style="font-size: 1rem; margin: 0; line-height: 1.3;">${messaggio}</p>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(notifica);

  // Anima l'overlay
  setTimeout(() => {
    overlay.style.opacity = "1";
  }, 10);

  // Anima la notifica
  setTimeout(() => {
    notifica.style.transform = "translateY(0)";
  }, 300);

  // Auto-close dopo 3 secondi
  setTimeout(() => {
    chiudiNotifica();
  }, 3000);
}

// Funzione per chiudere la notifica
function chiudiNotifica() {
  const overlay = document.querySelector(".notifica-overlay");
  const notifica = document.querySelector(".notifica-schermo-intero");

  if (overlay && notifica) {
    notifica.style.transform = "translateY(100%)";

    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.removeChild(notifica);
      }, 300);
    }, 500);
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

// Cookie Consent Functions
function inizializzaCookieConsent() {
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    mostraCookieBar();
  }

  const acceptButton = document.getElementById("accept-cookies");
  if (acceptButton) {
    acceptButton.addEventListener("click", accettaCookie);
  }
}

function mostraCookieBar() {
  const cookieBar = document.getElementById("cookie-consent-bar");
  if (cookieBar) {
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1000); // Show after 1 second
  }
}

function accettaCookie() {
  localStorage.setItem("cookieConsent", "accepted");
  const cookieBar = document.getElementById("cookie-consent-bar");
  if (cookieBar) {
    cookieBar.classList.remove("show");
    setTimeout(() => {
      cookieBar.style.display = "none";
    }, 500);
  }
}

// Funzione per inizializzare tutte le funzionalità
function inizializzaPokemonMemory() {
  caricaComponentiPokemon();

  // Carica contenuto JSON per la pagina corrente
  const paginaCorrente = window.location.pathname.split("/").pop() || "";
  const isMainPage =
    paginaCorrente === "" ||
    paginaCorrente === "index.html" ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("/index.html");

  if (isMainPage) {
    caricaContenutoJSON("istruzioni", "istruzioni-contenuto", "istruzioni");
    caricaContenutoJSON("recensioni", "recensioni-griglia", "recensioni");
    inizializzaCookieConsent(); // Initialize cookie consent only on main page
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
