document.addEventListener('DOMContentLoaded', () => {
    renderCartSummary();  // Carrega os itens do carrinho
    updateTotal();  // Atualiza o valor total do carrinho

    // Evento de clique para confirmar o pedido
    document.getElementById('confirm-order').addEventListener('click', confirmOrder);
});

// Função para carregar o resumo do carrinho
const renderCartSummary = () => {
    const cartContainer = document.getElementById('cart-summary-body');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="4" class="text-center">Seu carrinho está vazio!</td></tr>';
        return;
    }

    cartContainer.innerHTML = '';  // Limpa o conteúdo atual

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartContainer.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>R$ ${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });
};

// Função para calcular o total
const updateTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Exibe o total
    const totalContainer = document.getElementById('total-container');
    totalContainer.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
};

// Função para confirmar o pedido
const confirmOrder = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Não é possível finalizar a compra.');
        return;
    }

    // Obtém os dados de pagamento e endereço
    const paymentMethod = document.getElementById('payment-method').value;
    const address = document.getElementById('address').value.trim();

    if (!address) {
        alert('Por favor, insira um endereço de entrega.');
        return;
    }

    // Salva o pedido no localStorage
    const order = {
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        paymentMethod,
        address
    };

    localStorage.setItem('order', JSON.stringify(order));

    // Limpa o carrinho após a compra
    localStorage.setItem('cart', JSON.stringify([]));

    // Redireciona para uma página de confirmação de pedido (ou exibe um alerta)
    alert('Pedido confirmado com sucesso!');
    window.location.href = 'pedido-confirmado.html';  // Ou crie uma página de confirmação
};
