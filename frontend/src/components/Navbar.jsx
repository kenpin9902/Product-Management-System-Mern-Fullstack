import React from 'react'
import styles from '../styles/components/Navbar.module.css'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";


function Navbar() {
  return (
    <div className={styles.navbar}>
        <div>
            <Link to="/" className={styles.logo}>Product Store</Link>
        </div>
        <div>
            <Link to="/create" className={styles.icon}><CiSquarePlus size={35} /></Link>
        </div>
    </div>
  )
}

export default Navbar