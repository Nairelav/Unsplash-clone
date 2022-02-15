module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd9fe9a64c0e125f2ebd6c9592446f57a'),
  },
});
