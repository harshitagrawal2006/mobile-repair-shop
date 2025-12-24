// export const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, Postman, etc.)
//     if (!origin) return callback(null, true);

//     const allowedOrigins = process.env.CORS_ORIGIN 
//       ? process.env.CORS_ORIGIN.split(',') 
//       : ['http://localhost:3000', 'http://localhost:5173'];

//     if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// options for development 
export const corsOptions = {
  origin: '*', // Allow all origins for development
  credentials: true,
  optionsSuccessStatus: 200
};
