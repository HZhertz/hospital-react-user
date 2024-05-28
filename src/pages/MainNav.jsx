import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js'
import { TabBar, NavBar, Modal, Divider, Toast } from 'antd-mobile'
import {
  AppOutline,
  UserOutline,
  BellOutline,
  PhonebookOutline
} from 'antd-mobile-icons'
import styles from './MainNav.module.scss'
import api from '../api'

const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />
  },
  {
    key: '/home/medicalTreatment',
    title: '在线问诊',
    icon: <PhonebookOutline />
  },
  {
    key: '/home/message',
    title: '消息',
    icon: <BellOutline />
  },
  {
    key: '/home/my',
    title: '我的',
    icon: <UserOutline />
  }
]
export let ws = null
export default function MainNav() {
  const native = useNavigate()
  //公告弹窗
  function getSystemAnnouncementAlter() {
    api.getSystemAnnouncementAlter().then((res) => {
      if (res.data.length === 0) return
      Modal.alert({
        content: (
          <div>
            <div className={styles.title}>{res.data[0].title}</div>
            <div className={styles.time}>
              创建时间：{res.data[0].createTime}
            </div>
            <Divider />
            <div
              dangerouslySetInnerHTML={{ __html: res.data[0].content }}
            ></div>
          </div>
        ),
        onConfirm: () => {
          //标记已读
          api.getSystemAnnouncementAlterRead(res.data[0].id)
        }
      })
    })
  }
  function reconnect() {
    // lockReconnect加锁，防止onclose、onerror两次重连
    console.log('正在进行重连')
    // 进行重连
    setTimeout(function () {
      initWebSocket()
    }, 1000)
  }
  function initWebSocket() {
    ws = new WebSocket(`ws:localhost:8000?id=${localStorage.getItem('id')}`)
    ws.onopen = function () {
      console.log('localhost:8000，连接成功')
    }
    ws.onmessage = function (e) {
      let { code } = JSON.parse(e.data)
      if (code === 200) {
        Toast.show({
          icon: 'success',
          content: '您有一条新消息，请到系统消息中查阅'
        })
      }
      if (code === 300 || code === 301) {
        PubSub.publish('message', '消息已更新')
      }
    }
    ws.onclose = function (e) {
      console.log('close')
      reconnect()
    }
  }
  useEffect(() => {
    getSystemAnnouncementAlter()
    initWebSocket()
  }, [])
  return (
    <div>
      <div className={styles.Outlet}>
        <NavBar
          backArrow={false}
          style={{ background: '#1374e6', color: '#fff' }}
        >
          保定胸外医院挂号系统
        </NavBar>
        <Outlet />
      </div>
      <TabBar
        className={styles.tab}
        onChange={(key) => {
          native(key)
        }}
        onClick={(e) => {
          console.log(e)
        }}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}
