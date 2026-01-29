// Injeta o banner institucional no topo do WhatsApp Web
function injectSecurityBanner() {
    if (document.getElementById('biopark-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'biopark-banner';
    banner.innerHTML = `
        <div style="background: #1d2b3a; color: white; padding: 10px; text-align: center; font-family: sans-serif; border-bottom: 3px solid #e11d48; z-index: 9999;">
            🛡️ <strong>Política de Segurança TI.26.06.10:</strong> 
            Troca de arquivos críticos deve ser feita via 
            <a href="https://seu-sharepoint-link" target="_blank" style="color: #38bdf8; text-decoration: underline;">Portal SharePoint</a>.
        </div>
    `;
    
    document.body.prepend(banner);
}

// Executa a cada 3 segundos para garantir que o banner permaneça lá
setInterval(injectSecurityBanner, 3000);