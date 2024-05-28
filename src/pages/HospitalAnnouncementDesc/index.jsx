import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Divider } from 'antd-mobile'
import styles from './index.module.scss'
import './github-markdown.css'
import api from '../../api'

export default function HospitalAnnouncementDesc() {
  const params = useParams()
  const [info, setInfo] = useState({})

  function getHospitalAnnouncementInfo() {
    api.getHospitalAnnouncementInfo(params).then((res) => {
      setInfo(res.info)
    })
  }

  useEffect(() => {
    getHospitalAnnouncementInfo()
  })

  return (
    <div className={styles.content}>
      <div className={styles.title}>{info.title}</div>
      <div className={styles.user}>
        <span>创建时间：{info.createTime}</span>
        <span>创建人：{info.username}</span>
      </div>
      <Divider></Divider>
      <div
        dangerouslySetInnerHTML={{ __html: info.content }}
        className="content markdown-body"
      ></div>
    </div>
  )
}
