import {
    SELECT_CATEGORY
} from '../actions/StatCategoryAction';

const initialState = { selected: null };

export const statCategory = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SELECT_CATEGORY:
            return {
                ...state,
                selected: payload
            };
        default:
            return state;
    }
}