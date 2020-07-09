import axios from '@/config/httpConfig'
import qs from 'qs'
import {toFormData} from "@/utils/common.js"
// 终端管理-主列表页
export function findByPage(data) {
  return axios.post(`/adm/hospital/findByPage`,toFormData(data))
}
// 终端保存
export function savePosition(data) {
  return axios.post(`/adm/hospital/saveHospital`,data)
}
// 草稿保存
export function saveDraftPosition(data) {
  return axios.post(`/adm/hospitalDraft/saveHospitalDraft`,data)
}
// 终端管理提交
export function submitPosition(data) {
  return axios.post(`/adm/hospital/submitHospital`,data)
}
// 草稿提交
export function submitDraftPosition(data) {
  return axios.post(`/adm/hospitalDraft/submitHospitalDraft`,data)
}
//终端管理主页详情
export function getPositionDetail(data) {
  return axios.post(`/adm/hospital/findById`,toFormData(data))
}

// 终端管理-草稿列表
export function findByPageDraft(data) {
  return axios.post(`/adm/hospitalDraft/findByPage`,toFormData(data))
}
//终端管理 草稿详情
export function getPositionDetailDraft(data) {
  return axios.post(`/adm/hospitalDraft/findById`,toFormData(data))
}

// 根据code获取字典表数据
export function getSysConfigByCode(data) {
  return axios.post(`/customer/SysConfig/getSysConfigByCodeList`,toFormData(data))
}

// 获取产品下拉框数据
export function getProductList(data) {
  return axios.post(`/adm/hospital/getProductList`,toFormData(data))
}
// 查询终端名称是否重复
export function isRepeatByName(data) {
  return axios.post(`/adm/hospital/isRepeatByName`,toFormData(data),{isShowLoading:false})
}

//终端管理主页详情view
export function getHospitalDetail(data) {
  return axios.post(`/adm/hospital/getHospitalDetail`,toFormData(data))
}
//终端管理草稿详情view
export function getHospitalDraft(data) {
  return axios.post(`/adm/hospitalDraft/getHospitalDetail`,toFormData(data))
}