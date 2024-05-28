import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar, InfiniteScroll, List, Image } from 'antd-mobile'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import api from '../../api'

export default function HospitalAnnouncement() {
  const navigator = useNavigate()
  const [list, setList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [lastId, setLastId] = useState(-1)

  function getHospitalAnnouncement(title = '') {
    let params = {
      title
    }
    api.getHospitalAnnouncement(params).then((res) => {
      setList(res.list)
    })
  }

  function getMoreHospitalAnnouncement(id) {
    let params = {
      id
    }
    api.getMoreHospitalAnnouncement(params).then((res) => {
      setHasMore(res.list.length > 0)
      const newList = [...list, ...res.list]
      setList(newList)
      if (newList.length !== 0) {
        setLastId(newList[newList.length - 1].id)
      }
    })
  }

  return (
    <div className={styles.content}>
      <SearchBar
        onSearch={getHospitalAnnouncement}
        className={styles.SearchBar}
        placeholder="请输入公告标题"
      />
      <List>
        {list.map((item) => (
          <List.Item
            onClick={() => {
              navigator(`/home/hospitalAnnouncementDesc/${item.id}`)
            }}
            key={item.id}
            prefix={
              <Image src={item.image} fit="cover" width={130} height={130} />
            }
          >
            <div
              style={{
                height: '45px',
                width: '190px',
                marginTop: '0',
                fontSize: '15px',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {item.title}
            </div>
            <span
              style={{
                position: 'absolute',
                bottom: '20px',
                fontSize: '12px'
              }}
            >
              {dayjs(item.createTime).format('YYYY-MM-DD')}
            </span>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll
        loadMore={() => getMoreHospitalAnnouncement(lastId)}
        hasMore={hasMore}
      />
    </div>
  )
}
