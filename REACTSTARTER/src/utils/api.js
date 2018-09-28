const serverBaseUrl = 'http://localhost:8000';

/* eslint-disable no-undef */

export async function getInitialData() {
  const response = await fetch(`${serverBaseUrl}/api/users`);
  const usersArray = await response.json();
  return usersArray;
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
