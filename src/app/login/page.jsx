"use client"

import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Login() {

  const [user,setUser] = useState({username:'',password:''})
  const { username , password } = user
  const router = useRouter()

  const inputValue=(topic)=>{
    return (e) => setUser({...user,[topic]:e.target.value})
  }

  const sendUser = async(e)=>{
    e.preventDefault()
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res.ok && !res.error) {
      Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        draggable: true
      });
      router.push("/"); 
    } else {
      alert("Login failed");
    }
  }
    
  return (
    <div className={styles.formcontainer}>
        <h1 className={styles.maintext}>เข้าสู่ระบบ</h1>
        <form onSubmit={sendUser}>
            <p>Username</p>
            <input type="text" onInput={inputValue('username')}></input>
            <p>Password</p>
            <input type="password" onInput={inputValue('password')}></input>
            <button type="submit">เข้าสู่ระบบ</button>
            <p className={styles.des}>ยังไม่มีบัญชี <Link href="/register">สร้างบัญชีใหม่</Link></p>
        </form>
    </div>
  )
}
