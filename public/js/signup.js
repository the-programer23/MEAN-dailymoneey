import '@babel/polyfill';
import axios from 'axios';
import showAlert from './alert'

export const signup = async (firstName, lastName, email, phoneNumber, password, confirmPassword) => {
    try {
        console.log('try block signup')
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword
            }
        })

        if (res.data.status === 'success') {

            location.assign(`/me/?alert=signup&name=${firstName}&email=${email}`);
            const fName = firstName.split(' ')[0]
            showAlert('success', `Muy bien, ${fName}. ¡Ya te registraste! Ahora verifica la bandeja de entrada de tu e-mail ${email} o en en Spam para confirmar tu cuenta`, 120);
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}