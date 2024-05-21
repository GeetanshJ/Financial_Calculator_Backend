
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const debtRouter = require("./routes/DebtRatioRoutes");
const loanRouter = require("./routes/LoanRoutes");
const authRouter = require("./routes/AuthRoutes");
const sip = require("./routes/Sip");
const retirement = require("./routes/retirement");

app.use(cors());
app.use(bodyParser.json());

app.use("/debt", debtRouter);
app.use("/loan", loanRouter);
app.use("/auth", authRouter);
app.use("/sip", sip);
app.use("/retirement", retirement);
const PORT =  8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
