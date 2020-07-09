
const Test = () => import('@/pages/Test/test')
// 客户管理
const CustomerManagement = () => import('@/pages/CustomerManagement/CustomerManagement')
const addCustomer = () => import('@/pages/CustomerManagement/addCustomer/addCustomer') // 新建客户
const editCustomer = () => import('@/pages/CustomerManagement/editCustomer/editCustomer') // 编辑客户
const customerInfo = () => import('@/pages/CustomerManagement/customerInfo/customerInfo') // 客户详情
// 患者管理
const PatientManagement = () => import('@/pages/PatientManagement/PatientManagement')
const addPatient = () => import('@/pages/PatientManagement/addPatient/addPatient') // 新建患者
const editPatient = () => import('@/pages/PatientManagement/editPatient/editPatient') // 编辑患者
const PatientInfo = () => import('@/pages/PatientManagement/PatientInfo/PatientInfo') // 患者详情
// 终端管理
const TerminalManagement = () => import('@/pages/TerminalManagement/TerminalManagement')
const TerminalEdite = () => import('@/pages/TerminalManagement/TerminalEdite')
const TerminalView = () => import('@/pages/TerminalManagement/TerminalView')
// 审核管理
const AuditManagement = () => import('@/pages/AuditManagement/AuditManagement')
const NewApprovalInfo = () => import('@/pages/AuditManagement/newApprovalInfo/newApprovalInfo')
const EditApprovalInfo = () => import('@/pages/AuditManagement/editApprovalInfo/editApprovalInfo')
//岗位管理
const PositionManagement = () => import('@/pages/PositionManagement')
const PositionEdte = () => import('@/pages/PositionManagement/PositionEdte')
const PositionView = () => import('@/pages/PositionManagement/PositionView')
/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/CustomerManagement',
        component: CustomerManagement,
        name: 'CustomerManagement',
        meta: {
            name: '客户管理',
            icon: 'clientManage',
            noShowChildren: true
        },
        children:[
            {
                path: 'addCustomer',
                component: addCustomer,
                name: 'addCustomer',
                meta: {
                    name: '新建客户',
                    fatherName:'CustomerManagement'
                }
            },
            {
                path: 'editCustomer/:type/:id',
                component: editCustomer,
                name: 'editCustomer',
                meta: {
                    name: '编辑客户',
                    fatherName:'CustomerManagement'
                }
            },
            {
                path: 'customerInfo/:type/:id',
                component: customerInfo,
                name: 'customerInfo',
                meta: {
                    name: '客户详情',
                    fatherName:'CustomerManagement'
                }
            }
        ]
    },
    {
        path: '/PatientManagement',
        component: PatientManagement,
        name: 'PatientManagement',
        meta: {
            name: '患者管理',
            icon: 'patientManage',
            noShowChildren: true
        },
        children:[
            {
                path: 'addPatient',
                component: addPatient,
                name: 'addPatient',
                meta: {
                    name: '新增患者',
                    fatherName:'PatientManagement'
                }
            },
            {
                path: 'editPatient/:mid',
                component: editPatient,
                name: 'editPatient',
                meta: {
                    name: '编辑患者',
                    fatherName:'PatientManagement'
                }
            },
            {
                path: 'PatientInfo/:mid',
                component: PatientInfo,
                name: 'PatientInfo',
                meta: {
                    name: '患者详情',
                    fatherName:'PatientManagement'
                }
            }
        ]
    },
    {
        path: '/TerminalManagement',
        component: TerminalManagement,
        name: 'TerminalManagement',
        meta: {
            name: '终端管理',
            icon: 'terminalManage',
            noShowChildren: true
        },
        children:[
            {
                path:'TerminalCreate',
                component: TerminalEdite,
                name: 'TerminalCreate',
                meta: {
                    name: '新建',
                    fatherName:'TerminalManagement'
                }
            },
            {
                path:'TerminalEdite/:id/:type',
                component: TerminalEdite,
                name: 'TerminalEdite',
                meta: {
                    name: '编辑',
                    fatherName:'TerminalManagement'
                }
            },
            {
                path:'TerminalView/:id/:type/:userId',
                component: TerminalView,
                name: 'TerminalView',
                meta: {
                    name: '终端详情',
                    fatherName:'TerminalManagement'
                }
            }
        ]
    },
    {
        path: '/AuditManagement',
        component: AuditManagement,
        name: 'AuditManagement',
        meta: {
            name: '审核管理',
            icon: 'checkManage',
            noShowChildren: true
        },
        children:[
            {
                path: 'newApprovalInfo',
                component: NewApprovalInfo,
                name: 'newApprovalInfo',
                meta: {
                    name: '审批信息',
                    fatherName:'AuditManagement'
                }
            },
            {
                path: 'editApprovalInfo/:id/:userId',
                component: EditApprovalInfo,
                name: 'editApprovalInfo',
                meta: {
                    name: '审批信息',
                    fatherName:'AuditManagement'
                }
            },
            {
                path: 'approvalPreview/:id/:type/:userId',
                component: TerminalView,
                name: 'approvalPreview',
                meta: {
                    name: '审批信息',
                    fatherName:'AuditManagement'
                }
            }
        ]
    },
    {
        path: '/PositionManagement',
        component: PositionManagement,
        name: 'PositionManagement',
        meta: {
            name: '岗位管理',
            icon: 'positionManage',
            noShowChildren: true
        },
        children:[
            {
                path: 'PositionCreate',
                component: PositionEdte,
                name: 'PositionCreate',
                meta: {
                    name: '新建岗位',
                    fatherName:'PositionManagement'
                }
            },
            {
                path: 'PositionEdite/:id',
                component: PositionEdte,
                name: 'PositionEdite',
                meta: {
                    name: '编辑岗位',
                    fatherName:'PositionManagement'
                }
            },
            {
                path: 'PositionView/:id',
                component: PositionView,
                name: 'PositionView',
                meta: {
                    name: '岗位详情',
                    fatherName:'PositionManagement'
                }
            }
        ]
    },
    {
        path: '/Test',
        component: Test,
        name: 'Test',
        meta: {
            name: '测试'
        }
    }
]

export default dynamicRoutes