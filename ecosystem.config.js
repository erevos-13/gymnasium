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
      FILE_URL_PATH_SAVE: "folders/newsFeed/images",
      FILE_URL_LINK: "http://localhost:3000"
    },
    production : {
      NODE_ENV: "production",
      NAME: 'u344112773_gymnasium_prod',
      HOST: 'sql307.main-hosting.eu',
      PORT: 3306,
      USER: 'u344112773_gymnasium_prod',
      PASSWORD: 'Erev0s13!',
      DATABASE: 'u344112773_gymnasium_prod',
      FILE_URL_PATH_SAVE: "folders/newsFeed/images",
      FILE_URL_LINK: "45.15.25.147/pub",
      PORT_URL: 3000,
    }

  }, {
    // script: './service-worker/',
    // watch: ['./service-worker']
  }],

  // Deployment part
  // Here you describe each environment
  deploy : {
    production : {
      "user" : "root",
      // Multi host is possible, just by passing IPs/hostname as an array
      "host" : ["45.15.25.147"],
      // Branch
      "ref"  : "origin/master",
      // Git repository to clone
      "repo" : "git@github.com:erevos-13/gymnasium.git",
      // Path of the application on target servers
      "path" : "/home/erevos13/BackEndProjects/gymnasium",
      // Can be used to give options in the format used in the configura-
      // tion file.  This is useful for specifying options for which there
      // is no separate command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      "ssh_options": "StrictHostKeyChecking=no",
      // To prepare the host by installing required software (eg: git)
      // even before the setup process starts
      // can be multiple commands separated by the character ";"
      // or path to a script on your local machine
      "pre-setup" : "apt-get install git",
      // Commands / path to a script on the host machine
      // This will be executed on the host after cloning the repository
      // eg: placing configurations in the shared dir etc
      "post-setup": "ls -la",
      // Commands to execute locally (on the same machine you deploy things)
      // Can be multiple commands separated by the character ";"
      "pre-deploy-local" : "echo 'This is a local executed command'",
      // Commands to be executed on the server after the repo has been cloned
      "post-deploy" : "npm install && pm2 start ecosystem.json --env production",
      // Environment variables that must be injected in all applications on this env
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
