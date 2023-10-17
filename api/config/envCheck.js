require("dotenv").config();

const checkEnvVariables = () => {
  const requiredEnvVariables = [
    "PORT",
    "SECRET_PASSWORD",
    "MONGO_URI",
    "TMDB_CLIENT_HOST",
  ];

  const missingVariables = [];

  requiredEnvVariables.forEach((envVariable) => {
    if (!process.env[envVariable]) {
      missingVariables.push(envVariable);
    }
  });

  if (missingVariables.length > 0) {
    console.error(
      `This enviroment variables are required in the .env file: ${missingVariables.join(
        ", "
      )}`
    );
    process.exit(1);
  }
};

module.exports = checkEnvVariables;
