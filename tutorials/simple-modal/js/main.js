// Get the modal element
const modal = document.querySelector('#simple-modal')
// Get the open modal button
const modalBtn = document.querySelector('#modal-btn')
// Get the close button
const closeBtn = document.querySelector('.close-btn')

// Listen for a click (Open button)
modalBtn.addEventListener('click', openModal)
// Listen for click (Close button)
closeBtn.addEventListener('click', closeModal)
// Listen for click outside
window.addEventListener('click', clickOutside)


// Function to open modal
function openModal(){
  modal.style.display = 'block'
}

//Function to close modal
function closeModal(){
  modal.style.display = 'none'
}

// Function to close modal if outside click
function clickOutside(e){
  if(e.target === modal){
    modal.style.display = 'none'
  }
}