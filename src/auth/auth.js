//import {conn} from '../network/api';
import decode from 'jwt-decode';

const BASE_URL = 'http://localhost:8000';

const checkAuthed = () => {

    return new Promise((resolve,reject) => {
        const accessToken = localStorage.getItem('access_token');
        if(accessToken) {
            const decoded = decode(accessToken);
            const tokenExpiry = new Date(decoded.exp*1000);
            const now = new Date();
            console.log('Check Expiry',now ,tokenExpiry);
            if(now < tokenExpiry) {
                  //Hasn't expired
                  return resolve(true);
            } else {
                  //Try refresh
                  console.log('Trying refresh');
                  const refreshToken = localStorage.getItem('refresh_token');
                  if(refreshToken) {
                    fetch(`${BASE_URL}/api/account/refresh/'`, 
                    {
                        method: "POST",
                        mode: 'cors',
                        body: JSON.stringify({ refresh: refreshToken }),
                        headers: { 
                            "Content-Type": "application/json",
                        }
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        if(!data.access) {
                            return reject(data.message);
                        } else {
                            localStorage.setItem('access_token',data.access);
                            return resolve(true);
                        }
                    })
                    .catch(err => {
                        console.log('AUTH FAILURE',err);
                        return reject(false);
                    });
                  }
            }
        } else {
            return resolve(false);
        }
        
    });
}


const authenticate = payload => {
    return new Promise(async (resolve,reject) => {
      let message = '';
      const accessToken = localStorage.getItem('access_token');
          fetch(`${BASE_URL}/api/account/authenticate/`, 
              {
                  method: "POST",
                  mode: 'cors',
                  body: JSON.stringify(payload),
                  headers: { 
                      "Content-Type": "application/json",
                  }
              }
          ).then(res => {
              return res.json();
          })
          .then(data => {
            console.log('TOKEN DATA',data, localStorage);
              if(!data.access) {
                return reject(data.message);
              } else {
                  localStorage.setItem('access_token',data.access);
                  localStorage.setItem('refresh_token',data.refresh);
                  return resolve('Successful');
              }
          })
          .catch(err => {
              console.log('AUTH ERROR', err);
            return reject('An error occured trying to sign in.');
          });
    });
  }


// const authenticate2 = payload => {
//     return new Promise(async (resolve,reject) => {
//         try{
//             const response = await conn.post('/api/account/authenticate/',payload);
//             localStorage.setItem('access_token',response.data.access);
//             localStorage.setItem('refresh_token',response.data.refresh);
//             return resolve('Success');
//         } catch(err) {
//             if(err.response.data.message) {
//               return reject(err.response.data.message);
//             } else {
//               return reject('An error occured trying to sign in.');
//             }
//         }
//     });
// }



export {checkAuthed, authenticate}