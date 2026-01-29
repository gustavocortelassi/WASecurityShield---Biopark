// Configurações baseadas no Schema Institucional - Atualizado em Jan/2026
const ALLOWED_EXTENSIONS = [
  "jpg", "jpeg", "jpe", "png", "gif", "webp", "bmp", "tif", "tiff", "heic", "heif",
  "txt", "text", "md", "rtf", "csv", "tsv", "json", "jsonl", "xml", "yaml", "yml", "log",
  "pdf", "mp3", "wav", "m4a", "ogg", "opus", "flac", "mp4", "m4v", "mov", "webm",
  "ics", "vcf", "docx", "xlsx", "pptx", "odt", "ods", "odp", "dwg", "dxf",
  "ai", "eps", "ps", "psd", "pem", "crt", "cer", "der", "p7b", "p7c", "pfx", "p12"
];

const ALLOWED_MIME_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/tiff",
  "image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence",
  "text/plain", "text/markdown", "application/rtf", "text/csv", "text/tab-separated-values",
  "application/json", "application/xml", "text/xml", "application/yaml", "text/yaml",
  "application/pdf", "audio/mpeg", "audio/wav", "audio/x-wav", "audio/mp4", "audio/aac",
  "audio/ogg", "audio/opus", "audio/flac", "application/ogg", "video/mp4", "video/quicktime", "video/webm",
  "text/calendar", "text/vcard", "text/x-vcard",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation",
  "application/acad", "application/vnd.autocad.dwg", "image/vnd.dwg", "application/dxf",
  "application/illustrator", "application/vnd.adobe.illustrator", "application/postscript", "application/eps", "image/vnd.adobe.photoshop",
  "application/x-x509-ca-cert", "application/pkix-cert", "application/pkcs7-mime", "application/pkcs7-certificates", "application/x-pkcs7-certificates", "application/x-pkcs12"
];

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  const urlOrigem = downloadItem.referrer || downloadItem.url || "";
  const isFromWhatsApp = urlOrigem.includes('web.whatsapp.com') || urlOrigem.includes('whatsapp.net');

  if (isFromWhatsApp) {
    const fileName = downloadItem.filename.toLowerCase();
    const mimeType = downloadItem.mime;

    // Validação 1: Extensão do arquivo
    const hasAllowedExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith('.' + ext));
    
    // Validação 2: Tipo de conteúdo (MIME)
    const hasAllowedMime = ALLOWED_MIME_TYPES.includes(mimeType);

    if (!hasAllowedExtension || !hasAllowedMime) {
      chrome.downloads.cancel(downloadItem.id, () => {
        showBlockedNotification(downloadItem.filename);
      });
      return;
    }
  }
  suggest();
});

function showBlockedNotification(fileName) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon128.png',
    title: '🛡️ Biopark Security Shield',
    message: `Bloqueado: "${fileName}". Por segurança, arquivos compactados (ZIP/RAR), scripts ou formatos antigos do Office não são permitidos via WhatsApp.`,
    priority: 2
  });

  
}