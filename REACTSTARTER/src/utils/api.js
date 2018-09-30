import queryString from 'query-string';

const serverBaseUrl = 'http://localhost:8000';

/* eslint-disable no-undef */

// unused, but still an option
export async function getAllUserData() {
  const response = await fetch(`${serverBaseUrl}/api/users`);
  const usersArray = await response.json();
  return usersArray;
}

export async function getPaginationData(queries = null) {
  let queryOptions = '';
  if (queries !== null) {
    queryOptions = queryString.stringify(queries);
  }
  const response = await fetch(`${serverBaseUrl}/api/users/paginated?${queryOptions}`);
  const paginationData = await response.json();
  return paginationData;
}

export async function saveUser(user) {
  const response = await fetch(`${serverBaseUrl}/api/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const userObject = await response.json();
  return userObject;
}

/* eslint-enable no-undef */
