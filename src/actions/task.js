import {dataLoaded} from '../slices/taskSlice' 

export function getTaskListThunk(profid) {
  return async function(dispatch) {
    const res = await fetch(`http://localhost:4000/professor/task/${profid}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}
export async function addTask(data) {
    await fetch(`http://localhost:4000/professor/task/${data.profid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
  }

export async function deleteTask(id,profid) {
    await fetch(`http://localhost:4000/professor/task/${profid}/${id}`, {
        method: 'DELETE',
      })
}

export async function editTask(data,profid) {
await fetch(`http://localhost:4000/professor/task/${profid}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
export function getTaskListThunkStudent(id) {
  return async function(dispatch) {
    const res = await fetch(`http://localhost:4000/student/task/${id}`,{
      method: 'GET',
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}

export async function studentUpdateCompletion(data) {
    const res = await fetch("http://localhost:4000/student/updateCompletion",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),});

};

export function getAllTaskListThunkStudent(id) {
  return async function(dispatch) {
    const res = await fetch(`http://localhost:4000/student/alltask/${id}`,{
      method: 'GET',
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}