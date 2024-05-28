import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Tag } from 'antd-mobile'
import styles from './index.module.scss'
import api from '../../api'
import utils from '../../untils/tool'

export default function SelectMedicalCard() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  function getDoctorCardList() {
    api.getDoctorCardList().then((res) => {
      setList(res.list)
    })
  }
  useEffect(() => {
    getDoctorCardList()
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.top}>请选择就诊卡</div>

      {list.map((item, index) => {
        return (
          <Card
            key={item.id}
            onClick={() => {
              navigate(`/home/selectDoctor/${item.id}`)
            }}
            style={{ marginTop: '0.5rem' }}
          >
            <span className={styles.content_name}>{item.patientName}</span>
            <Tag
              color="#fff4d7"
              style={{ color: '#e08519', marginLeft: '0.2rem' }}
            >
              {item.relationship}
            </Tag>
            <div className={styles.content_id}>
              就诊人编号:{utils.PrefixInteger(item.id, 6)}
            </div>
            <div>身份证号:{item.idNumber}</div>
          </Card>
        )
      })}
    </div>
  )
}
