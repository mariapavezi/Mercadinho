document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Impede o envio tradicional do formulário
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Recupera os dados do usuário do localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        // Salva o estado de autenticação no localStorage
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'index.html';  // Redireciona para o catálogo após login
    } else {
        // Exibe mensagem de erro se as credenciais forem inválidas
        document.getElementById('error-message').style.display = 'block';
    }
});
