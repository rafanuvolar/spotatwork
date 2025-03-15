document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();  // Previene la recarga de la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Cambia esto por tu página principal después del login
    }
});