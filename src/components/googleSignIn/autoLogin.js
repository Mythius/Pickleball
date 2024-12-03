async function loadProfile() {
  if (window.auth_token && window.location.hostname !== "localhost") {
    let profile = await window.request("/profile");
    if (
      "error" in profile &&
      !(
        window.location.pathname === "/" ||
        window.location.pathname === "index.html"
      )
    ) {
      window.location.href = "/";
    }
    if (profile.src === undefined) return;
    document.querySelector(".userProfile img").src = profile.src;
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "index.html"
    ) {
      window.location.href = "/tournament";
    }
  } else if (window.location.hostname == "localhost" && !window.auth_token) {
    let t = await window.login("test", "test");
    console.log(t);
  } else if (!window.auth_token && window.location.hostname !== "localhost") {
    window.location.href = "/";
  }
}
export default loadProfile;
