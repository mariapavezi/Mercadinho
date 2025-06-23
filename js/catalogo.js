// Verifica se o usuário está autenticado
const isAuthenticated = localStorage.getItem('isAuthenticated');

if (!isAuthenticated) {
    window.location.href = 'login.html';  // Redireciona para login se não estiver autenticado
} else {
    // Carrega o catálogo de produtos
    fetchProducts();
}

// Função para carregar produtos da API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    renderProductList(products);  // Renderiza os produtos no catálogo
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
};

// Função para renderizar a lista de produtos no catálogo
const renderProductList = (products) => {
  const productTableBody = document.getElementById('product-table-body');
  productTableBody.innerHTML = ''; // Limpa o conteúdo atual

  products.forEach(product => {
    const productRow = `
      <tr>
        <td><img src="${product.image}" alt="${product.title}" style="height: 50px; width: 50px; object-fit: cover;"></td>
        <td>${product.title}</td>
        <td>${product.description.slice(0, 100)}...</td>
        <td>R$ ${product.price.toFixed(2)}</td>
        <td><button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Adicionar ao Carrinho</button></td>
      </tr>
    `;
    productTableBody.innerHTML += productRow;
  });

  // Adiciona o evento de clique para cada botão de adicionar ao carrinho
  const addButtons = document.querySelectorAll('.add-to-cart');
  addButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
};
