module.exports = {
    apps: [{
      name: 'Beam_Admin_Panel',
      script: './node_modules/react-scripts/scripts/start.js',
    }],
    deploy: {
      production: {
        key: '/Users/user/Desktop/subhankar/projects/BEAM/BeamBackend.pem',
        user: 'ubuntu',
        host: '3.1.205.255',
        ref: 'origin/master',
        repo: 'git@github.com:keshteam/beam_admin_panel.git',
        path: '/home/ubuntu/admin_panel',
        'pre-deploy-local': "echo 'beginning production deployment'",
        'post-setup': 'npm version,',
        'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
      },
      staging: {
        key: '/Users/user/Desktop/subhankar/projects/BEAM/BeamBackend.pem',
        user: 'ubuntu',
        host: '3.0.180.104',
        ref: 'origin/dev',
        repo: 'git@github.com:keshteam/beam_admin_panel.git',
        path: '/home/ubuntu/admin_panel',
        'pre-deploy-local': "echo 'beginning staging deployment'",
        'post-setup': 'npm version,',
        'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env staging',
      },
    },
  };
  
// pm2 deploy staging setup
// pm2 deploy ecosystem.config.js staging
// pm2 deploy ecosystem.config.js staging update