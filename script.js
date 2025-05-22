const baseWord = "синхофазатрон";
const maxWords = 10;
let usedWords = [];
let totalScore = 0;
let highScore = localStorage.getItem("highScore") || 0;

const form = document.getElementById("wordForm");
const wordInput = document.getElementById("wordInput");
const messages = document.getElementById("messages");
const wordList = document.getElementById("wordList");
const totalScoreSpan = document.getElementById("totalScore");
const highScoreSpan = document.getElementById("highScore");

// отображаем сохранённый рекорд
highScoreSpan.textContent = highScore;

function canFormWord(word) {
  let baseLetters = baseWord.split('');
  for (let letter of word) {
    let index = baseLetters.indexOf(letter);
    if (index === -1) return false;
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
  highScoreSpan.textContent = highScore;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  messages.textContent = "";

  let word = wordInput.value.toLowerCase().trim();
  if (word.length === 0) {
    messages.textContent = "Введите слово.";
    return;
  }

  if (usedWords.length >= maxWords) {
    messages.textContent = "Вы уже ввели 10 слов!";
    return;
  }

  if (!canFormWord(word)) {
    messages.textContent = "Это слово нельзя составить из букв базового слова!";
    return;
  }

  if (usedWords.includes(word)) {
    messages.textContent = "Слово уже использовано!";
    return;
  }

  usedWords.push(word);
  totalScore += word.length;
  updateUI();

  if (usedWords.length === maxWords) {
    if (totalScore > highScore) {
      highScore = totalScore;
      localStorage.setItem("highScore", highScore);
      alert(`Новый рекорд! 🎉 Вы набрали ${totalScore} очков.`);
    } else {
      alert(`Игра окончена. Ваш счёт: ${totalScore}`);
    }
  }

  wordInput.value = "";
  wordInput.focus();
});
