//все скрипты для всех html-страниц

burgerMenu()
plansScroll()

function burgerMenu() {
  var burger = document.querySelector('#burger')

  burger.onclick = function () {
    burger.classList.toggle('active')
  }
}

// На адаптиве: раскрываем карточку плана, когда она в середине экрана
function plansScroll() {
  var cards = document.querySelectorAll('.planCard')
  if (!cards.length) {
    return
  }

  var observer = new IntersectionObserver(handlePlanCards, {
    rootMargin: '-45% 0px -45% 0px'
  })

  var i
  for (i = 0; i < cards.length; i++) {
    observer.observe(cards[i])
  }
}

function handlePlanCards(entries) {
  var i
  for (i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('planActive')
    } else {
      entries[i].target.classList.remove('planActive')
    }
  }
}
