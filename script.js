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
        question: "Kim Allan er på sit livs mission. Han vil gerne lave en ny og totalt Hacker Ole-sikker adgangskode. Hvad bør han vælge?",
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
            { text: "Ingen specialtegn og meget kort", correct: false },
            { text: "Specialtegn, store/små bogstaver, 12-16 tegn, ingen personlige oplysninger", correct: true },
            { text: "Under 4 bogstaver og meget personlig", correct: false },
            { text: "Kun ting fra Kim Allans hverdag", correct: false }
        ]
    },
    {
        question: "Kim Allan er nervøs for at glemme sin nye adgangskode. Hvad skal han gøre?",
        choices: [
            { text: "Brug en passphrase eller forkortet sætning", correct: true },
            { text: "Skriv den på sin Facebook-væg", correct: false },
            { text: "Del den med sine venner på Instagram", correct: false },
            { text: "Hæng den på køleskabet", correct: false }
        ]
    },
    {
        question: "Hvor kan Kim Allan finde eksempler på stærke adgangskoder?",
        choices: [
            { text: "I en password manager som Bitwarden, 1Password eller LastPass", correct: true },
            { text: "Spørge sin farmor Birthe", correct: false },
            { text: "Spørge Hacker Ole", correct: false },
            { text: "I en Facebook-gruppe", correct: false }
        ]
    },
    {
        question: "Hvordan kan Kim Allan beskytte sine data endnu mere?",
        choices: [
            { text: "Aktiver to-faktor-godkendelse (2FA) via en app", correct: true },
            { text: "Del sin kode med venner", correct: false },
            { text: "Han behøver ikke mere hjælp", correct: false },
            { text: "Hæng koden på køleskabet", correct: false }
        ]
    }
];

let currentSlide = 0;
let currentIndex = 0;
let userChoices = [];

function showSlide() {
    document.getElementById("slide-content").innerHTML = slides[currentSlide];
    document.getElementById("prev-slide-btn").style.display = currentSlide === 0 ? "none" : "inline-block";
}

function renderScenario() {
    const container = document.getElementById("scenario");
    const choiceContainer = document.getElementById("choices");

    if (currentIndex >= scenarios.length) {
        showSummary();
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

function showSummary() {
    const summaryContainer = document.getElementById("summary");
    const summaryList = document.getElementById("choice-summary") || document.createElement("ul");
    summaryList.id = "choice-summary";
    const correctAnswers = userChoices.filter(choice => choice.correct).length;

    document.getElementById("scenario").classList.add("hidden");
    document.getElementById("choices").classList.add("hidden");
    summaryContainer.classList.remove("hidden");

    summaryContainer.innerHTML = "<h2>Opsummering af dine valg</h2>";
    summaryList.innerHTML = "";

    userChoices.forEach((choice, index) => {
        const li = document.createElement("li");
        li.textContent = `${scenarios[index].question} → Du svarede: "${choice.text}" (${choice.correct ? "Rigtigt" : "Forkert"})`;
        li.classList.add(choice.correct ? "correct" : "incorrect");
        summaryList.appendChild(li);
    });

    let message = "";
    if (correctAnswers === scenarios.length) {
        message = "Fantastisk! Kim Allan har nu lært at lave et stærkt password og er beskyttet mod Hacker Ole! Du kan prøve spillet igen for sjov.";
    } else if (correctAnswers >= scenarios.length - 1) {
        message = "Kim Allan har taget nogle gode valg, men der er stadig plads til forbedringer!";
    } else {
        message = "Kim Allan er stadig i fare! Husk at vælge stærke passwords og sikre metoder!";
    }

    summaryContainer.innerHTML += `<p class="ending-message">${message}</p>`;
    summaryContainer.appendChild(summaryList);

    const previousResults = JSON.parse(localStorage.getItem("kimQuizResults")) || [];
    const newResult = {
        date: new Date().toLocaleString(),
        correct: correctAnswers,
        total: scenarios.length
    };
    previousResults.push(newResult);
    localStorage.setItem("kimQuizResults", JSON.stringify(previousResults));

    const resultHistory = document.createElement("div");
    resultHistory.innerHTML = "<h3>Dine tidligere resultater</h3>";

    const resultList = document.createElement("ul");
    previousResults.slice(-5).reverse().forEach(result => {
        const li = document.createElement("li");
        li.textContent = `${result.date}: ${result.correct}/${result.total} rigtige`;
        resultList.appendChild(li);
    });

    resultHistory.appendChild(resultList);
    summaryContainer.appendChild(resultHistory);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Slet historik";
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("kimQuizResults");
        resultHistory.remove();
        clearBtn.remove();
    });
    summaryContainer.appendChild(clearBtn);

    const retryBtn = document.createElement("button");
    retryBtn.id = "retry-btn";
    retryBtn.textContent = "Prøv igen";
    retryBtn.addEventListener("click", resetGame);
    summaryContainer.appendChild(retryBtn);
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
    if (currentSlide > 0) {
        currentSlide--;
        showSlide();
    }
});
