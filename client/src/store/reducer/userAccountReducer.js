export const userAccountReducer = (state = [], action) => {
    switch (action.type) {
        case 'INSTA_DATA': return action.payload;
        default: return state;
    }
}