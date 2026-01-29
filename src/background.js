// allowlist de arquivos que não podem rodar scriptes ou macros
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.docx', '.xlsx', '.pptx', '.txt', '.csv'];

chrome.downloads.onCreated.addListener((downloadItem) => {
  const isFromWhatsApp = downloadItem.referrer && downloadItem.referrer.includes('web.whatsapp.com');
  
  if (isFromWhatsApp) {
    const fileName = downloadItem.filename.toLowerCase();
    
    // Verifica se o arquivo termina com alguma das extensões permitidas
    const isSafe = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));

    if (!isSafe) {
      chrome.downloads.cancel(downloadItem.id, () => {
        showBlockedNotification(downloadItem.filename);
        console.warn(`Segurança: Download de arquivo não autorizado bloqueado: ${fileName}`);
      });
    }
  }
});

function showBlockedNotification(fileName) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '../icons/icon128.png',
    title: '🛡️ Proteção Institucional',
    message: `O arquivo "${fileName}" não é permitido por política de segurança. Entre em contato com o TI se precisar deste acesso.`,
    priority: 2
  });
}