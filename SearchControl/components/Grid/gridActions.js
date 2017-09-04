export const setDataSource = (dataSource, namespace) => {
    return {
        type: `${namespace}/${'SETDATA'}`,
        payload: dataSource
    }
}

export const getDataUrl = (urlDataSource, namespace) => {
    return dispatch => {
        const request = axios.get(urlDataSource)
            .then(resp => dispatch({ type: `${namespace}/${'SETDATA'}`, payload: resp.data }))
    }
}

export const setRow = (row, namespace) => {
    return {
        type: `${namespace}/${'SETROW'}`,
        payload: row
    }
}