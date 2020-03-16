import {dataLoaded} from '../slices/taskSlice' 

export function getTaskListThunk(profid) {
  return async function(dispatch) {
    const res = await fetch("http://localhost:4000/task/list",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({profid}),
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}
export async function addTask(data) {
    await fetch('http://localhost:4000/task/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
  }

export async function deleteTask(id) {
    await fetch('http://localhost:4000/task/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
      })
}

export async function editTask(data) {
await fetch('http://localhost:4000/task/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
export function getTaskListThunkStudent(id) {
  return async function(dispatch) {
    const res = await fetch("http://localhost:4000/student/list",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id}),
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
    const res = await fetch("http://localhost:4000/task/studentList",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id}),
    });
    const data = await res.json();
    dispatch(dataLoaded(data.results));
  };
}