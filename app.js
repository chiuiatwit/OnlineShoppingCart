const API_KEY = 'pricesapi_NL2UgDC5gzwis3r8Dx0tVsTfBnQyMHN';
const BASE_URL = 'https://api.pricesapi.com/v1';

const limit = 10;
async function searchProducts(query, limit) {
    const response = await fetch(
        `${BASE_URL}/products?search=${encodeURIComponent(query)}&limit=${limit}`, {
            headers: {
                'api-key': API_KEY
            }
        }
    );
    const data = await response.json();
    return data;
}

async function getProductDetails(productId) {
    const response = await fetch(
        `${BASE_URL}/products/${productId}/offers`, {
            headers: {
                'api-key': API_KEY
            }
        }
    );
    const data = await response.json();
    return data;
}


//fix this bottom part
document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    const results = await searchProducts(query, limit);
    displayResults(results);
});

function displayResults(products) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="showDetails('${product.id}')">View Offers</button>
        `;
        resultsContainer.appendChild(productElement);
    });
}

async function showDetails(productId) {
    const details = await getProductDetails(productId);
    alert(JSON.stringify(details, null, 2));
} 