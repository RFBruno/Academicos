const buttonSearch = document.querySelector('#buttonSearch');
const buttonClose = document.querySelector('#close');
const modal = document.querySelector('#modal');


buttonSearch.addEventListener('click', classToggle);
buttonClose.addEventListener('click',classToggle)


function classToggle(){
    modal.classList.toggle('hide');    
}

