import {dataLoaded} from '../slices/infoSlice'
 
export function getProfName(id) {
    return async function(dispatch) {
      const res = await fetch('http://localhost:4000/settings/getProfInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
      });
      const data = await res.json();
      dispatch(dataLoaded(data));
    };
  }
  export async function getProfNameNoThunk(id) {
      const res = await fetch('http://localhost:4000/settings/getProfInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
      });
      const data = await res.json();
      return data;
    }
export async function editProfName(data) {
  await fetch('http://localhost:4000/settings/editProfInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }
  export function getStudentName(id) {
    return async function(dispatch) {
      const res = await fetch('http://localhost:4000/settings/getStudentInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
      });
      const data = await res.json();
      dispatch(dataLoaded(data));
    };
  }
