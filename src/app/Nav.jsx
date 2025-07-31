"use client"
import styles from "./page.module.css";
import Link from "next/link";

export default function () {
  return (
    <div className={styles.navcontainer}>
        <ul>
            <Link href="/"><li>หน้าหลัก</li></Link>
            <Link href="/form"><li>เพิ่มบทความ</li></Link>
            <Link href="/login"><li>เข้าสู่ระบบ</li></Link>
        </ul>
    </div>
  )
}
