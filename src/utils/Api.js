export const baseUrl = "http://localhost:3001";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
}

export function postItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(processServerResponse);
}

export function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
}

export const addCardLike = (_id) => {
  const jwt = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(processServerResponse);
};

export const removeCardLike = (_id) => {
  const jwt = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(processServerResponse);
};
