import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, TextArea, Picker, Toast } from 'antd-mobile'
import { option, optionMy, optionOther } from './RELATIONSHIP'
import api from '../../api'

export default function AddDoctorCard() {
  const [form] = Form.useForm()
  const params = useParams()
  const navigator = useNavigate()
  const [visible, setVisible] = useState(false)
  const [isMy, setIsMy] = useState(true)

  function onSubmit() {
    form.validateFields().then((values) => {
      // 遍历所有的字段
      for (let field in values) {
        // 如果字段没有值，则设置为空字符串
        if (!values[field]) {
          values[field] = ''
        }
      }
      let {
        relationship,
        patientName,
        idNumber,
        address,
        emergencyContact,
        emergencyPhone,
        height,
        bodyWeight,
        medicalHistory,
        allergyHistory
      } = values
      let fromDate = new FormData()
      fromDate.append('relationship', relationship[0])
      fromDate.append('patientName', patientName)
      fromDate.append('idNumber', idNumber)
      fromDate.append('address', address)
      fromDate.append('emergencyContact', emergencyContact)
      fromDate.append('emergencyPhone', emergencyPhone)
      fromDate.append('height', height)
      fromDate.append('bodyWeight', bodyWeight)
      fromDate.append('medicalHistory', medicalHistory)
      fromDate.append('allergyHistory', allergyHistory)
      if (params.id === '0') {
        api.addDoctorCard(fromDate).then((res) => {
          if (res.code === 200) {
            Toast.show({
              icon: 'success',
              content: res.message
            })
            navigator('/home/doctorCard')
          } else {
            Toast.show({
              icon: 'fail',
              content: res.message
            })
          }
        })
      } else {
        fromDate.append('id', params.id)
        api.editDoctorCard(fromDate).then((res) => {
          if (res.code === 200) {
            Toast.show({
              icon: 'success',
              content: res.message
            })
            navigator('/home/doctorCard')
          } else {
            Toast.show({
              icon: 'fail',
              content: res.message
            })
          }
        })
      }
    })
  }
  
  useEffect(() => {
    console.log(params)
    if (params.id === '0') return
    api.getDoctorCardItem(params).then((res) => {
      console.log(res)

      let r = {
        ...res.data,
        relationship: [res.data.relationship]
      }
      setIsMy(res.data.relationship === '本人')
      form.setFieldsValue(r)
    })
  }, [])

  return (
    <div>
      <Form
        form={form}
        footer={
          <div style={{ display: 'flex' }}>
            <Button block onClick={onSubmit} color="primary" size="large">
              保存
            </Button>
            <Button block size="large" onClick={() => navigator(-1)}>
              返回
            </Button>
          </div>
        }
      >
        <Form.Item
          name="relationship"
          label="与本人关系"
          onClick={() => setVisible(true)}
          rules={[{ required: true, message: '与本人关系不能为空' }]}
        >
          <Picker
            columns={params.id === '0' ? option : isMy ? optionMy : optionOther}
            placeholder="请选择与本人关系"
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            onConfirm={(value) => {
              form.setFieldValue('relationship', value)
            }}
          >
            {(items) => {
              return (
                <React.Fragment>
                  {items.every((item) => item === null) ? (
                    <span style={{ color: '#ccc' }}>请选择与本人关系</span>
                  ) : (
                    items.map((item) => item?.label ?? '请选择与本人关系')
                  )}
                </React.Fragment>
              )
            }}
          </Picker>
        </Form.Item>
        <Form.Header>个人信息</Form.Header>
        <Form.Item
          name="patientName"
          label="就诊人姓名"
          rules={[
            { required: true, message: '请输入就诊人姓名' },
            {
              pattern: /^(([\u4e00-\u9fa5+·?\u4e00-\u9fa5+]{2,5}$))/,
              message: '姓名格式不正确'
            }
          ]}
        >
          <Input placeholder="请输入就诊人姓名" />
        </Form.Item>
        <Form.Item
          name="idNumber"
          label="身份证号"
          rules={[
            { required: true, message: '请输入身份证号' },
            {
              pattern:
                /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              message: '身份账号不正确'
            }
          ]}
        >
          <Input placeholder="请输入身份证号" />
        </Form.Item>
        <Form.Item
          name="address"
          label="所在地区（填写到镇、乡、社区即可）"
          rules={[{ required: true, message: '请填写所在地区' }]}
        >
          <Input placeholder="请填写所在地区" />
        </Form.Item>
        <Form.Header>紧急联系人信息</Form.Header>
        <Form.Item
          name="emergencyContact"
          label="紧急联系人"
          rules={[
            {
              pattern: /^(([\u4e00-\u9fa5+·?\u4e00-\u9fa5+]{2,5}$))/,
              message: '姓名格式不正确'
            }
          ]}
        >
          <Input placeholder="请填写紧急联系人姓名" />
        </Form.Item>
        <Form.Item
          name="emergencyPhone"
          label="手机号"
          rules={[
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '手机号不正确'
            }
          ]}
        >
          <Input placeholder="请填写紧急联系人手机号" />
        </Form.Item>
        <Form.Header>健康信息</Form.Header>
        <Form.Item name="height" label="身高（cm）">
          <Input placeholder="请输入身高" />
        </Form.Item>
        <Form.Item name="bodyWeight" label="体重（kg）">
          <Input placeholder="请输入体重" />
        </Form.Item>
        <Form.Item name="medicalHistory" label="既往病史">
          <TextArea
            placeholder="请输入既往发生的疾病史，手术史（120字以内）"
            rows={5}
          />
        </Form.Item>
        <Form.Item name="allergyHistory" label="药物过敏史">
          <TextArea
            placeholder="请输入您对哪些药物有过敏反应（200字以内"
            rows={5}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
