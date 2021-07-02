import { 
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from 'redux-thunk';
import {
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { statCategory } from './state/reducers/StateCategoryReducer';
import { players } from "./state/reducers/PlayerReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = {
    statCategory,
    players
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));