// 审核管理
import axios from '@/config/httpConfig'
import axios2 from 'axios'
import {toFormData} from "@/utils/common.js"
// 审核管理-我提交的
export function findMyFlow(data) {
  return axios.post('/adm/audit/findMyFlow',toFormData(data))
}

// 审核管理-我审核的
export function findMyTask(data) {
  return axios.post('/adm/audit/findMyTask',toFormData(data))
}

// 审审核管理-同意/拒绝
export function taskAudit(data) {
  return axios.post('/adm/audit/taskAudit',toFormData(data))
}

// 审核管理-撤销
export function deleteProcessInstanceById(data) {
  return axios.post('/adm/audit/deleteProcessInstanceById',toFormData(data))
}

// 审核管理-查看流程图
export function graphHistoryProcessInstance(processInstanceId) {
  return axios2.post(`/api-bpm-wf/flow/bpm/graphHistoryProcessInstance?processInstanceId=16e6d416-bcff-11ea-ab82-0242ac110003`)
}
// 审核管理-终端详情
export function getDetailById(data){
  return axios.post(`/adm/hospital/getDetailById`,toFormData(data))
}
// 审核管理-客户详情
export function getCustomerDetailById(data){
  return axios.post(`/adm/customer/getDetailById`,toFormData(data))
}
//获取审核主题下拉数据
export function getAuditDropList(data){
  return axios.post(`/adm/audit/getProcessDefList`,toFormData(data))
}