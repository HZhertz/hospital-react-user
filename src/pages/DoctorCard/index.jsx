import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Tag, Button, Divider, Toast } from 'antd-mobile'
import { FileOutline, FileWrongOutline } from 'antd-mobile-icons'
import styles from './index.module.scss'
import api from '../../api'
import utils from '../../untils/tool'

export default function DoctorCard() {
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
      {list.map((item, index) => {
        return (
          <Card key={item.id} style={index > 0 ? { marginTop: '0.5rem' } : {}}>
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
            <Divider></Divider>
            <div style={{ textAlign: 'right' }}>
              <span>
                <FileOutline />
                <Button
                  className={styles.button}
                  fill="none"
                  onClick={() => [navigate(`/home/addDoctorCard/${item.id}`)]}
                >
                  编辑
                </Button>
              </span>
              <span style={{ marginLeft: '0.3rem' }}>
                <FileWrongOutline />
                <Button
                  disabled={item.relationship === '本人'}
                  className={styles.button}
                  fill="none"
                  onClick={() => {
                    api.deleteDoctorCard(item.id).then((res) => {
                      if (res.code === 200) {
                        Toast.show({
                          icon: 'success',
                          content: res.message
                        })
                        getDoctorCardList()
                      } else {
                        Toast.show({
                          icon: 'fail',
                          content: res.message
                        })
                      }
                    })
                  }}
                >
                  删除
                </Button>
              </span>
            </div>
          </Card>
        )
      })}

      <div
        className={styles.add}
        onClick={() => {
          navigate('/home/addDoctorCard/0')
        }}
      >
        添加就诊卡
      </div>
    </div>
  )
}
