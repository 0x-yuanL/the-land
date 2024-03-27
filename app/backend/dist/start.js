"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at ${process.env.NODE_HOST}:${process.env.SERVER_PORT}`);
});
//# sourceMappingURL=start.js.map