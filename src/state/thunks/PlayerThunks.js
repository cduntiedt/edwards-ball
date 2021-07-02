import PlayerService from "../../services/PlayerService";
import {
    getPlayers
} from '../actions/PlayerAction';

export const loadPlayers = () => async (dispatch, getState) => {
    try{
        let playerService = new PlayerService();
        dispatch(getPlayers(playerService.getPlayers()));
    } catch (e) {
        console.log(e);
    }
}