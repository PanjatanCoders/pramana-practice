// Background service worker for Pramana Fill

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  // Create parent menu
  chrome.contextMenus.create({
    id: 'pramanaFill',
    title: 'Pramana Fill',
    contexts: ['editable']
  });

  // Create submenu items for different data types
  const dataTypes = [
    { id: 'fillName', title: 'Full Name' },
    { id: 'fillFirstName', title: 'First Name' },
    { id: 'fillLastName', title: 'Last Name' },
    { id: 'fillEmail', title: 'Email' },
    { id: 'fillPhone', title: 'Phone' },
    { id: 'fillAddress', title: 'Address' },
    { id: 'fillCity', title: 'City' },
    { id: 'fillPincode', title: 'Pincode' },
    { id: 'fillState', title: 'State' },
    { id: 'fillCompany', title: 'Company' },
    { id: 'fillUsername', title: 'Username' },
    { id: 'fillPassword', title: 'Password' },
    { id: 'fillDate', title: 'Date' },
    { id: 'fillNumber', title: 'Number' },
    { id: 'fillUrl', title: 'URL' }
  ];

  dataTypes.forEach(item => {
    chrome.contextMenus.create({
      id: item.id,
      parentId: 'pramanaFill',
      title: item.title,
      contexts: ['editable']
    });
  });

  // Auto-fill option
  chrome.contextMenus.create({
    id: 'autoFill',
    parentId: 'pramanaFill',
    title: '🎯 Auto-detect & Fill',
    contexts: ['editable']
  });

  console.log('Pramana Fill installed successfully!');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const dataType = info.menuItemId;
  
  // Send message to content script to fill the data
  chrome.tabs.sendMessage(tab.id, {
    action: 'fillData',
    dataType: dataType
  });
});

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillForm') {
    // Get active tab and send fill form message
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'fillEntireForm'
      });
    });
    sendResponse({ success: true });
  }
  return true;
});