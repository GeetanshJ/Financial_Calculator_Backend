<<<<<<< HEAD
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const debtRouter = require("./routes/DebtRatioRoutes");
const loanRouter = require("./routes/LoanRoutes");
const authRouter = require("./routes/AuthRoutes");
const sip = require("./routes/Sip");

app.use(cors());
app.use(bodyParser.json());

app.use("/debt", debtRouter);
app.use("/loan", loanRouter);
app.use("/auth", authRouter);
app.use("/sip", sip);
const PORT =  8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const debtRouter = require("./routes/DebtRatioRoutes");
const loanRouter = require("./routes/LoanRoutes");
const authRouter = require("./routes/AuthRoutes");
const sip = require("./routes/Sip");

app.use(cors());
app.use(bodyParser.json());

app.use("/debt", debtRouter);
app.use("/loan", loanRouter);
app.use("/auth", authRouter);
app.use("/sip", sip);
const PORT =  8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
>>>>>>> c666333017220d5ef2e5fc779ec279584138cbe1
