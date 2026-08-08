/**
 * Transforms a local image path to an ImageKit CDN URL.
 * If the path is already a full URL, it returns it as is.
 * @param {string} path - The image path or URL.
 * @param {string} [transformation] - Optional ImageKit transformation parameters.
 * @returns {string} The transformed URL.
 */
function getImgUrl(path, transformation = "tr=w-1200,q-80,f-auto") {
  if (!path) return "";
  
  // 1. If it's already a full URL, return it as is
  if (path.startsWith("http")) return path;

  // 2. Clean the path (remove leading slash)
  let cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // 3. Get the folder name from CONFIG (if it exists)
  const endpoint = CONFIG.IK_ENDPOINT;
  const folderMatch = endpoint.match(/ik\.imagekit\.io\/[^/]+\/(.+)$/);
  const folderName = folderMatch ? folderMatch[1] : "";

  // 4. If the path already starts with the folder name, remove it from the path 
  // to avoid duplication since it's already in the IK_ENDPOINT
  if (folderName && cleanPath.startsWith(folderName + "/")) {
    cleanPath = cleanPath.slice(folderName.length + 1);
  }
  
  // 5. Apply transformations if provided
  const queryParam = transformation ? `?${transformation}` : "";
  
  // 6. Return the full CDN URL
  return `${endpoint}/${cleanPath}${queryParam}`;
}

/**
 * Automatically transforms all static <img> tags to use the ImageKit CDN
 * if they point to a local path (don't start with http).
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && src.trim() !== "") {
      // Use different dimensions based on the context
      let tr = "tr=w-1200,q-80,f-auto"; // default
      
      if (img.closest('.trek-card') || img.closest('.cat-item')) {
        tr = "tr=w-800,q-80,f-auto";
      } else if (img.classList.contains('logo-icon')) {
        tr = "tr=w-100,q-100,f-auto";
      }

      img.src = getImgUrl(src, tr);
    }
    
    // Auto-apply lazy loading if not already set and not a hero image
    if (!img.getAttribute('loading') && !img.closest('.hero-slider')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});
