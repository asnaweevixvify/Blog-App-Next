"use client"

import styles from "./page.module.css";
import axios from "axios";
import { useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

export default function Edit() {
    const [data,setData] = useState({title:'',content:'',author:''})
    const {title,content,author} = data
    const router = useRouter()
    const params = useParams()
    const id = params.id

    const inputValue = (topic)=>{
        return (e) => setData({...data,[topic]:e.target.value})
    }

    const getOldData = async()=>{
        try {
            const api = `${process.env.NEXT_PUBLIC_API}/api/singleData/${id}`
            const res = await axios.get(api)
            setData(res.data)
        }
        catch(err) {
            console.log(err);
        }
    }

    const sendData = async(e)=>{
        e.preventDefault()
        const api = `${process.env.NEXT_PUBLIC_API}/api/updateData/${id}`
        
        try {
            await axios.put(api,{title,content,author})
            setData({title:'',content:'',author:''})
            Swal.fire({
                title: "แก้ไขบทความสำเร็จ",
                icon: "success",
                draggable: true
              });
            router.push("/")
        }
        catch(err) {
          console.log(err);
        }
    }

    useEffect(()=>{
        getOldData()
    },[])

  return (
    <div className={styles.formcontainer}>
        <h1 className={styles.maintext}>แก้ไขบทความ</h1>
        <form onSubmit={sendData}>
            <p>ชื่อบทความ</p>
            <input type="text" onInput={inputValue('title')} value={title}></input>
            <p>เนื้อหาบทความ</p>
            <textarea onInput={inputValue('content')} value={content}></textarea>
            <p>ผู้เขียน</p>
            <input type="text" onInput={inputValue('author')} value={author}></input>
            <button type="submit">อัพเดตบทความ</button>
        </form>
    </div>
  )
}
