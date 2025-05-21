const baseWord = "синхофазатрон";
const maxWords = 10;
let usedWords = [];
let totalScore = 0;

const form = document.getElementById("wordForm");
const wordInput = document.getElementById("wordInput");
const messages = document.getElementById("messages");
const wordList = document.getElementById("wordList");
const totalScoreSpan = document.getElementById("totalScore");

function canFormWord(word) {
  let baseLetters = baseWord.split('');
  for (let letter of word) {
    let index = baseLetters.indexOf(letter);
    if (index === -1) return false; // letter not found or used up
    baseLetters.splice(index, 1);
  }
  return true;
}

function updateUI() {
  wordList.innerHTML = "";
  usedWords.forEach(w => {
    const li = document.createElement("li");
    li.textContent = w;
    wordList.appendChild(li);
  });
  totalScoreSpan.textContent = totalScore;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  messages.textContent = "";

  let word = wordInput.value.toLowerCase().trim();
  if (word.length === 0) {
    messages.textContent = "Please enter a word.";
    return;
  }

  if (usedWords.length >= maxWords) {
    messages.textContent = "You have already created 10 words!";
    return;
  }

  if (!canFormWord(word)) {
    messages.textContent = "Word cannot be formed from the base word!";
    return;
  }

  if (usedWords.includes(word)) {
    messages.textContent = "Word already used!";
    return;
  }

  usedWords.push(word);
  totalScore += word.length;
  updateUI();

  if (usedWords.length === maxWords) {
    alert(`Game over! Your total score is ${totalScore}`);
  }

  wordInput.value = "";
  wordInput.focus();
});
