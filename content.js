// Content script for Pramana Fill - Injected into web pages

// Include the data generator
const DataGenerator = {
  firstNames: ['Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Sai', 'Krishna', 'Rahul', 'Rohan', 'Amit', 'Vikram', 'Ananya', 'Diya', 'Isha', 'Kavya', 'Priya', 'Riya', 'Saanvi', 'Sara', 'Anushka', 'Meera'],
  lastNames: ['Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Reddy', 'Joshi', 'Mehta', 'Gupta', 'Iyer', 'Nair', 'Shah', 'Desai', 'Kulkarni', 'Rao', 'Agarwal', 'Kapoor', 'Malhotra', 'Chopra', 'Pandey'],
  cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Nagpur', 'Kochi', 'Visakhapatnam'],
  emailDomains: ['test.com', 'example.com', 'testing.in', 'qamail.com', 'testdata.io'],
  streetSuffixes: ['Road', 'Street', 'Avenue', 'Lane', 'Nagar', 'Colony', 'Park', 'Enclave'],
  
  random(array) { return array[Math.floor(Math.random() * array.length)]; },
  randomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
  firstName() { return this.random(this.firstNames); },
  lastName() { return this.random(this.lastNames); },
  fullName() { return `${this.firstName()} ${this.lastName()}`; },
  email() { const first = this.firstName().toLowerCase(); const last = this.lastName().toLowerCase(); const num = this.randomNumber(1, 999); return `test_${first}.${last}${num}@${this.random(this.emailDomains)}`; },
  phone() { const firstDigit = this.randomNumber(6, 9); const remaining = Array.from({length: 9}, () => this.randomNumber(0, 9)).join(''); return `+91 ${firstDigit}${remaining}`; },
  address() { const houseNo = this.randomNumber(1, 999); return `${houseNo}, ${this.random(this.firstNames)} ${this.random(this.streetSuffixes)}`; },
  city() { return this.random(this.cities); },
  pincode() { return Array.from({length: 6}, () => this.randomNumber(0, 9)).join(''); },
  state() { return this.random(['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Telangana', 'Kerala', 'Punjab', 'Haryana']); },
  company() { return `${this.random(['Tech', 'Digital', 'Smart', 'Quick', 'Global', 'Prime', 'Future'])} ${this.random(['Solutions', 'Systems', 'Technologies', 'Enterprises', 'Innovations', 'Services'])}`; },
  username() { return `${this.firstName().toLowerCase()}_test${this.randomNumber(100, 9999)}`; },
  password() { const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%'; let password = 'Test@'; for (let i = 0; i < 7; i++) { password += chars.charAt(Math.floor(Math.random() * chars.length)); } return password; },
  number(min = 1, max = 1000) { return this.randomNumber(min, max).toString(); },
  date() { const year = this.randomNumber(1990, 2005); const month = String(this.randomNumber(1, 12)).padStart(2, '0'); const day = String(this.randomNumber(1, 28)).padStart(2, '0'); return `${year}-${month}-${day}`; },
  url() { return `https://www.${this.random(['example.com', 'test.com', 'sample.org', 'demo.io'])}`; }
};

// Store the last focused element
let lastFocusedElement = null;

document.addEventListener('focusin', (e) => {
  if (e.target.matches('input, textarea, select')) {
    lastFocusedElement = e.target;
  }
});

// Field type detection
function detectFieldType(element) {
  const label = element.labels?.[0]?.textContent?.toLowerCase() || '';
  const placeholder = element.placeholder?.toLowerCase() || '';
  const name = element.name?.toLowerCase() || '';
  const id = element.id?.toLowerCase() || '';
  const type = element.type?.toLowerCase() || '';
  
  const combined = `${label} ${placeholder} ${name} ${id}`.toLowerCase();
  
  // Email
  if (type === 'email' || combined.includes('email') || combined.includes('e-mail')) {
    return 'email';
  }
  
  // Phone
  if (type === 'tel' || combined.includes('phone') || combined.includes('mobile') || combined.includes('contact')) {
    return 'phone';
  }
  
  // Name fields
  if (combined.includes('first') && combined.includes('name')) return 'firstName';
  if (combined.includes('last') && combined.includes('name')) return 'lastName';
  if (combined.includes('full') && combined.includes('name')) return 'fullName';
  if (combined.includes('name') && !combined.includes('user')) return 'fullName';
  
  // Address fields
  if (combined.includes('address') || combined.includes('street')) return 'address';
  if (combined.includes('city') || combined.includes('town')) return 'city';
  if (combined.includes('pin') || combined.includes('zip') || combined.includes('postal')) return 'pincode';
  if (combined.includes('state') || combined.includes('province')) return 'state';
  
  // Username/Password
  if (combined.includes('username') || combined.includes('user')) return 'username';
  if (type === 'password' || combined.includes('password')) return 'password';
  
  // Company
  if (combined.includes('company') || combined.includes('organization')) return 'company';
  
  // Date
  if (type === 'date' || combined.includes('date') || combined.includes('dob') || combined.includes('birth')) return 'date';
  
  // Number
  if (type === 'number' || combined.includes('age') || combined.includes('quantity')) return 'number';
  
  // URL
  if (type === 'url' || combined.includes('website') || combined.includes('url')) return 'url';
  
  return 'text';
}

// Fill element with data
function fillElement(element, dataType) {
  if (!element) return;
  
  let value = '';
  
  switch(dataType) {
    case 'fillName':
    case 'fullName':
      value = DataGenerator.fullName();
      break;
    case 'fillFirstName':
    case 'firstName':
      value = DataGenerator.firstName();
      break;
    case 'fillLastName':
    case 'lastName':
      value = DataGenerator.lastName();
      break;
    case 'fillEmail':
    case 'email':
      value = DataGenerator.email();
      break;
    case 'fillPhone':
    case 'phone':
      value = DataGenerator.phone();
      break;
    case 'fillAddress':
    case 'address':
      value = DataGenerator.address();
      break;
    case 'fillCity':
    case 'city':
      value = DataGenerator.city();
      break;
    case 'fillPincode':
    case 'pincode':
      value = DataGenerator.pincode();
      break;
    case 'fillState':
    case 'state':
      value = DataGenerator.state();
      break;
    case 'fillCompany':
    case 'company':
      value = DataGenerator.company();
      break;
    case 'fillUsername':
    case 'username':
      value = DataGenerator.username();
      break;
    case 'fillPassword':
    case 'password':
      value = DataGenerator.password();
      break;
    case 'fillDate':
    case 'date':
      value = DataGenerator.date();
      break;
    case 'fillNumber':
    case 'number':
      value = DataGenerator.number();
      break;
    case 'fillUrl':
    case 'url':
      value = DataGenerator.url();
      break;
    case 'autoFill':
      const detectedType = detectFieldType(element);
      return fillElement(element, detectedType);
    default:
      value = DataGenerator.fullName();
  }
  
  // Set value and trigger events
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
  
  // Visual feedback
  element.style.backgroundColor = '#d4edda';
  setTimeout(() => {
    element.style.backgroundColor = '';
  }, 500);
}

// Fill entire form
function fillEntireForm() {
  const inputs = document.querySelectorAll('input:not([type="submit"]):not([type="button"]):not([type="hidden"]), textarea, select');
  
  let filledCount = 0;
  inputs.forEach(input => {
    if (input.offsetParent !== null) { // Check if visible
      const fieldType = detectFieldType(input);
      fillElement(input, fieldType);
      filledCount++;
    }
  });
  
  // Show notification
  showNotification(`Filled ${filledCount} fields with test data`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = `Pramana Fill: ${message}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 999999;
    font-family: Arial, sans-serif;
    font-size: 14px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillData') {
    fillElement(lastFocusedElement, request.dataType);
    sendResponse({ success: true });
  } else if (request.action === 'fillEntireForm') {
    fillEntireForm();
    sendResponse({ success: true });
  }
  return true;
});

console.log('Pramana Fill content script loaded');