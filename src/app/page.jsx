"use client"

import styles from "./page.module.css";
import axios from "axios";
import { useState,useEffect } from "react";
import { FaPen,FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


export default function Home() {
  const [data,setData] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const router = useRouter()

  const getData = async ()=>{
    try {
        const api = process.env.NEXT_PUBLIC_API+"/api/getData"
        const res = await axios.get(api)
        setData(res.data)
        setIsLoading(false)
    }
    catch (err) {
      console.log(err);
    }
  }

  const confirmDel =(id)=>{
    Swal.fire({
      title: "ต้องการลบข้อมูลหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText:"ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        delItem(id)
      }
    });
  }

  const delItem = async (id)=>{
    try {
      const api = `${process.env.NEXT_PUBLIC_API}/api/delData/${id}`
      await axios.delete(api)
      Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
        icon: "success",
        draggable: true
      });
      getData()
    }
    catch(err) {
      console.log(err);
    }
  }

  const toEditPage=(id) =>{
    router.push(`/edit/${id}`)
  }

  useEffect(()=>{
    getData()
  },[])
 
    if(!isLoading) {
      return(
        <div>
          <h1 className={styles.maintext}>Blog App Nextjs</h1>
            {data.map((e,index)=>{
              return(
                    <div className={styles.blogbox} key={index}>
                        <h2>{e.title}</h2>
                        <p>
                          {e.content}
                        </p>
                        <div style={{display:"flex",alignItems:"center",marginTop:"15px",gap:"15px"}}>
                          <FaPen style={{color:"blue",cursor:"pointer"}} onClick={()=>toEditPage(e.id)}/>
                          <FaTrash style={{color:"red",cursor:"pointer"}} onClick={()=>confirmDel(e.id)}/>
                        </div>
                    </div>
              )
            })}
        </div>
      )
    }
    else {
      return(<h1 className={styles.loading}>กำลังโหลดข้อมูล...</h1>)
    }
}
