const express = require('express');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found. Run `npm run build` first.');
  }
});

app.get('/api/scorm-package', (req, res) => {
  const output = fs.createWriteStream('scorm-package.zip');
  const archive = archiver('zip');

  output.on('close', () => {
    res.download('scorm-package.zip');
  });

  archive.pipe(output);
  archive.directory('dist/', false);
  archive.directory('public/assets/', 'assets');
  archive.file('imsmanifest.xml', { name: 'imsmanifest.xml' });
  archive.file(path.join(__dirname, 'public', 'scormdriver.js'), { name: 'scormdriver.js' });
  archive.finalize();
});

app.listen(port, () => console.log(`Server running on port ${port}`));