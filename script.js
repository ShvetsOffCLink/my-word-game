const letters = document.querySelectorAll('.letter');
const dropSlots = document.querySelectorAll('.drop-slot');

letters.forEach(letter => {
  letter.addEventListener('dragstart', dragStart);
});

dropSlots.forEach(slot => {
  slot.addEventListener('dragover', dragOver);
  slot.addEventListener('drop', drop);
});

let dragged;

function dragStart(e) {
  dragged = e.target;
  setTimeout(() => {
    e.target.style.display = 'none';
  }, 0);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (e.target.classList.contains('drop-slot') && e.target.textContent === '') {
    e.target.textContent = dragged.textContent;
    e.target.classList.add('filled');
    dragged.remove();
  }
}
