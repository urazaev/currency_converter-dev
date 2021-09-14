// js

const leftEle = document.querySelector('.app__column:first-child');
const rightEle = document.querySelector('.app__column:last-child');

const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    nodeB.parentNode.insertBefore(nodeA, nodeB);
    parentA.insertBefore(nodeB, siblingA);
};

const state = {
    masterCurrency: {
        name: null,
        rate: null,
        dom: null,
    },
    slaveCurrency: {
        name: null,
        rate: null,
        dom: null,
    },
    api: {
        key: 'qewqeqw',
        url: 'sdasdasd',
        prefix: '123123',
        postfix: 'sadasdad13',
    }
};

class CurrencyItem {

    constructor(domElement, currentCurrencyName, state, currencyStorageLink, pairStorageLink) {
        this.state = state;
        this.currencyStorageLink = currencyStorageLink;
        this.domElement = this.state[currencyStorageLink].dom = domElement;
        this.currentCurrencyName = this.state[currencyStorageLink].name = currentCurrencyName;
        this.pairStorageLink = pairStorageLink;
        this.setHandlers();
    };

    renderInformationText = () => {

        const pairText = this.state[this.pairStorageLink].dom.querySelector('.app__input-info');
        const currentText = this.domElement.querySelector('.app__input-info');

        if (currentText && pairText) {
            //todo: need to real divide first currency  to second or i should use apis providet data?

            currentText.innerHTML = `1 ${this.state[this.currencyStorageLink].name} = XXX ${this.state[this.pairStorageLink].name}`;
            pairText.innerHTML = `1 ${this.state[this.pairStorageLink].name} = XXX ${this.state[this.currencyStorageLink].name}`;
        }
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
            evt.target.innerText ? this.state[this.currencyStorageLink].name = evt.target.innerText : null;

        } else if (evt.target.tagName === 'SELECT' && evt.type === 'change') {

            removeButtonsActiveStyle();
            evt.target.classList.add('app__select--active');
            evt.target.value ? this.state[this.currencyStorageLink].name = evt.target.value : null;

        }

        this.renderInformationText(this.currentCurrencyName);

        console.log(state);

    };

    inputHandler = () => {
        const pairInput = this.state[this.pairStorageLink].dom.querySelector('.app__input');
        const currentInput = this.domElement.querySelector('.app__input');
        pairInput && currentInput ? pairInput.value = Number(currentInput.value * this.state[this.currencyStorageLink].rate).toFixed(2) : null;
    };

    setHandlers = () => {
        this.domElement.addEventListener('click', (evt) => this.switchHandler(evt));
        this.domElement.querySelector('select').addEventListener('change', (evt) => this.switchHandler(evt));
        this.domElement.querySelector('.app__input').addEventListener('input', (evt => this.inputHandler(evt)))
    };

}

fetchData = (rate) => {
// Todo: main and slave currency update layer
};

document.querySelector('.app__switch').addEventListener('click', () => swap(leftEle, rightEle));

const leftSlot = new CurrencyItem(leftEle, 'RUB', state, 'masterCurrency', 'slaveCurrency');
const rightSlot = new CurrencyItem(rightEle, 'USD', state, 'slaveCurrency', 'masterCurrency');
