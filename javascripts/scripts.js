//все скрипты для всех html-страниц

burgerMenu()
plansScroll()
caseSlider()

function burgerMenu() {
  let burger = document.querySelector('#burger')

  burger.onclick = function () {
    burger.classList.toggle('active')
  }
}

// На адаптиве: раскрываем карточку плана, когда она в середине экрана
function plansScroll() {
  let cards = document.querySelectorAll('.planCard')
  if (!cards.length) {
    return
  }

  let observer = new IntersectionObserver(handlePlanCards, {
    rootMargin: '-45% 0px -45% 0px'
  })

  let i
  for (i = 0; i < cards.length; i++) {
    observer.observe(cards[i])
  }
}

function handlePlanCards(entries) {
  let i
  for (i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('planActive')
    } else {
      entries[i].target.classList.remove('planActive')
    }
  }
}

// Слайдер кейсов (стрелки вперёд/назад, зацикленный, плюс свайп пальцем)
function caseSlider() {
  let slider = document.querySelector('.slider')
  if (!slider) {
    return
  }

  let viewport = slider.querySelector('.sliderViewport')
  let track = slider.querySelector('.sliderTrack')
  let slides = slider.querySelectorAll('.sliderSlide')
  let prev = slider.querySelector('.sliderPrev')
  let next = slider.querySelector('.sliderNext')
  let index = 0
  let startX = 0
  let currentX = 0
  let isDragging = false

  function update() {
    track.style.transform = 'translateX(-' + index * 100 + '%)'
  }

  prev.onclick = function () {
    index = index > 0 ? index - 1 : slides.length - 1
    update()
  }

  next.onclick = function () {
    index = index < slides.length - 1 ? index + 1 : 0
    update()
  }

  viewport.addEventListener('touchstart', function (event) {
    isDragging = true
    startX = event.touches[0].clientX
    currentX = startX
    track.style.transition = 'none'
  })

  viewport.addEventListener('touchmove', function (event) {
    if (!isDragging) {
      return
    }
    currentX = event.touches[0].clientX
    let deltaPercent = ((currentX - startX) / viewport.clientWidth) * 100
    track.style.transform = 'translateX(' + (-index * 100 + deltaPercent) + '%)'
  })

  viewport.addEventListener('touchend', function () {
    if (!isDragging) {
      return
    }
    isDragging = false
    track.style.transition = 'transform 0.5s ease'

    let deltaX = currentX - startX
    let threshold = viewport.clientWidth * 0.15

    if (deltaX < -threshold && index < slides.length - 1) {
      index = index + 1
    } else if (deltaX > threshold && index > 0) {
      index = index - 1
    }

    update()
  })
}
