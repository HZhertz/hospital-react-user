import Cookie from "js-cookie"
/**
 * 设置cookie
 * @param {string} name 
 * @param {string} value 
 */
export function setCookie(name, value) {
    Cookie.set(name, value)
}
/**
 * 获取cookie
 * @param {string} name 
 * @returns 
 */
export function getCookie(name) {
    return Cookie.get(name)
}
/**
 * 移除cookie
 * @param {string} name 
 */
export function removeCookie(name) {
    Cookie.remove(name)
}
