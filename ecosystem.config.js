module.exports = {
  apps: [
    {
      name: 'kalyan-chatbot',
      script: './chatbot-server.js',
      cwd: '/home/ubuntu/awesome-portfolio-websites',
      env: {
        GROQ_API_KEY: process.env.GROQ_API_KEY || ''
      },
      error_file: '/tmp/chatbot-error.log',
      out_file: '/tmp/chatbot-out.log'
    },
    {
      name: 'kalyan-tunnel',
      script: 'cloudflared',
      args: 'tunnel --url http://localhost:3001',
      error_file: '/tmp/tunnel-error.log',
      out_file: '/tmp/tunnel-out.log'
    }
  ]
};
