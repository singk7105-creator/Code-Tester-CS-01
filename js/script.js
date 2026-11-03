const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let userBalances = {}; 

app.get('/api/balance/:walletId', (req, res) => {
    const { walletId } = req.params;
    const balance = userBalances[walletId] || 0;
    res.json({ balance });
});

app.post('/api/transfer', (req, res) => {
    const { senderId, receiverId, amount, senderBalance } = req.body;
    
    // Agar server ke paas balance nahi hai, toh frontend se mila hua balance set kar do
    if (userBalances[senderId] === undefined) {
        userBalances[senderId] = senderBalance || 0;
    }

    if (userBalances[senderId] < amount) {
        return res.status(400).json({ success: false, message: 'Insufficient balance!' });
    }

    userBalances[senderId] -= amount;
    userBalances[receiverId] = (userBalances[receiverId] || 0) + amount;

    res.json({ success: true, message: 'Transfer successful', senderBalance: userBalances[senderId] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PRM Free Server running on port ${PORT}`));
