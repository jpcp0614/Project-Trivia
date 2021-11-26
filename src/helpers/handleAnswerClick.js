export default function handleAnswerClick(event) {
  const wrongs = document.querySelectorAll('.wrong');
  const correct = document.querySelector('.correct');
  const btnNext = document.querySelector('.btn-next');
  btnNext.removeAttribute('hidden');
  correct.classList.add('correct-answer');
  wrongs.forEach((wrong) => wrong.classList.add('wrong-answer'));
  this.incorrectOrCorrect(event);
}
