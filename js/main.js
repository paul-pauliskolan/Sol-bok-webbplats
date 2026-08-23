// The Science of Learning - shared site logic

const BOOK_TITLE = "The Science of Learning i praktiken";
const BOOK_SHORT_TITLE = "SoL";
const SITE_LAST_UPDATED = "2026-08-10T13:05:00+02:00";

let chaptersData = [];

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  loadChaptersData();
  setupMenuToggle();
  applyBranding();
});

function getSavedTheme() {
  const savedTheme = localStorage.getItem("sol-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("sol-theme", theme);
}

function updateThemeToggle(button, theme) {
  const isLight = theme === "light";
  button.setAttribute("aria-pressed", String(isLight));
  button.dataset.activeTheme = theme;
  button.setAttribute(
    "aria-label",
    isLight ? "Byt till mörkt tema" : "Byt till ljust tema",
  );
  button.title = isLight ? "Byt till mörkt tema" : "Byt till ljust tema";
  button.innerHTML = `
    <span class="theme-toggle-option theme-toggle-dark">Mörkt</span>
    <span class="theme-toggle-option theme-toggle-light">Ljust</span>
  `;
}

function setupThemeToggle() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";

  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);
  updateThemeToggle(button, initialTheme);

  button.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    updateThemeToggle(button, nextTheme);
  });

  const menuToggle = document.getElementById("menu-toggle");
  navbar.insertBefore(button, menuToggle || null);
}

function applyBranding() {
  const navbar = document.querySelector(".navbar");
  if (navbar && !navbar.querySelector(".site-updated")) {
    const updated = document.createElement("time");
    updated.className = "site-updated";
    updated.dateTime = SITE_LAST_UPDATED;
    updated.textContent = "Uppdaterad 10 aug 2026 13:05";
    const themeToggle = navbar.querySelector(".theme-toggle");
    navbar.insertBefore(updated, themeToggle || null);
  }

  const logo = document.querySelector(".navbar .logo");
  if (logo) {
    logo.textContent = "SoL - The Science of Learning i praktiken";
    if (!logo.getAttribute("href")) {
      logo.setAttribute("href", "index.html");
    }
  }

  const homeEyebrow = document.querySelector(".home-page .eyebrow");
  if (homeEyebrow) {
    homeEyebrow.textContent = BOOK_SHORT_TITLE;
  }

  const homeTitle = document.querySelector(".home-page .hero h1");
  if (homeTitle) {
    homeTitle.textContent = BOOK_TITLE;
  }

  const homeSubtitle = document.querySelector(".home-page .subtitle");
  if (homeSubtitle) {
    homeSubtitle.textContent =
      "En kurs och bok om hur lärare kan använda kognitionsvetenskap för att planera, genomföra och följa upp undervisning.";
  }

  const previewHeader = document.querySelector(".preview-header h1");
  if (previewHeader) {
    previewHeader.textContent = `📖 ${BOOK_TITLE}`;
  }

  const chapterHeroEyebrow = document.querySelector(
    ".chapter-page .chapter-hero .eyebrow",
  );
  if (chapterHeroEyebrow) {
    chapterHeroEyebrow.textContent = BOOK_SHORT_TITLE;
  }

  const chapterHomeTitle = document.querySelector(
    ".chapter-page header h1 a, .chapter-page header h1",
  );
  if (chapterHomeTitle) {
    chapterHomeTitle.textContent = `✨ ${BOOK_SHORT_TITLE}`;
  }
}

function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const sideMenu = document.getElementById("side-menu");
  const chapterLinks = document.querySelectorAll(".side-menu .chapter-link");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (sideMenu.classList.contains("active")) {
        closeMenu();
      } else {
        sideMenu.classList.add("active");
        document.body.classList.add("menu-open");
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  chapterLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when clicking overlay on mobile
  document.addEventListener("click", (e) => {
    if (
      sideMenu.classList.contains("active") &&
      !sideMenu.contains(e.target) &&
      !(menuToggle && menuToggle.contains(e.target))
    ) {
      closeMenu();
    }
  });
}

function closeMenu() {
  const sideMenu = document.getElementById("side-menu");
  sideMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
}

function loadChaptersData() {
  const jsonPath = document.body.classList.contains("chapter-page")
    ? "../data/chapters.json"
    : "data/chapters.json";

  fetch(jsonPath)
    .then((response) => response.json())
    .then((data) => {
      chaptersData = data.chapters;
      renderChapterMenu();

      // Render homepage menu if it exists
      const homepageMenu = document.getElementById("chapters-menu-homepage");
      if (homepageMenu) {
        renderChapterMenuFullWidth(homepageMenu);
      }
    })
    .catch((error) => console.error("Error loading chapters:", error));
}

function renderChapterMenu() {
  const menu = document.getElementById("chapters-menu");
  if (!menu) return;

  menu.innerHTML = "";
  chaptersData.forEach((chapter) => {
    const link = document.createElement("a");
    const isChapterPage = document.body.classList.contains("chapter-page");
    link.href = isChapterPage
      ? `chapter-${chapter.number}.html`
      : `chapters/chapter-${chapter.number}.html`;
    link.className = "chapter-link";

    link.innerHTML = `<span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span><span class="chapter-title">${chapter.titleHtml || chapter.title}</span>`;

    menu.appendChild(link);
  });
}

function renderChapterMenuFullWidth(menuElement) {
  menuElement.innerHTML = "";
  chaptersData.forEach((chapter) => {
    menuElement.appendChild(createChapterLink(chapter));
  });
}

function createChapterLink(chapter) {
  const link = document.createElement("a");
  const isChapterPage = document.body.classList.contains("chapter-page");
  link.href = isChapterPage
    ? `chapter-${chapter.number}.html`
    : `chapters/chapter-${chapter.number}.html`;
  link.className = "chapter-link";

  link.innerHTML = `<span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span><span class="chapter-title">${chapter.titleHtml || chapter.title}</span>`;

  return link;
}

function getChapter(chapterNumber) {
  return chaptersData.find((ch) => ch.number === parseInt(chapterNumber));
}

function getPreviousChapter(chapterNumber) {
  const chapter = getChapter(chapterNumber);
  if (!chapter || chapter.number === 1) return null;
  return getChapter(chapter.number - 1);
}

function getNextChapter(chapterNumber) {
  const chapter = getChapter(chapterNumber);
  if (!chapter || chapter.number === chaptersData.length) return null;
  return getChapter(chapter.number + 1);
}

function removeLegacyChapterContent() {
  const chapterMain = document.querySelector(".chapter-page .chapter-main");
  if (!chapterMain) return;

  const allowedSelectors = new Set([
    ".chapter-hero",
    ".chapter-header",
    "#chapter-content",
    "#chapter-summary",
    ".chapter-nav",
  ]);

  Array.from(chapterMain.children).forEach((child) => {
    if (
      child.matches &&
      Array.from(allowedSelectors).some((selector) => child.matches(selector))
    ) {
      return;
    }
    child.remove();
  });
}

function slugifyHeading(text, fallbackIndex) {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return base || `del-${fallbackIndex}`;
}

function renderChapterToc() {
  const toc = document.getElementById("chapter-toc");
  if (!toc) return;

  const content = document.getElementById("chapter-content");
  const summary = document.getElementById("chapter-summary");
  if (!content && !summary) {
    toc.innerHTML =
      '<p class="toc-empty">Innehållsförteckningen kunde inte laddas.</p>';
    return;
  }

  const allHeadings = [];
  if (content) allHeadings.push(...Array.from(content.querySelectorAll("h2")));
  if (summary) allHeadings.push(...Array.from(summary.querySelectorAll("h2")));

  const headings = allHeadings.filter(
    (heading) => heading.textContent.trim().length > 0,
  );

  if (headings.length === 0) {
    toc.innerHTML =
      '<p class="toc-empty">Inga rubriker hittades i kapitlet.</p>';
    return;
  }

  const existingIds = new Set();
  if (content) Array.from(content.querySelectorAll("[id]")).forEach((el) => existingIds.add(el.id));
  if (summary) Array.from(summary.querySelectorAll("[id]")).forEach((el) => existingIds.add(el.id));

  const itemsHtml = headings
    .map((heading, index) => {
      if (!heading.id) {
        const baseId = slugifyHeading(heading.textContent.trim(), index + 1);
        let nextId = baseId;
        let counter = 2;

        while (existingIds.has(nextId)) {
          nextId = `${baseId}-${counter}`;
          counter += 1;
        }

        heading.id = nextId;
        existingIds.add(nextId);
      }

      return `<li><a class="toc-link" href="#${heading.id}">${heading.textContent.trim()}</a></li>`;
    })
    .join("");

  toc.innerHTML = `<ul class="chapter-toc-list">${itemsHtml}</ul>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderChapterQuiz(chapter) {
  if (!chapter.quiz || chapter.quiz.length === 0) {
    return "";
  }

  const quizCards = chapter.quiz
    .map((question, index) => {
      const fieldName = `quiz-question-${index}`;
      const normalizedType = question.type || (Array.isArray(question.options) ? "multiple-choice" : "short-answer");
      const optionList =
        Array.isArray(question.options) && question.options.length > 0
          ? question.options
          : normalizedType === "true-false"
            ? ["Sant", "Falskt"]
            : [];

      const optionsHtml = optionList.length > 0
        ? `<div class="quiz-options">${optionList
            .map(
              (option, optionIndex) => `
                <label class="quiz-option">
                  <input type="radio" name="${fieldName}" value="${optionIndex}">
                  <span>${escapeHtml(option)}</span>
                </label>
              `,
            )
            .join("")}</div>`
        : `
          <label class="quiz-input-label" for="${fieldName}">Skriv ditt svar</label>
          <input
            class="quiz-input"
            type="text"
            id="${fieldName}"
            name="${fieldName}"
            autocomplete="off"
            spellcheck="false"
            placeholder="Skriv ett ord eller en kort fras"
          >
        `;

      return `
        <fieldset class="quiz-card" data-quiz-question data-question-index="${index}">
          <legend class="quiz-question">${index + 1}. ${escapeHtml(question.question)}</legend>
          ${optionsHtml}
        </fieldset>
      `;
    })
    .join("");

  return `
    <section class="content-section chapter-quiz-section">
      <h2>Quiz</h2>
      <p>Besvara alla frågor och klicka sedan på knappen för att se resultatet.</p>
      <form class="chapter-quiz-form" novalidate>
        <div class="quiz-grid">
          ${quizCards}
        </div>
        <div class="quiz-actions">
          <button type="submit" class="quiz-submit">Skicka in svar</button>
          <p class="quiz-status" aria-live="polite"></p>
        </div>
        <div class="quiz-results" hidden></div>
      </form>
    </section>
  `;
}

function renderChapterResources(chapter) {
  if (!chapter.resources || chapter.resources.length === 0) {
    return "";
  }

  const resourcesHtml = chapter.resources
    .map(
      (resource) => `
        <article class="resource-item">
          <h3><a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(resource.title)}</a></h3>
          ${resource.reference ? `<p><strong>Referens:</strong> ${escapeHtml(resource.reference)}</p>` : ""}
        </article>
      `,
    )
    .join("");

  return `
    <section class="content-section chapter-resources-section">
      <h2>Litteratur och stöd</h2>
      <div class="resource-list">
        ${resourcesHtml}
      </div>
    </section>
  `;
}

function normalizeQuizAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getQuizCorrectAnswerText(question) {
  if (question.type === "true-false") {
    return question.correctAnswer ? "Sant" : "Falskt";
  }

  if (Array.isArray(question.options) && typeof question.correctAnswer === "number") {
    return question.options[question.correctAnswer] || "";
  }

  return String(question.correctAnswer ?? "");
}

function setupChapterQuizInteractions(chapter) {
  const form = document.querySelector(".chapter-quiz-form");
  if (!form) return;

  const status = form.querySelector(".quiz-status");
  const results = form.querySelector(".quiz-results");
  const questionCards = Array.from(form.querySelectorAll("[data-quiz-question]"));

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const responses = [];
    let firstMissing = null;

    questionCards.forEach((card, index) => {
      card.classList.remove("quiz-card--missing", "quiz-card--correct", "quiz-card--incorrect");
      const question = chapter.quiz[index];
      const fieldName = `quiz-question-${index}`;
      const field = form.elements.namedItem(fieldName);
      let userAnswer = "";

      if (!field) {
        return;
      }

      if (field instanceof RadioNodeList) {
        userAnswer = field.value;
      } else {
        userAnswer = field.value;
      }

      if (!normalizeQuizAnswer(userAnswer)) {
        card.classList.add("quiz-card--missing");
        if (!firstMissing) {
          firstMissing = field instanceof RadioNodeList ? field[0] : field;
        }
      }

      responses.push({ question, card, fieldName, userAnswer });
    });

    if (firstMissing) {
      if (status) {
        status.textContent = "Besvara alla frågor innan du skickar in.";
      }
      firstMissing.focus();
      return;
    }

    let correctCount = 0;

    const resultCards = responses
      .map(({ question, card, fieldName, userAnswer }, index) => {
        const correctAnswerText = getQuizCorrectAnswerText(question);
        let isCorrect = false;

        if (question.type === "true-false") {
          const expectedValue = question.correctAnswer ? "0" : "1";
          isCorrect = String(userAnswer) === expectedValue;
        } else if (Array.isArray(question.options) && typeof question.correctAnswer === "number") {
          isCorrect = String(userAnswer) === String(question.correctAnswer);
        } else {
          isCorrect = normalizeQuizAnswer(userAnswer) === normalizeQuizAnswer(question.correctAnswer);
        }

        if (isCorrect) {
          correctCount += 1;
          card.classList.add("quiz-card--correct");
        } else {
          card.classList.add("quiz-card--incorrect");
        }

        const userAnswerText = (() => {
          if (question.type === "true-false" && userAnswer !== "") {
            return String(userAnswer) === "0" ? "Sant" : "Falskt";
          }

          if (Array.isArray(question.options) && typeof question.correctAnswer === "number") {
            const optionIndex = Number(userAnswer);
            return question.options[optionIndex] || userAnswer;
          }

          return userAnswer;
        })();

        return `
          <article class="quiz-result-card ${isCorrect ? "quiz-result-card--correct" : "quiz-result-card--incorrect"}">
            <p class="quiz-result-question">${index + 1}. ${escapeHtml(question.question)}</p>
            <p><strong>Ditt svar:</strong> ${escapeHtml(userAnswerText)}</p>
            <p><strong>Rätt svar:</strong> ${escapeHtml(correctAnswerText)}</p>
            ${question.explanation ? `<p class="quiz-result-explanation">${escapeHtml(question.explanation)}</p>` : ""}
          </article>
        `;
      })
      .join("");

    if (status) {
      status.textContent = `Du fick ${correctCount} av ${chapter.quiz.length} rätt.`;
    }

    if (results) {
      results.hidden = false;
      results.innerHTML = `
        <div class="quiz-score">
          <h3>Resultat</h3>
          <p>Du fick ${correctCount} av ${chapter.quiz.length} rätt.</p>
        </div>
        <div class="quiz-results-grid">
          ${resultCards}
        </div>
      `;
    }

    form.querySelectorAll("input, button").forEach((element) => {
      element.disabled = true;
    });
  });
}

function getSelectedExampleFilters(bank, filterName) {
  return Array.from(
    bank.querySelectorAll(`input[name="${filterName}"]:checked`),
  ).map((input) => input.value);
}

function renderTeacherExampleBank(bank, data) {
  const hasMultipleStages = data.stages.length > 1;
  const subjectControls = data.subjects
    .map(
      (subject) => `
        <label class="example-filter-option">
          <input type="checkbox" name="example-subject" value="${escapeHtml(subject.id)}">
          <span>${escapeHtml(subject.label)}</span>
        </label>`,
    )
    .join("");

  const stageControls = data.stages
    .map(
      (stage) => `
        <label class="example-filter-option">
          <input type="checkbox" name="example-stage" value="${escapeHtml(stage.id)}">
          <span>${escapeHtml(stage.label)}</span>
        </label>`,
    )
    .join("");

  const exampleCards = data.examples
    .map(
      (example) => `
        <details class="teacher-example-card" data-example-subject="${escapeHtml(example.subject)}" data-example-stage="${escapeHtml(example.stage)}">
          <summary>
            <span class="teacher-example-tags">
              <span>${escapeHtml(example.subjectLabel)}</span>
              <span>${escapeHtml(example.stageLabel)}</span>
            </span>
            <strong>${escapeHtml(example.title)}</strong>
          </summary>
          <div class="teacher-example-content">
            <p><strong>Lärarproblem:</strong> ${example.teacherProblem}</p>
            <p><strong>Mål:</strong> ${example.goal}</p>
            <div class="teacher-example-curriculum">
              <h3>Kontrollerad styrdokumentskoppling</h3>
              <p><strong>${escapeHtml(example.curriculum.framework)} · ${escapeHtml(example.curriculum.placement)}${example.curriculum.levelCode ? ` · ${escapeHtml(example.curriculum.levelCode)}` : ""}</strong></p>
              <p>${escapeHtml(example.curriculum.alignment)}</p>
              ${example.curriculum.preschoolAlignment ? `<p><strong>Förskoleklass:</strong> ${escapeHtml(example.curriculum.preschoolAlignment)}</p>` : ""}
              <p><a href="${escapeHtml(example.curriculum.sourceUrl)}" target="_blank" rel="noopener noreferrer">Öppna ${escapeHtml(example.curriculum.sourceTitle)} hos Skolverket</a></p>
              ${example.curriculum.additionalSourceUrl ? `<p><a href="${escapeHtml(example.curriculum.additionalSourceUrl)}" target="_blank" rel="noopener noreferrer">Öppna ${escapeHtml(example.curriculum.additionalSourceTitle)}</a></p>` : ""}
            </div>
            <h3>Koppling till kapitel 1–10</h3>
            <ul class="teacher-example-chapter-links">
              ${example.chapterLinks.map((link) => `<li>${link}</li>`).join("")}
            </ul>
            <h3>Lektionsgång</h3>
            <ol>${example.lessonSequence.map((step) => `<li>${step}</li>`).join("")}</ol>
            <p><strong>Kontroll av förståelse (<em>check for understanding</em>):</strong> ${example.check}</p>
            <p><strong>Nästa undervisningsbeslut:</strong> ${example.nextStep}</p>
            <p><strong>Fördröjd kontroll:</strong> ${example.delayedCheck}</p>
          </div>
        </details>`,
    )
    .join("");

  bank.innerHTML = `
    <div class="example-filter-panel" aria-label="Filtrera undervisningsexempel">
      <div class="example-filter-intro">
        <div>
          <p class="eyebrow">Gör ditt urval</p>
          <h3>Välj ett eller flera ämnen på Teknikprogrammet</h3>
          <p>Inga val visar hela banken. Alla exempel är för gymnasiet enligt Gy25.</p>
        </div>
        <button type="button" class="example-filter-reset" disabled>Rensa val</button>
      </div>
      <div class="example-filter-groups">
        <fieldset>
          <legend>Ämne</legend>
          <div class="example-filter-options">${subjectControls}</div>
        </fieldset>
        ${hasMultipleStages ? `<fieldset>
          <legend>Stadium</legend>
          <div class="example-filter-options">${stageControls}</div>
        </fieldset>` : ""}
      </div>
      <p class="example-filter-status" role="status"></p>
    </div>
    <div class="teacher-example-grid">${exampleCards}</div>
    <p class="teacher-example-empty" hidden>Inga exempel matchar urvalet.</p>`;

  const cards = Array.from(bank.querySelectorAll(".teacher-example-card"));
  const status = bank.querySelector(".example-filter-status");
  const resetButton = bank.querySelector(".example-filter-reset");
  const emptyState = bank.querySelector(".teacher-example-empty");

  const applyFilters = () => {
    const selectedSubjects = getSelectedExampleFilters(bank, "example-subject");
    const selectedStages = getSelectedExampleFilters(bank, "example-stage");
    let visibleCount = 0;

    cards.forEach((card) => {
      const subjectMatches =
        selectedSubjects.length === 0 ||
        selectedSubjects.includes(card.dataset.exampleSubject);
      const stageMatches =
        selectedStages.length === 0 ||
        selectedStages.includes(card.dataset.exampleStage);
      const isVisible = subjectMatches && stageMatches;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    const hasSelection = selectedSubjects.length > 0 || selectedStages.length > 0;
    resetButton.disabled = !hasSelection;
    emptyState.hidden = visibleCount !== 0;
    status.textContent = hasSelection
      ? `${visibleCount} av ${cards.length} exempel visas.`
      : `Alla ${cards.length} exempel visas.`;
  };

  bank.addEventListener("change", (event) => {
    if (event.target.matches('input[type="checkbox"]')) applyFilters();
  });

  resetButton.addEventListener("click", () => {
    bank.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    applyFilters();
  });

  applyFilters();
}

function renderSolPlanner(bank, data) {
  bank.innerHTML = `
    <section class="sol-planner" aria-labelledby="sol-planner-title">
      <div class="sol-planner-intro">
        <p class="eyebrow">Pauliskolan · Teknikprogrammet · Gy25</p>
        <h3 id="sol-planner-title">Planera från centralt innehåll</h3>
        <p>Välj i ordningen ämne, nivå och centralt innehåll. Därefter visas ett redaktionellt SoL-förslag med kontrollerade källor.</p>
      </div>
      <div class="sol-planner-selectors">
        <label>
          <span>1. Ämne</span>
          <select id="sol-subject"><option value="">Välj ämne</option></select>
        </label>
        <label>
          <span>2. Nivå</span>
          <select id="sol-level" disabled><option value="">Välj nivå</option></select>
        </label>
        <label>
          <span>3. Centralt innehåll</span>
          <select id="sol-content" disabled><option value="">Välj punkt</option></select>
        </label>
      </div>
      <p class="sol-planner-status" role="status">Börja med att välja ämne.</p>
      <div class="sol-planner-result" aria-live="polite"></div>
    </section>`;

  const subjectSelect = bank.querySelector("#sol-subject");
  const levelSelect = bank.querySelector("#sol-level");
  const contentSelect = bank.querySelector("#sol-content");
  const status = bank.querySelector(".sol-planner-status");
  const result = bank.querySelector(".sol-planner-result");

  data.subjects.forEach((subject) => {
    subjectSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${escapeHtml(subject.id)}">${escapeHtml(subject.name)}</option>`,
    );
  });

  const resetSelect = (select, label) => {
    select.innerHTML = `<option value="">${label}</option>`;
    select.disabled = true;
  };

  subjectSelect.addEventListener("change", () => {
    resetSelect(levelSelect, "Välj nivå");
    resetSelect(contentSelect, "Välj punkt");
    result.innerHTML = "";
    const subject = data.subjects.find((item) => item.id === subjectSelect.value);
    if (!subject) {
      status.textContent = "Börja med att välja ämne.";
      return;
    }
    subject.levels.forEach((level) => {
      levelSelect.insertAdjacentHTML(
        "beforeend",
        `<option value="${escapeHtml(level.id)}">${escapeHtml(level.name)} · ${escapeHtml(level.levelCode)} · ${escapeHtml(level.points)} poäng</option>`,
      );
    });
    levelSelect.disabled = false;
    status.textContent = `Välj nivå i ${subject.name}.`;
  });

  levelSelect.addEventListener("change", () => {
    resetSelect(contentSelect, "Välj punkt");
    result.innerHTML = "";
    const subject = data.subjects.find((item) => item.id === subjectSelect.value);
    const level = subject?.levels.find((item) => item.id === levelSelect.value);
    if (!level) {
      status.textContent = "Välj nivå.";
      return;
    }
    level.centralContent.forEach((item, index) => {
      contentSelect.insertAdjacentHTML(
        "beforeend",
        `<option value="${escapeHtml(item.id)}">${index + 1}. ${escapeHtml(item.area)} – ${escapeHtml(item.text)}</option>`,
      );
    });
    contentSelect.disabled = false;
    status.textContent = `${level.centralContent.length} punkter i centralt innehåll. Välj en punkt.`;
  });

  contentSelect.addEventListener("change", () => {
    const subject = data.subjects.find((item) => item.id === subjectSelect.value);
    const level = subject?.levels.find((item) => item.id === levelSelect.value);
    const item = level?.centralContent.find((entry) => entry.id === contentSelect.value);
    if (!item) {
      result.innerHTML = "";
      status.textContent = "Välj en punkt i centralt innehåll.";
      return;
    }

    const sources = item.sources.length
      ? `<ul class="sol-source-list">${item.sources
          .map(
            (source) => `<li>
              <strong>${escapeHtml(source.type)}:</strong>
              <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>
              <p>${escapeHtml(source.assessment)}</p>
            </li>`,
          )
          .join("")}</ul>`
      : "<p>Ingen tillräckligt nära publicerad lektionsplanering har ännu verifierats för denna punkt. Förslaget är en egen SoL-tillämpning.</p>";

    result.innerHTML = `
      <article class="sol-plan-card">
        <header>
          <p class="eyebrow">${escapeHtml(item.area)}</p>
          <h3>${escapeHtml(item.lesson.title)}</h3>
          <p class="sol-level-meta">${escapeHtml(subject.name)} · ${escapeHtml(level.name)} · ${escapeHtml(level.levelCode)} · ${escapeHtml(level.points)} poäng</p>
        </header>
        <section class="sol-official-content">
          <h4>Skolverkets centrala innehåll</h4>
          <p>${escapeHtml(item.text)}</p>
          <p><a href="${escapeHtml(level.sourceUrl)}" target="_blank" rel="noopener noreferrer">Öppna den officiella ämnesplanen</a></p>
        </section>
        <h4>Förslag på lärandemål</h4>
        <p>${escapeHtml(item.goal)}</p>
        <div class="sol-plan-foundations">
          <section>
            <h4>Nödvändiga förkunskaper</h4>
            <ul>${item.prerequisites.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
          </section>
          <section>
            <h4>Sannolik svårighet</h4>
            <p>${escapeHtml(item.likelyDifficulty)}</p>
          </section>
        </div>
        <h4>Lektionsgång · ${escapeHtml(item.lesson.duration)}</h4>
        <ol>${item.lesson.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        <details class="sol-plan-details">
          <summary>Visa undervisningsdesignen bakom lektionsgången</summary>
          <h4>Modell eller genomarbetat exempel</h4>
          <p>${escapeHtml(item.exampleOrModel)}</p>
          <h4>Guidad övning</h4>
          <p>${escapeHtml(item.guidedPractice)}</p>
          <h4>Självständig övning</h4>
          <p>${escapeHtml(item.independentPractice)}</p>
          <h4>Kontrast eller variation</h4>
          <p>${escapeHtml(item.contrastOrVariation)}</p>
        </details>
        <h4>SoL-metoder</h4>
        <ul class="sol-method-list">${item.solMethods.map((method) => `<li>${escapeHtml(method)}</li>`).join("")}</ul>
        <ul class="sol-rationale-list">${item.methodRationale.map((entry) => `<li><strong>${escapeHtml(entry.method)}:</strong> ${escapeHtml(entry.rationale)}</li>`).join("")}</ul>
        <h4>Kontroll av förståelse</h4>
        <p>${escapeHtml(item.lesson.check)}</p>
        <h4>Nästa undervisningsbeslut</h4>
        <p>${escapeHtml(item.decisionRule)}</p>
        <h4>Fördröjd kontroll</h4>
        <p>${escapeHtml(item.lesson.delayedCheck)}</p>
        <h4>Överföringsuppgift</h4>
        <p>${escapeHtml(item.transferTask)}</p>
        <h4>Kontrollerade inspirationskällor</h4>
        ${sources}
        <h4>Evidensunderlag för SoL-designen</h4>
        <ul class="sol-source-list">${item.evidenceSources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a><p>${escapeHtml(source.role)}</p></li>`).join("")}</ul>
        <p class="sol-editorial-note"><strong>Granskningsstatus:</strong> ${escapeHtml(item.reviewStatus)}. Skolverkets text är officiell; övriga delar behöver ämneslärarens professionella granskning före användning.</p>
      </article>`;
    status.textContent = `Visar SoL-förslag för vald punkt i ${subject.name}, ${level.name}.`;
  });
}

function setupTeacherExampleBank(chapterNumber) {
  if (chapterNumber !== 11) return;
  const bank = document.getElementById("teacher-example-bank");
  if (!bank) return;

  fetch("../data/pauli-sol-planner.json")
    .then((response) => {
      if (!response.ok) throw new Error("Exempelbanken kunde inte hämtas.");
      return response.json();
    })
    .then((data) => renderSolPlanner(bank, data))
    .catch(() => {
      bank.innerHTML =
        '<p class="teacher-example-error">Exempelbanken kunde inte laddas. Försök igen senare.</p>';
    });
}

function renderChapterPage(chapterNumber) {
  const chapter = getChapter(chapterNumber);
  if (!chapter) {
    window.location.href = "/";
    return;
  }

  removeLegacyChapterContent();

  document.title = `${chapter.title} - ${BOOK_TITLE}`;

  const header = document.querySelector(".chapter-header");
  if (header) {
    header.innerHTML = `
        <h1>Kapitel ${chapter.number}: ${chapter.titleHtml || chapter.title}</h1>
        `;
  }

  const content = document.querySelector("#chapter-content");
  if (content) {
    content.innerHTML = chapter.contentHtml || "";
  }

  const summary = document.querySelector("#chapter-summary");
  if (summary) {
    if (chapterNumber === 11) {
      summary.innerHTML = renderChapterResources(chapter);
    } else {
      summary.innerHTML = `
            <div class="content-section">
          <h2>Sammanfattning</h2>
                <p>${chapter.summary}</p>
                <div class="key-topics">
                    ${chapter.keyTopics.map((topic) => `<span>${topic}</span>`).join("")}
                </div>
            </div>
        `;
      summary.insertAdjacentHTML("beforeend", renderChapterQuiz(chapter));
      summary.insertAdjacentHTML("beforeend", renderChapterResources(chapter));
    }
  }

  renderChapterToc();

  if (chapterNumber !== 11) setupChapterQuizInteractions(chapter);
  setupTeacherExampleBank(chapterNumber);

  const navContainer = document.querySelector(".chapter-nav");
  if (navContainer) {
    const prevChapter = getPreviousChapter(chapterNumber);
    const nextChapter = getNextChapter(chapterNumber);

    let html = "";

    if (prevChapter) {
      html += `
                <a href="chapter-${prevChapter.number}.html" class="nav-button">
                    <div>
                        <div class="nav-label">← Föregående</div>
                        <div class="nav-title">${prevChapter.titleHtml || prevChapter.title}</div>
                    </div>
                </a>
            `;
    } else {
      html += `<a href="../index.html" class="nav-button"><div class="nav-label">← Startsida</div></a>`;
    }

    if (nextChapter) {
      html += `
                <a href="chapter-${nextChapter.number}.html" class="nav-button">
                    <div style="text-align: right;">
              <div class="nav-label">Nästa →</div>
                        <div class="nav-title">${nextChapter.titleHtml || nextChapter.title}</div>
                    </div>
                </a>
            `;
    }

    navContainer.innerHTML = html;
  }
}

window.pythonbook = {
  getChapter,
  renderChapterPage,
};

window.teknik2 = window.pythonbook;
