import { supabase } from './supabaseV2.js';

document.addEventListener("DOMContentLoaded", function () {
    const resetForm = document.getElementById("reset-form");
    const messageBox = document.getElementById("reset-message");

    resetForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        messageBox.innerHTML = "";
        messageBox.classList.remove("success", "error");
        messageBox.style.display = "none";  

        function showMessage(message, type) {
            messageBox.innerHTML = message;
            messageBox.classList.add(type);
            messageBox.style.display = "block";
            messageBox.style.visibility = "visible";
            messageBox.style.opacity = "1";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            shakeInput(emailInput, messageBox);
            return;
        }

        const { data, error } = await supabase
            .from('profiles')  
            .select('email')
            .eq('email', email)
            .single();

        if (error || !data) {
            showMessage("This email does not exist in our records.", "error");
            shakeInput(emailInput, messageBox);
            return;
        }

        const submitButton = resetForm.querySelector("button");
        submitButton.disabled = true;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "http://localhost:8000/set_password.html"
            });

            if (error) {
                showMessage("Error: " + error.message, "error");
                shakeInput(emailInput, messageBox);
                return;
            }

            showMessage("Check your email to reset your password.", "success");
        } catch (err) {
            showMessage("An unexpected error occurred.", "error");
        } finally {
            submitButton.disabled = false;
        }
    });

    function shakeInput(inputField, messageBox) {
        inputField.classList.add("error-shake");
        messageBox.classList.add("error-shake");
        setTimeout(() => {
            inputField.classList.remove("error-shake");
            messageBox.classList.remove("error-shake");
        }, 500);
    }
});