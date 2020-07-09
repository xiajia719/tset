// 客户管理-获取客户列表
import axios from '@/config/httpConfig'
import axios2 from 'axios'
import {toFormData} from "@/utils/common.js"
// 客户管理-获取客户列表
export function getCustomerList(data) {
  return axios.post('/adm/customer/findByPage',data)
}

// 客户管理-获取客户列表-草稿箱
export function getCustomerDraftList(data) {
  return axios.post('/adm/customerDraft/findByPage',data)
}

// 客户管理-根据id获取客户详情
export function getCustomerInfoById(id) {
  return axios.post(`/adm/customer/findById?id=${id}`)
}

// 客户管理-根据名称获取客户详情
export function getCustomerInfoByName(cname) {
  return axios.post(`/adm/customer/getCustomerByName?cname=${cname}`)
}

// 获取产品下拉框数据
export function getProductList({pageNum,pageSize,name}) {
  const nameVal = name === '' ? '' : `?name=${name}`
  return axios.post(`/adm/hospital/getProductList?pageNum=${pageNum}&pageSize=${pageSize}${nameVal}`)
}

// 获取终端信息-下拉框
export function getHospitalList(name) {
  const nameVal = name === '' ? '' : `?name=${name}`
  return axios.post(`/adm/hospital/getHospitalList${nameVal}`)
}

// 获取终端信息-下拉框
export function isDutyDept() {
  return axios2.post(`/api-crm-customer/adm/customer/isDutyDept`)
}

// 根据code获取字典表数据
export function getSysConfigByCodeList(code) {
  return axios.post(`/customer/SysConfig/getSysConfigByCodeList?code=${code}`)
}

// 客户管理-新增拜访
export function addCustomerVisit(data) {
  return axios.post(`/adm/customer/addCustomerVisit`,data)
}

// 客户管理-获取拜访信息
export function getCustomerVisitList(customerId) {
  return axios.post(`/adm/customer/getCustomerVisitList?customerId=${customerId}`)
}

// 客户管理-主列表页提交客户
export function submitCustomer(data) {
  return axios.post('/adm/customer/submitCustomer',data)
}

// 客户管理-主列表页保存客户
export function saveCustomer(data) {
  return axios.post('/adm/customer/saveCustomer',data)
}

// 草稿页面-草稿-保存
export function submitCustomerInDraft(data) {
  return axios.post(`/adm/customerDraft/submitCustomerDraft`,data)
}

// 草稿页面-草稿-保存
export function saveCustomerInDraft(data) {
  return axios.post(`/adm/customerDraft/saveCustomerDraft`,data)
}

// 客户管理-主列表-详情页面
export function findDetailById(id) {
  return axios.post(`/adm/customer/findDetailById?id=${id}`)
}

// 草稿页面-主列表-详情页面
export function findDetailByIdInDraft(id) {
  return axios.post(`/adm/customerDraft/findDetailById?id=${id}`)
}

// 草稿页面-主列表-详情页面(获取的是id)
export function findByIdInDarft(id) {
  return axios.post(`/adm/customerDraft/findById?id=${id}`)
}

// 客户管理-重分配得到组织架构数据
export function getReAllocationUsers(data) {
  return axios.post('/adm/customer/getReAllocationUsers',toFormData(data))
}

// 重分配获取代表信息
export function getUsersByCustomerId(id) {
  return axios.post(`/adm/customer/getUsersByCustomerId?id=${id}`)
}

// 重分配提交
export function saveReAllocation(customerId,userIds) {
  return axios.post(`/adm/customer/saveReAllocation?customerId=${customerId}&userIds=${userIds}`)
}

// 获取审批信息
export function getProcessInstanceDetail(data) {
  return axios.post(`/adm/customer/getProcessInstanceDetail`,toFormData(data))
}