import axios from '@/config/httpConfig'
import axios2 from 'axios'
import {toFormData} from "@/utils/common.js"
// 岗位列表接口
export function findByPage(data) {
  return axios.post(`/adm/jobs/findByPage`,toFormData(data))
}
// 新建岗位接口
export function createPosition(data) {
  return axios.post(`/adm/jobs/add`,toFormData(data))
}
// 编辑岗位接口
export function editePosition(data) {
  return axios.post(`/adm/jobs/edit`,toFormData(data))
}
// 查询详情岗位接口
export function getPositionDetail(data) {
  return axios.post(`/adm/jobs/findById`,toFormData(data))
}
// 获取组织
export function getOrgnizationList(data) {
  return axios.post(`/adm/jobs/getDeptList`,toFormData(data))
}
// 更改状态
export function updateStatus(data) {
  return axios.post(`/adm/jobs/updateStatus`,toFormData(data))
}

// 获取用户
export function getUserListList(data) {
  return axios.post(`/adm/jobs/getUserList`,toFormData(data))
}