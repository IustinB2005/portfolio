# iustinbogdan.studio

Personal site: links, project log and resume. Hosted on GitHub Pages.

## Cum adaugi un proiect nou (project log)

1. Pune poza proiectului în `images/` (ideal 800×600, format 4:3, `.jpg`).
2. Deschide `projects.json` și adaugă un bloc nou (oriunde, ordinea e după dată):

```json
{
  "title": "Numele proiectului",
  "date": "2026-12-01",
  "subtitle": "Tehnologii · detalii scurte",
  "image": "images/numele-pozei.jpg",
  "link": "https://github.com/IustinB2005/repo-ul-proiectului",
  "video": "https://www.youtube.com/watch?v=..."
}
```

- `date` e în formatul `AAAA-LL-ZZ`. Cele mai noi 4 proiecte apar pe pagina principală, restul în `archive.html`, grupate pe ani.
- `video` e opțional: dacă îl completezi, cardul primește un buton **▶ Video**.
- Fără poză? Lasă `"image": ""` și pune `"emoji": "🤖"` și `"color": "#3a7bd5,#00d2ff"` (gradient).
- Atenție la virgule: între blocuri pune `,`, după ultimul bloc nu.

3. Commit pe `main` — site-ul se actualizează în 1–2 minute.

Se poate face direct pe github.com: intri pe `projects.json` → iconița ✏️ → editezi → **Commit changes**. Pozele le urci cu **Add file → Upload files** în folderul `images`.

## Fișiere

- `index.html` — pagina principală (link-uri + ultimele 4 proiecte)
- `archive.html` — proiectele mai vechi
- `resume.html` — CV
- `projects.json` — lista de proiecte (singurul fișier de editat pentru log)
- `projects.js`, `style.css` — logica și stilul comune
