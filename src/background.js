const FORBIDDEN_EXTENSIONS = ['.exe', '.msi', '.bat', '.cmd', '.sh', '.vbs', '.js', '.iso', '.scr', '.zip'];

chrome.downloads.onCreated.addListener((downloadItem) => {
  // Verifica se a origem é o WhatsApp Web
  const isFromWhatsApp = downloadItem.referrer && downloadItem.referrer.includes('web.whatsapp.com');
  
  if (isFromWhatsApp) {
    const fileName = downloadItem.filename.toLowerCase();
    const isDangerous = FORBIDDEN_EXTENSIONS.some(ext => fileName.endsWith(ext));

    if (isDangerous) {
      chrome.downloads.cancel(downloadItem.id, () => {
        showBlockedNotification(downloadItem.filename);
      });
    }
  }
});

function showBlockedNotification(fileName) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '../icons/icon128.png',
    title: 'Download Bloqueado',
    message: `O arquivo "${fileName}" foi bloqueado pelas políticas de segurança da instituição.`,
    priority: 2
  });
}