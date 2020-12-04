import crypto from 'crypto';

const generateUniqueID = () => {
  return crypto.randomBytes(3).toString('hex');
}

export default generateUniqueID;