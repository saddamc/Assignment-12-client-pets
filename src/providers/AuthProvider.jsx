import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'
import useAxiosCommon from '../hooks/useAxiosCommon'


export const AuthContext = createContext(null)
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const githubProvider = new GithubAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosCommon = useAxiosCommon();

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google Login
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  // GitHub login
  const loginGithub = () => {
    return signInWithPopup(auth, githubProvider);
}

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setLoading(true)
    // await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
    //   withCredentials: true,
    // })
    return signOut(auth)
  }

  const updateUserProfile = (name, image_url) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image_url,
    })
  }

  // Get token from server
  // const getToken = async email => {
  //   const { data } = await axios.post(
  //     `${import.meta.env.VITE_API_URL}/jwt`,
  //     { email },
  //     { withCredentials: true }
  //   )
  //   return data
  // }

  // save user
  const saveUser = async (user, image_url) =>{
    const currentUser = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL || image_url,
      role: 'User',
      status:'Verified',
    }
    const {data} = await axios.put(
      `${import.meta.env.VITE_API_URL}/user`, 
      currentUser)
    return data
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
        saveUser(currentUser)
        //   get token and store client
        const userInfo = { email: currentUser.email }
        axiosCommon.post('/jwt', userInfo)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        })

      } 
      else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem('access-token');

      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [axiosCommon])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    loginGithub,
    resetPassword,
    logOut,
    updateUserProfile,
    saveUser
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider
