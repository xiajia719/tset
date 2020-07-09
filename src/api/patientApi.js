// 患者管理模块接口
import axios from '@/config/httpConfig'
import axios2 from 'axios'

// 患者详情信息
export function getPatientInfo(id) {
    return axios2.post(`/api-crm-member/crmMemberInfo/detail?id=${id}`)
}

// 获取疗程下拉框选项
export function getConfigByCode() {
    return axios2.get(`/api-crm-member/crmComboxSysconfig/getConfigByCode`)
}

// 批量删除患者信息
export function delPatient(ids) {
    return axios2.post(`/api-crm-member/crmMemberInfo/del?ids=${ids}`)
}

// 获取患者信息列表
export function getPatientInfoList({userId,deptId,memberName,productName,userName,customerName,pageNum,pageSize,getType}) {
    const userIdVal = userId === '' ? '' : `&userId=${userId}`
    const deptIdVal = deptId === '' ? '' : `&deptId=${deptId}`
    const memberNameVal = memberName === '' ? '' : `&memberName=${memberName}`
    const productNameVal = productName === '' ? '' : `&productName=${productName}`
    // const jobIdVal = jobId === '' ? '' : `&jobId=${jobId}`
    const userNameVal = userName === '' ? '' : `&userName=${userName}`
    const customerNameVal = customerName === '' ? '' : `&customerName=${customerName}`
    return axios2.post(`/api-crm-member/crmMemberInfo/list?pageNum=${pageNum}&pageSize=${pageSize}&getType=${getType}${userIdVal}${memberNameVal}${customerNameVal}${deptIdVal}${productNameVal}${userNameVal}`)
}

// 新增修改患者信息和疗程信息
export function updatePatientAndTreatment(data) {
    return axios2.post('/api-crm-member/crmMemberInfo/update',data)
}

// 获取医生，产品
export function getCustomerBindProduct({userId,customerId}) {
    let Id = ''
    if(userId == ''){
        Id = `?customerId=${customerId}`
    }else if(customerId == ''){
        Id = `?userId=${userId}`
    }
    return axios2.post(`/api-crm-member/crmcustomer/getCustomerBindProduct${Id}`)
}

// 新增疗程
export function insertTreatment(data) {
    return axios2.post('/api-crm-member/crmmemberprogram/insert',data)
}