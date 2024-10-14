async function loadProfile() {
  if (window.auth_token) {
    let profile = await window.request("/profile");
    if (profile.src == undefined) return;
    document.querySelector(".userProfile img").src = profile.src;
    if (
      window.location.pathname == "/" ||
      window.location.pathname == "index.html"
    ) {
      window.location.href = "/tournament";
    }
  }
}
export default loadProfile;