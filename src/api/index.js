// 公共栏目模块接口
import axios from '@/config/httpConfig'
import axios2 from 'axios'

// 登录接口
export function login2(data) {
    let obj = new FormData()
    obj.append('account', btoa(data.account))
    obj.append('password', btoa(data.password))
    obj.append('accountType',1)
    obj.append('encrypr', 1)
    // return axios2.post(`/api-com-sso/usr/login?account=${data.account}&password=${data.password}&accountType=${data.accountType}`)
    return axios2.post(`/api-com-sso/usr/login`, obj)
}

// ---------------组织架构页面
export function getBookList({deptId,name,roleId,tagId}) {
    const nameVal = name === undefined ? '' : `&name=${name}`
    const roleIdVal = roleId === undefined ? '' : `&roleId=${roleId}`
    const tagIdVal = tagId === undefined ? '' : `&tagId=${tagId}`
    return axios2.get(`/api-app-org/zyb/usruser/orgList?deptId=${deptId}${nameVal}${roleIdVal}${tagIdVal}`)
}
// 文件上传
export function upLoadFile({module,file}) {
    return axios.post(`/adm/article/files?module=${module}&file=${file}`)
}
// 文件上传oss
export function upLoadFileToOss(data) {
    return axios2.post(`/api-com-oss/web/common-file/upload-file-web`,data,{timeout: 10000})
}