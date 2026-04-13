import express from "express";
import registerController from "../controllers/user/RegisterController.js";
import loginController from "../controllers/user/LoginController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;

// register:
//json
// {
//     "data": {
//         "username": "testuser",
//         "email": "test@gmail.com",
//         "password": "$2b$10$MQaO7w/WqF0RXoEheLn9T.OtWwiXN0mm5Zc.KQpEaTg4JRYrnVxdK",
//         "_id": "69db584cfbfa27764d91dd96",
//         "createdAt": "2026-04-12T08:31:08.049Z",
//         "updatedAt": "2026-04-12T08:31:08.049Z",
//         "__v": 0
//     },
//     "message": "Registered successfully testuser"
// }

//login:
// json
// {
//     "data": {
//         "_id": "69db584cfbfa27764d91dd96",
//         "username": "testuser",
//         "email": "test@gmail.com",
//         "password": "$2b$10$MQaO7w/WqF0RXoEheLn9T.OtWwiXN0mm5Zc.KQpEaTg4JRYrnVxdK",
//         "createdAt": "2026-04-12T08:31:08.049Z",
//         "updatedAt": "2026-04-12T08:31:08.049Z",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjlkYjU4NGNmYmZhMjc3NjRkOTFkZDk2IiwiaWF0IjoxNzc1OTgyNzMwLCJleHAiOjE3NzYwNjkxMzB9.0eXIC2gu2bs5rmUtq4713NiH5FnhH7oiosJ1Sy0mYY4",
//     "message": "Log in successful"
// }
