const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scan-xss', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  const command = `python3 xss_scanner11.py ${url}`;


  exec(command, (error, stdout, stderr) => {
   if (error) {
    console.error(`Erreur lors de l'exécution: ${stderr}`);
    return res.status(500).json({ error: stderr || 'Erreur lors de l\'exécution' });
   }

   console.log(`Résultat du scan XSS: ${stdout}`);  // Affiche le résultat du scan
   res.json({ result: stdout });
 });

});

app.post('/scan-html', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  const command = `python3 injectionHTML.py ${url}`;


  exec(command, (error, stdout, stderr) => {
   if (error) {
    console.error(`Erreur lors de l'exécution: ${stderr}`);
    return res.status(500).json({ error: stderr || 'Erreur lors de l\'exécution' });
   }

   console.log(`Résultat du scan html injection: ${stdout}`);  // Affiche le résultat du scan
   res.json({ result: stdout });
 });

});

app.post('/scan-brute', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  const command = `python3 brute-force.py ${url}`;


  exec(command, (error, stdout, stderr) => {
   if (error) {
    console.error(`Erreur lors de l'exécution: ${stderr}`);
    return res.status(500).json({ error: stderr || 'Erreur lors de l\'exécution' });
   }

   console.log(`Résultat du scan brute force: ${stdout}`);  // Affiche le résultat du scan
   res.json({ result: stdout });
 });

});

app.post('/scan-poisoning', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  const command = `python3 poisoning.py ${url}`;


  exec(command, (error, stdout, stderr) => {
   if (error) {
    console.error(`Erreur lors de l'exécution: ${stderr}`);
    return res.status(500).json({ error: stderr || 'Erreur lors de l\'exécution' });
   }

   console.log(`Résultat du scan web cache poisoning: ${stdout}`);  // Affiche le résultat du scan
   res.json({ result: stdout });
 });

});

app.post('/scan-deception', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  const command = `python3 deception.py ${url}`;


  exec(command, (error, stdout, stderr) => {
   if (error) {
    console.error(`Erreur lors de l'exécution: ${stderr}`);
    return res.status(500).json({ error: stderr || 'Erreur lors de l\'exécution' });
   }

   console.log(`Résultat du scan web cache deception: ${stdout}`);  // Affiche le résultat du scan
   res.json({ result: stdout });
 });

});

app.listen(5000, '0.0.0.0', () => console.log('✅ Backend lancé sur http://0.0.0.0:5000'));
