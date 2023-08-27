import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // AsyncStorage for React Native import storage from 'redux-persist/lib/storage/session';
import userReducer from '@/reducers/userReducer';
import intlReducer from '@/reducers/intlReducer';
import initAppDataReducer from '@/reducers/initAppDataReducer';
// import { saveAccessTokenToLocalStorage, localStorageMiddleware } from '@/actions/userActions';

// Cấu hình cho redux-persist
const persistConfig = {
    key: 'root', // Tên của storage key
    storage, // Loại storage (localStorage, sessionStorage, hoặc AsyncStorage)
    // blacklist: ['appData'],
};

const rootReducer = combineReducers({
    user: userReducer,
    language: intlReducer,
    appData: initAppDataReducer,
});

// Tạo reducer đã được cấu hình để lưu trữ dữ liệu
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Thêm các middleware và khởi tạo Redux store
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Khởi tạo PersistGate để khôi phục dữ liệu
const persistor = persistStore(store);

export { store, persistor };
