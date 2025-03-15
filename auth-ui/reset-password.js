document.getElementById("reset-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://rafanuvolar.github.io/spotatwork/auth-ui/set-password.html"
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Check your email to reset your password.");
    }
});