/* ==========================================================================
   EVERYTHING YOU MIGHT WANT TO EDIT LIVES IN THIS FILE
   ========================================================================== */

export const config = {
  herName: 'Cheeku',

  /* ---------- Password screen ---------- */
  // Anything she types is lower-cased and stripped of spaces / slashes / dashes
  // before checking. If the result CONTAINS any of these, the site unlocks.
  passwords: ['05/02/2023','2730','3027','2710','5feb', 'cheeku'],
  hint: 'Think of the date we made it official. Try DD/MM/YYYY.',

  /* ---------- Photos (files live in /public/photos) ---------- */
  photos: {
    newspaper: 'photos/newspaper',
    herFace: 'photos/her-face',
    hisFace: 'photos/his-face',
  },

  /* ---------- Birthday song (file lives in /public/audio) ---------- */
  song: 'audio/happy-birthday.mp3',

  /* ---------- Newspaper ---------- */
  newspaper: {
    // Leave null to use today's date
    dateLabel: null,
    photoCaption: 'Cheeku, photographed being unfairly cute.',
  },

  /* ---------- Letter shown after the hug ---------- */
  letter: {
    greeting: 'To my dearest Cheeku bandarrrr,',
    paragraphs: [
      'Happy birthday to my most favorite person in the whole world!',
      "All this could seem like a little cringy now that you are all grown up but yaaawrrrr it's all your fault - your sweetness, your warmth , your cuteness , your charm that made me fall for you and do all this stuff that I once frowned upon. Your existence made my world a garden full of flowers and butterflies and bees and lushy grasses.",
      'This day marks the birthday of my most cherished person , The person who held me up during some of my most low moments. Our distance is annoying and I hate it but you make it feel small somehow. We only met thrice but I remember everything .. The way you hugged me at the end every single time .. And the last time when you looked straight into my eyes and I went all blush-y and shy usually its the other way around. I still think about it a lot ... Oye..Dont stop doing it *wink wink*  I like it . I hope this year brings you everything you deserve ( which is basically everything ) ...Today is all about celebrating you ...',
    ],
    signOff: 'Forever and always yours',
  },

  /* ---------- Memory wall: exactly 12 photos ---------- */
  // Photo files: /public/photos/memories/01.jpg ... 12.jpg
  memories: [
    { title: 'The first spark', note: 'One DP , One DM , one lifetime of memories' },
    { title: 'Our first date', note: 'Nervous giggles, and realizing how cute you truly are.' },
    { title: 'Your backup plan', note: 'If things wont work out , you got a plan' },
    { title: '6th January End-Sem Exam', note: 'The day We realized how much we rely on each other.' },
    { title: 'Nakhre and Ladaiya', note: 'I mess up but I will always try to make it right' },
    { title: 'The Great Pretend', note: 'We are just frenz ...' },
    { title: 'Abacus Prodigy', note: 'Abacus champ , that explains how shes 10 move ahead of me always' },
    { title: 'Ikykyk', note: 'We both know what is this 👉👈' },
    { title: 'Small romantic gestures', note: 'Is this for me or Sid from SOTY?' },
    { title: 'Those eyes', note: 'They say a picture is worth a thousand words, but your eyes speak volumes.' },
    { title: 'Making it official', note: "I asked a question , You gave me FOREVER" },
    { title: 'Happy birthday, Cheeku', note: 'The Greek Goddess figure I am hinged to' },
  ],

  /* ---------- Quiz + coupon ---------- */
  prizePerCorrect: 200, // rupees
  coupon: {
    code: '6001220431350202', // <-- put the REAL Myntra code here
    value: 1000,
    note: 'Redeemable directly on your Myntra app!',
  },
  quiz: [
    {
      question: "What is Cheeku's absolute ultimate superpower?",
      options: [
        { text: 'Looking insanely cute 24/7 without trying', correct: true },
        { text: 'Sleeping for 14 hours straight till afternoon', hint: 'While she loves her rest ... her cuteness is truly unbeatable!' },
        { text: 'Winning arguments instantly - "Itni dikkat hain mere se toh ...', hint: "That's a close second ... but her daily cuteness takes the crown!" },
      ],
    },
    {
      question: 'Who loves Cheeku the most in the entire universe?',
      options: [
        { text: 'Her boyfriend (10000% confirmed)', correct: true },
        { text: 'Her cute plushy penguin', hint: 'Nope! Her boyfriend loves her way more than any plushy ever could!' },
        { text: 'The Peri Peri Whopper', hint: 'Nice try, but her boyfriend takes the #1 spot forever!' },
      ],
    },
    {
      question: 'What happens when Cheeku gives her angry face?',
      options: [
        { text: 'It fails because she still looks super adorable', correct: true },
        { text: 'Everyone runs away scared', hint: "She's far too cute to be scary hehehe" },
        { text: 'It causes a small storm', hint: 'The only storm it causes is a storm of butterflies in my stomach *wink wink*' },
      ],
    },
    {
      question: 'What is our favorite thing to do together?',
      options: [
        { text: 'Laugh, eat good food, and make memories', correct: true },
        { text: 'Argue over who loves whom more', hint: 'We do that a lot, but having fun and eating together wins!' },
        { text: 'Annoy each other continuously', hint: 'Very close! But enjoying sweet moments and food is the ultimate answer!' },
      ],
    },
    {
      question: 'What is the grand reward for completing this quiz?',
      options: [
        { text: 'A ₹1000 Myntra Voucher + Infinite Kisses', correct: true },
        { text: 'Just a high five', hint: 'Come on! You deserve way more than just a high five!' },
        { text: 'A bag of chips', hint: 'Nope, aim higher! Check the prize wallet!' },
      ],
    },
  ],
}
