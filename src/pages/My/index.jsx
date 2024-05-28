import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, List, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { removeCookie } from '../../untils/auth'
import api from '../../api'
import tx from '../../assets/img/tx.png'

export default function My() {
  const navigator = useNavigate()
  const [info, setInfo] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  function getPersonInfo() {
    api.getPersonInfo().then((res) => {
      setInfo(res.info)
    })
  }
  useEffect(() => {
    getPersonInfo()
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.bgimg}>
        {!isEdit ? (
          <React.Fragment>
            <img
              alt="img"
              className={styles.img}
              src={info.image ? info.image : tx}
            ></img>
            <div className={styles.info}>
              <div className={styles.username}>{info.username}</div>
              <div className={styles.phone}>{info.phone}</div>
            </div>
            <div className={styles.bj} onClick={() => setIsEdit(true)}>
              编辑
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img
              alt="img"
              className={styles.img}
              src={info.image ? info.image : tx}
            ></img>
            <div className={styles.info}>
              <Input
                value={info.username}
                onChange={(value) => setInfo({ ...info, username: value })}
              />
              <div className={styles.phone}>{info.phone}</div>
            </div>
            <div className={styles.bj}>
              <div
                onClick={() => {
                  let formDate = new FormData()
                  formDate.append('username', info.username)
                  api
                    .editUserName(formDate)
                    .then((res) => {
                      if (res.code === 200) {
                        Toast.show({
                          icon: 'success',
                          content: res.message
                        })
                      } else {
                        Toast.show({
                          icon: 'fail',
                          content: res.message
                        })
                      }
                    })
                    .finally(() => {
                      setIsEdit(false)
                      getPersonInfo()
                    })
                }}
              >
                保存
              </div>
              <div
                style={{ marginTop: '0.2rem' }}
                onClick={() => {
                  setIsEdit(false)
                  getPersonInfo()
                }}
              >
                取消
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className={styles.list}>
        <List className={styles.antd_list}>
          <List.Item
            onClick={() => {
              navigator('/home/doctorCard')
            }}
          >
            我绑定的就诊卡
          </List.Item>
        </List>
        <Button
          className={styles.button}
          fill="none"
          color="danger"
          onClick={() => {
            removeCookie('token')
            navigator('/login')
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  )
}
