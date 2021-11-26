export default function changeDisabledBtn() {
  const allBtns = [...document.querySelectorAll('.answer')];
  allBtns.forEach((btn) => btn.setAttribute('disabled', 'disabled'));
}
