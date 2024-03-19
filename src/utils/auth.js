import { processServerResponse } from "./Api";

const baseUrl = "http://localhost:3001";
const baseHeaders = { "Content-Type": "application/json" };

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerResponse);
};

export const login = ({ email, password, token }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
};

export const update = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(processServerResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const getUserData = (token) => {
  console.log(token);
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      baseHeaders,
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};
