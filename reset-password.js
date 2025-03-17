document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reset-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim(); // Asegurar que no haya espacios en blanco

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "https://rafanuvolar.github.io/spotatwork/set-password.html" // Verifica que sea la URL correcta
            });

            if (error) {
                console.error("Reset password error:", error);
                alert("Error: " + error.message);
                return;
            }

            alert("Check your email to reset your password.");
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    });
});