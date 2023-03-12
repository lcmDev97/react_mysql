export default function(state = {}, action) {
    //switch문법 사용하는 이유: 다른 타입명이 올떄마다 그에 맞는 조취를 취해야하기떄문.
    switch(action.type) { //action객체를 통해 값 전달 받음.
        case "LOGIN_USER":
            return {...state, loginSuccess: action.payload} // {...state}는 복사한거.
        case "REGISTER_USER":
            return {...state, registerSuccess: action.payload} 
        case "AUTH_USER":
            return {...state, userData: action.payload} 
        default:
            return state
    }
}