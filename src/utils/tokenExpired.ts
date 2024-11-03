export const isTokenExpired = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return true;
    }
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000)
        return payload.exp < currentTime;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return true;
    }
}