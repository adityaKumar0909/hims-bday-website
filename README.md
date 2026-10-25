# Happy Birthday, Cheeku

A little React site (Vite + Tailwind + Motion) made as a birthday surprise.

## The flow

1. **Password** - caution tape + heart padlock. Unlocking rips the tape off.
2. **Cake** - a cat holds a cake in a dark room. The site asks for the microphone; when she blows on it the candles go out, the lights come on and your song plays.
3. **Newspaper** - pink newsprint with a spot for her photo.
4. **Hug** - two stick figures walk in from opposite sides, meet and hug. Their faces are empty ovals for your photos. The love letter appears afterwards.
5. **Memory wall** - 12 polaroids (tap one to enlarge).
6. **Quiz** - 5 questions, ₹200 each, answer order shuffled. Winning reveals the Amazon coupon.

Preview any scene directly: `http://localhost:5173/?scene=cake` (password, cake, newspaper, hug, wall, quiz).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs the finished site to /dist
```

## Add your own stuff (nothing to code)

Drop files into `public/` with these names (.jpg / .png / .webp all work):

| File | Where it shows up |
| --- | --- |
| `public/photos/newspaper.jpg` | her photo in the newspaper |
| `public/photos/her-face.png` | oval face of the girl stick figure |
| `public/photos/his-face.png` | oval face of the boy stick figure |
| `public/photos/memories/01.jpg` ... `12.jpg` | the 12 memory-wall photos |
| `public/audio/happy-birthday.mp3` | your singing, played when the candles go out |

Until a file exists, a neat empty slot is shown (and a beep melody replaces the song).

## Edit the words, password, quiz and coupon

Everything is in **`src/config.js`**: passwords, hint, letter, wall captions, quiz questions, prize amount and the **coupon code (replace the placeholder with the real Amazon code!)**.

## Put it online (the microphone needs HTTPS)

Browsers only allow microphone access on `https://` sites or `localhost`. Easiest: run `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop (or use Vercel / GitHub Pages). Opening the files straight from your computer or over plain `http://` on your phone will not work for the mic. The "Tap here" fallback button still works everywhere.

Note: the password and coupon live in the page's JavaScript, so this is a surprise, not a vault.
