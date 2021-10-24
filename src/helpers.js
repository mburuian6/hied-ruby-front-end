export const isPersistedState = stateName =>{
    const sessionState = sessionStorage.getItem(stateName);
    return sessionState && JSON.parse(sessionState);
}

export const timeFormat = startTime => {
    return new Date(startTime).toLocaleDateString()
}