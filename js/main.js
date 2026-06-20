// The Science of Learning - shared site logic

const BOOK_TITLE = "The Science of Learning i praktiken";
const BOOK_SHORT_TITLE = "SoL";

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
  button.setAttribute(
    "aria-label",
    isLight ? "Byt till mörkt tema" : "Byt till ljust tema",
  );
  button.title = isLight ? "Byt till mörkt tema" : "Byt till ljust tema";
  button.innerHTML = isLight
    ? '<span aria-hidden="true">☀</span><span class="theme-toggle-text">Ljust</span>'
    : '<span aria-hidden="true">☾</span><span class="theme-toggle-text">Mörkt</span>';
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

    link.innerHTML = `<span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span><span class="chapter-title">${chapter.title}</span>`;

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

  link.innerHTML = `<span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span><span class="chapter-title">${chapter.title}</span>`;

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
        <h1>Kapitel ${chapter.number}: ${chapter.title}</h1>
        `;
  }

  const content = document.querySelector("#chapter-content");
  if (content) {
    content.innerHTML = chapter.contentHtml || "";
  }

  const summary = document.querySelector("#chapter-summary");
  if (summary) {
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

  renderChapterToc();

  setupChapterQuizInteractions(chapter);

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
                        <div class="nav-title">${prevChapter.title}</div>
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
                        <div class="nav-title">${nextChapter.title}</div>
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
