import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, ErrorBlock as Empty, Button, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import utils from '../../untils/tool'
import api from '../../api'

export default function AppointmentRegister() {
  const [date, setDate] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)
  const { cardId, doctorId } = useParams()
  const [doctorInfo, setDoctorInfo] = useState({})
  function handlSelectTime(item, index) {
    if (selectIndex === index) return
    setSelectIndex(index)
  }
  function getDoctorItem() {
    let params = {
      id: doctorId
    }
    api.getDoctorItem(params).then((res) => {
      setDoctorInfo(res.info)
    })
  }
  function getAppointmentRegisterInfo() {
    function findTime(time, data) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].sittingTime === time) {
          return i
        }
      }
      return null
    }
    api
      .getAppointmentRegisterInfo({
        id: doctorId,
        cardId
      })
      .then((res) => {
        console.log(res)
        let arr = []
        let info = utils.getWeekDay()
        info.forEach((item, index) => {
          let i = findTime(item.time, res.list)
          if (i !== null) {
            let w = {
              ...item,
              sittingText:
                res.list[i].surplusSittingNum === 0 ? '已约满' : '有号',
              sittingNum: res.list[i].sittingNum,
              isAppointment: res.list[i].isAppointment,
              surplusSittingNum: res.list[i].surplusSittingNum,
              id: res.list[i].id
            }
            arr.push(w)
          } else {
            let w = {
              ...item,
              sittingText: '无号',
              sittingNum: 0,
              isAppointment: 0,
              surplusSittingNum: 0
            }
            arr.push(w)
          }
        })
        setDate(arr)
      })
  }
  function addAppointmentRegister() {
    let info = {
      cardId: cardId,
      doctorRegisterId: date[selectIndex].id
    }
    api.addAppointmentRegister(info).then((res) => {
      if (res.code === 200) {
        Toast.show({
          icon: 'success',
          content: res.message
        })
        getAppointmentRegisterInfo()
      } else {
        Toast.show({
          icon: 'fail',
          content: res.message
        })
      }
    })
  }
  useEffect(() => {
    getDoctorItem()
    getAppointmentRegisterInfo()
  }, [])

  return (
    <div>
      <div className={styles.appointmentRegister}>
        <span className={styles.name}>{doctorInfo.doctorName}</span>
        <span className={styles.zhic}>{doctorInfo.professionalTitle}</span>
        <ul className={styles.ul}>
          {date.map((item, index) => {
            return (
              <li
                onClick={() => handlSelectTime(item, index)}
                key={index}
                className={styles.li}
                style={
                  selectIndex === index
                    ? { background: '#1890ff', color: '#fff' }
                    : {}
                }
              >
                <span>{item.week}</span>
                <span>{item.time && item.time.slice(5)}</span>
                <span
                  style={
                    item.sittingText === '无号' && selectIndex !== index
                      ? { color: '#ff3e3e' }
                      : item.sittingText === '有号' && selectIndex !== index
                      ? { color: 'rgb(0 108 254)' }
                      : {}
                  }
                >
                  {item.sittingText}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {date.length && date[selectIndex].sittingText === '无号' ? (
        <Empty status="empty" title="暂无医生排班" />
      ) : (
        <Card className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.content_name}>
              {doctorInfo.professionalTitle}号
            </span>
            {date.length && date[selectIndex].isAppointment ? (
              <Button size="mini" disabled>
                已预约
              </Button>
            ) : date.length && date[selectIndex].surplusSittingNum === 0 ? (
              <Button size="mini" disabled>
                约满
              </Button>
            ) : (
              <Button
                onClick={addAppointmentRegister}
                size="mini"
                color="primary"
              >
                剩余{date.length && date[selectIndex].surplusSittingNum}
              </Button>
            )}
          </div>
          <div className={styles.content_id}>
            医生简介：{doctorInfo.doctorDesc}
          </div>
          <div>擅长领域:{doctorInfo.doctorExpertise}</div>
        </Card>
      )}
    </div>
  )
}
