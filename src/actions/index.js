import {dataLoaded} from '../slices/graSlice' 

export function getGraListThunk() {
  return async function(dispatch) {
    const res = await fetch("http://localhost:4000/gra/list");
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}

export async function addGraThunk(data) {
    console.log(data)
        await fetch('http://localhost:4000/gra/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
}
  