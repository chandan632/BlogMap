const jwt = require('jsonwebtoken')
// export default class AuthHelperMethods {
//     setToken = (token) => {
//         localStorage.setItem('auth_token', token)
//     }
//     getToken = () => {
//         return localStorage.getItem('auth_token')
//     }
//     removeToken = () => {
//         localStorage.removeItem('auth_token')
//     }
//     logout = () => {
//         this.removeToken()
//     }
//     decode = (token) => {
//         return jwt.verify(token, "dcdiuvc273457346344*&*&#%#*&%#&dsgviufgv")
//     }
//     isExpired = () => {
//         const decodedData = this.decode
//         return decodedData.exp > Date.now()
//     }
//     const isLoggedIn = () => {
//         const token = this.getToken()
//         return !!token && !this.isExpired()
//     }
// }

function isLoggedIn() {
    const token = localStorage.getItem("auth_token")
    if (!token) {
        return { error: 'no token' }
    }
    const decodedData = jwt.verify(token, "dcdiuvc273457346344*&*&#%#*&%#&dsgviufgv")
    if (!decodedData.exp > Date.now()) {
        return { error: 'token expired' }
    }
    return decodedData
}

export default isLoggedIn;