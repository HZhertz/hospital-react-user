import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import api from '../../api'

let timer
export default function Reguser() {
  const formRef = useRef(null)
  const phoneCodeRef = useRef(null)
  const navigate = useNavigate()
  const [isDis, setIsDis] = useState(false)
  function handlePhoneCode() {
    formRef.current.validateFields(['phone']).then(async (value) => {
      let { phone } = value
      let formData = new FormData()
      formData.append('phone', phone)
      try {
        let res = await api.getPhoneCodeReguser(formData)
        if (res.code === 200) {
          Toast.show({
            icon: 'success',
            content: res.message
          })
          let phoneCodeName = phoneCodeRef.current
          phoneCodeName.nativeElement.innerText = '60s'
          let time = 60
          setIsDis(true)
          timer = setInterval(() => {
            if (time === 0) {
              setIsDis(false)
              phoneCodeName.nativeElement.innerText = '获取验证码'
              return clearInterval(timer)
            }
            phoneCodeName.nativeElement.innerText = `${--time}s`
          }, 1000)
        } else {
          Toast.show({
            icon: 'fail',
            content: res.message
          })
        }
      } catch (e) {
        console.log(e)
      }
    })
  }
  async function handleCode() {
    try {
      let res = await api.captcha()
      if (res.code === 200) {
        let code = document.querySelector('#co')
        code.innerHTML = res.img
        let svg = code.childNodes[0]
        svg.style.display = 'block'
        svg.style.width = '90px'
        svg.style.height = '50px'
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function onRegUserFinish(value) {
    let { username, password, phoneCode, code, phone } = value
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('phoneCode', phoneCode)
    formData.append('code', code)
    formData.append('userRank', 0)

    try {
      let res = await api.regUser(formData)
      if (res.code === 200) {
        Toast.show({
          icon: 'success',
          content: res.message
        })
        navigate('/login')
      } else {
        Toast.show({
          icon: 'fail',
          content: res.message
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    handleCode()
    return () => {
      clearInterval(timer)
    }
  }, [])
  const validatorCheckPassword = (_, checkPassword) => {
    let password = formRef.current.getFieldValue('password')
    if (!checkPassword) {
      return Promise.reject(new Error('请再次输入密码'))
    } else if (checkPassword !== password) {
      return Promise.reject(new Error('两次输入密码不一致'))
    } else {
      return Promise.resolve()
    }
  }
  const validatorPhone = (_, phone) => {
    if (!phone) {
      return Promise.reject(new Error('请输入手机号'))
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      return Promise.reject(new Error('手机号格式不正确'))
    } else {
      return Promise.resolve()
    }
  }
  return (
    <div className={styles.reguser}>
      <div className={styles.content}>
        <div className={styles.form}>
          <Form
            onFinish={onRegUserFinish}
            ref={formRef}
            style={{ '--prefix-width': '60px', textAlign: 'left' }}
            layout="horizontal"
            mode="default"
            footer={
              <Button
                className={styles.button}
                block
                type="submit"
                color="primary"
                size="large"
              >
                立即注册
              </Button>
            }
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true }]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="checkPassword"
              label="确认密码"
              rules={[
                { required: true, message: '' },
                { validator: validatorCheckPassword }
              ]}
            >
              <Input type="password" placeholder="请确认密码" />
            </Form.Item>
            <Form.Header />
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                { required: true, message: '' },
                { validator: validatorPhone }
              ]}
              extra={
                <Button
                  ref={phoneCodeRef}
                  disabled={isDis}
                  fill="none"
                  style={{ fontSize: ' var(--adm-font-size-4)' }}
                  onClick={handlePhoneCode}
                >
                  获取验证码
                </Button>
              }
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              label="短信验证码"
              name="phoneCode"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入短信验证码" />
            </Form.Item>
            <Form.Item
              label="验证码"
              name="code"
              rules={[{ required: true }]}
              extra={<div id="co" onClick={handleCode}></div>}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            <Form.Header />
          </Form>
          <span style={{ fontSize: 'var(--adm-font-size-4)' }}>
            已有账号?
            <span
              onClick={() => {
                navigate('/login')
              }}
              style={{ color: 'blue' }}
            >
              立即登录
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
