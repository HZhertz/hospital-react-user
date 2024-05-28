import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, NoticeBar, List, Image } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import api from '../../api'
import { GRID_INFO } from './GRID_INFO'

export default function Home() {
  const navigate = useNavigate()
  const [rotograph, setRotograph] = useState([])
  const [list, setList] = useState([])
  function itemChange(item) {
    if (item.route) {
      navigate(item.route)
    } else {
      item.click && item.click()
    }
  }
  //轮播图
  function getRotographList() {
    api.getRotographList().then((res) => {
      console.log(res)
      setRotograph(res.list)
    })
  }
  //医院公告
  function getHospitalAnnouncementList() {
    api.getHospitalAnnouncementList().then((res) => {
      console.log(res)
      setList(res.list.slice(0, 4))
    })
  }

  useEffect(() => {
    getRotographList()
    getHospitalAnnouncementList()
  }, [])
  return (
    <div className={styles.home}>
      <Swiper autoplay autoplayInterval={2000} loop>
        {rotograph.map((item) => {
          return (
            <Swiper.Item
              key={item.id}
              onClick={() => {
                if (item.address.startsWith('http'))
                  window.open(item.address, '_black')
                else navigate(item.address)
              }}
            >
              <img alt="img" className={styles.home_img} src={item.image}></img>
            </Swiper.Item>
          )
        })}
      </Swiper>
      <NoticeBar
        content="欢迎您使用保定胸外医院挂号系统，该系统正在完善，敬请期待！"
        color="info"
      />
      <div className={styles.home_grid}>
        {GRID_INFO.map((item) => {
          return (
            <div
              key={item.id}
              style={{ textAlign: 'center' }}
              onClick={() => itemChange(item)}
            >
              <img alt="img" src={item.icon}></img>
              <div className={styles.home_grid_title}>{item.name}</div>
            </div>
          )
        })}
      </div>
      <div className={styles.announcement}>
        <div className={styles.announcement_topleft} />
        <div className={styles.announcement_topright}>医院公告</div>
        <div
          style={{ float: 'right' }}
          onClick={() => {
            navigate('/home/hospitalAnnouncement')
          }}
        >
          查看更多 <RightOutline />
        </div>
        <List>
          {list.map((item) => (
            <List.Item
              onClick={() => {
                navigate(`/home/hospitalAnnouncementDesc/${item.id}`)
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
      </div>
    </div>
  )
}
