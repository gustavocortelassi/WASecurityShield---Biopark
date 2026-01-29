// Lista de extensões autorizadas pelo setor de TI
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.docx', '.xlsx', '.pptx', '.txt', '.csv'];

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
    const urlOrigem = downloadItem.referrer || downloadItem.url || "";
    const isFromWhatsApp = urlOrigem.includes('web.whatsapp.com') || urlOrigem.includes('whatsapp.net');

    if (isFromWhatsApp) {
        const fileName = downloadItem.filename.toLowerCase();
        const isSafe = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));

        if (!isSafe) {
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
        iconUrl: '../icons/icon128.png',
        title: '🛡️ Bloqueio de Segurança',
        message: `O arquivo "${fileName}" foi bloqueado. Protocolo: Transfira arquivos não listados via SharePoint ou E-mail.`,
        priority: 2
    });
}