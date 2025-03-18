import { supabase } from './supabaseV2.js';

document.addEventListener("DOMContentLoaded", async function () {
    const setPasswordForm = document.getElementById("set-password-form");
    const successMessage = document.getElementById("success-message");

    setPasswordForm.addEventListener("submit", async function (event) {
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

        const submitButton = setPasswordForm.querySelector("button");
        submitButton.disabled = true;

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) {
                console.error("Password update error:", error);
                alert("Error: " + error.message);
                return;
            }

            setPasswordForm.style.display = "none";
            successMessage.classList.remove("hidden");

        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            submitButton.disabled = false;
        }
    });
});