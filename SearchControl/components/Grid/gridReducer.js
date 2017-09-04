const INITIAL_STATE = { data: [], row: [] }

const _gridReducer = namespace => (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `${namespace}/${'SETDATA'}`:
            return { ...state, data: action.payload }
        case `${namespace}/${'SETROW'}`:
            return { ...state, row: action.payload }
        default:
            return state
    }
}

export default _gridReducer