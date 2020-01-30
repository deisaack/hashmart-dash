var Env = function() {};
(Env.init = function() {
  Env.baseUrl = "https://hashmart.nyumbapap.com";
  Env.TTLV = 600000; // time to live
  Env.TTR = 300000; // time to refresh
  Env.initial = 0;

  var t;
  var s;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;
  window.ontouchstart = resetTimer;
  window.onclick = resetTimer;
  window.onkeypress = resetTimer;
  window.addEventListener("scroll", resetTimer, true);

  Env.logOut = function() {
    clearInterval(s);
    localStorage.clear();
    Env.initial = 0;
    window.location.href = "/";
  };

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(function() {
      Env.logOut();
    }, Env.TTLV);
  }

  Env.refreshToken = function() {
    const data = {
      token: localStorage.getItem("authToken")
    };
    fetch(Env.baseUrl + "/api/v1/hashmart/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response);
        }
        return response;
      })
      .then(function(response) {
        response.text().then(function(result) {
          localStorage.setItem("initialTime", Date.now());
          localStorage.setItem("authToken", `${result}`);
        });
      })
      .catch(function(error) {
        Env.logOut();
      });
  };

  Env.refreshTokenInterval = function() {
    s = setInterval(function() {
      Env.refreshToken();
    }, Env.TTR);
  };

  if (localStorage.getItem("initialTime") !== null) {
    if (Env.initial === 0) {
      Env.refreshTokenInterval();
      Env.initial++;
    }
  }
})();
