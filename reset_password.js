import { supabase } from './supabaseV2.js';

document.addEventListener("DOMContentLoaded", function () {
    const resetForm = document.getElementById("reset-form");

    resetForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        // Validar que el email contenga un '@' y siga el formato correcto
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const submitButton = resetForm.querySelector("button");
        submitButton.disabled = true;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "https://rafanuvolar.github.io/spotatwork/set_password.html"
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
        } finally {
            submitButton.disabled = false;
        }
    });
});