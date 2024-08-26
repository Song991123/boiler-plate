import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

const initialState = null; // 초기 상태를 명시적으로 정의합니다.

export default function(state = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess:action.payload}
            break;
        case REGISTER_USER:
            return {...state, register:action.payload}
            break;
        case AUTH_USER:
            return {...state, userData:action.payload}
            break;
        default:
            return state;
    }
}