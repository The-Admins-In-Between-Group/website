(function () {
  var clicks = [];
  var navTimer = null;

  function assetBase() {
    return /\/(posts|library)\//.test(window.location.pathname) ? "../" : "";
  }

  function triggerEgg() {
    var base = assetBase();
    var wrap = document.createElement("div");
    wrap.className = "egg-fish-wrap";
    wrap.style.top = (40 + Math.random() * 30) + "vh";
    wrap.innerHTML =
      '<div class="egg-fish-body">' +
        '<img class="egg-fish-torso" src="' + base + 'assets/fish-body.png" alt="">' +
        '<img class="egg-fish-tail" src="' + base + 'assets/fish-tail.png" alt="">' +
      '</div>' +
      '<div class="egg-bubble">peppy for admin</div>' +
      '<span class="egg-ripple"></span>' +
      '<span class="egg-ripple r2"></span>' +
      '<span class="egg-ripple r3"></span>';
    document.body.appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 7200);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var brand = document.querySelector(".nav-title");
    if (!brand) return;
    var href = brand.getAttribute("href");

    brand.addEventListener("click", function (e) {
      e.preventDefault();
      var now = Date.now();
      clicks = clicks.filter(function (t) { return now - t < 900; });
      clicks.push(now);

      if (clicks.length >= 3) {
        clicks = [];
        if (navTimer) { clearTimeout(navTimer); navTimer = null; }
        triggerEgg();
        return;
      }

      if (navTimer) clearTimeout(navTimer);
      navTimer = setTimeout(function () {
        if (clicks.length < 3) { window.location.href = href; }
      }, 400);
    });
  });
})();
