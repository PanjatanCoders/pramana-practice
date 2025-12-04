// Popup script for Pramana Fill

document.addEventListener('DOMContentLoaded', () => {
  
  // Fill entire form button
  const fillFormBtn = document.getElementById('fillFormBtn');
  fillFormBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'fillForm' }, (response) => {
      if (response && response.success) {
        showSuccess('Form filled successfully!');
      }
    });
  });
  
  // Quick action buttons
  const actionButtons = document.querySelectorAll('.action-btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dataType = btn.getAttribute('data-type');
      
      // Get active tab and send message to content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'fillData',
          dataType: dataType
        }, (response) => {
          if (response && response.success) {
            showSuccess(`${btn.textContent.trim()} filled!`);
          }
        });
      });
    });
  });
  
  // Help link
  const helpLink = document.getElementById('helpLink');
  helpLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Pramana Fill - Help\n\n' +
          '1. Click "Fill Entire Form" to auto-fill all fields\n' +
          '2. Right-click any input field for targeted filling\n' +
          '3. Use quick action buttons for last focused field\n\n' +
          'Tips:\n' +
          '- Auto-detect intelligently identifies field types\n' +
          '- All data is fake and safe for testing\n' +
          '- Works with most standard form fields');
  });
  
  // Show success message
  function showSuccess(message) {
    const btn = fillFormBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="icon">✅</span>${message}`;
    btn.style.background = '#28a745';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);
  }
});