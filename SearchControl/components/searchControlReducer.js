const INITIAL_STATE = { value: '', desc: '', modal: false, data: [], row: [], isBlur: false, firstLoad: true, description: '' }

const _searchReducer = namespace => (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `${namespace}/${'SETCODE'}`:
            return { ...state, value: action.payload, isBlur: action.payloadBlur, firstLoad: false, row: [], description: action.payloadBlur ? state.desc : state.description }
        case `${namespace}/${'SETDESC'}`:
            return { ...state, desc: action.payload, isBlur: action.payloadBlur, firstLoad: false, row: [], description: action.payloadBlur ? action.payload : state.description }
        case `${namespace}/${'CLICK'}`:
            return { ...state, modal: !state.modal }
        case `${namespace}/${'SETFIELDS'}`:
            return { ...state, value: action.payload, desc: action.payloadDesc, isBlur: true, description: action.payloadDesc }
        case `${namespace}/${'SETDATA'}`:
            return { ...state, data: action.payload }
        case `${namespace}/${'SETROW'}`:
            return { ...state, row: action.payload }
        case `${namespace}/${'SETDESCRIPTION'}`:
            return { ...state, description: action.payload, isBlur: action.payloadBlur }
        default:
            return state
    }
}

export default _searchReducer