 // --- Helpers ---
  function showToast(msg, color = '#1a00cc') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = color;
    t.style.display = 'block';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.style.display = 'none', 3000);
  }

  function setError(fieldId, errorId, show) {
    const input = document.getElementById(fieldId);
    const err   = document.getElementById(errorId);
    input.classList.toggle('error', show);
    err.classList.toggle('show', show);
  }

  function clearErrors() {
    setError('username', 'username-error', false);
    setError('password', 'password-error', false);
  }

  // --- Validate ---
  function validate() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    let valid = true;

    if (!username) { setError('username', 'username-error', true); valid = false; }
    else            { setError('username', 'username-error', false); }

    if (!password)  { setError('password', 'password-error', true); valid = false; }
    else            { setError('password', 'password-error', false); }

    return valid;
  }

  // --- Login Handler ---
  async function handleLogin() {
    clearErrors();
    if (!validate()) return;

    const btn     = document.getElementById('loginBtn');
    const text    = document.getElementById('btn-text');
    const spinner = document.getElementById('spinner');

    // Show loading state
    btn.disabled     = true;
    text.style.display   = 'none';
    spinner.style.display = 'block';

    // Simulate API call (replace with real fetch)
    await fakeApiCall();

    // Restore button
    btn.disabled     = false;
    text.style.display   = 'block';
    spinner.style.display = 'none';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Demo logic — replace with real auth
    if (username === 'admin' && password === 'password123') {
      showToast('✅ Login successful! Welcome, ' + username, '#16a34a');
      // window.location.href = '/dashboard'; // redirect after login
    } else {
      showToast('❌ Invalid username or password.', '#e53e3e');
      setError('username', 'username-error', false);
      document.getElementById('password-error').textContent = 'Invalid username or password.';
      setError('password', 'password-error', true);
    }
  }

  // --- Sign Up Handler ---
  function handleSignUp(e) {
    e.preventDefault();
    showToast('Redirecting to Sign Up…', '#1a00cc');
    // window.location.href = '/signup';
  }

  // --- Fake API delay ---
  function fakeApiCall() {
    return new Promise(resolve => setTimeout(resolve, 1200));
  }

  // --- Enter key support ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // --- Clear error on input ---
  document.getElementById('username').addEventListener('input', () =>
    setError('username', 'username-error', false));
  document.getElementById('password').addEventListener('input', () =>
    setError('password', 'password-error', false));