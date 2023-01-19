const buttons = document.getElementsByClassName("changeBack-btn");
for (let a = 0; a < buttons.length; a++) {
  buttons[a].onclick = (blabla) => {
    document.body.style.background = blabla.target.innerText;
  };
}
