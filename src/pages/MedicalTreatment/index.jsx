import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js'
import { Input, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import avaty from '../../assets/img/avaty.png'
import { ws } from '../MainNav'
import api from '../../api'

export default function MedicalTreatment() {
  const [value, setValue] = useState('')
  const [messageList, setMessageList] = useState([])

  function getMedicalTreatment() {
    let params = { userId: 1 }
    api.getMedicalTreatment(params).then((res) => {
      setMessageList(res.list)
      scrollBottom('#content')
    })
  }
  /**
   *
   * @param {string} id
   *
   */
  function scrollBottom(id) {
    let div = document.querySelector(id)
    setTimeout(() => {
      div.scrollTop = div.scrollHeight
    })
  }
  useEffect(() => {
    getMedicalTreatment()
    let token = PubSub.subscribe('message', (_, data) => {
      getMedicalTreatment()
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <div className={styles.medicalTreatment}>
      <div className={styles.content} id="content">
        <ul className={styles.ul}>
          {messageList.map((item) => {
            return (
              <li key={item.id} className={styles.li}>
                <img
                  alt="img"
                  className={
                    localStorage.getItem('id') == item.senderId
                      ? styles.imgRight
                      : styles.imgLeft
                  }
                  src={avaty}
                ></img>
                <div
                  className={
                    localStorage.getItem('id') == item.senderId
                      ? styles.sayRight
                      : styles.sayLeft
                  }
                >
                  {item.content}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <Input
        value={value}
        onChange={(value) => setValue(value)}
        onEnterPress={(e) => {
          if (!e.target.value)
            return Toast.show({
              icon: 'fail',
              content: '发送内容不能为空'
            })
          let item = {
            senderId: localStorage.getItem('id'),
            receiver: 1,
            content: e.target.value
          }
          ws.send(JSON.stringify(item))
          setValue('')
        }}
      ></Input>
    </div>
  )
}
