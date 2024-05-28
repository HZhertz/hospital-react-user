import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import api from '../../api'
import { setCookie } from '../../untils/auth'

let timer
export default function Login() {
  const formRef = useRef(null)
  const phoneCodeRef = useRef(null)
  const [isDis, setIsDis] = useState(false)
  const navigate = useNavigate()
  function handlePhoneCode() {
    formRef.current
      .validateFields(['username', 'password'])
      .then(async (value) => {
        let { username, password } = value
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        try {
          let res = await api.getPhoneCode(formData)
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
  async function onLoginFinish(value) {
    let { username, password, phoneCode, code } = value
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('phoneCode', phoneCode)
    formData.append('code', code)
    try {
      let res = await api.login(formData)
      if (res.code === 200) {
        if (res.isRank)
          return Toast.show({
            icon: 'fail',
            content: '登陆失败，暂未找到该账号'
          })
        Toast.show({
          icon: 'success',
          content: res.message
        })
        setCookie('token', res.data)
        localStorage.setItem('id', res.id)
        navigate('/home')
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
    console.log('执行')
    handleCode()
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <div className={styles.form}>
          <Form
            onFinish={onLoginFinish}
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
                登录
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
              label="短信验证码"
              name="phoneCode"
              rules={[{ required: true }]}
              extra={
                <Button
                  ref={phoneCodeRef}
                  disabled={isDis}
                  fill="none"
                  style={{ fontSize: ' var(--adm-font-size-3)' }}
                  onClick={handlePhoneCode}
                >
                  获取验证码
                </Button>
              }
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
          </Form>
          <span style={{ fontSize: 'var(--adm-font-size-4)' }}>
            还没有创建账号?
            <span
              onClick={() => {
                navigate('/reguser')
              }}
              style={{ color: 'blue' }}
            >
              立即注册
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
