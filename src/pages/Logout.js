const Logout = () => {
  function logout() {
    localStorage.setItem("auth_token", undefined);
    window.location.href = "/";
  }
  return <script>{logout()}</script>;
};

export default Logout;
