import { addObserver, appState, dispatch } from "../store/store";
import Product, { Attribute as ProductAttribute } from "../components/ProductItem/productItem";
import ShoppingCartItem, { Attribute as ShoppingCartItemAttribute } from "../components/ProductList/productList";
import { getProductsState } from "../store/actions";

class Dashboard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // cuando appState cambia, el componente será notificado
        addObserver(this);
    }

    async connectedCallback() {
        console.log('Dashboard connected');

        // Si no hay productos en el estado, realiza el fetch y despacha la acción
        if (!appState.products || appState.products.length === 0) {
            const action = await getProductsState();
            // dispatch(action) para actualizar el estado global con los nuevos productos.
            dispatch(action);
            console.log('Products state after fetch:', appState.products);
        } else {
            console.log('Products already loaded:', appState.products);
        }
        //actualizar el contenido del componente una vez que los productos están disponibles.
        this.render();
    }


    fetchProducts() {
        // verifico si appState.products existe y tiene productos. Si no es retorno null y no muestro nada
        try {
            if (!appState.products || appState.products.length === 0) {
                console.log('No products available in the state.');
                return null;
            }

            const container = this.ownerDocument.createElement('section');
            container.className = 'products-container';
            //pasamos los atributos para que los muestre
            appState.products.forEach((product: any) => {
                const productItem = this.ownerDocument.createElement('product-component') as Product;
                productItem.setAttribute(ProductAttribute.uid, product.id.toString());
                productItem.setAttribute(ProductAttribute.image, product.image);
                productItem.setAttribute(ProductAttribute.description, product.title);
                productItem.setAttribute(ProductAttribute.category, product.category);
                productItem.setAttribute(ProductAttribute.price, product.price.toString());
                productItem.setAttribute(ProductAttribute.rating, product.rating.rate.toString());

                container.appendChild(productItem);
            });

            console.log('Products rendered:', appState.products);
            return container;
        } catch (error) {
            console.error("Error rendering products:", error);
            return null;
        }
    }

    
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            
            
            `; // Limpia el shadow DOM

            // Título para la lista de productos
            const productsTitle = this.ownerDocument.createElement('h2');
            productsTitle.textContent = 'Product List';
            this.shadowRoot.appendChild(productsTitle);

            // Renderiza la lista de productos
            const productsContainer = this.fetchProducts();
            if (productsContainer) {
                this.shadowRoot.appendChild(productsContainer);
            } else {
                this.shadowRoot.innerHTML += `<p>no encontre los productos :( </p>`;
            }

            

            
        }
    }
}

customElements.define('app-dashboard', Dashboard);