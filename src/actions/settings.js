import {dataLoaded} from '../slices/infoSlice'
 
export function getProfName(id) {
    return async function(dispatch) {
      const res = await fetch(`http://localhost:4000/professor/info/${id}`, {
        method: 'GET',
      });
      const data = await res.json();
      dispatch(dataLoaded(data));
    };
  }
  export async function getProfNameNoThunk(id) {
     const res = await fetch(`http://localhost:4000/professor/info/${id}`, {
        method: 'GET',
      });
      const data = await res.json();
      return data;
    }
export async function editProfName(data) {
  await fetch(`http://localhost:4000/professor/info/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }
  export function getStudentName(id) {
    return async function(dispatch) {
      const res = await fetch(`http://localhost:4000/student/info/${id}`, {
        method: 'GET',
      });
      const data = await res.json();
      dispatch(dataLoaded(data));
    };
  }
  export async function addNewProfessor(name) {
      const res = await fetch('http://localhost:4000/professor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name}),
      });
      const data = await res.json();
      return data;
  }
