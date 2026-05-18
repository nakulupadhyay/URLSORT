const btn = document.getElementById('btn');
const input = document.getElementById('input');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const originalUrlSpan = document.getElementById('originalUrl');
const shortenedUrlSpan = document.getElementById('shortenedUrl');
const viewCountSpan = document.getElementById('viewCount');
const copyBtn = document.getElementById('copyBtn');

let currentShortCode = null;

btn.addEventListener('click', async () => {
    const url = input.value.trim();
    
    // Reset UI
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    resultContainer.style.display = 'none';
    
    if (!url) {
        errorDiv.textContent = 'Please enter a URL';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Show loading
    loadingDiv.style.display = 'block';
    btn.disabled = true;
    
    try {
        const response = await fetch('http://localhost:3000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to shorten URL');
        }
        
        currentShortCode = data.shortCode;
        
        // Display result
        originalUrlSpan.textContent = url;
        const shortenedUrl = `http://localhost:3000/${data.shortCode}`;
        shortenedUrlSpan.textContent = shortenedUrl;
        viewCountSpan.textContent = '0';
        
        resultContainer.style.display = 'block';
        input.value = '';
        
        // Fetch initial stats
        await fetchStats(data.shortCode);
        
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    } finally {
        loadingDiv.style.display = 'none';
        btn.disabled = false;
    }
});

async function fetchStats(shortCode) {
    try {
        const response = await fetch(`http://localhost:3000/stats/${shortCode}`);
        const data = await response.json();
        if (response.ok) {
            viewCountSpan.textContent = data.count;
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

copyBtn.addEventListener('click', () => {
    const shortenedUrl = shortenedUrlSpan.textContent;
    navigator.clipboard.writeText(shortenedUrl).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
});

// Refresh stats every 5 seconds if a URL is displayed
setInterval(() => {
    if (currentShortCode && resultContainer.style.display !== 'none') {
        fetchStats(currentShortCode);
    }
}, 5000);


