import { Modal } from 'antd-mobile'
import tj_icon1 from '../../assets/img/tj_icon1.png'
import tj_icon2 from '../../assets/img/tj_icon2.png'
import tj_icon3 from '../../assets/img/tj_icon3.png'
import tj_icon4 from '../../assets/img/tj_icon4.png'
import tj_icon5 from '../../assets/img/tj_icon5.png'
import tj_icon6 from '../../assets/img/tj_icon6.png'
import tj_icon7 from '../../assets/img/tj_icon7.png'
import tj_icon8 from '../../assets/img/tj_icon8.png'
export const GRID_INFO = [
  {
    id: 1,
    name: '预约挂号',
    icon: tj_icon7,
    route: '/home/selectMedicalCard'
  },
  {
    id: 2,
    name: '预约记录',
    icon: tj_icon8,
    route: '/home/reservationRecord'
  },
  {
    id: 3,
    name: '一键导航',
    icon: tj_icon2,
    route: '/home/map'
  },
  {
    id: 4,
    name: '一键拨号',
    icon: tj_icon4,
    route: false,
    click: () => {
      window.location.href = 'tel:4000-000-000'
    }
  },
  {
    id: 5,
    name: '医院介绍',
    icon: tj_icon3,
    route: '/home/hospitalIntroduction'
  },
  {
    id: 6,
    name: '科室介绍',
    icon: tj_icon1,
    route: '/home/department'
  },
  {
    id: 7,
    name: '住院须知',
    icon: tj_icon5,
    click: () => {
      Modal.show({
        title: '住院须知',
        content: (
          <div>
            <div>一、住院流程</div>
            <p>
              1.护士电话通知患者入院时间及入院须知，病人按约定时间到其病房找护士领取入院通知单(入院通知单上由科室医务人员签字并标注住院日期)。
            </p>
            <p>
              {' '}
              2.患者/家属(除心脏中心、呼吸科)持入院通知单、身份证、医保卡/京医通卡到患者服务中心完善信息并在入院通知单上加盖公章(工作时间：工作日上午8:00-12:00;下午13:00-16:30)。
            </p>
            <p>
              {' '}
              3.患者/家属持加盖公章的入院通知单、医保卡/京医通卡到住院二部东侧大厅②、③窗口办理入院手续(心脏中心、呼吸科患者从护士站领取住院通知单到心脏中心缴费窗口办理入院手续)，并发放患者腕带(心脏中心、呼吸科患者由病房发放)，押金收据要求患者妥善保管，出院结算时凭押金收据办理出院结算手续(如刷卡预付预交金需持原交易银行卡办理退费)。
            </p>

            <div>二、住院管理须知</div>
            <p>
              1.病房探视时间：每周一至周五下午14:00-17:00，周六、日上午9:00-11:00，下午14:00-17:00。其他时间谢绝探视。探视时间疫情防控要求动态调整。
            </p>
            <p>
              2.不随便出医院大门，若有特殊情况需外出，须向病房主管医师及护士长请假，并办理相关手续。未经同意私自外出，或请假逾期不归，医院将按病人主动出院办理，且一切后果由病人自负。
            </p>
            <p>
              3.保持医院环境卫生，病人及亲属不得在公共场所吸烟、饮酒，不乱扔果皮纸屑，请不要随地吐痰，按医务人员指导将生活垃圾放入黑色垃圾袋内，将医疗垃圾放入黄色垃圾袋内。病房内物品摆放整齐，自觉维护良好的休养环境。
            </p>
            <p>
              4.治疗上听从医护人员指导，不私自请医生会诊，不私自用药，对诊断、治疗有异议请与主管医师及时沟通。
            </p>
            <p>
              5.保持病区安静，遵守公共道德和医院工作秩序，不在病区内喧哗，走路、开关门窗要轻，听收音机请用耳机，不干扰他人休息。
            </p>
            <p>6.爱护公物，不攀折花木，损坏或丢失公物要照价赔偿。</p>
            <p>
              7.住院病人须穿医院的病员服，不进入写有“病人止步”牌范围内及职工生活区。
            </p>
            <p>8.请不要串病房，不随便进入医护人员办公室，严禁翻阅病历。</p>
            <p>9.病房内请不要使用电炉、煤油炉、酒精炉等电热器。</p>
            <p>
              10.请将贵重物品、现金、有价证券等随身携带，不要存放于病房内，防止被盗。
            </p>
            <p>
              11.遇有突发事件，服从医院统一安排，配合做好病、伤员的抢救和转运工作。
            </p>
          </div>
        ),
        showCloseButton: true,
        closeOnMaskClick: true
      })
    }
  },
  {
    id: 8,
    name: '投诉反馈',
    icon: tj_icon6
  }
]
