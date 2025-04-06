export function loadMap(container, callback) {
  if (!container) {
    if (callback) callback();
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.8547417200543!2d23.288758599999998!3d42.6644335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84ea4e2be575%3A0x531864fdef570905!2z0JXQn9CQ0Jwg0KHQuNGB0YLQtdC80YE!5e0!3m2!1sbg!2sbg!4v1743633264625!5m2!1sbg!2sbg";
  iframe.width = "100%";
  iframe.height = "400";
  iframe.style.border = "0";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  container.appendChild(iframe);

  if (callback) callback();
}
