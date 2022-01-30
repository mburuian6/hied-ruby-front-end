export const isPersistedState = stateName =>{
  return sessionStorage.getItem(stateName);
}

export const isLoggedIn = () =>{
  var sessionState = sessionStorage.getItem('authenticationToken');
  if (sessionState && JSON.parse(sessionState)) return true;
  return false;
}

export const timeFormat = startTime => {
  return new Date(startTime).toLocaleDateString()
}

const isIndexDbSupported = () => {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return false;
  }
  return true;
}

// export const openIndexDB = () => {
//   'use strict';
//   if (isIndexDbSupported()){
//     var dbPromise = idb.open('hied',1, (upgradeDb) => {
//       if (!upgradeDb.objectStoreNames.contains('posts')) {
//         upgradeDb.createObjectStore(
//             'posts',
//             {autoIncrement: true}
//         );
//       }
//     });
//   }
// }