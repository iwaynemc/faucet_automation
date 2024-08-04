document.getElementById('startBtn').addEventListener('click', function() {
    const addressInput = document.getElementById('addressInput');
    const addresses = addressInput.value
        .split('\n')
        .map(addr => addr.trim())
        .filter(addr => addr !== '');

    if (addresses.length === 0) {
        alert('Please enter at least one address.');
        return;
    }

    // Store addresses in localStorage
    localStorage.setItem('ethereumAddresses', JSON.stringify(addresses));

    // Redirect to the wallet iteration page
    window.location.href = 'index.html';
});