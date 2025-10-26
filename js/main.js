// console.log('Поиск формы...');
// const form = document.getElementById('loginForm');
// console.log('Найдена форма:', form);

// if (form) {
//     // console.log('JavaScript загружен!');
//     document.getElementById('loginForm').addEventListener('submit', function (e) {
//         // предотвращение стандартной отправки формы браузером
//         e.preventDefault();
//         console.log('Форма отправлена!');

//         const password = document.getElementById('password').value;
//         // данные из поля .value 
//         const confirmPassword = document.getElementById('confirmPassword').value;
//         // само поле
//         const passwordError = document.getElementById('passwordError');

//         if (password !== confirmPassword) {
//             // показываем ошибку
//             passwordError.classList.remove('hidden');
//             document.getElementById('confirmPassword').classList.add('error');
//         } else {
//             passwordError.classList.add('hidden');
//             document.getElementById('confirmPassword').classList.remove('error');

//             // Здесь обычно отправка формы на сервер
//             alert('Форма успешно отправлена!');
//             this.submit();
//         }
//     });
//     }else{
//         console.error('Форма с id="loginForm" не найдена!');
    // }

document.getElementById('loginForm').addEventListener('submit', function (e) {
        // предотвращение стандартной отправки формы браузером
        e.preventDefault();
        console.log('Форма отправлена!');

        const password = document.getElementById('password').value;
        // данные из поля .value 
        const confirmPassword = document.getElementById('confirmPassword').value;
        // само поле
        const passwordError = document.getElementById('passwordError');

        if (password !== confirmPassword) {
            // показываем ошибку
            passwordError.classList.remove('hidden');
            document.getElementById('confirmPassword').classList.add('error');
        } else {
            passwordError.classList.add('hidden');
            document.getElementById('confirmPassword').classList.remove('error');

            // Здесь обычно отправка формы на сервер
            alert('Форма успешно отправлена!');
            this.submit();
            window.location.href = 'main.html';
            // переделать с отправкой данных на сервер (??)
        }
        });


// Скрываем сообщение об ошибке при изменении пароля
document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const passwordError = document.getElementById('passwordError');

    if (password === confirmPassword) {
        passwordError.classList.add('hidden');
        this.classList.remove('error');
    }
});

