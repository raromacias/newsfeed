import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer

const AuthContext = createContext({
    token: '', 
    login: () => {},
    logout: () => {},
    userId: null, 
    location: null, 
    username: null
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

    const remainingTime = calculateRemaining(storedExp)

    if( remainingTime <= 1000 * 60 * 30){
        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
        localStorage.removeItem('userId')
        localStorage.removeItem('location')
        localStorage.removeItem('username')
        return null
    }
    
    return {
        token: storedToken,
        duration: remainingTime,
        userId: storedUserId,
        location: storedLocation,
        username: storedUsername
    }
}

export const AuthContextProvider = (props) => {
    let localData = getLocalData()

    let initialToken
    let initialUserId
    let initialLocation
    let initialUsername

    if(localData){
        initialToken = localData.token
        initialUserId = localData.userId
        initialLocation = localData.location
        initialUsername = localData.username
    }


    const [userId, setUserId] = useState(initialUserId)
    const [token, setToken] = useState(initialToken)
    const [location, setLocation] = useState(initialLocation)
    const [username, setUsername] = useState(initialUsername)

    const logout = useCallback(() => {
        setUserId(null)
        setToken(null)
        setLocation(null)
        setUsername(null)

        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
        localStorage.removeItem('userId')
        localStorage.removeItem('location')
        localStorage.removeItem('username')

        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const login = (token, exp, userId, location, username) => {
        setUserId(+userId)
        setToken(token)
        setLocation(location)
        setUsername(username)

        localStorage.setItem('token', token)
        localStorage.setItem('userId', +userId)
        localStorage.setItem('location', location)
        localStorage.setItem('username', username)
        localStorage.setItem('exp', exp)

       const remainingTime = calculateRemaining(exp)

        logoutTimer = setTimeout(logout, remainingTime)
        
    }

    useEffect(() => {
        if(localData){
            logoutTimer = setTimeout(logout, localData.duration)
        }
    })


    const contextValue = {
        token, 
        userId,
        username,
        location,
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