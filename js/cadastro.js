document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Impede o envio tradicional do formulário
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        // Salva os dados de cadastro no localStorage
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';  // Redireciona para a página de login
    } else {
        // Exibe mensagem de erro se as senhas não coincidirem
        document.getElementById('error-message').style.display = 'block';
    }
});
