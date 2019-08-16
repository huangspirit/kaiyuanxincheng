import Vue from 'vue'
Vue.filter('pointTwo', (value) => {

    if (typeof (value) == 'string') {

    } else {
        return value.toFixed(4)
    }
})
Vue.filter('formatDate', value => {
    var date = new Date(value)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return year + "-" + month + "-" + day + " " + hour + ':' + minute + ':' + second
})
Vue.filter('applyStatus', value => {
    if (value == '1') {
        return '原厂'
    } else if (value == '2') {
        return '代理商'
    } else if (value == '3') {
        return '商城卖家'
    } else if (value == '4') {
        return '月结'
    }
})
Vue.filter('effective', (val, value1) => {
    if (val == true) {
        if (value1 == true) {
            return '已批复'
        } else {
            return '未批复'
        }

    } else {
        return '已失效'
    }

})
// 毫秒转化正常日期格式
const formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
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

// 中国标准时间转化为---格式日期
function formatTen(num) {
    return num > 9 ? (num + '') : ('0' + num)
}
// 时间格式化（不带时秒分）
function formatDateTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    // var hour = date.getHours()
    // var minute = date.getMinutes()
    // var second = date.getSeconds()
    return year + '-' + formatTen(month) + '-' + formatTen(day)
}

// element 数字输入框的验证的验证
const checkAge = (rule, value, callback) => {
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
export default {
    formatDate,
    formatDateTime
}
