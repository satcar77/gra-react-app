import {dataLoaded} from '../slices/graSlice' 

export function getGraListThunk(profid) {
  return async function(dispatch) {
    const res = await fetch(`http://localhost:4000/professor/gra/${profid}`, {
      method: 'GET',
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}


export async function addGra(data,profid) {
        await fetch(`http://localhost:4000/professor/gra/${profid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
}
  
export async function deleteGra(id,profid) {
      await fetch(`http://localhost:4000/professor/gra/${profid}/${id}`, {
          method: 'DELETE',
        })
}

export async function editGra(data,profid) {
  await fetch(`http://localhost:4000/professor/gra/${profid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
}

export async function updateStatus(data) {
  await fetch(`http://localhost:4000/student/updateStatus/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
}

