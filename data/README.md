# Újdonságok kezelése

## Hogyan frissítsem az Újdonságok szekciót?

Az Újdonságok szekció tartalmát két módon frissítheti:

### 1. módszer: script.js szerkesztése (EGYSZERŰ - ajánlott lokális használatra)
Ha a HTML fájlt közvetlenül a számítógépéről nyitja meg böngészőben:
- Nyissa meg a `script.js` fájlt
- Keresse meg a `newsData` objektumot a fájl elején
- Módosítsa a hírek tömbét

### 2. módszer: news.json fájl szerkesztése (webszerveren futtatáshoz)
Ha a weboldalt webszerveren futtatja, használhatja a JSON fájlt is.

## A news.json fájl szerkesztése

### Fájl helye
`data/news.json`

### Formátum

```json
{
  "news": [
    {
      "date": "2024. november 19.",
      "title": "A hír címe",
      "summary": "Rövid összefoglaló a hírről...",
      "link": "news/hir-oldal.html"
    }
  ]
}
```

### Mezők magyarázata

- **date**: A hír dátuma (formátum: "ÉÉÉÉ. hónap nap.")
- **title**: A hír címe
- **summary**: Rövid összefoglaló szöveg, amely a főoldalon jelenik meg
- **link**: Az oldal relatív útvonala a részletes cikkhez
  - Ha a hírnek van részletes oldala, adja meg az útvonalat (pl. `"news/cikk-nev.html"`)
  - Ha nincs részletes oldal, használja: `null`

## Új hír hozzáadása

1. Nyissa meg a `data/news.json` fájlt egy szövegszerkesztőben
2. Adjon hozzá egy új hírt a "news" tömbhöz a következő formátumban:

```json
{
  "date": "2024. december 1.",
  "title": "Új hír címe",
  "summary": "Az új hírről röviden...",
  "link": "news/uj-hir.html"
}
```

3. **Fontos:** Figyeljen a vesszőkre (`,`) az elemek között!
4. Mentse el a fájlt
5. Frissítse a böngészőt - az új hír automatikusan megjelenik

## Példa: Három hír megadása

```json
{
  "news": [
    {
      "date": "2024. december 15.",
      "title": "Első hír",
      "summary": "Ez az első hír rövid összefoglalója...",
      "link": "news/elso-hir.html"
    },
    {
      "date": "2024. december 10.",
      "title": "Második hír",
      "summary": "Ez a második hír rövid összefoglalója...",
      "link": "news/masodik-hir.html"
    },
    {
      "date": "2024. december 5.",
      "title": "Harmadik hír",
      "summary": "Ez a harmadik hír rövid összefoglalója...",
      "link": null
    }
  ]
}
```

## Hír törlése

Egyszerűen távolítsa el a kívánt hír blokkját a JSON fájlból, és mentse el.

## Hír sorrendje

A hírek a JSON fájlban megadott sorrendben jelennek meg (legfrissebb felül ajánlott).

## Hibakeresés

Ha a hírek nem jelennek meg:
1. Ellenőrizze, hogy a JSON szintaxis helyes-e (vesszők, zárójelek)
2. Használjon online JSON validátort: https://jsonlint.com/
3. Nézze meg a böngésző konzolját (F12) az esetleges hibaüzenetekért

## Részletes hír oldal létrehozása

Ha új részletes cikket szeretne hozzáadni:
1. Másolja le egy meglévő cikket a `news/` mappából
2. Nevezze át az új cikknek megfelelően
3. Szerkessze a tartalmat
4. Adja hozzá a hírt a `script.js` fájl `newsData` objektumában vagy a `news.json` fájlban a megfelelő `link` értékkel

## Script.js szerkesztése (Lokális használat)

Ha a HTML fájlt közvetlenül nyitja meg (nem webszerveren):

1. Nyissa meg a `../script.js` fájlt szövegszerkesztőben
2. Keresse meg ezt a részt a fájl elején:

```javascript
const newsData = {
    "news": [
        {
            "date": "2024. november 19.",
            "title": "Hír címe",
            "summary": "Rövid összefoglaló...",
            "link": "news/hir-oldal.html"
        }
    ]
};
```

3. Módosítsa a tömb elemeit ugyanúgy, mint a JSON fájlban
4. Mentse el a fájlt
5. Frissítse a böngészőt - a változások azonnal megjelennek
