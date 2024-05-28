import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { List } from 'antd-mobile'
import styles from './index.module.scss'
import api from '../../api'

export default function SelectDoctor() {
  const navigate = useNavigate()
  const { cardId } = useParams()
  const [list, setList] = useState([])
  const [select, setSelect] = useState(0)
  const [users, setUsers] = useState([])

  function geDepartmentList() {
    api.geDepartmentList().then((res) => {
      setList(res.list)
      getDoctorList(res.list[0].id)
    })
  }
  function getDoctorList(id) {
    let params = {
      departmentId: id
    }
    api.getDoctorList(params).then((res) => {
      setUsers(res.list)
    })
  }
  function handlClick(item, index) {
    if (select === index) return
    setSelect(index)
    getDoctorList(item.id)
  }
  useEffect(() => {
    geDepartmentList()
  }, [])

  return (
    <div className={styles.selectDoctor}>
      <ul className={styles.selectDoctor_ul}>
        {list.map((item, index) => {
          return (
            <li
              onClick={() => handlClick(item, index)}
              key={item.id}
              style={
                index === select
                  ? { background: '#fff', color: 'rgb(33 168 227)' }
                  : {}
              }
            >
              {item.title}
            </li>
          )
        })}
      </ul>
      <div className={styles.selectDoctor_content}>
        <List>
          {users.map((user) => (
            <List.Item
              onClick={() => {
                navigate(`/home/appointmentRegister/${cardId}/${user.id}`)
              }}
              key={user.id}
              description={
                <React.Fragment>
                  <div>职称：{user.professionalTitle}</div>
                  <div>擅长领域：{user.doctorExpertise}</div>
                </React.Fragment>
              }
            >
              {user.doctorName}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  )
}
