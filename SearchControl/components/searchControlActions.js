export function handleChange(e, namespace) {
    return {
        type: `${namespace}/${'SETCODE'}`,
        payload: e.target.value,
        payloadBlur: false
    }
}

export function handleChangeDesc(e, namespace) {
    return {
        type: `${namespace}/${'SETDESC'}`,
        payload: e.target.value,
        payloadBlur: false
    }
}

export const handleClick = (namespace) => {
    return {
        type: `${namespace}/${'CLICK'}`
    }
}

export const handleBlur = (e, source, dataValue, dataText, namespace) => {
    const data = source.filter(item => {
        if (item[dataValue] !== null) {
            return item[dataValue].toString().toUpperCase() == e.target.value.toString().toUpperCase()
        }
    })
    let result = ''
    if (data.length > 0) {
        result = data[0][dataText] == null ? "" : data[0][dataText]
    }
    return {
        type: `${namespace}/${'SETDESC'}`,
        payload: result,
        payloadBlur: true
    }
}

export const handleBlurDesc = (e, namespace) => {
    return {
        type: `${namespace}/${'SETDESCRIPTION'}`,
        payload: e.target.value,
        payloadBlur: true
    }
}

export const setValue = (val, source, dataValue, dataText, namespace) => {
    let data = undefined
    let result = ''
    if (val == undefined) {
        val = ''
    }
    const onBlur = () => {
        data = source.filter(item => item[dataValue].toString().toUpperCase() == val.toString().toUpperCase())
        data.length > 0 ? result = data[0][dataText] : ''
        return result
    }
    return [{
        type: `${namespace}/${'SETCODE'}`,
        payload: val
    },
    {
        type: `${namespace}/${'SETDESC'}`,
        payload: onBlur()
    }]
}

export const setModalData = (dataValue, dataText, row, namespace) => {
    return (dispatch) => {
        const _setData = row
        const _val = _setData[dataValue] == null ? "" : _setData[dataValue]
        const _text = _setData[dataText] == null ? "" : _setData[dataText]
        //if(_setData[dataValue] != undefined){
        dispatch({ type: `${namespace}/${'SETFIELDS'}`, payload: _val, payloadDesc: _text })
        // }
    }
}

export const setData = (source, namespace) => {
    return {
        type: `${namespace}/${'SETDATA'}`,
        payload: source
    }
}