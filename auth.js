document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA PARA MANEJAR EL ESTADO DE LA SESIÓN EN EL HEADER ---
    const accountLinks = document.getElementById('account-links');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentUser = localStorage.getItem('ld_store_currentUser');

    if (currentUser && accountLinks) {
        accountLinks.innerHTML = `<span class="text-white">Hola, ${currentUser.split('@')[0]}</span> <button id="logout-btn" class="ml-4 bg-white text-pink-500 px-3 py-1 rounded-md text-sm font-bold">Salir</button>`;
        
        if(mobileMenu){
             const mobileAccountLink = mobileMenu.querySelector('a[href="account.html"]');
             if(mobileAccountLink) mobileAccountLink.innerHTML = 'Cerrar Sesión';
        }

        const logoutBtn = document.getElementById('logout-btn');
        if(logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('ld_store_currentUser');
                window.location.href = 'index.html';
            });
        }
         if(mobileMenu){
            const mobileAccountLink = mobileMenu.querySelector('a[href="account.html"]');
            if(mobileAccountLink) {
                mobileAccountLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('ld_store_currentUser');
                    window.location.href = 'index.html';
                });
            }
        }
    }


    // --- LÓGICA PARA LOS FORMULARIOS DE LOGIN Y REGISTRO ---
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.classList.remove('active');
            registerContainer.classList.add('active');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerContainer.classList.remove('active');
            loginContainer.classList.add('active');
        });
    }

    // Proceso de Registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const errorEl = document.getElementById('register-error');
            const successEl = document.getElementById('register-success');

            errorEl.textContent = '';
            successEl.textContent = '';

            if (password !== confirmPassword) {
                errorEl.textContent = 'Las contraseñas no coinciden.';
                return;
            }

            // Simulación de base de datos con localStorage
            const users = JSON.parse(localStorage.getItem('ld_store_users')) || [];
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                errorEl.textContent = 'Este correo electrónico ya está registrado.';
            } else {
                users.push({ email, password });
                localStorage.setItem('ld_store_users', JSON.stringify(users));
                successEl.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
                registerForm.reset();
                setTimeout(() => {
                    registerContainer.classList.remove('active');
                    loginContainer.classList.add('active');
                    successEl.textContent = '';
                }, 2000);
            }
        });
    }

    // Proceso de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorEl = document.getElementById('login-error');
            
            errorEl.textContent = '';

            const users = JSON.parse(localStorage.getItem('ld_store_users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('ld_store_currentUser', user.email);
                window.location.href = 'index.html';
            } else {
                errorEl.textContent = 'Correo o contraseña incorrectos.';
            }
        });
    }
});
