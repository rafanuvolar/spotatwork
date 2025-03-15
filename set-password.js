document.getElementById("set-password-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Password successfully changed. Please log in again.");
        window.location.href = "index.html";
    }
});