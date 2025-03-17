document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("set-password-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!newPassword || !confirmPassword) {
            alert("Please fill in both password fields.");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) {
                console.error("Password update error:", error);
                alert("Error: " + error.message);
                return;
            }

            alert("Password successfully changed. Please log in again.");
            window.location.href = "index.html"; // Redirige a la página de login
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    });
});