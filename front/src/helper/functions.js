/* eslint-disable no-restricted-globals */

const closeSesion = () => {
  localStorage.clear();
  location.href = '/';
};

export default closeSesion;
