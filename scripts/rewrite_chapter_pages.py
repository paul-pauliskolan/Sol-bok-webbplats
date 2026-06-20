from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "chapters"
HTML = """<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="The Science of Learning i praktiken - kapitelvy med dynamiskt innehåll och innehållsförteckning.">
    <title>Kapitel - The Science of Learning i praktiken</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body class="chapter-page">
    <nav class="navbar">
        <a href="../index.html" class="logo">SoL - The Science of Learning i praktiken</a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Öppna kapitelmeny">☰</button>
    </nav>

    <aside class="side-menu" id="side-menu" aria-label="Kapitelmeny">
        <a href="../index.html" class="menu-close" id="menu-close" aria-label="Stäng kapitelmeny">✕</a>
        <h2>Kapitel</h2>
        <nav class="chapter-menu" id="chapters-menu"></nav>
    </aside>

    <main class="container chapter-shell">
        <article class="chapter-main">
            <div class="chapter-header"></div>

            <section id="chapter-content"></section>
            <section id="chapter-summary"></section>

            <div class="chapter-nav"></div>
        </article>

        <aside class="chapter-aside">
            <section class="aside-card">
                <p class="eyebrow">Innehåll</p>
                <h2>Klickbar innehållsförteckning</h2>
                <p>Hoppa direkt till valfri del i kapitlet.</p>
                <nav id="chapter-toc" class="chapter-toc" aria-label="Innehållsförteckning för kapitlet"></nav>
            </section>
        </aside>
    </main>

    <footer class="site-footer site-footer-wide">
        <p><a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">Licens: CC BY-NC-ND 4.0</a> | Paul Belfrage | <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc8fyjjAhtlfX3u6UeVvk6AlF_3-ow0UdZmgP3QtJIn5s7_hw/viewform"
            target="_blank" rel="noopener noreferrer">Kontakt / Återkoppling</a></p>
    </footer>

    <script src="../js/main.js"></script>
    <script>
        const match = window.location.pathname.match(/chapter-(\\d+)\\.html/)
        if (match) {
            const chapterNumber = parseInt(match[1], 10)
            const interval = setInterval(() => {
                if (window.pythonbook && window.pythonbook.getChapter(chapterNumber)) {
                    clearInterval(interval)
                    window.pythonbook.renderChapterPage(chapterNumber)
                }
            }, 100)
        }
    </script>
</body>

</html>
"""

for chapter_number in range(1, 13):
    path = ROOT / f"chapter-{chapter_number}.html"
    path.write_text(HTML, encoding="utf-8")
    print(path.name)
