export function markupGalerry(gallery) {
  return gallery
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:<br>${likes}</b>
          </p>
          <p class="info-item">
            <b>Views:<br>${views}</b>
          </p>
          <p class="info-item">
            <b>Comments:<br>${comments}</b>
          </p>
          <p class="info-item">
            <b>Download:<br>${downloads}</b>
          </p>
        </div>
        </div>`
    )
    .join('');
}
