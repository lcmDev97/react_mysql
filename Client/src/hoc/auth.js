import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
    // const navigate = useNavigate()
    const dispatch = useDispatch() //2. 일로 옮김
    function AuthenticationCheck(props) {
        //1. 원래 useDispatch위치 여기있었는데
        useEffect(()=>{
            
            dispatch(auth())
            .then(response => {
                if(!response.type || response.type !== "AUTH_USER"){
                    alert('로그인하고 사용하세요')
                    // navigate('/login')
                } else{
                    if(adminRoute && !response.nickname === "admin"){
                        alert('어드민만 사용 가능합니다.')
                        // navigate('/') 
                    } else{
                        if(option === false) {
                            alert('로그인한 유저는 사용 불가능합니다.')
                        // navigate('/')
                        }
                    }
                }
                
            })

        }, [])

        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}