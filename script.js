(function () {
  var clicks = [];
  var navTimer = null;

  var FISH_SVG =
    '<svg viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">' +
      '<g class="egg-fish-tail">' +
        '<path d="M78,40 L140,10 L118,40 L140,70 Z" fill="#F2EFE6" stroke="#141210" stroke-width="2"/>' +
        '<path d="M78,40 L128,18 L112,40 L128,62 Z" fill="#E2672E"/>' +
        '<path d="M118,17 L140,10 L130,24 Z" fill="#141210"/>' +
        '<path d="M118,63 L140,70 L130,56 Z" fill="#141210"/>' +
        '<g stroke="#F2EFE6" stroke-width="1.3" opacity="0.7">' +
          '<line x1="90" y1="40" x2="126" y2="22"/>' +
          '<line x1="90" y1="40" x2="132" y2="40"/>' +
          '<line x1="90" y1="40" x2="126" y2="58"/>' +
        '</g>' +
        '<ellipse cx="74" cy="40" rx="10" ry="13" fill="#C9532B"/>' +
        '<path d="M66,34 q4,-3 8,0 q4,3 8,0" stroke="#7A2F17" stroke-width="1" fill="none" opacity="0.6"/>' +
        '<circle cx="86" cy="40" r="8.5" fill="#141210"/>' +
      '</g>' +
      '<g class="egg-fish-torso">' +
        '<ellipse cx="52" cy="40" rx="34" ry="16" fill="#8FC46B" stroke="#141210" stroke-width="2"/>' +
        '<ellipse cx="46" cy="34" rx="20" ry="9" fill="#EDEDE6" opacity="0.85"/>' +
        '<g stroke="#141210" stroke-width="1" fill="none" opacity="0.6">' +
          '<path d="M30,32 q3,-3 6,0"/><path d="M37,32 q3,-3 6,0"/><path d="M44,32 q3,-3 6,0"/>' +
          '<path d="M51,32 q3,-3 6,0"/><path d="M58,32 q3,-3 6,0"/>' +
        '</g>' +
        '<path d="M46,23 L54,6 L62,24 Z" fill="#8FC46B" stroke="#141210" stroke-width="1.6"/>' +
        '<path d="M40,55 L46,68 L54,54 Z" fill="#8FC46B" stroke="#141210" stroke-width="1.6" opacity="0.95"/>' +
        '<path d="M12,40 Q26,20 56,22 Q42,40 56,58 Q26,60 12,40 Z" fill="#F3F0E4" stroke="#141210" stroke-width="2"/>' +
        '<path d="M40,26 Q48,40 40,54" stroke="#141210" stroke-width="1.3" fill="none" opacity="0.55"/>' +
        '<circle cx="21" cy="35" r="6" fill="#FFFFFF" stroke="#141210" stroke-width="2"/>' +
        '<circle cx="21" cy="35" r="3.2" fill="#141210"/>' +
        '<path d="M11,42 q4,3 9,1" stroke="#141210" stroke-width="1.1" fill="none"/>' +
      '</g>' +
    '</svg>';

  function triggerEgg() {
    var wrap = document.createElement("div");
    wrap.className = "egg-fish-wrap";
    wrap.style.top = (40 + Math.random() * 30) + "vh";
    wrap.innerHTML =
      '<div class="egg-fish-body">' + FISH_SVG + '</div>' +
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
