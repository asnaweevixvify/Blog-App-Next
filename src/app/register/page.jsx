"use client"

import styles from "./page.module.css";
import { useState,useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {

  const [user,setUser] = useState({username:'',password:''})
  const [confirm,setConfirm] = useState('')
  const [compare,setCompare] = useState(false)
  const { username , password } = user
  const router = useRouter()

  const inputValue=(topic)=>{
    return (e) => setUser({...user,[topic]:e.target.value})
  }

  const sendUser = async(e) =>{
    e.preventDefault()
    
    try {
      const api = `${process.env.NEXT_PUBLIC_API}/api/register`
      await axios.post(api,user)
      Swal.fire({
        title: "สมัครบัญชีสำเร็จ",
        icon: "success",
        draggable: true
      });
      router.push("/login")
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    if(password === confirm){
      setCompare(true);
    }
    if(!username || !password || !confirm){
      setCompare(false)
    }
  },[confirm,username,password])
    
  return (
    <div className={styles.formcontainer}>
        <h1 className={styles.maintext}>สร้างบัญชีใหม่</h1>
        <form onSubmit={sendUser}>
            <p>Username</p>
            <input type="text" onInput={inputValue('username')}></input>
            <p>Password</p>
            <input type="password" onInput={inputValue('password')}></input>
            <p>Confirm Password</p>
            <input type="password" onInput={(e)=>setConfirm(e.target.value)}></input>
            <button type="submit" disabled={!compare}>สร้างบัญชี</button>
            <p className={styles.des}>มีบัญชีอยู่แล้ว <Link href="/login">เข้าสู่ระบบ</Link></p>
        </form>
    </div>
  )
}
