import React, {useEffect} from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import useLoginContext from "../../hooks/useLoginContext"
import { signInWithGoogle, signOutUser, handleAuth } from "../../firebase"
const Header = () => {
    const {user,setUser} = useLoginContext(); 
    const handleLogin = async () => {
        const user = await signInWithGoogle()
        if(user){
            setUser(user);
        }
    }
    const handleLogout = async () => {
        const isLoggedOut = await signOutUser()
        if(isLoggedOut){
            setUser(null);
        }
    }
    useEffect(() => {
        handleAuth((user) => {
            if(user){
                console.log(user);
                setUser(user);
            }else{
                setUser(null);
            }
        })
    },[])
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://api.giglifepro.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVlIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ae50bc299dd0126dccca9aad697da275fdf03ea9/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VY21WemFYcGxYM1J2WDJ4cGJXbDBXd2RwQWdBRWFRSUFBdz09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--cce098901e278cabf4499f74e9f1d50be888e976/Kalamkaar%20.jpg" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                {
                    user ? 
                    (<button className="logout_button" onClick={handleLogout}><img src={user.photoURL}/><p>logout</p></button>)
                        : 
                    (<button className="login_button" onClick={handleLogin}><img src="/google.png" /><p>login with google</p></button>)
                }
            </div>
        </div>
    )
}

export default Header