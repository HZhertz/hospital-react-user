import React, { useEffect, useState } from 'react'
import { List, Toast, ErrorBlock as Empty } from 'antd-mobile'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import api from '../../api'

export default function ReservationRecord() {
  const [list, setList] = useState([])
  function getReservationRecord() {
    api.getReservationRecord().then((res) => {
      setList(res.data)
    })
  }
  function removeAppointmentRegister(id) {
    let params = {
      id
    }
    api.removeAppointmentRegister(params).then((res) => {
      if (res.code === 200) {
        Toast.show({
          icon: 'success',
          content: res.message
        })
        getReservationRecord()
      } else {
        Toast.show({
          icon: 'fail',
          content: '取消预约失败，请联系管理员'
        })
      }
    })
  }
  useEffect(() => {
    getReservationRecord()
  }, [])

  return (
    <div className={styles.reservationRecord}>
      <div className={styles.top}>我的预约记录</div>
      {list.length > 0 ? (
        <List className={styles.list}>
          {list.map((item, index) => (
            <List.Item key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div className={styles.username}>
                    看诊医生：{item.doctorName}
                  </div>
                  <div className={styles.username}>
                    看诊人：{item.patientName}
                  </div>
                  <div className={styles.username}>
                    与本人关系：{item.relationship}
                  </div>
                  <div className={styles.username}>
                    看诊时间：{item.sittingTime}
                  </div>
                </div>
                {dayjs(new Date()).format('YYYY-MM-DD') > item.sittingTime ? (
                  <div style={{ color: '#ccc' }} className={styles.username}>
                    已过期
                  </div>
                ) : (
                  <div
                    style={{ color: '#d47272' }}
                    className={styles.username}
                    onClick={() => removeAppointmentRegister(item.id)}
                  >
                    取消预约
                  </div>
                )}
              </div>
            </List.Item>
          ))}
        </List>
      ) : (
        <Empty status="empty" title="暂无预约记录" />
      )}
    </div>
  )
}
