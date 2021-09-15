// js

const leftEle = document.querySelector('.app__column:first-child');
const rightEle = document.querySelector('.app__column:last-child');

const APP_SETTINGS = {
    api: {
        key: 'htwHUTR59eXxVyFdrORY8ROI',
        url: 'www1.oanda.com/rates/api/v2/rates/spot.json',
        prefix: 'https://',
        postfix: '',
    }
}

const state = {
    masterCurrency: {
        name: 'RUB',
        rate: null,
        dom: leftEle,
    },
    slaveCurrency: {
        name: 'USD',
        rate: null,
        dom: rightEle,
    },
};

const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    nodeB.parentNode.insertBefore(nodeA, nodeB);
    parentA.insertBefore(nodeB, siblingA);
};

document.querySelector('.app__switch').addEventListener('click', () => swap(leftEle, rightEle));

// rightEle.innerHTML = leftEle.innerHTML;

class CurrencyItem {

    constructor(state, currencyStorageLink, pairStorageLink) {
        this.state = state;

        this.currencyStorageLink = currencyStorageLink;

        this.currentCurrencyName = this.state[currencyStorageLink].name;
        this.currentCurrencyRate = this.state[currencyStorageLink].rate;
        this.currentDomElement = this.state[currencyStorageLink].dom;


        this.pairStorageLink = pairStorageLink;

        this.pairCurrencyName = this.state[pairStorageLink].name;
        this.pairCurrencyRate = this.state[pairStorageLink].rate;
        this.pairDomElement = this.state[pairStorageLink].dom;

        this.fetchData();

        this.setHandlers();
    };

    renderInformationText = () => {

        const pairText = this.pairDomElement.querySelector('.app__input-info');
        const currentText = this.currentDomElement.querySelector('.app__input-info');

        if (currentText && pairText) {
            if (this.currentCurrencyName === this.pairCurrencyName) {
                currentText.innerHTML = `1 ${this.currentCurrencyName} = 1 ${this.pairCurrencyName}`;
                pairText.innerHTML = `1 ${this.pairCurrencyName} = 1 ${this.pairCurrencyName}`;
            }
            currentText.innerHTML = `1 ${this.currentCurrencyName} = ${this.currentCurrencyRate} ${this.pairCurrencyName}`;
            pairText.innerHTML = `1 ${this.pairCurrencyName} = ${this.pairCurrencyRate} ${this.pairCurrencyName}`;
        }
    };

    switchHandler = (evt) => {

        const removeButtonsActiveStyle = (buttons = this.currentDomElement.querySelector('.app__controls')) => {
            buttons.querySelectorAll('button').forEach((el) => {
                el.classList.remove('app__button--active');
            });
        };

        if (evt.target.tagName === 'BUTTON' && evt.target.classList.contains('app__button') && evt.type === 'click') {

            removeButtonsActiveStyle();

            evt.target.classList.add('app__button--active');

            this.currentDomElement.querySelector('select').classList.remove('app__select--active');
            console.log(this.currencyStorageLink);
            evt.target.innerText ? this.state[this.currencyStorageLink].name = evt.target.innerText : null;

        } else if (evt.target.tagName === 'SELECT' && evt.type === 'change') {

            removeButtonsActiveStyle();
            evt.target.classList.add('app__select--active');
            evt.target.value ? this.state[this.currencyStorageLink].name = evt.target.value : null;

        }

        this.renderInformationText();
        this.fetchData();
        console.log(state);

    };

    inputHandler = () => {
        const pairInput = this.state[this.pairStorageLink].dom.querySelector('.app__input');
        const currentInput = this.currentDomElement.querySelector('.app__input');
        pairInput && currentInput ? pairInput.value = Number(currentInput.value * this.state[this.currencyStorageLink].rate).toFixed(2) : null;
    };

    setHandlers = () => {
        this.currentDomElement.querySelectorAll('button').forEach((el) => {
            el.addEventListener('click', (evt) => this.switchHandler(evt))
        });
        this.currentDomElement.querySelector('select').addEventListener('change', (evt) => this.switchHandler(evt));
        this.currentDomElement.querySelector('.app__input').addEventListener('input', (evt => this.inputHandler(evt)));
    };

    fetchData = async (rate) => {
        fetch(`${APP_SETTINGS.api.prefix}${APP_SETTINGS.api.url}?api_key=${APP_SETTINGS.api.key}&base=${this.state[this.currencyStorageLink].name}&quote=${this.state[this.pairStorageLink].name}`)
            .then(response => response.json())
            .then(data => {
                this.state[this.currencyStorageLink].rate = data.quotes[0].midpoint;
                console.log(data.quotes[0].midpoint);
                this.renderInformationText();
                // this.inputHandler()
            });
    };

}

const leftSlot = new CurrencyItem(state, 'masterCurrency', 'slaveCurrency');
const rightSlot = new CurrencyItem(state, 'slaveCurrency', 'masterCurrency');
