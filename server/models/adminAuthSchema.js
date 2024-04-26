const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const AdminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    userdp: {
      type: String,
      default:
        'https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png',
    },
    userbio: {
      type: String,
      default: 'Tell us about yourself',
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor'],
      default: 'editor',
    },
    mypost: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  { timestamps: true }
);

AdminSchema.pre('save', async function (next) {
  const gensalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, gensalt);
  next();
});

AdminSchema.methods.checkPassword = async function (password) {
  try {
    const checkPassword = await bcrypt.compare(password, this.password);

    console.log('Password comparison result:', checkPassword);

    return checkPassword;
    
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
  }
};

AdminSchema.methods.newHashPassword = async function (password) {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {}
};

module.exports = mongoose.model('Admin', AdminSchema);
