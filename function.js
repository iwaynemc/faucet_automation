let addresses = [];
let currentIndex = 0;
let hasIteratedAll = false;

const walletOrder = document.getElementById('wallet-order');
const walletCount = document.getElementById('wallet-count');
const addressDisplay = document.getElementById('address-display');
const copyBtn = document.getElementById('copy-btn');
const nextBtn = document.getElementById('next-btn');
const message = document.getElementById('message');
const notification = document.getElementById('notification');

// Load addresses from localStorage
function loadAddresses() {
    const storedAddresses = localStorage.getItem('ethereumAddresses');
    if (storedAddresses) {
        addresses = JSON.parse(storedAddresses);
    } else {
        // If no addresses are found, redirect back to the intro page
        window.location.href = 'main.html';
    }
}

function updateDisplay() {
    if (addresses.length === 0) {
        message.textContent = 'No addresses found. Please go back and enter some addresses.';
        return;
    }

    walletOrder.textContent = `Wallet ${currentIndex + 1}`;
    walletCount.textContent = `Total Wallets: ${addresses.length}`;
    addressDisplay.textContent = addresses[currentIndex];
    
    if (hasIteratedAll) {
        message.textContent = 'You have iterated all addresses.';
    } else {
        message.textContent = '';
    }
}

function showNotification(text) {
    notification.textContent = text;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000);
}

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(addresses[currentIndex]).then(() => {
        showNotification('Address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy address.');
    });
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % addresses.length;
    if (currentIndex === 0) {
        hasIteratedAll = true;
    }
    updateDisplay();
});

// Load addresses and initialize the display
loadAddresses();
updateDisplay();