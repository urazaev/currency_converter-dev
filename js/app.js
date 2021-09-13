// js
const buttons = document.querySelector('.app__controls');

buttons.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('app__button')) {
        buttons.querySelectorAll('button').forEach((el) => {
            el.classList.remove('app__button--active')
        })
        evt.target.classList.add('app__button--active')
    }

})