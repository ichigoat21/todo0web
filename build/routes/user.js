"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../server"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    yield server_1.default.userModel.create({
        username: username,
        password: hashedPassword
    });
    res.json({
        message: "you are signed up"
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const pass = req.body.password;
    const response = yield server_1.default.userModel.findOne({
        username: username
    });
    if (!response) {
        res.status(403).json({
            message: "something went wrong"
        });
    }
    //@ts-ignore
    const password = yield bcrypt_1.default.compare(pass, response === null || response === void 0 ? void 0 : response.password);
    if (!password) {
        res.json("wrong pass ");
    }
    else {
        const token = jsonwebtoken_1.default.sign({
            //@ts-ignore
            id: response._id
        }, config_1.JWT_KEY);
        res.status(200).json({
            token
        });
    }
}));
exports.default = userRouter;
