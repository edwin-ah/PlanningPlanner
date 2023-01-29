import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setUser(user)
      console.log(user)
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [user]);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}