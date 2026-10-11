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
  const selectedTags = Array.from(document.getElementById('tagFilter').selectedOptions)
    .map(opt => opt.value.toLowerCase()).filter(v => v !== "");
  const selectedPublishers = Array.from(document.getElementById('publisherFilter').selectedOptions)
    .map(opt => opt.value.toLowerCase()).filter(v => v !== "");

  let visibleCount = 0;

  document.querySelectorAll('.post').forEach(post => {
    const titleText = post.querySelector('h2').textContent.toLowerCase();
    const descText = post.querySelector('p').textContent.toLowerCase();
    const postTag = post.querySelector('.tag').textContent.toLowerCase();
    const postPublisher = (post.getAttribute('data-publisher') || "").toLowerCase();

    const matchesText = titleText.includes(query) || descText.includes(query);
    const matchesTag = selectedTags.length === 0 || selectedTags.includes(postTag);
    const matchesPublisher = selectedPublishers.length === 0 || selectedPublishers.includes(postPublisher);

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