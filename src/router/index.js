import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { getCookie } from '../untils/auth'
import Login from '../pages/Login'
import Reguser from '../pages/Reguser'
import MainNav from '../pages/MainNav'
import Home from '../pages/Home'
import MedicalTreatment from '../pages/MedicalTreatment'
import Message from '../pages/Message'
import My from '../pages/My'
import HospitalIntroduction from '../pages/HospitalIntroduction'
import HospitalAnnouncement from '../pages/HospitalAnnouncement'
import HospitalAnnouncementDesc from '../pages/HospitalAnnouncementDesc'
import AnnouncementDesc from '../pages/AnnouncementDesc'
import DoctorCard from '../pages/DoctorCard'
import AddDoctorCard from '../pages/AddDoctorCard'
import SelectMedicalCard from '../pages/SelectMedicalCard'
import SelectDoctor from '../pages/SelectDoctor'
import AppointmentRegister from '../pages/AppointmentRegister'
import ReservationRecord from '../pages/ReservationRecord'
import Department from '../pages/Department'
import Map from '../pages/Map/Map'
export default function Router() {
  const location = useLocation()
  const { pathname } = location
  const router = [
    {
      path: '/login',
      element: <Login />,
      auth: false
    },
    {
      path: '/reguser',
      element: <Reguser />,
      auth: false
    },
    {
      path: '/home',
      element: <MainNav />,
      auth: true,
      children: [
        {
          //首页
          path: '/home',
          element: <Home></Home>,
          auth: true
        },
        {
          //在线问诊
          path: '/home/medicalTreatment',
          element: <MedicalTreatment></MedicalTreatment>,
          auth: true
        },
        {
          //消息
          path: '/home/message',
          element: <Message></Message>,
          auth: true
        },
        {
          //我的
          path: '/home/my',
          element: <My></My>,
          auth: true
        },
        {
          //医院介绍
          path: '/home/hospitalIntroduction',
          element: <HospitalIntroduction></HospitalIntroduction>,
          auth: true
        },
        {
          //医院公告列表
          path: '/home/hospitalAnnouncement',
          element: <HospitalAnnouncement></HospitalAnnouncement>,
          auth: true
        },
        {
          //医院公告详情
          path: '/home/hospitalAnnouncementDesc/:id',
          element: <HospitalAnnouncementDesc></HospitalAnnouncementDesc>,
          auth: true
        },
        {
          //医院公告详情
          path: '/home/announcementDesc/:id',
          element: <AnnouncementDesc></AnnouncementDesc>,
          auth: true
        },
        {
          //就诊卡
          path: '/home/doctorCard',
          element: <DoctorCard></DoctorCard>,
          auth: true
        },
        {
          //添加就诊卡
          path: '/home/addDoctorCard/:id',
          element: <AddDoctorCard></AddDoctorCard>,
          auth: true
        },
        {
          //选择就诊卡
          path: '/home/selectMedicalCard',
          element: <SelectMedicalCard></SelectMedicalCard>,
          auth: true
        },
        {
          //选择就诊卡
          path: '/home/selectDoctor/:cardId',
          element: <SelectDoctor></SelectDoctor>,
          auth: true
        },
        {
          //预约挂号
          path: '/home/appointmentRegister/:cardId/:doctorId',
          element: <AppointmentRegister></AppointmentRegister>,
          auth: true
        },
        {
          //预约记录
          path: '/home/reservationRecord',
          element: <ReservationRecord></ReservationRecord>,
          auth: true
        },
        {
          //预约记录
          path: '/home/department',
          element: <Department></Department>,
          auth: true
        },
        {
          //预约记录
          path: '/home/map',
          element: <Map></Map>,
          auth: true
        }
      ]
    },
    {
      path: '/',
      element: <Navigate to="/home" />
    }
  ]
  const RouteNav = (router) => {
    return router.map((item) => {
      return (
        <Route
          path={item.path}
          element={
            item.auth && !getCookie('token') ? (
              <Navigate to="/login" replace={true}></Navigate>
            ) : getCookie('token') && pathname === '/login' ? (
              <Navigate to="/home"></Navigate>
            ) : (
              item.element
            )
          }
          key={item.path}
        >
          {item.children && RouteNav(item.children)}
        </Route>
      )
    })
  }
  return <Routes>{RouteNav(router)}</Routes>
}
