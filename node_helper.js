var fs = require('fs');
var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting node helper: " + this.name);
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    var self = this;

    if (notification === 'CONFIG') {
      this.config = payload;
      fs.watch(this.config.source, {encoding: "buffer"}, (eventType, fileName) => {
        if (fileName) {
          this.loadDataSource(this.config.source);
        }
    });
    this.loadDataSource(this.config.source);
    }
  },

  loadDataSource: function(filename) {
    var bills = JSON.parse(fs.readFileSync(filename, 'utf8'));
    this.sendSocketNotification('DATA_UPDATE', bills);
  }

});
