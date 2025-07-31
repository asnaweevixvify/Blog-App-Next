"use client"

import styles from "./page.module.css";
import axios from "axios";
import { useState} from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Form() {
    const [data,setData] = useState({title:'',content:'',author:''})
    const router = useRouter()

    const inputValue = (topic)=>{
        return (e) => setData({...data,[topic]:e.target.value})
    }

    const sendData = async(e)=>{
        e.preventDefault()
        const api = process.env.NEXT_PUBLIC_API+"/api/sendData"
        
        try {
            const res = await axios.post(api,data)
            setData({title:'',content:'',author:''})
            Swal.fire({
                title: "เพิ่มบทความสำเร็จ",
                icon: "success",
                draggable: true
              });
            router.push("/")
        }
        catch(err) {
          console.log(err);
        }
    }

  return (
    <div className={styles.formcontainer}>
        <h1 className={styles.maintext}>เพิ่มบทความ</h1>
        <form onSubmit={sendData}>
            <p>ชื่อบทความ</p>
            <input type="text" onInput={inputValue('title')}></input>
            <p>เนื้อหาบทความ</p>
            <textarea onInput={inputValue('content')}></textarea>
            <p>ผู้เขียน</p>
            <input type="text" onInput={inputValue('author')}></input>
            <button type="submit">บันทึกบทความ</button>
        </form>
    </div>
  )
}
