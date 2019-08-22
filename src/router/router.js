//import Home from '@/views/Home'
import Index from "@/views/Index"
export default [
    // 首页
    // {
    //     path: '/',
    //     name: 'home',
    //     component: Home,
    //     meta: {
    //         title: '首页'
    //     }
    // },
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: '首页',

        }
    },
    //商品详情
    {
        path: '/sellerGoodsDetail',
        name: 'sellerGoodsDetail',
        component: () => import('@/views/sellerGoodsDetail'),
        meta: {
            title: '商品详情'
        }
    },
    //现货特价
    {
        path: '/specialPrice',
        name: 'specialPrice',
        component: () => import('@/views/specialPrice'),
        meta: {
            title: '现货特价'
        }
    },
    //订货拼单
    {
        path: '/order',
        name: 'order',
        component: () => import('@/views/futures'),
        meta: {
            title: '订货拼单'
        }
    },
    //呆料掘金
    {
        path: '/oldGoods',
        name: 'oldGoods',
        component: () => import('@/views/oldGoods'),
        meta: {
            title: '呆料掘金'
        }
    },
    // 原厂直销
    {
        path: '/Brand',
        name: 'Brand',
        component: () => import('@/views/Brand'),
        meta: {
            title: '原厂直销'
        }
    },
    // 询价篮
    {
        path: '/InquiryBasket',
        redirect: '/InquiryBasket/Inquiry/waitInquiry',
        component: () => import('@/views/InquiryBasket'),
        meta: {
            requireAuth: true,
            title: '询价篮'
        },
        children: [
            // 待询价
            {
                path: 'Inquiry',
                name: 'Inquiry',
                component: () => import('@/views/InquiryBasket/Inquiry'),
                children: [{
                        path: 'waitInquiry',
                        name: 'waitInquiry',
                        component: () => import('@/views/InquiryBasket/WaitInquiry'),
                        meta: {
                            requireAuth: true,
                            title: '待询价'
                        },
                    }, // 已询价
                    {
                        path: 'AlreadyInquiry',
                        name: 'AlreadyInquiry',
                        redirect: '/allApply',
                        component: () => import('@/views/InquiryBasket/AlreadyInquiry'),
                        meta: {
                            requireAuth: true,
                            title: '已询价'
                        },
                        children: [{
                            path: '/allApply',
                            name: 'allApply',
                            component: () => import('@/views/InquiryBasket/AlreadyInquiry/allReply.vue'),
                            meta: {
                                requireAuth: true,
                                title: '全部待批复'
                            },
                        }, {
                            path: '/userNotice',
                            name: 'userNotice',
                            component: () => import('@/views/InquiryBasket/AlreadyInquiry/userNotice.vue'),
                            meta: {
                                requireAuth: true,
                                title: '用户提醒'
                            },
                        }, {
                            path: '/alreadyReply',
                            name: 'alreadyReply',
                            component: () => import('@/views/InquiryBasket/AlreadyInquiry/alreadyReply.vue'),
                            meta: {
                                requireAuth: true,
                                title: '已批复'
                            },
                        }, {
                            path: '/alreadyOverdue',
                            name: 'alreadyOverdue',
                            component: () => import('@/views/InquiryBasket/AlreadyInquiry/alreadyOverdue.vue'),
                            meta: {
                                requireAuth: true,
                                title: '已过期'
                            },
                        }]
                    },
                ]
            },

            // 申请特价
            {
                path: 'ApplySpecialPrice',
                name: 'ApplySpecialPrice',
                component: () => import('@/views/InquiryBasket/ApplySpecialPrice'),
                meta: {
                    requireAuth: true,
                    title: '申请特价'
                }
            }
        ]
    },
    // 购物车
    {
        path: '/ShoppingCart',
        name: 'ShoppingCart',
        component: () => import('@/views/ShoppingCart'),
        meta: {
            requireAuth: true,
            title: '购物车'
        },
        children: [{
                path: '/',
                name: 'ShoppingCartSelect',
                component: () => import('@/views/ShoppingCart/ShoppingCartSelect'),
                meta: {
                    requireAuth: true,
                    title: '购物车'
                }
            },
            {
                path: 'ShoppingSettlement',
                name: 'ShoppingSettlement',
                component: () => import('@/views/ShoppingCart/ShoppingSettlement'),
                meta: {
                    requireAuth: true,
                    title: '结算页面'
                }
            },
            {
                path: 'SignContract',
                name: 'SignContract',
                component: () => import('@/views/ShoppingCart/SignContract'),
                meta: {
                    requireAuth: true,
                    title: '签署合同'
                }
            },
            // 支付订单
            {
                path: 'PaymentOrders',
                name: 'PaymentOrders',
                component: () => import('@/views/ShoppingCart/PaymentOrders'),
                meta: {
                    requireAuth: true,
                    title: '支付订单'
                }
            }
        ]
    },
    // 原厂入驻
    {
        path: '/OriginalFactoryEntry',
        name: 'OriginalFactoryEntry',
        component: () => import('@/views/OriginalFactoryEntry'),
        meta: {
            requireAuth: true,
            title: '平台入驻'
        },
        children: [{
                path: '/',
                name: 'BasicInforma',
                component: () => import('@/views/OriginalFactoryEntry/BasicInforma'),
                meta: {
                    requireAuth: true,
                    title: '平台入驻（基本信息）',
                    keepAlive: true // 需要被缓存
                }
            },
            {
                path: 'CheckInformation',
                name: 'CheckInformation',
                component: () => import('@/views/OriginalFactoryEntry/CheckInformation'),
                meta: {
                    requireAuth: true,
                    title: '平台入驻信息'
                }
            },
            {
                path: 'TraderCheckInformation',
                name: 'TraderCheckInformation',
                component: () => import('@/views/OriginalFactoryEntry/TraderCheckInformation'),
                meta: {
                    requireAuth: true,
                    title: '平台入驻信息'
                }
            },
            {
                path: 'WaitingAudit',
                name: 'WaitingAudit',
                component: () => import('@/views/OriginalFactoryEntry/WaitingAudit'),
                meta: {
                    requireAuth: true,
                    title: '等待审核'
                }
            },
            {
                path: 'NewBrand',
                name: 'NewBrand',
                component: () => import('@/views/OriginalFactoryEntry/NewBrand'),
                meta: {
                    requireAuth: true,
                    title: '新建品牌'
                }
            }
        ]
    },
    // 消息
    {
        path: '/News',
        name: 'News',
        component: () => import('@/views/News'),
        meta: {
            requireAuth: true,
            title: '消息'
        },
        children: [
            //发货通知
            {
                path: '/',
                name: 'start',
                component: () => import('@/views/News/start/start'),
                meta: {
                    requireAuth: true,
                    title: '消息通知'
                }
            },
            {
                path: 'dg',
                name: 'dg',
                component: () => import('@/views/News/dg/dg'),
                meta: {
                    requireAuth: true,
                    title: '发货通知'
                }
            },
            {
                path: 'inquiry',
                name: 'inquiry',
                component: () => import('@/views/News/inquiry/inquiry'),
                meta: {
                    requireAuth: true,
                    title: '询价通知'
                }
            },
            {
                path: 'sys',
                name: 'sys',
                component: () => import('@/views/News/sys/sys'),
                meta: {
                    requireAuth: true,
                    title: '系统通知'
                }
            },
            {
                path: 'zfs',
                name: 'zfs',
                component: () => import('@/views/News/zfs/zfs'),
                meta: {
                    requireAuth: true,
                    title: '支付通知'
                }
            },
            {
                path: 'auth',
                name: 'auth',
                component: () => import('@/views/News/auth/auth'),
                meta: {
                    requireAuth: true,
                    title: '支付通知'
                }
            },
        ]
    },
    // 登录
    {
        path: '/Login',
        name: 'Login',
        component: () => import('@/views/Login'),
        meta: {
            title: '登录'
        }
    },
    // 品牌详情
    {
        path: '/BrandDetail',
        // name: 'BrandDetail',
        component: () => import('@/views/BrandDetail'),
        meta: {
            title: '品牌详情'
        },
        // 全部品牌详情
        children: [{
                path: '/',
                // name: 'AllBrand',
                component: () => import('@/views/BrandDetail/AllBrand')
            },
            // 一级类商品
            {
                path: 'Undirect',
                name: 'Undirect',
                component: () => import('@/views/BrandDetail/Undirect'),
                meta: {

                    title: '一级类商品'
                }
            },
            // 二级
            {
                path: 'Direct',
                name: 'Direct',
                component: () => import('@/views/BrandDetail/Direct'),
                meta: {

                    title: '二级类商品'
                }
            },
            // 商品详情页
            {
                path: 'GoodsDetails',
                name: 'GoodsDetails',
                component: () => import('@/views/BrandDetail/GoodsDetails'),
                meta: {
                    title: '产品详情'
                }
            },
            // 大搜索内容页面
            {
                path: 'SearchPage',
                name: 'SearchPage',
                component: () => import('@/views/BrandDetail/SearchPage'),
                meta: {

                    title: '搜索'
                }
            }
        ]
    },
    // 个人中心
    {
        path: '/PersonalCenter',
        component: () => import('@/views/PersonalCenter'),
        meta: {
            requireAuth: true,
            title: '个人中心'
        },
        children: [
            // 卖家中心
            {
                path: '',
                component: () => import('@/views/PersonalCenter/PersonalSet'),
                meta: {
                    requireAuth: true,
                    title: '个人中心'
                },

            },
            {
                path: 'sellerDetailList',
                name: 'sellerDetailList',
                component: () => import('@/views/PersonalCenter/PersonalSet/sellerDetailList'),
                meta: {
                    requireAuth: true,
                    title: '售卖明细'
                }
            },
            {
                path: 'vipDetailList',
                name: 'vipDetailList',
                component: () => import('@/views/PersonalCenter/PersonalSet/vipDetailList'),
                meta: {
                    requireAuth: true,
                    title: '月结明细'
                }
            },
            {
                path: 'SellerCenter',
                name: 'SellerCenter',
                component: () => import('@/views/PersonalCenter/SellerCenter'),
                meta: {
                    requireAuth: true,
                    title: '卖家中心'
                }
            },
            // 卖家订单管理
            {
                path: 'SellerOrderManagement',
                name: 'SellerOrderManagement',
                component: () => import('@/views/PersonalCenter/SellerOrderManagement'),
                meta: {
                    requireAuth: true,
                    title: '订单管理'
                },
                children: [{
                    path: 'SellerOrderDetail',
                    name: 'SellerOrderDetail',
                    component: () => import('@/views/PersonalCenter/sellerOrderDetail'),
                    meta: {
                        requireAuth: true,
                        title: '卖家中心'
                    }
                }, ]
            },
            // 卖家商品管理
            {
                path: 'SellerCommodityManagement',
                name: 'SellerCommodityManagement',
                component: () => import('@/views/PersonalCenter/SellerCommodityManagement'),
                meta: {
                    requireAuth: true,
                    title: '商品管理'
                }
            },
            // 卖家发布商品

            {
                path: 'SellerIssuesProduct',
                name: 'SellerIssuesProduct',
                component: () => import('@/views/PersonalCenter/SellerIssuesProduct'),
                meta: {
                    requireAuth: true,
                    title: '发布商品'
                }
            },
            // 卖家发布完成
            {
                path: 'SuccessfulCommodityRelease',
                name: 'SuccessfulCommodityRelease',
                component: () => import('@/views/PersonalCenter/SuccessfulCommodityRelease'),
                meta: {
                    requireAuth: true,
                    title: '发布商品完成'
                }
            },
            // 卖家发布拼团
            {
                path: 'SellerIssuesSyndication',
                name: 'SellerIssuesSyndication',
                component: () => import('@/views/PersonalCenter/SellerIssuesSyndication'),
                meta: {
                    requireAuth: true,
                    title: '发布拼团'
                }
            },
            // 卖家账单中心
            {
                path: 'SellerBillCenter',
                name: 'SellerBillCenter',
                component: () => import('@/views/PersonalCenter/SellerBillCenter'),
                meta: {
                    requireAuth: true,
                    title: '账单中心'
                }
            },
            // 询价单列表
            {
                path: 'inquiryList',
                name: 'inquiryList',
                redirect:"/personalallApply",
                component: () => import('@/views/PersonalCenter/sellerInquiry'),
                meta: {
                    requireAuth: true,
                    title: '询价单列表'
                },
                children: [{
                    path: '/personalallApply',
                    name: 'personalallApply',
                    component: () => import('@/views/PersonalCenter/sellerInquiry/allReply.vue'),
                    meta: {
                        requireAuth: true,
                        title: '全部待批复'
                    },
                }, {
                    path: '/personaluserNotice',
                    name: 'personaluserNotice',
                    component: () => import('@/views/PersonalCenter/sellerInquiry/userNotice.vue'),
                    meta: {
                        requireAuth: true,
                        title: '用户提醒'
                    },
                }, {
                    path: '/personalalreadyReply',
                    name: 'personalalreadyReply',
                    component: () => import('@/views/PersonalCenter/sellerInquiry/alreadyReply.vue'),
                    meta: {
                        requireAuth: true,
                        title: '已批复'
                    },
                }, {
                    path: '/personalalreadyOverdue',
                    name: 'personalalreadyOverdue',
                    component: () => import('@/views/PersonalCenter/sellerInquiry/alreadyOverdue.vue'),
                    meta: {
                        requireAuth: true,
                        title: '已过期'
                    },
                }]
            },
            // 发票管理
            {
                path: 'SellerInvoiceManagement',
                name: 'SellerInvoiceManagement',
                component: () => import('@/views/PersonalCenter/SellerInvoiceManagement'),
                meta: {
                    requireAuth: true,
                    title: '发票管理'
                }
            },
            // 代理资质
            {
                path: 'AgencyQualification',
                name: 'AgencyQualification',
                component: () => import('@/views/PersonalCenter/AgencyQualification'),
                meta: {
                    requireAuth: true,
                    title: '代理资质'
                }
            },
            // 新增资质
            {
                path: 'AdditionalQualifications',
                name: 'AdditionalQualifications',
                component: () => import('@/views/PersonalCenter/AdditionalQualifications'),
                meta: {
                    requireAuth: true,
                    title: '新增资质'
                }
            },
            // 添加代理资质成功
            {
                path: 'SuccessfulAddiQualifica',
                name: 'SuccessfulAddiQualifica',
                component: () => import('@/views/PersonalCenter/SuccessfulAddiQualifica'),
                meta: {
                    requireAuth: true,
                    title: '添加代理资质成功'
                }
            },
            // 新增品牌
            {
                path: 'NewsBrandQualifica',
                name: 'NewsBrandQualifica',
                component: () => import('@/views/PersonalCenter/NewsBrandQualifica'),
                meta: {
                    requireAuth: true,
                    title: '新增品牌'
                }
            },
            // 买家中心
            {
                path: 'BuyerCenter',
                name: 'BuyerCenter',
                component: () => import('@/views/PersonalCenter/BuyerCenter'),
                meta: {
                    requireAuth: true,
                    title: '买家中心'
                }
            },
            // 买家订单
            {
                path: 'BuyerOrderManagement',
                name: 'BuyerOrderManagement',
                component: () => import('@/views/PersonalCenter/BuyerOrderManagement'),
                meta: {
                    requireAuth: true,
                    title: '买家订单'
                }
            },
            // 关注的商品
            {
                path: 'CommoditiesInterest',
                name: 'CommoditiesInterest',
                component: () => import('@/views/PersonalCenter/CommoditiesInterest'),
                meta: {
                    requireAuth: true,
                    title: '关注的商品'
                }
            },
            // 关注的商家
            {
                path: 'MerchantsConcerned',
                name: 'MerchantsConcerned',
                component: () => import('@/views/PersonalCenter/MerchantsConcerned'),
                meta: {
                    requireAuth: true,
                    title: '关注的商家'
                }
            },
            // 买家的账单中心
            {
                path: 'BuyerBillCenter',
                name: 'BuyerBillCenter',
                component: () => import('@/views/PersonalCenter/BuyerBillCenter'),
                meta: {
                    requireAuth: true,
                    title: '账单中心'
                }
            },
            // 买家发票管理
            {
                path: 'BuyerInvoiceManagement',
                name: 'BuyerInvoiceManagement',
                component: () => import('@/views/PersonalCenter/BuyerInvoiceManagement'),
                meta: {
                    requireAuth: true,
                    title: '发票管理'
                }
            },
            // 买家发票开票信息管理
            {
                path: 'InvoiceInformationManagement',
                name: 'InvoiceInformationManagement',
                component: () => import('@/views/PersonalCenter/InvoiceInformationManagement'),
                meta: {
                    requireAuth: true,
                    title: '管理开票信息'
                }
            },
            // 提升等级
            {
                path: 'UpgradeLevel',
                name: 'UpgradeLevel',
                component: () => import('@/views/PersonalCenter/UpgradeLevel'),
                meta: {
                    requireAuth: true,
                    title: '提升等级'
                }
            },
            // 个人设置
            {
                path: 'PersonalSet',
                name: 'PersonalSet',
                component: () => import('@/views/PersonalCenter/PersonalSet'),
                meta: {
                    requireAuth: true,
                    title: '个人资料'
                },
                children:[
                    {
                        path: 'sellerDetailList',
                        name: 'sellerDetailList',
                        component: () => import('@/views/PersonalCenter/PersonalSet/sellerDetailList'),
                        meta: {
                            requireAuth: true,
                            title: '售卖明细'
                        }
                    },
                ]
            },
            // 个人设置
            {
                path: 'deposit',
                name: 'deposit',
                component: () => import('@/views/PersonalCenter/Deposit/Deposit.vue'),
                meta: {
                    requireAuth: true,
                    title: '充值'
                }
            },
            // 个人资料
            {
                path: 'PersonalData',
                name: 'PersonalData',
                component: () => import('@/views/PersonalCenter/PersonalData'),
                meta: {
                    requireAuth: true,
                    title: '个人资料'
                }
            },
            // 账户余额
            {
                path: 'AccountBalance',
                name: 'AccountBalance',
                component: () => import('@/views/PersonalCenter/AccountBalance'),
                meta: {
                    requireAuth: true,
                    title: '账户余额'
                }
            },
            // 申请结果
            {
                path: 'GetVipApplyDetail',
                name: 'GetVipApplyDetail',
                component: () => import('@/views/PersonalCenter/GetVipApplyDetail'),
                meta: {
                    requireAuth: true,
                    title: '申请列表'
                }
            },
            // 信誉额
            {
                path: 'CredibiliForehead',
                name: 'CredibiliForehead',
                component: () => import('@/views/PersonalCenter/CredibiliForehead'),
                meta: {
                    requireAuth: true,
                    title: '信誉额'
                }
            },
            // 收货地址
            {
                path: 'ShippingAddress',
                name: 'ShippingAddress',
                component: () => import('@/views/PersonalCenter/ShippingAddress'),
                meta: {
                    requireAuth: true,
                    title: '收货地址'
                }
            },
            // 个人发票
            {
                path: 'PersonalInvoice',
                name: 'PersonalInvoice',
                component: () => import('@/views/PersonalCenter/PersonalInvoice'),
                meta: {
                    requireAuth: true,
                    title: '个人发票'
                }
            },
            // 账号绑定
            // {
            //   path: 'AccountBind',
            //   name: 'AccountBind',
            //   component: () => import('@/views/PersonalCenter/AccountBind'),
            //   meta: {
            //     requireAuth: true,
            //     title: '账号绑定'
            //   }
            // },
            // 更改密码
            {
                path: 'ChangePassword',
                name: 'ChangePassword',
                component: () => import('@/views/PersonalCenter/ChangePassword'),
                meta: {
                    requireAuth: true,
                    title: '更改密码'
                }
            },
            // 提醒设置
            {
                path: 'RemindSet',
                name: 'RemindSet',
                component: () => import('@/views/PersonalCenter/RemindSet'),
                meta: {
                    requireAuth: true,
                    title: '提醒设置'
                }
            }
        ]
    }

]
