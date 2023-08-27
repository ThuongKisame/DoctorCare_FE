import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import GlobalStyles from './components/GlobalStyle';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store'; // Import Redux store and persistor
import IntlLanguageWrapper from '@/components/common/IntlLanguageWrapper';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const title = process.env.REACT_APP_TITLE;

function Index() {
    return (
        <React.StrictMode>
            <GlobalStyles>
                <Provider store={store}>
                    <IntlLanguageWrapper>
                        <PersistGate loading={null} persistor={persistor}>
                            <App />
                        </PersistGate>
                    </IntlLanguageWrapper>
                    <ToastContainer />
                </Provider>
            </GlobalStyles>
        </React.StrictMode>
    );
}

root.render(<Index />);
document.title = title;

reportWebVitals();
