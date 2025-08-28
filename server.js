const express = require("express");
const path = require("path");
const connectDB = require("./config/db"); // database connection
const { User } = require("./models/User"); // Correctly import the User model
const { RegisterUser } = require('./models/RegisterUser'); // Import schema

const app = express();

try {
    connectDB();
} catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
}

// Middleware
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data
app.use("/public", express.static(path.join(__dirname, "static")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "login.html"));
});

app.post("/save-data", async (req, res) => {
    try {
        const {
            name,
            key,
            time,
            Loanstaken,
            konsaLoan,
            totaldailypays,
            DPVv,
            latefees,
            totalDebt,
            balancia,
        } = req.body;

        // Sanitize DPVv to avoid NaN values
        const sanitizedDPVv = isNaN(DPVv) ? null : parseFloat(DPVv);

        const existingUser = await User.findOne({ Customer: name });

        if (existingUser) {
            console.log("-------------Exists-----------------");
            await User.updateOne(
                { Customer: name },
                { Password: key},
                {
                    $set: {
                        Time_Of_Loan_Taken: new Date(time),
                        Loans_Taken: Loanstaken,
                        Loans_Taken_Value: parseFloat(konsaLoan),
                        Total_Daily_Payments: parseFloat(totaldailypays),
                        Daily_Payment_Value: sanitizedDPVv,
                        Late_Payment_Fees: parseFloat(latefees),
                        Total_Debt: parseFloat(totalDebt),
                        Balance: parseFloat(balancia),
                    },
                }
            )
        } else{
            //creating new user
            const newUser = new User({
                Customer: name,
                Password: key,
                Time_Of_Loan_Taken: new Date(time),
                Loans_Taken: Loanstaken,
                Loans_Taken_Value: parseFloat(konsaLoan),
                Total_Daily_Payments: parseFloat(totaldailypays),
                Daily_Payment_Value: sanitizedDPVv,
                Late_Payment_Fees: parseFloat(latefees),
                Total_Debt: parseFloat(totalDebt),
                Balance: parseFloat(balancia),
            });
            // save document to Database
            await newUser.save();
        }
        res.json({ message: "Data saved successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Failed to save data" });
    }
});
const fetchUserData = async (username) => {
    try {
        const userData = await User.findOne({ Customer: username });
        if (!userData) {
            console.log(`No user found with the username: ${username}`);
            return;
        }

        //converting Decimal128 fields to readable numbers
        const formattedData = {
            ...userData.toObject(),
            Loans_Taken: userData.Loans_Taken,
            Total_Daily_Payments: userData.Total_Daily_Payments.toString(),
            Loans_Taken_Value: userData.Loans_Taken_Value.toString(),
            Daily_Payment_Value: userData.Daily_Payment_Value.toString(),
            Late_Payment_Fees: userData.Late_Payment_Fees.toString(),
            Total_Debt: userData.Total_Debt.toString(),
            Balance: userData.Balance.toString(),
        };
        console.log(formattedData);
        const loanTakenValue = userData.Loans_Taken_Value.toString();
        const dailyPaymentValue = userData.Daily_Payment_Value.toString();
        const latePaymentFees = userData.Late_Payment_Fees.toString();
        const totalDebt = userData.Total_Debt.toString();
        const balance = userData.Balance.toString();

        console.log("Loan Taken Value:", loanTakenValue);
        console.log("Daily Payment Value:", dailyPaymentValue);
        console.log("Late Payment Fees:", latePaymentFees);
        console.log("Total Debt:", totalDebt);
        console.log("Balance:", balance);

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

//fetchUserData("Meet-Soni");

app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const userData = await User.findOne({ Customer: username });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const formattedData = {
            Loans_Taken: userData.Loans_Taken,
            Total_Daily_Paymentsc: userData.Total_Daily_Payments.toString(),
            Loans_Taken_Value: userData.Loans_Taken_Value.toString(),
            Daily_Payment_Value: userData.Daily_Payment_Value.toString(),
            Late_Payment_Fees: userData.Late_Payment_Fees.toString(),
            Total_Debt: userData.Total_Debt.toString(),
            Balance: userData.Balance.toString(),
        };

        res.status(200).json({ data: formattedData });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Failed to fetch user data" });
    }
});

app.post('/send-data', (req, res) => {
    // destructure the correct keys from req.body
    const { usernameTOBE, passwordTOBE } = req.body;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

    console.log('Data received:', req.body);
    console.log('Username:', usernameTOBE);
    console.log('Password:', passwordTOBE);

    if(usernameTOBE && passwordTOBE){
        fetchUserData(usernameTOBE)
    }
    // response back to the client
    res.send('Data received and separated successfully!');
});

app.get("/check-username/:username", async (req, res) => {
    const { username } = req.params;
    const user = await RegisterUser.findOne({ Customer: username });
    res.json({ exists: !!user });
});

app.post("/check-user", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await RegisterUser.findOne({ Customer: username });

        if (user && user.Password === password) {
            res.json({ valid: true });
        } else {
            res.json({ valid: false });
        }
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if user already exists in RegisterUser
        const existingUser = await RegisterUser.findOne({ Customer: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        // Save user in RegisterUser collection
        const newUser = new RegisterUser({ Customer: username, Password: password });
        await newUser.save();

        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error, try again!" });
    }
});


const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//module.exports = { fetchUserData };

