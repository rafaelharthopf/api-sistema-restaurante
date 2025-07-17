import app from './server';

const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log(`🚀 API Restaurante rodando na porta ${port}`);
});
