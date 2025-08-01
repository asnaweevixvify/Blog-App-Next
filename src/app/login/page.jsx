"use client"

import styles from "./page.module.css";

export default function Login() {
    
  return (
    <div className={styles.formcontainer}>
        <h1 className={styles.maintext}>เข้าสู่ระบบ</h1>
        <form>
            <p>Username</p>
            <input type="text"></input>
            <p>Password</p>
            <input type="password"></input>
            <button type="submit">เข้าสู่ระบบ</button>
        </form>
    </div>
  )
}
