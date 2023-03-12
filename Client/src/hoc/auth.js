import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
    const dispatch = useDispatch() //2. 일로 옮김
    function AuthenticationCheck(props) {
        //1. 원래 useDispatch위치 여기있었는데
        useEffect(()=>{
            
            dispatch(auth())
            .then(response => {
                console.log(response)
            })

        }, [])

        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}