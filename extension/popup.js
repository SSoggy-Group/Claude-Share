document.addEventListener('DOMContentLoaded', () => {
    const btnShare = document.getElementById('btn-share');
    const btnDlMd = document.getElementById('btn-dl-md');
    const btnDlJson = document.getElementById('btn-dl-json');
    const btnDlTxt = document.getElementById('btn-dl-txt');
    const btnDlHtml = document.getElementById('btn-dl-html');
    const btnDlDocx = document.getElementById('btn-dl-docx');
    const statusMsg = document.getElementById('status-msg');

    const PAGE_URL = 'https://ai.ssoggy.me';

    function setStatus(msg, isError = false) {
        statusMsg.style.display = 'block';
        statusMsg.style.color = isError ? '#ff6b6b' : '#ffb86c';
        statusMsg.innerText = msg;
    }

    function setButtonsDisabled(disabled) {
        [btnShare, btnDlMd, btnDlJson, btnDlTxt, btnDlHtml, btnDlDocx].forEach(b => {
            if (b) b.disabled = disabled;
        });
    }

    async function getMessagesFromTab() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (!tabs || tabs.length === 0) {
                    return reject(new Error('No active tab found.'));
                }
                const activeTab = tabs[0];
                
                // Check if it's a supported URL
                const url = activeTab.url || '';
                if (!url.startsWith('http')) {
                    return reject(new Error('This page is not supported. Please open an AI chat.'));
                }

                chrome.tabs.sendMessage(activeTab.id, { action: 'getMessages' }, (response) => {
                    if (chrome.runtime.lastError) {
                        return reject(new Error('Failed to connect to page. Refresh the chat and try again.'));
                    }
                    if (!response) {
                        return reject(new Error('No response from page.'));
                    }
                    if (response.error) {
                        return reject(new Error(response.error));
                    }
                    if (!response.messages || !response.messages.content || response.messages.content.length === 0) {
                        return reject(new Error('Conversation is empty or could not be extracted.'));
                    }
                    resolve(response.messages);
                });
            });
        });
    }

    async function handleExport(ext, mime, convertFn) {
        try {
            setButtonsDisabled(true);
            setStatus(`Extracting chat...`);
            
            const messages = await getMessagesFromTab();
            
            setStatus(`Generating ${ext.toUpperCase()} file...`);
            const title = messages.title || 'Conversation';
            const filename = sanitizeFilename(title) + '.' + ext;
            const content = convertFn(title, messages.content);
            
            downloadFile(content, filename, mime);
            
            setStatus(`Successfully exported!`);
            setTimeout(() => { statusMsg.style.display = 'none'; }, 3000);
        } catch (error) {
            setStatus(error.message, true);
        } finally {
            setButtonsDisabled(false);
        }
    }

    btnShare.addEventListener('click', async () => {
        try {
            setButtonsDisabled(true);
            setStatus('Extracting chat...');
            
            const messages = await getMessagesFromTab();
            
            setStatus('Uploading to AI-Chat-Export...');
            const response = await fetch(`${PAGE_URL}/api/chats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messages)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errText}`);
            }

            const { id } = await response.json();
            const shareURL = `${PAGE_URL}/c/${id}`;
            
            // Copy to clipboard
            await navigator.clipboard.writeText(shareURL);
            
            setStatus('Link copied! Opening tab...');
            window.open(shareURL, '_blank');
            
            setTimeout(() => { statusMsg.style.display = 'none'; }, 3000);
        } catch (error) {
            setStatus(error.message, true);
        } finally {
            setButtonsDisabled(false);
        }
    });

    btnDlMd.addEventListener('click', () => handleExport('md', 'text/markdown', convertToMarkdown));
    btnDlTxt.addEventListener('click', () => handleExport('txt', 'text/plain', convertToText));
    btnDlJson.addEventListener('click', () => handleExport('json', 'application/json', (title, content) => convertToJSON(title, content)));
    btnDlHtml.addEventListener('click', () => handleExport('html', 'text/html', convertToHTML));
    btnDlDocx.addEventListener('click', () => handleExport('docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', convertToDOCX));
});
