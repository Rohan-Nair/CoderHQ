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
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = require("./dbConfig/dbConfig");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
require('dotenv').config();
// creating the app
const app = (0, express_1.default)();
// parsing json middleware
app.use(express_1.default.json());
// parsing cookies middleware
app.use((0, cookie_parser_1.default)());
// cors middleware (need to change origin to frontend url in production)
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://coderhq.vercel.app/"],
    credentials: true,
}));
// connecting to the database
(0, dbConfig_1.connect)();
// routes
app.use('/api', routes_1.default);
// temp
app.use('/uploads', express_1.default.static('uploads'));
// this is a test route to check if server is running
app.use('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Hello World');
}));
// starting the server
app.listen(4000, () => {
    // test message to check if server is running (to be removed in production)
    console.log('Server is running on port 4000');
});
