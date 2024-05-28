import React, { useState, useEffect } from 'react'
import { Divider } from 'antd-mobile'
import styles from './index.module.scss'
import api from '../../api'

export default function Department() {
  const [list, setList] = useState([])
  const [select, setSelect] = useState(0)

  function geDepartmentList() {
    api.geDepartmentList().then((res) => {
      setList(res.list)
    })
  }
  function handlClick(item, index) {
    if (select === index) return
    setSelect(index)
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
      {list.length && (
        <div className={styles.selectDoctor_content}>
          <div className={styles.title}>{list[select].title}</div>
          <Divider></Divider>
          <div className={styles.introduction}>
            <span style={{ color: '#1890ff' }}>科室简介：</span>
            {list[select].introduction}
          </div>
          <div>
            <span style={{ color: '#1890ff' }}>擅长领域：</span>
            {list[select].expertise}
          </div>
        </div>
      )}
    </div>
  )
}
