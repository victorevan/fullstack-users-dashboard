import queryString from 'query-string';

const serverBaseUrl = 'http://localhost:8000';

/* eslint-disable no-undef */

// unused, but still an option
export async function getAllUserData() {
  const response = await fetch(`${serverBaseUrl}/api/users`);
  const usersArray = await response.json();
  return Promise.resolve(usersArray);
}

export async function getPaginationData(queries = null) {
  let queryOptions = '';
  if (queries !== null) {
    queryOptions = queryString.stringify(queries);
  }
  const response = await fetch(`${serverBaseUrl}/api/users/paginated?${queryOptions}`);
  const paginationData = await response.json();
  return Promise.resolve(paginationData);
}

export async function saveUser(user) {
  const response = await fetch(`${serverBaseUrl}/api/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const userObject = await response.json();
  return Promise.resolve(userObject);
}

export async function getUser(id) {
  const response = await fetch(`${serverBaseUrl}/api/users/${id}`);
  const user = await response.json();
  return Promise.resolve(user);
}

export async function editUser(id, updates) {
  const response = await fetch(`${serverBaseUrl}/api/users/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const status = await response.json();
  return Promise.resolve(status);
}

export async function deleteUser(id) {
  const response = await fetch(`${serverBaseUrl}/api/users/${id}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });
  const deletedUser = await response.json();
  return Promise.resolve(deletedUser);
}

/* eslint-enable no-undef */
