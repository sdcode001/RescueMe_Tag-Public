import React  from 'react'
import { Navigate } from 'react-router-dom'


const ProtectiveRoute=({children})=>{
    const currentUser = JSON.parse(localStorage.getItem("rescueme_tag_user"))
    if(!currentUser){
        return <Navigate to='/signup'/>
    }
    return children
}


export default ProtectiveRoute