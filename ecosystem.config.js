module.exports = {
  apps : [{
    name: 'thcs-api',
    script: 'src/index.js',
    instances: 2,
    exec_mode: 'cluster',
  }]
}
