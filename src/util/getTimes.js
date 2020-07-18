
const getTimes = () => {
    const now = new Date()
    return now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'.'+now.getMilliseconds()
}

function getDates(pSeparador='-') {
    if(pSeparador !== '-' && pSeparador !== '/' ) { return 'separador debe ser / o -' }
    
    const now = new Date()
    return now.getDate() + pSeparador + (now.getMonth()+1).toString() + pSeparador + now.getFullYear()
    // now.getDate() + pSeparador + now.getMonth() + pSeparador + now.getFullYear()
}

exports.getTimes = getTimes
exports.getDates = getDates