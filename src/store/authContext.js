import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer

const AuthContext = createContext({
    token: '', 
    login: () => {},
    logout: () => {},
    userId: null, 
    location: null, 
    username: null,
    profilepicUrl: null
})

const calculateRemaining = (exp) => {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}

const getLocalData = () => {
    const storedToken = localStorage.getItem('token')
    const storedExp = localStorage.getItem('exp')
    const storedUserId = localStorage.getItem('userId')
    const storedLocation = localStorage.getItem('location')
    const storedUsername = localStorage.getItem('username')
    const storedprofilepicUrl = localStorage.getItem('profilepicUrl')

    const remainingTime = calculateRemaining(storedExp)

    if( remainingTime <= 1000 * 60 * 30){
        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
        localStorage.removeItem('userId')
        localStorage.removeItem('location')
        localStorage.removeItem('username')
        localStorage.removeItem('profilepicUrl')
        return null
    }
    
    return {
        token: storedToken,
        duration: remainingTime,
        userId: storedUserId,
        location: storedLocation,
        username: storedUsername,
        profilepicUrl: storedprofilepicUrl
    }
}

export const AuthContextProvider = (props) => {
    let localData = getLocalData()

    let initialToken
    let initialUserId
    let initialLocation
    let initialUsername
    let initialprofilepicUrl

    if(localData){
        initialToken = localData.token
        initialUserId = localData.userId
        initialLocation = localData.location
        initialUsername = localData.username
        initialprofilepicUrl = localData.profilepicUrl
    }


    const [userId, setUserId] = useState(initialUserId)
    const [token, setToken] = useState(initialToken)
    const [location, setLocation] = useState(initialLocation)
    const [username, setUsername] = useState(initialUsername)
    const [profilepicUrl, setprofilepicUrl] = useState(initialprofilepicUrl)

    const logout = useCallback(() => {
        setUserId(null)
        setToken(null)
        setLocation(null)
        setUsername(null)
        setprofilepicUrl(null)

        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
        localStorage.removeItem('userId')
        localStorage.removeItem('location')
        localStorage.removeItem('username')
        localStorage.removeItem('profilepicUrl')

        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const login = (token, exp, location, username, userId, profilepicUrl) => {
        setToken(token)
        setLocation(location)
        setUsername(username)
        setUserId(userId)
        setprofilepicUrl(profilepicUrl)

        localStorage.setItem('token', token)
        localStorage.setItem('exp', exp)
        localStorage.setItem('location', location)
        localStorage.setItem('username', username)
        localStorage.setItem('userId', userId)
        localStorage.setItem('profilepicUrl', profilepicUrl)

       const remainingTime = calculateRemaining(exp)

        logoutTimer = setTimeout(logout, remainingTime)
        
    }

    useEffect(() => {
        if(localData){
            logoutTimer = setTimeout(logout, localData.duration)
            let storedId = localStorage.getItem('userId')
            setUserId(+storedId)
          }
    })


    const contextValue = {
        token, 
        location,
        userId,
        username,
        profilepicUrl,
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext