import { supabase } from './supabaseV2.js';

document.addEventListener("DOMContentLoaded", function () {
    const resetForm = document.getElementById("reset-form");
    const successMessage = document.getElementById("success-message");

    resetForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Please enter a valid email address.");
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
                showError("Error: " + error.message);
                return;
            }

            resetForm.style.display = "none";
            successMessage.classList.remove("hidden");
        } catch (err) {
            console.error("Unexpected error:", err);
            showError("An unexpected error occurred. Please try again.");
        } finally {
            submitButton.disabled = false;
        }
    });

    function showError(message) {
        const errorDiv = document.getElementById("error-message");
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
    }
});