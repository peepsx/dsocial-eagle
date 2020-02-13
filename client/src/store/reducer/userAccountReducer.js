export const userAccountReducer = (state = [], action) => {
    switch (action.type) {
        case 'TWIT_DATA': return [...state,action.payload];
        default: return state;
    }
}