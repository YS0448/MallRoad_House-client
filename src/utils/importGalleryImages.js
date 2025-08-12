export const importGalleryImages = async (limit = null) => {
  const imageImports = import.meta.glob(
    "../assets/media/image/gallery_images/*.{png,jpg,jpeg,gif,svg,webp,avif}"
  );

  const imagePromises = Object.values(imageImports).map((importFn) =>
    importFn().then((module) => module.default)
  );

  const resolvedImages = await Promise.all(imagePromises);

  return limit ? resolvedImages.slice(0, limit) : resolvedImages;
};
