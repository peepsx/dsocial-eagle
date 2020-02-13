export const userAccountReducer = (state = '', action) => {
    console.log('payload data', action.payload)
    switch (action.type) {
        case 'FB_DATA': return action.payload;
        case 'TWIT_DATA': return action.payload;
        default: return state;
    }
}