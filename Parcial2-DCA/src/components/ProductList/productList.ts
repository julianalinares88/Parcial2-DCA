import { dispatch } from "../../store/store";
import { removeFromCart } from "../../store/actions"

export enum Attribute {
    'uid' = 'uid',
    'utitle' = 'utitle',
    'price' = 'price',
    'image' = 'image',
}

class ShoppingCartItem extends HTMLElement {
    uid? : string;
    utitle?: string;
    price?: number;
    image?: string;

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.uid) {
            this.uid = newValue; // Actualiza el uid cuando cambie
        } else if (propName === Attribute.price) {
            this.price = newValue ? Number(newValue) : undefined; // Convierte a número si es necesario
        } else {
            this[propName] = newValue;
        }
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
           
           
                <div class="cart-item">
                    <img src="${this.getAttribute('image')}" alt="${this.getAttribute('utitle')}" />
                    <div class="item-info">
                        <h3>${this.getAttribute('utitle')}</h3>
                        <p>$${this.getAttribute('price')}</p>
                    </div>
                    <button class="remove-btn">Remove</button>
                </div>
            `;

            const removeBtn = this.shadowRoot.querySelector('.remove-btn');
            removeBtn?.addEventListener('click', () => {
                const item = {
                    uid: this.uid,
                    utitle: this.utitle,
                    price: this.price,
                    image: this.image,
                };
                console.log('Item details:', item); // Muestra el objeto completo en la consola
                    dispatch(removeFromCart(Number(this.uid))); 
            });
        }
    }
}

customElements.define('cart-component', ShoppingCartItem);
export default ShoppingCartItem;