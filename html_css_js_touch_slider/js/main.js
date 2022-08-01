
// Selecting the slider container to manipulate
const slider = document.querySelector('.slider_container'),
// Creating an array out of all the slide dives or selections in the html
  slides = Array.from(document.querySelectorAll('.slide'))

// Creating the global variables 
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationId = 0,
  currentIndex = 0

  slides.forEach((slide,index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())

    // Touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
    
    // Mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
  })

  // Disable context menu
  window.oncontextmenu = function(event) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  function touchStart(index) {
    return function(event){
      currentIndex = index
      startPos = getPositionX(event)
      isDragging = true

      // https://css-tricks.com/using-requesanimationframe/
      animationId = requestAnimationFrame(animation)
      slider.classList.add('grabbing')
    }
  }

  function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationId)

    const movedBy = currentTranslate - prevTranslate

    if(movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

    if(movedBy > 100 && currentIndex >0) currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
  }

  function touchMove(event) {
    if(isDragging) {
      const currentPosition = getPositionX(event)
      currentTranslate = prevTranslate + currentPosition - startPos
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }

  function animation() {
  setSliderPosition()    
  if(isDragging) requestAnimationFrame(animation)
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
  }