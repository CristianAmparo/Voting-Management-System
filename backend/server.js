const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/votes', require('./routes/voteRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
