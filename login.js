const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
        // tarp kabuciu reikia linko
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        const data = await response.json()

        if (response.ok) {
            // tarp kabuciu imest puslapio linka kai prisijungi
            window.location.href = ''
        } else {
            if (data.error === 'username') {
                alert('User does not exist or incorrect username.')
            } else if (data.error === 'password') {
                alert('Incorrect password.')
            } else {
                alert('Unknown error occurred.')
            }
        }
    } catch (error) {
        alert('Error logging in:', error.message)
    }
})