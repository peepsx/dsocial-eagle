export const userAccountReducer = (state = [], action) => {
    console.log('payload data',state)
    switch (action.type) {
        case 'FB_DATA': return [...state,action.payload];
        case 'TWIT_DATA': return [...state,action.payload];
        default: return state;
    }
}