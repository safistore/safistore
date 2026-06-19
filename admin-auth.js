const adminForm = document.getElementById("adminLoginForm");

if (adminForm) {

    adminForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value;

        if (
            email === "safeekestore@gmail.com" &&
            password === "safeek7879mrs"
        ) {

            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", email);

            alert("Admin Login Successful");

            window.location.href = "admin.html";

        } else {

            alert("Invalid Admin Email or Password");

        }

    });

}