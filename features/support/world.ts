
function World() {
  const {BrowserWindow} = require('electron');

  this.createWindow = function(options) {
    return new BrowserWindow(options);
  };
}

module.exports = function() {
  this.World = World;
};

