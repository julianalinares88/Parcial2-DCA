import { appState, dispatch } from "../../store/store";
import { Actions } from '../../types/store';
import { addToCart } from "../../store/actions"

export enum Attribute {
    'uid' = 'uid',
    'image' = 'image',
    'description' = 'description',
    'category' = 'category',
    'price' = 'price',
    'rating' = 'rating',
}

class Form extends HTMLElement {
    uid?: number;
    image?: string;
    description?: string;
    category?: string;
    price?: number;
    rating?: number;


   
    //En este caso, se observan los atributos definidos en el enum Attribute (uid, image, etc.)
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
        if (propName === Attribute.price || propName === Attribute.rating ||  propName === Attribute.uid) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;
    
        this.shadowRoot.innerHTML = `

        
            <div class="Form-card">
            <p>Tittle</p>
            <input type="text">
            </div>
        `;
    

    }
    
    
}


customElements.define('form-component', Form);
export default Form;