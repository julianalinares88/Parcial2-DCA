import { appState, dispatch } from "../../store/store";
import { Actions } from '../../types/store';
import { removeFromCart } from "../../store/actions"

export enum Attribute {
    'uid' = 'uid',
    'ptitle' = 'ptitle',
    'image' = 'image',
    'description' = 'description',
    'category' = 'category',
    'price' = 'price',
    'rating' = 'rating',
}

class Product extends HTMLElement {
    uid?: number;
    ptitle?: string;
    image?: string;
    description?: string;
    category?: string;
    price?: number;
    rating?: number;


   
    //En este caso, se observan los atributos definidos en el enum Attribute (uid, image, etc.)
    static get observedAttributes() {

        const attrs: Record<Attribute, null> = {
			uid: null,
            ptitle: null,
            image: null,
            description: null,
            category: null,
            price: null,
            rating: null,
		}
		return Object.keys(attrs)
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    


    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.price:
				this.price = newValue ? Number(newValue) : undefined;
				break;
            
                case Attribute.rating:
                    this.rating = newValue ? Number(newValue) : undefined;
                    break;


			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

    render() {
        if (!this.shadowRoot) return;
    
        this.shadowRoot.innerHTML = `

        
            <div class="product-card">
                <h3>Category: ${this.ptitle || ''}</h3>
                <img src="${this.image || ''}" alt="Product Image">
                <h2>${this.description || ''}</h2>
                <p>Category: ${this.category || ''}</p>
                <p>Price: $${this.price || ''}</p>
                <p>Rating: ${this.rating || ''}</p>
                <button>Delete Product</button>
            </div>
        `;
        const deleteButton = this.shadowRoot?.querySelector('.delete-product')
		const checkButton = this.shadowRoot?.querySelector('.check-prodcut')
		deleteButton?.addEventListener('click', () => {
			console.log("click", this.uid);

			dispatch(removeFromCart(this.uid!))
		})
    }
    
    
}


customElements.define('product-component', Product);
export default Product;