const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permite requisições de qualquer origem (CORS)
app.use(cors());

app.get('/proxy/weather', async (req, res) => {
  const { key, city_name } = req.query;
  if (!key || !city_name) {
    return res.status(400).json({ error: 'Parâmetros key e city_name são obrigatórios.' });
  }

  try {
    const response = await axios.get('https://api.hgbrasil.com/weather', {
      params: {
        key,
        city_name,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro na API HG Brasil:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados do clima' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
