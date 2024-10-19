import * as components from './components/indexPadre';
import './screens/dashboard';
import { addObserver } from './store/store';
import { appState } from './store/store';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
        console.log(appState)
    }

    render() {
        if (this.shadowRoot) this.shadowRoot.innerHTML = '';

        switch (appState.screen) {
            case 'DASHBOARD':
                const dashboard = document.createElement('app-dashboard');
                this.shadowRoot?.appendChild(dashboard);
                break;
            
            default:
                console.log('Not found');
                break;
        }
    }
}

customElements.define('app-container', AppContainer);
