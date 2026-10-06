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

let count = 0;
let hasLiked = false;

function addLike(btn) {
  if (!hasLiked) {
    count++;
    document.getElementById("likeCount").innerText = count;
    btn.classList.add("liked");
    hasLiked = true;
  }
}

function nativeShare() { if (navigator.share) { navigator.share({ url: window.location.href }); } else { copyLink(this); } }

let currentImgIndex = 0;

function changeImage(button, direction) {
  const gallery = button.parentElement;
  const images = gallery.querySelectorAll('.gallery-img');
  
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
  
  images[currentIndex].classList.remove('active');
  
  let nextIndex = (currentIndex + direction + images.length) % images.length;
  
  images[nextIndex].classList.add('active');
}

function filterPosts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const tag = document.getElementById('tagFilter').value.toLowerCase();
  const publisher = document.getElementById('publisherFilter').value.toLowerCase();

  document.querySelectorAll('.post').forEach(post => {
    const titleText = post.querySelector('h2').textContent.toLowerCase();
    const descText = post.querySelector('p').textContent.toLowerCase();
    const postTag = post.querySelector('.tag').textContent.toLowerCase();
    const postPublisher = (post.getAttribute('data-publisher') || "").toLowerCase();

    const matchesText = titleText.includes(query) || descText.includes(query);
    const matchesTag = tag === "" || postTag === tag;
    const matchesPublisher = publisher === "" || postPublisher === publisher;

    post.style.display = (matchesText && matchesTag && matchesPublisher) ? '' : 'none';
  });
}

function resetAllFilters() {
  document.getElementById('searchInput').value = "";
  document.getElementById('tagFilter').value = "";
  document.getElementById('publisherFilter').value = "";
  filterPosts(); 
}

document.getElementById('searchInput').addEventListener('input', filterPosts);
document.getElementById('tagFilter').addEventListener('change', filterPosts);
document.getElementById('publisherFilter').addEventListener('change', filterPosts);
document.getElementById('resetBtn').addEventListener('click', resetAllFilters);