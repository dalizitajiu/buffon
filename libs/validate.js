const { ArgsError } = require("./error")



function requireGt(raw, target) {
    //大于
    raw = requireNotNull(raw)
    let temp = parseInt(raw)
    if (temp.toString() == "NaN") {
        throw new ArgsError(`${raw} is not number`)
    }
    let temptarget = parseInt(target)
    if (temptarget.toString() == "NaN") {
        throw new ArgsError(`${target} is not number`)
    }
    if (temp < temptarget) {
        throw new ArgsError(`arg value ${temp} is less than target ${temptarget}`)
    }
    return temp
}

function requireLt(raw, target) {
    //小于
    raw = requireNotNull(raw)
    let temp = parseInt(raw)
    if (temp.toString() == "NaN") {
        throw new ArgsError(`${raw} is not number`)
    }
    let temptarget = parseInt(target)
    if (temptarget.toString() == "NaN") {
        throw new ArgsError(`${target} is not number`)
    }
    if (temp > temptarget) {
        throw new ArgsError(`arg value ${temp} is less than target ${temptarget}`)
    }
    return temp
}

function requireLengthBetween(raw, min, max) {
    raw = requireNotNull(raw)
    let tp = typeof (raw)
    if (tp == "undefined" || tp == "null") {
        throw new ArgsError(`${raw} is not number`)
    }
    let temp = raw.toString()
    if (temp.length < min || temp.length > max) {
        throw new ArgsError(`arg length is between ${min} and ${max}`)
    }
    let tempmin = parseInt(min)
    if (tempmin.toString() == "NaN") {
        throw new ArgsError(`${min} is not number`)
    }
    let tempmax = parseInt(max)
    if (tempmax.toString() == "NaN") {
        throw new ArgsError(`${max} is not number`)
    }
    return raw
}
function requireInArray(raw, tarray) {
    // let tp =typeof(tarray)
    raw = requireNotNull(raw)
    if (!Array.isArray(tarray)) {
        throw new ArgsError(`${tarray} is not array`)
    }
    if (!tarray.includes(raw)) {
        throw new ArgsError(`invalid arg ${raw}`)
    }
    return raw
}
function requireNotNull(raw) {
    let tp = typeof (raw)
    if (tp == "undefined" || tp == "null") {
        throw new ArgsError(`no need arg`)
    }
    let temp = raw.toString()
    if (raw.trim().length == 0) {
        throw new ArgsError(`no need arg`)
    }
    return temp
}
module.exports = {
    requireNotNull,
    requireGt,
    requireLt,
    requireInArray,
    requireLengthBetween
}