const buttonRegister = document.querySelector('#sendRegister')
const nombreInput = document.querySelector('#nombre')
const apellidoInput = document.querySelector('#apellido')
const edadInput = document.querySelector('#edad')
const emailInput = document.querySelector('#email')
const rolInput = document.querySelector('#rol')
const passwordInput = document.querySelector('#contrasenia')

const user = {
    first_name: '',
    last_name:'',
    age: 0,
    email:'',
    rol: '',
    password:''
}

const handleChange = (e) => {
    const { name, value } = e.target;
    user[name] = value;
};

nombreInput.addEventListener('input', handleChange)
apellidoInput.addEventListener('input', handleChange)
emailInput.addEventListener('input', handleChange)
rolInput.addEventListener('input', handleChange)
passwordInput.addEventListener('input', handleChange)

buttonRegister.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
  
      if (response.status === 200 || response.status < 300)
        window.location.href = "/users/login";
    } catch (e) {
      console.log("error", e);
    }
  });