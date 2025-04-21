const slides = [
    `Kim Allan ved nu, at en stærk adgangskode er afgørende for at beskytte dine konti og personlige data mod cyberangreb!<br><br>Men lad os sammen hjælpe Kim med at blive endnu klogere!`,
    `Her er nogle vigtige grunde til, hvorfor stærke adgangskoder er nødvendige:<br>Dine konti indeholder ofte følsomme oplysninger som:<ul><li>Bankoplysninger (Netbank, PayPal, MobilePay)</li><li>Personlige data (CPR-nummer, adresse, telefonnummer)</li><li>E-mails og beskeder (Arbejde, sociale medier)</li></ul>En svag adgangskode gør det lettere for hackere at få adgang til disse oplysninger.`,
    `Hvad kendetegner en stærk adgangskode?<br>Smarte og nemme metoder til at skabe stærke adgangskoder:<ul><li>Længde: Minimum 12-16 tegn</li><li>Variation: Brug store/små bogstaver, tal, specialtegn</li><li>Undgå ordbogsord og personlige oplysninger</li><li>Unikt password for hver konto</li></ul>`,
    `Gode teknikker:<ul><li>Brug en passphrase som "MinHund!ElskerAtLøbe87KmOmDagen"</li><li>Forkort sætninger: "Jeg drikker kaffe hver morgen kl. 07!" → "Jdkhmk.07!"</li><li>Brug en password manager som Bitwarden, 1Password eller LastPass</li><li>Aktivér to-faktor-godkendelse (2FA) med en app</li></ul>`,
    `Nu ved både vi og Kim Allan hvad vi skal være opmærksomme på med adgangskoder fremover!`,
    `Eller gør vi....?`,
    `Lad os lige være på den HELT sikre side og teste det af!<br><br>Nu kommer der et lille spil, hvor vi hjælper Kim Allan med at vinde over Hacker Ole. Jeg håber, at han klarer den..<br><br>Lad os komme i gang!`
];

const scenarios = [
    {
        question: "Kim Allan er på sit livs mission. Han vil gerne lave en ny og totalt Hacker Ole-sikker adgangskode, men han har svært ved at huske, hvad en god adgangskode nu er? Jeg håber, at du kan hjælpe ham! Hvad bør Kim vælge som sin nye adgangskode?",
        choices: [
            { text: "Den skal være kort og personlig", correct: false },
            { text: "Den skal være varierende og unik", correct: true },
            { text: "Han kan bare bruge sin gamle kode: “Kim123”", correct: false },
            { text: "Han behøver slet ingen adgangskode", correct: false }
        ]
    },
    {
        question: "Hvad skal hans nye adgangskode indeholde? Hjælp Kim Allan med at vælge den helt rigtige!",
        choices: [
            { text: "Den skal ikke indeholde nogle specialtegn og være meget kort", correct: false },
            { text: "Den skal indeholde en blanding af specialtegn, store og små bogstaver, være minimum 12-16 tegn og indeholde ingen personlige oplysninger", correct: true },
            { text: "Adgangskoden skal være under 4 bogstaver og være meget meget personlig", correct: false },
            { text: "Adgangskoden skal kun indeholde ting fra Kim Allans hverdag, så han nemt kan huske den!", correct: false }
        ]
    },
    {
        question: "Kim Allan er nervøs for at glemme sin nye adgangskode. Kan han gøre sin adgangskode nem at huske, men svær at gætte? Jeg håber at du kan hjælpe ham!",
        choices: [
            { text: "Han skal bruge en passphrase og eller en forkortet sætning!", correct: true },
            { text: "Han skal slå det op på sin Facebook-væg, så han altid ved hvor han kan finde den!", correct: false },
            { text: "Han skal skrive adgangskoden til alle sine venner på Instagram, så kan de nemlig hjælpe ham med at huske den!", correct: false },
            { text: "Han skal hænge den på køleskabet - der glemmer man nemlig aldrig noget!", correct: false }
        ]
    },
    {
        question: "Kim Allan vil gerne se nogle andre eksempler på gode og stærke adgangskoder - Hvor kan han tjekke det henne?",
        choices: [
            { text: "Han kan se det ved at bruge password-manager som Bitwarden, 1Password eller LastPass", correct: true },
            { text: "Han skal spørge sin farmor Birthe", correct: false },
            { text: "Han kan da bare spørge Hacker Ole", correct: false },
            { text: "Han kan skrive sin tænkte adgangskode i en Facebook gruppe, og spørge folk om hjælp der", correct: false }
        ]
    },
    {
        question: "Nu har Kim Allan brug for din hjælp en sidste gang! Han har simpelthen glemt hvordan han kan sikre sine data yderligere. Jeg håber at du kan hjælpe ham med det!",
        choices: [
            { text: "Han skal aktivere to-faktor-godkendelse (2FA) via en app, som fx Google Authenticator, Microsoft Authenticator", correct: true },
            { text: "Han skal bare skrive sin kode til alle sine venner på Instagram, så kan de hjælpe ham med at huske den", correct: false },
            { text: "Han er da for sej til at beskytte sine data og behøver ikke mere hjælp!", correct: false },
            { text: "Han kan hænge koden på køleskabet, så glemmer han den i hvert fald aldrig!", correct: false }
        ]
    }
];

let currentSlide = 0;
let currentIndex = 0;
let userChoices = [];

function renderScenario() {
    const container = document.getElementById("scenario");
    const choiceContainer = document.getElementById("choices");

    if (currentIndex >= scenarios.length) {
        document.getElementById("summary").classList.remove("hidden");
        const summary = document.getElementById("choice-summary");
        summary.innerHTML = "";

        userChoices.forEach((choice, index) => {
            const li = document.createElement("li");
            li.textContent = `${scenarios[index].question} → Du svarede: "${choice.text}" (${choice.correct ? "Rigtigt" : "Forkert"})`;
            li.classList.add(choice.correct ? "correct" : "incorrect");
            summary.appendChild(li);
        });

        determineEnding();
        return;
    }

    const scenario = scenarios[currentIndex];
    container.innerHTML = `<h2>${scenario.question}</h2>`;
    choiceContainer.innerHTML = "";

    scenario.choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.addEventListener("click", () => {
            userChoices.push(choice);
            currentIndex++;
            renderScenario();
        });
        choiceContainer.appendChild(btn);
    });
}

function determineEnding() {
    let correctAnswers = userChoices.filter(choice => choice.correct).length;

    let endingMessage = "";
    let retryButton = "";

    document.getElementById("scenario").classList.add("hidden");
    document.getElementById("choices").classList.add("hidden");

    const summaryContainer = document.getElementById("summary");
    summaryContainer.innerHTML = "<h2>Opsummering af dine valg</h2>";

    if (correctAnswers === scenarios.length) {
        endingMessage = "Fantastisk! Kim Allan har nu lært at lave et stærkt password og er beskyttet mod Hacker Ole! Du kan prøve spillet igen for sjov, hvis du vil.";
        retryButton = `<button id="retry-btn">Prøv igen (for sjov)</button>`;
    } else if (correctAnswers >= scenarios.length - 1) {
        endingMessage = "Næsten der! Kim Allan har gjort nogle gode valg, men der er stadig plads til forbedringer!";
        retryButton = `<button id="retry-btn">Prøv igen</button>`;
    } else {
        endingMessage = "Kim Allan er stadig i fare! Han har ikke valgt de bedste muligheder. Husk at vælge stærke passwords og sikre metoder!";
        retryButton = `<button id="retry-btn">Prøv igen</button>`;
    }

    summaryContainer.innerHTML += `<p class="ending-message">${endingMessage}</p>`;
    summaryContainer.innerHTML += `<ul id="choice-summary"></ul>`;

    const summaryList = document.getElementById("choice-summary");
    userChoices.forEach((choice, index) => {
        const li = document.createElement("li");
        li.textContent = `${scenarios[index].question} → Du svarede: "${choice.text}" (${choice.correct ? "Rigtigt" : "Forkert"})`;
        li.classList.add(choice.correct ? "correct" : "incorrect");
        summaryList.appendChild(li);
    });

    summaryContainer.innerHTML += retryButton;
    document.getElementById("retry-btn").addEventListener("click", () => {
        resetGame();
    });
}

function resetGame() {
    userChoices = [];
    currentIndex = 0;

    document.getElementById("summary").classList.add("hidden");
    document.getElementById("scenario").classList.remove("hidden");
    document.getElementById("choices").classList.remove("hidden");

    renderScenario();
}

document.getElementById("start-slides-btn").addEventListener("click", () => {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("slides").classList.remove("hidden");
    showSlide();
});

document.getElementById("next-slide-btn").addEventListener("click", () => {
    currentSlide++;
    if (currentSlide < slides.length) {
        showSlide();
    } else {
        document.getElementById("slides").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
        renderScenario();
    }
});

document.getElementById("prev-slide-btn").addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < slides.length) {
        showSlide();
    }
});

function showSlide() {
    document.getElementById("slide-content").innerHTML = slides[currentSlide];

    const prevBtn = document.getElementById("prev-slide-btn");
    prevBtn.style.display = currentSlide === 0 ? "none" : "inline-block";
}
