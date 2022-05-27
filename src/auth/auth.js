import decode from 'jwt-decode';

const BASE_URL = 'http://localhost:8000';

console.log('ENV',import.meta.env.VITE_BASE_URL);

const checkAuthed = () => {

    return new Promise((resolve,reject) => {
        const accessToken = localStorage.getItem('access_token');
        if(accessToken) {
            const decoded = decode(accessToken);
            const tokenExpiry = new Date(decoded.exp*1000);
            const now = new Date();
            if(now < tokenExpiry) {
                  //Hasn't expired
                  return resolve(true);
            } else {
                  //Try refresh
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
              if(!data.access) {
                return reject(data.message);
              } else {
                  localStorage.setItem('access_token',data.access);
                  localStorage.setItem('refresh_token',data.refresh);
                  return resolve('Successful');
              }
          })
          .catch(err => {
            return reject('An error occured trying to sign in.');
          });
    });
  }


export {checkAuthed, authenticate}