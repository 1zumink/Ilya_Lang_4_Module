//все скрипты для всех html-страниц

burgerMenu()

function burgerMenu() {
  var burger = document.querySelector('#burger')

  burger.onclick = function () {
    burger.classList.toggle('active')
  }
}
