const utils = {
    getContent: (str) => {
        if (!str) return
        let result = ''
        let flag = false
        for (let char of str) {
            if (char === '>') {
                flag = true
            }
            if (char === '<') {
                flag = false
            }
            if (flag && char !== '>') {
                result = result + char
            }
        }
        return result
    },
    /**
     * 前边补0
     * @param {*} num 
     * @param {*} n 
     * @returns 
     */
    PrefixInteger: (num, n = 6) => {
        return (Array(n).join(0) + num).slice(-n);
    },

    addDate: (time) => {
        if (time.toString().length === 1) {
            time = "0" + time.toString();
        }
        return time;
    },
    getWeekDay: () => {
        let week = []
        for (var i = 0; i <= 7; i++) {
            var weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]//星期映射数组
            var myDate = new Date()
            var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
            var newMyDate = new Date(milliseconds);
            var weekDay = newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            var year = newMyDate.getFullYear();//获取当前年
            var month = utils.addDate(newMyDate.getMonth() + 1);//获取当前月
            var day = utils.addDate(newMyDate.getDate());//获取当前日
            let item = {
                time: year + '-' + month + '-' + day,
                week: weekDayArr[weekDay]
            }
            week.push(item)
        }
        return week
    }



}
export default utils