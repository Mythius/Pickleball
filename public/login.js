async function signIn() {
  let req = await googleAuth();
  await req.loginSuccess;
  location.href = "/tournament.html";
}
async function loadProfile() {
  if (auth_token) {
    let profile = await request("/profile");
    if(profile.src == undefined) return;
    document.querySelector(".userProfile img").src = profile.src;
    if (location.pathname == "/" || location.pathname == "index.html") {
      location.href = "/tournament.html";
    }
  }
}
loadProfile();
