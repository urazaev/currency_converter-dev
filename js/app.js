// js
const state = {
    masterCurrency: {
        name: 'RUB',
        rate: 1.2,
        dom: null,
    },
    slaveCurrency: {
        name: 'USD',
        rate: 0.7,
        dom: null,

    }
};

class CurrencyItem {

    constructor(domElement, currentCurrencyName, courseOut, state, link) {
        this.domElement = domElement;
        this.currentCurrencyName = currentCurrencyName;

        this.courseOut = courseOut;

        this.state = state;
        this.currencyStorageLink = link;
        this.setHandlers();
    };

    renderInformationText = (currency) => {
        this.domElement.querySelector('.app__input-info').innerHTML = `1 ${currency} =  ${(this.secondCurrency * this.courseOut).toString()}`;
    };

    switchHandler = (evt) => {

        const removeButtonsActiveStyle = (buttons = this.domElement.querySelector('.app__controls')) => {
            buttons.querySelectorAll('button').forEach((el) => {
                el.classList.remove('app__button--active');
            });
        };

        if (evt.target.tagName === 'BUTTON' && evt.target.classList.contains('app__button') && evt.type === 'click') {

            removeButtonsActiveStyle();

            evt.target.classList.add('app__button--active');

            this.domElement.querySelector('select').classList.remove('app__select--active');
            console.log(this.currencyStorageLink);
            evt.target.innerText ? this.state[this.currencyStorageLink.name] = evt.target.innerText : null;

        } else if (evt.target.tagName === 'SELECT' && evt.type === 'change') {

            removeButtonsActiveStyle();

            evt.target.classList.add('app__select--active');

            evt.target.value ? this.state[this.currencyStorageLink.name] = evt.target.value : null;

        }

        this.renderInformationText(this.currentCurrencyName);

        console.log(state);

    };

    setHandlers = () => {
        this.domElement.addEventListener('click', (evt) => this.switchHandler(evt));
        this.domElement.querySelector('select').addEventListener('change', (evt) => this.switchHandler(evt));
        this.domElement.querySelector('.app__input').addEventListener('input', (evt => this.inputHandler(evt)))
    };

    inputHandler = (evt) => {
        console.log(evt.target.value);
    }

    fetchData = () => {

    }
}

const leftSlot = new CurrencyItem(document.querySelector('.app__column:first-child'), 'RUB', 1.5, state, 'masterCurrency');
const rightSlot = new CurrencyItem(document.querySelector('.app__column:last-child'), 'USD', 0.7, state, 'slaveCurrency');
