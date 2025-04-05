const axios = require("axios");

axios.post("http://localhost:8080/users", {
        Username: "hoang123",
        Password: "123456"
    })
    .then(response => {
        console.log("User created:", response.data);
    })
    .catch(error => {
        console.error("Error:")
    });