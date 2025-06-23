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

// Função para renderizar a lista de produtos no catálogo como uma tabela
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

// Função para adicionar ao carrinho
const addToCart = (event) => {
  const productId = event.target.getAttribute('data-id');
  const productTitle = event.target.getAttribute('data-title');
  const productPrice = parseFloat(event.target.getAttribute('data-price'));
  const productImage = event.target.getAttribute('data-image');
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ id: productId, title: productTitle, price: productPrice, image: productImage, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartTotal();
};

// Função para atualizar o contador de itens no carrinho e o valor total
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
};

// Função para atualizar o valor total do carrinho
const updateCartTotal = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2)}`;
};

// Função para renderizar o carrinho de compras
const renderCart = () => {
  const cartContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  
  // Obtém os itens do carrinho do localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<tr><td colspan="6" class="text-center">Seu carrinho está vazio!</td></tr>';
    cartTotalContainer.innerHTML = '<strong>Total: R$ 0,00</strong>';
    return;
  }
  
  let total = 0;
  cartContainer.innerHTML = '';  // Limpa o conteúdo atual
  
  // Itera sobre os itens no carrinho e gera as linhas da tabela
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartContainer.innerHTML += `
      <tr>
        <td><img src="${item.image}" alt="${item.title}" style="height: 50px; width: 50px; object-fit: cover;"></td>
        <td>${item.title}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="updateQuantity('${item.id}', -1)">-</button>
          ${item.quantity}
          <button class="btn btn-sm btn-warning" onclick="updateQuantity('${item.id}', 1)">+</button>
        </td>
        <td>R$ ${item.price.toFixed(2)}</td>
        <td>R$ ${itemTotal.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">Remover</button></td>
      </tr>
    `;
  });

  // Atualiza o total do carrinho
  cartTotalContainer.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
};

// Função para remover item do carrinho
const removeFromCart = (id) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  renderCart();  // Atualiza a lista de itens no carrinho
};

// Função para atualizar a quantidade de um item no carrinho
const updateQuantity = (id, change) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);  // Se a quantidade for 0 ou menor, remove o item
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();  // Atualiza a lista de itens no carrinho
    }
  }
};

// Quando a página do carrinho é carregada
if (window.location.pathname.includes('carrinho.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderCart();  // Renderiza os itens do carrinho e o total
  });
}

// Carregar produtos quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();  // Carrega e renderiza os produtos da API
  updateCartCount();  // Atualiza o contador de itens no carrinho
  updateCartTotal();  // Atualiza o valor total do carrinho
});
