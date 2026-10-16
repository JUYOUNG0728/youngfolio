export const HOME_INTRO_SESSION_KEY = "youngfolio:home-intro";

export const HOME_INTRO_BOOT_SCRIPT = `(function () {
  try {
    var path = window.location.pathname.replace(/\\/+$/, "") || "/";
    var seen = false;
    try {
      seen = window.sessionStorage.getItem("${HOME_INTRO_SESSION_KEY}") === "1";
    } catch (error) {}
    if (seen) {
      document.documentElement.classList.add("home-intro-skip");
      return;
    }
    if (path !== "/") return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var yaw = reduce ? 0 : -90 * Math.floor(Math.random() * 4);
    document.documentElement.style.setProperty("--home-intro-initial-y", yaw + "deg");
    document.documentElement.setAttribute("data-home-intro-yaw", String(yaw));
    document.documentElement.classList.add("is-home-intro-loading");
    window.setTimeout(function () {
      document.documentElement.classList.remove("is-home-intro-loading");
    }, 9000);
  } catch (error) {}
})();`;
