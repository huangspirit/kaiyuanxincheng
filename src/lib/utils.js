import Cookies from 'js-cookie'
// 大搜索跳转
export const SearchJump = (tag) => {
    let tags = ''
    switch (tag) {
        // 品牌
        case 'brand':
            tags = '/BrandDetail'
            break
            // 一级分类
        case 'undirect':
            tags = '/BrandDetail/Undirect'
            break
            // 二级分类
        case 'direct':
            tags = '/BrandDetail/Direct'
            break
            // 产品详情
        case 'goodsinfo':
            tags = '/BrandDetail/GoodsDetails'
            break
    }
    return tags
}

// 毫秒转化正常日期格式
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate()<10?'0'+date.getDate():date.getDate(),
        'h+': date.getHours()<10?'0'+date.getHours():date.getHours(),
        'm+': date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
        's+': date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
};
// 本地存储
export const setToken = (tokenName = 'token', token) => {
    Cookies.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
    return Cookies.get(tokenName)
}

export const setTitle = (title) => {
    window.document.title = title || '大麦晶城'
}
// 时间格式化（不带时秒分）
export const TimeForma3 = (value) => {
    let date = new Date(value)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    return y + '-' + MM 
}
// 时间格式化（不带时秒分）
export const TimeForma10 = (value) => {
   
    // let   date = new Date(value.replace(/-/g, "/"));
    var dataee=new Date(value).toJSON();
var date = new Date(+new Date(dataee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

return date.split(" ")[0];
    // let y = date.getFullYear()
    // let MM = date.getMonth() + 1
    // MM = MM < 10 ? '0' + MM : MM
    // let d = date.getDate()
    // d = d < 10 ? '0' + d : d
    // let h = date.getHours()
    // h = h < 10 ? '0' + h : h
    // let m = date.getMinutes()
    // m = m < 10 ? '0' + m : m
    // let s = date.getSeconds()
    // s = s < 10 ? '0' + s : s
    // return y + '-' + MM + '-' + d 
}
// 时间格式化（不带时秒分）
export const TimeForma = (value) => {
    let date = new Date(value)
    console.log(date)
    if(!date){
         date = new Date((value.replace(/-/g, "/")));
    }
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let m = date.getMinutes()
    m = m < 10 ? '0' + m : m
    let s = date.getSeconds()
    s = s < 10 ? '0' + s : s
    return y + '-' + MM + '-' + d 
}
// 时间格式化（带时秒分）
export const TimeForma2 = (value) => {
    let date = new Date(value)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let m = date.getMinutes()
    m = m < 10 ? '0' + m : m
    let s = date.getSeconds()
    s = s < 10 ? '0' + s : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
}
// 中国标准时间转化为---格式日期
function formatTen(num) {
    return num > 9 ? (num + '') : ('0' + num)
}
export function formatDateTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    // var hour = date.getHours()
    // var minute = date.getMinutes()
    // var second = date.getSeconds()
    return year + '-' + formatTen(month) + '-' + formatTen(day)
}
// element 数字输入框的验证的验证
export const checkAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error(`输入框的值不能为空!`))
    }
    if (!Number.isInteger(value)) {
        callback(new Error('请输入数字'))
    } else {
        if (value > 30 || value < 1) {
            callback(new Error(`输入框的值的范围为1到30天`))
        } else {
            callback()
        }
    }
};
export function ladderPrice(value,priceunit) {
    var arr = value.split('@')
    var array = []
    let leng=priceunit?3:2
    for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split('-')
        array.push({
            num: arr1[0],
            price: Number(arr1[1]).toFixed(leng)
        })
    }
    return array
}
export function formatAllDate(value, remark) {
    
    if(typeof(value) == 'number') {
        value = new Date(value)
    }else{
        value = new Date(value)
    }
   
    let y = value.getFullYear()
    let MM = value.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = value.getDate()
    d = d < 10 ? '0' + d : d
    let h = value.getHours()
    h = h < 10 ? '0' + h : h
    let m = value.getMinutes()
    m = m < 10 ? '0' + m : m
    let s = value.getSeconds()
    s = s < 10 ? '0' + s : s
    var date1 = y + remark + MM + remark + d 
    var date2 = y + remark + MM + remark + d + ' ' + h + ':' + m + ':' + s
    return [date1, date2]
}
