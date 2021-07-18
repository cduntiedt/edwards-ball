import PlayerService from "../../services/PlayerService";
import {
    getPlayers
} from '../actions/PlayerAction';

export const loadPlayers = () => async (dispatch, getState) => {
    try{
        dispatch(getPlayers(PlayerService.getPlayers()));
    } catch (e) {
        console.log(e);
    }
}