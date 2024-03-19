import React, {useState} from 'react';
import { Spin } from 'antd';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });


      if (response.ok) {
        console.log('Login successful');
        const { message, token, location } = await response.json(); 
        localStorage.setItem('token', token);
        localStorage.setItem('location',location);
        window.location.href = '/admin/dashboard';
      } else {
        const errorData = await response.json();
        console.error('Error during login:', errorData.message);
        alert(errorData.message);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
      window.location.href = "/";
    }

    console.log('Username:', username);
    console.log('Password:', password);
    setUsername('');
    setPassword('');
  };

  return (
    <>
       {!loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '4rem' }}>
            <img
              style={{ height: '3.5rem', width: '3.5rem', marginRight: '2.5rem' }}
              src="https://pbs.twimg.com/profile_images/1430173932347342859/BfVWNFFV_400x400.jpg"
              alt="logo"
            />
          </div>
          <div style={{ display: 'flex', marginTop: '4rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: '1' }}>
            <div style={{ backgroundColor: '#edf2f7', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Admin Login</h2>
              </div>
              <form onSubmit={handleSubmit} style={{ maxWidth: '24rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#4a5568', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }} htmlFor="username">Username:</label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem', color: '#4a5568', outline: 'none' }}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    required={true}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ color: '#4a5568', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }} htmlFor="password">Password:</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem', color: '#4a5568', outline: 'none' }}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    required={true}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    style={{ backgroundColor: '#630944', color: '#fff', borderRadius: '0.25rem', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', outline: 'none', cursor: 'pointer' }}
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: '#630944', textAlign: 'center', color: '#fff', paddingTop: '1.25rem', paddingBottom: '1.25rem', marginTop: '1.5rem', marginBottom: '0' }}>
            <p style={{ fontSize: '1.25rem' }}>Let Us Serve You</p>
          </div>
        </div>
      ) : (
        <Spin size="large" fullscreen />
      )}
    </>
  );
};

export default LoginPage;