import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, List } from 'antd-mobile'
import styles from './index.module.scss'
import api from '../../api'
import utils from '../../untils/tool'

export default function Message() {
  const navigator = useNavigate()
  const [list, setList] = useState([])
  const [systemList, setSystemList] = useState([])

  function getAnnouncementList() {
    api.getAnnouncementList().then((res) => {
      setList(res.data.list)
    })
  }
  function getSystemMessage() {
    api.getSystemMessage().then((res) => {
      setSystemList(res.list)
    })
  }
  useEffect(() => {
    getAnnouncementList()
    getSystemMessage()
  }, [])

  return (
    <div className={styles.content}>
      <Tabs>
        <Tabs.Tab title="系统公告" key="1">
          <List>
            {list.map((item) => (
              <List.Item
                style={
                  item.isRead
                    ? { background: '#f6f6f7', color: 'rgb(148 148 148)' }
                    : {}
                }
                onClick={() => {
                  api.getSystemAnnouncementAlterRead(item.alertId)
                  navigator(`/home/announcementDesc/${item.id}`)
                }}
                key={item.id}
                description={utils.getContent(item.content)}
              >
                <div>{item.title}</div>
                <div className={styles.time}>
                  创建时间：{item.createTime}&nbsp;&nbsp;创建者：{item.username}
                </div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>
        <Tabs.Tab title="系统消息" key="2">
          <List>
            {systemList.map((item) => (
              <List.Item key={item.id} description={item.content}>
                <div className={styles.time}>创建时间：{item.createTime}</div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
