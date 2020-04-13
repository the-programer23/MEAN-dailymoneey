const User = require('../models/userModel');
const Booking = require('../models/membershipModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
  promisify
} = require('util');
const jwt = require('jsonwebtoken');

exports.alerts = (req, res, next) => {
  const {
    alert,
    name,
    email
  } = req.query;

  // if (alert === 'booking') {
  //     res.locals.alert = "Su reserva fue exitosa, por favor verifica tu email para confirmarlo. Si su reserva no apararece aquí inmediatamente, por favor refresca esta página en unos instantes"
  // }

  if (alert === 'emailConfirmed') {
    res.locals.alert = `Muy bien, ${name}. Gracias por confirmar tu email`;
  }

  next();
};

exports.getHome = (req, res) => {
  res.status(200).render('home', {
    title: 'Inicio',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Registrate en DailyMoneey',
  });
};

exports.emailConfirmed = catchAsync(async (req, res, next) => {

  const decoded = await promisify(jwt.verify)(
    req.params.token,
    process.env.JWT_SECRET
  );

  const user = await User.findByIdAndUpdate(decoded.id, {
    emailConfirmed: true,
  });


  const fName = user.firstName.split(' ')[0];

  res.status(200).redirect(`/me/?alert=emailConfirmed&name=${fName}`);
});


exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Ingresa a tu Cuenta',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Tu cuenta',
  });
};

exports.getActiveTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('activeTours', {
    title: 'Tours activos',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id, {
      name: req.body.name,
      email: req.body.email,
    }, {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Tu cuenta',
    user: updatedUser,
  });
});