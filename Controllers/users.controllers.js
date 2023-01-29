const { User: UserModel } = require('../Models/users.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const { salt, hash } = saltAndHashPassword(req.body.password);

  const user = new UserModel({
    email: req.body.email,
    salt,
    hash,
    role: 'normal',
  });

  try {
    await user.save();
    res.send({ message: `User ${req.body.email} registered.` });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user === null)
    return res.status(401).json({ message: 'no user found by that email' });

  const { salt, hash, role } = user;
  const passwordIsValid = validatePassword(password, salt, hash);
  if (!passwordIsValid)
    return res.status(401).json({ message: 'password invalid' });

  const jwtToken = generateJwt(email, role);
  res
    .cookie('token', jwtToken, { httpOnly: true, SameSite: false })
    .status(200)
    .send('login successful');
}

const saltAndHashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return { salt, hash };
};

const validatePassword = (password, salt, hash) => {
  const loginAttemptHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return loginAttemptHash === hash;
};

const generateJwt = (email, organization_id, smalltown_admin) => {
  return jwt.sign(
    {
      email,
      organization_id,
      smalltown_admin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
};

module.exports = { register, login };
