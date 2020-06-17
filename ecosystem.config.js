module.exports = {
  apps : [{
    script: './dist/main.js',
    watch: 'true',
    env: {
      NODE_ENV: 'development',
      NAME: 'u344112773_gymnasium_dev',
      HOST: 'sql307.main-hosting.eu',
      PORT: 3306,
      USER: 'u344112773_gymnasium_dev',
      PASSWORD: 'Erev0s13!',
      DATABASE: 'u344112773_gymnasium_dev',
      FILE_URL: "http://localhost:3000",
      PORT_URL: 3000,
    },
    env_production : {
      NODE_ENV: "production",
      NAME: 'u344112773_gymnasium_prod',
      HOST: 'sql307.main-hosting.eu',
      PORT: 3306,
      USER: 'u344112773_gymnasium_prod',
      PASSWORD: 'Erev0s13!',
      DATABASE: 'u344112773_gymnasium_prod',
      FILE_URL: "45.15.25.147/pub",
      PORT_URL: 3000,
    }

  }, {
    // script: './service-worker/',
    // watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
