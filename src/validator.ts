export const required = (value: any): boolean | string => {
  console.log('value', value)
  return value ? true : '* Required'
}
export const requiredAmount = (value: any): boolean | string => {
    console.log('value', value)
    return value && value != '0,00' ? true : '* Required'
  }

export const password = (pass: string): boolean | string => {
  const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  if (validate.test(pass)) {
    return true
  }
  return 'Format password inavlid'
}
export const email = (email: string): boolean | string => {
  const validate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (validate.test(email)) {
    return true
  }
  return 'Format email invalid'
}
export const onlyLetters = (email: string): boolean | string => {
  const validate = /^[A-ZÁÉÍÓÚÑ ]+$/i
  if (validate.test(email)) {
    return true
  }
  return 'Only letters'
}
export const onlyNumbers = (number: string): boolean | string => {
  const validate = /^[0-9 ]+$/i
  if (validate.test(number)) {
    return true
  }
  return 'Only numbers'
}
export const confirmPassword = (value: string, confirm: string): boolean | string =>
  value === confirm || 'Passwords not equals'


export const amountFormat = (event) => {
  /* eslint-disable */
  let text = event.target.value
  // /[^0-9\.]/g.test(e.key)
  // var reem = text.toString().toString().replace(/[^a-zA-Z0-9]/g, "");
  var reem = text
    .toString()
    .toString()
    .replace(/[^0-9]/g, '')
  if (reem.length < 3 && event.key == 'Backspace') {
    if (reem.length == 2) {
      reem = '0' + reem
    }
  } else {
    if (reem.substring(0, 1) == '0') {
      let subNum = reem.substring(1, reem.length)
      reem = subNum

      if (subNum.length > 4 && subNum.substring(0, 2) == '00') {
        let subNumber = subNum.substring(2, subNum.length)
        reem = subNumber
      }
    }
  }
  var coma = reem.substring(0, reem.length - 2) + ',' + reem.substring(reem.length - 2, reem.length)
  event.target.value = coma.toString().replace(/\d(?=(\d{3})+\,)/g, '$&.')
  if (event.target.value != null) {
    for (let i = 0; i < event.target.value.length; i++) {
      if (event.target.value.indexOf(',,') != -1) {
        event.target.value = event.target.value.split(',,').join(',')
      }
    }
  }
  if (event.target.value.length < 4) {
    event.target.value = '0,00'
  }
  return event.target.value
}

export const transformAmount = (amount:string) => {
  var newstring = amount.split('.').join('')
  var newa = newstring.split(',').join('')
  let newamount = newa.substring(0, newa.length - 2) + '.' + newa.substring(newa.length - 2, newa.length)
  return newamount
}
