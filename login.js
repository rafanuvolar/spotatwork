document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        // ✅ Guardamos el token del usuario en localStorage
        localStorage.setItem("supabase_token", data.session.access_token);

        alert("Login successful!");
        window.location.href = "index.html"; // Redirige a la página que quieras
    }
});