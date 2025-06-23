document.addEventListener('DOMContentLoaded', () => {
    const order = JSON.parse(localStorage.getItem('order'));

    if (!order) {
        alert('Não foi encontrado um pedido para exibir.');
        window.location.href = 'index.html';
        return;
    }

    // Exibe os detalhes do pedido
    renderOrderSummary(order);
});

const renderOrderSummary = (order) => {
    const orderSummaryContainer = document.getElementById('order-summary');
    const deliveryAddress = document.getElementById('delivery-address');
    const paymentMethod = document.getElementById('payment-method');

    order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        orderSummaryContainer.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>R$ ${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    // Exibe o endereço de entrega e forma de pagamento
    deliveryAddress.textContent = order.address;
    paymentMethod.textContent = order.paymentMethod === 'credit-card' ? 'Cartão de Crédito' : 'Boleto';
};
