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
  const selectedTag = document.getElementById('tagFilter').value.toLowerCase();
  const selectedPublisher = document.getElementById('publisherFilter').value.toLowerCase();

  let visibleCount = 0;

  document.querySelectorAll('.post').forEach(post => {
    const titleText = post.querySelector('h2')?.textContent.toLowerCase() || "";
    const descText = post.querySelector('p')?.textContent.toLowerCase() || "";
    const postPublisher = (post.getAttribute('data-publisher') || "").toLowerCase();
    const postTags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
    const matchesText = titleText.includes(query) || descText.includes(query);
    const matchesTag = selectedTag === "" || postTags.includes(selectedTag);
    const matchesPublisher = selectedPublisher === "" || postPublisher === selectedPublisher;

    if (matchesText && matchesTag && matchesPublisher) {
      post.style.display = '';
      visibleCount++;
    } else {
      post.style.display = 'none';
    }
  });

  document.getElementById('postCount').textContent = `Showing ${visibleCount} post${visibleCount === 1 ? '' : 's'}`;
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
filterPosts();