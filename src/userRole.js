let _role = "";

export function setCurrentRole(role) {
  _role = role;
  document.body.dataset.role = role;
}

export function getCurrentRole() { return _role; }
export function isViewer()       { return _role === "viewer"; }
export function isAdmin()        { return _role === "admin"; }
