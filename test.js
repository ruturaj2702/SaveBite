async function test() {
  const registerData = {
    name: 'Gojo Satoru 2',
    email: 'gojo2@domain.com',
    username: 'GojoCafe2',
    password: 'password123',
    role: 'ngo',
    address: '123 Test St'
  };
  
  const regRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerData)
  });
  console.log('Register success:', await regRes.json());
}
test();
