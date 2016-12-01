/* global Module */

/* Magic Mirror
 * Module: Bills
 *
 */

Module.register("bills",{

	defaults: {
	    source: "/home/pi/bill_data.json",
	},

  start: function() {
    Log.info("Starting module: " + this.name);
    this.sendSocketNotification('CONFIG', this.config);
  },

  getStyles: function() {
    return ["bills.css"];
  },
        
	getDom: function() {
    var wrapper = document.createElement("div");
		var table = document.createElement("table");
    wrapper.appendChild(table);
    table.className = "small";
    for (var b in this.bills) {
      bill = this.bills[b]
      var row = document.createElement("tr")
      table.appendChild(row)
      var name = document.createElement("td")
      name.innerHTML = bill.name
      name.className = "bright bold"
      row.appendChild(name)
      var due = document.createElement("td")
      due.innerHTML = bill.due
      row.appendChild(due)
      var amount = document.createElement("td")
      if (bill.amount.startsWith("$")) {
        amount.className = "bold amount_due"
      } else {
        amount.className = "bold light"
      }
      amount.innerHTML = bill.amount
      row.appendChild(amount)
    }
		return wrapper;
	},

  socketNotificationReceived: function(notification, payload) {
    if (notification == 'DATA_UPDATE') {
      this.bills = payload;
    }
    this.updateDom();
  }

});
