import {dataLoaded} from '../slices/graSlice' 

export function getGraListThunk(profid) {
  return async function(dispatch) {
    const res = await fetch("http://localhost:4000/gra/list", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({profid}),
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}


export async function addGra(data) {
        await fetch('http://localhost:4000/gra/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
}
  
export async function deleteGra(id) {
      await fetch('http://localhost:4000/gra/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id}),
        })
}

export async function editGra(data) {
  await fetch('http://localhost:4000/gra/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
}

export async function updateStatus(data) {
  await fetch('http://localhost:4000/gra/updateStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
}

