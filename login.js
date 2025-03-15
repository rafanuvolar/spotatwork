document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                console.error("Login error:", error);
                alert("Login failed: " + error.message);
                return;
            }

            // Guarda el usuario en localStorage (opcional)
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirige a donde necesites

        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    });
});