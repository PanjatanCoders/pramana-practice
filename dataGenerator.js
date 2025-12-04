// Simple data generator without external dependencies
const DataGenerator = {
  // Indian first names
  firstNames: [
    'Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Sai', 'Krishna', 'Rahul', 'Rohan', 'Amit', 'Vikram',
    'Ananya', 'Diya', 'Isha', 'Kavya', 'Priya', 'Riya', 'Saanvi', 'Sara', 'Anushka', 'Meera'
  ],
  
  // Indian last names
  lastNames: [
    'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Reddy', 'Joshi', 'Mehta', 'Gupta', 'Iyer',
    'Nair', 'Shah', 'Desai', 'Kulkarni', 'Rao', 'Agarwal', 'Kapoor', 'Malhotra', 'Chopra', 'Pandey'
  ],
  
  // Indian cities
  cities: [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Nagpur', 'Kochi', 'Visakhapatnam'
  ],
  
  // Email domains
  emailDomains: ['test.com', 'example.com', 'testing.in', 'qamail.com', 'testdata.io'],
  
  // Street suffixes
  streetSuffixes: ['Road', 'Street', 'Avenue', 'Lane', 'Nagar', 'Colony', 'Park', 'Enclave'],
  
  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  },
  
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  firstName() {
    return this.random(this.firstNames);
  },
  
  lastName() {
    return this.random(this.lastNames);
  },
  
  fullName() {
    return `${this.firstName()} ${this.lastName()}`;
  },
  
  email() {
    const first = this.firstName().toLowerCase();
    const last = this.lastName().toLowerCase();
    const num = this.randomNumber(1, 999);
    const domain = this.random(this.emailDomains);
    return `test_${first}.${last}${num}@${domain}`;
  },
  
  phone() {
    // Indian mobile format: +91 followed by 10 digits starting with 6-9
    const firstDigit = this.randomNumber(6, 9);
    const remaining = Array.from({length: 9}, () => this.randomNumber(0, 9)).join('');
    return `+91 ${firstDigit}${remaining}`;
  },
  
  address() {
    const houseNo = this.randomNumber(1, 999);
    const streetName = this.random(this.firstNames);
    const suffix = this.random(this.streetSuffixes);
    return `${houseNo}, ${streetName} ${suffix}`;
  },
  
  city() {
    return this.random(this.cities);
  },
  
  pincode() {
    // Indian pincode format: 6 digits
    return Array.from({length: 6}, () => this.randomNumber(0, 9)).join('');
  },
  
  state() {
    const states = [
      'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat', 'Rajasthan',
      'Uttar Pradesh', 'West Bengal', 'Telangana', 'Kerala', 'Punjab', 'Haryana'
    ];
    return this.random(states);
  },
  
  company() {
    const prefixes = ['Tech', 'Digital', 'Smart', 'Quick', 'Global', 'Prime', 'Future'];
    const suffixes = ['Solutions', 'Systems', 'Technologies', 'Enterprises', 'Innovations', 'Services'];
    return `${this.random(prefixes)} ${this.random(suffixes)}`;
  },
  
  username() {
    const first = this.firstName().toLowerCase();
    const num = this.randomNumber(100, 9999);
    return `${first}_test${num}`;
  },
  
  password() {
    // Simple test password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%';
    let password = 'Test@';
    for (let i = 0; i < 7; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },
  
  number(min = 1, max = 1000) {
    return this.randomNumber(min, max).toString();
  },
  
  text(words = 5) {
    const lorem = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'test', 'data', 'sample', 'demo', 'example', 'placeholder', 'content'
    ];
    const result = [];
    for (let i = 0; i < words; i++) {
      result.push(this.random(lorem));
    }
    return result.join(' ');
  },
  
  date() {
    const year = this.randomNumber(1990, 2005);
    const month = String(this.randomNumber(1, 12)).padStart(2, '0');
    const day = String(this.randomNumber(1, 28)).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  url() {
    const domains = ['example.com', 'test.com', 'sample.org', 'demo.io'];
    return `https://www.${this.random(domains)}`;
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataGenerator;
}