import { 
    createStore,
    combineReducers
} from "redux";
import {
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { statCategory } from './state/reducers/StateCategoryReducer';

const reducers = {
    statCategory
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(persistedReducer);