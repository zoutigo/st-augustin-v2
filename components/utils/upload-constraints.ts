export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
  "image/webp",
  "application/pdf",
];

export const VALID_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".pdf",
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const ACCEPT_ATTRIBUTE = `${ALLOWED_MIME_TYPES.join(",")}`;

export const humanAllowedTypes =
  "Images (JPG, PNG, GIF, WEBP) ou PDF (max 10 Mo)";
