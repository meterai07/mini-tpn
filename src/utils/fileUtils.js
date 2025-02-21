const fs = require('fs');
const path = require('path');

exports.createUploadsDir = () => {
  const dir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};