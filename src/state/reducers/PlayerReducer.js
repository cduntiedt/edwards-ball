import {
    GET_PLAYERS
} from '../actions/PlayerAction';

const initialState = { data: [] };

export const players = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_PLAYERS:
            return {
                ...state,
                data: payload
            };
        default:
            return state;
    }
}