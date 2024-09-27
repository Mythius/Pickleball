async function signIn() {
    let req = await googleAuth();
    await req.loginSuccess;
    loadProfile();
  }
  async function loadProfile() {
    if (auth_token) {
      let profile = await request("/profile");
      document.querySelector(".userProfile img").src = profile.src;
    }
  }
  loadProfile();