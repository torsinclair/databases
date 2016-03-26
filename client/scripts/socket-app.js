var app = {

  //TODO: The current 'addFriend' function just adds the class 'friend'
  //to all messages sent by the user
  server: window.location.origin + '/classes/messages',
  socket: io.connect(window.location.origin),
  username: 'anonymous',
  roomname: 'lobby',
  lastMessageId: 0,

  init: function() {
    app.socket.on('send chats', function (data) {
      app.startSpinner();
      app.renderChat(data);
    });

    app.username = window.location.search.substr(10);

    // Cache jQuery selectors
    app.$main = $('#main');
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');

    // Add listeners
    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.saveRoom);
  },

  renderChat: function(data) {
    if (!data.results || !data.results.length) { return; }

    var mostRecentMessage = data.results[data.results.length - 1];
    var displayedRoom = $('.chat span').first().data('roomname');
    
    app.stopSpinner();
    
    if (app.roomname !== displayedRoom) { 
      app.populateRooms(data.results);
    }
    app.populateMessages(data.results);
  },

  clearMessages: function() {
    app.$chats.html('');
  },
  
  populateMessages: function(results, animate) {
    // Clear existing messages

    app.clearMessages();
    app.stopSpinner();
    if (Array.isArray(results)) {
      // Add all fetched messages
      results.forEach(app.addMessage);
    }

    // Make it scroll to the bottom
    var scrollTop = app.$chats.prop('scrollHeight');
    if (animate) {
      app.$chats.animate({
        scrollTop: scrollTop
      });
    } else {
      app.$chats.scrollTop(scrollTop);
    }
  },

  populateRooms: function(results) {
    app.$roomSelect.html('<option value="__newRoom">New room...</option></select>');

    if (results) {
      var rooms = {};
      results.forEach(function(data) {
        var roomname = data.roomname;
        if (roomname && !rooms[roomname]) {
          // Add the room to the select menu
          app.addRoom(roomname);

          // Store that we've added this room already
          rooms[roomname] = true;
        }
      });
    }

    // Select the menu option
    app.$roomSelect.val(app.roomname);
  },

  addRoom: function(roomname) {
    // Prevent XSS by escaping with DOM methods
    var $option = $('<option/>').val(roomname).text(roomname);

    // Add to select
    app.$roomSelect.append($option);
  },

  addMessage: function(data) {
    if (!data.roomname) {
      data.roomname = 'lobby';
    }

    // Only add messages that are in our current room
    if (data.roomname === app.roomname) {
      // Create a div to hold the chats
      var $chat = $('<div class="chat"/>');

      // Add in the message data using DOM methods to avoid XSS
      // Store the username in the element's data
      var $username = $('<span class="username"/>');
      $username.text(data.username + ': ').attr('data-username', data.username).attr('data-roomname', data.roomname).appendTo($chat);

      var $message = $('<br><span/>');
      $message.text(data.text).appendTo($chat);

      // Add the message to the UI
      app.$chats.append($chat);
    }
  },

  saveRoom: function(evt) {

    var selectIndex = app.$roomSelect.prop('selectedIndex');
    // New room is always the first option
    if (selectIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        // Set as the current room
        app.roomname = roomname;

        // Add the room to the menu
        app.addRoom(roomname);

        // Select the menu option
        app.$roomSelect.val(roomname);

        // Fetch messages again
        app.fetch();
      }
    } else {
      app.startSpinner();
      // Store as undefined for empty names
      app.roomname = app.$roomSelect.val();

      // Fetch messages again
      app.fetch();
    }
  },

  handleSubmit: function(evt) {
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };

    app.socket.emit('submit', message);

    // Stop the form from submitting
    evt.preventDefault();
  },

  startSpinner: function() {
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled', 'true');
  },

  stopSpinner: function() {
    $('.spinner img').fadeOut('fast');
    $('form input[type=submit]').attr('disabled', null);
  }
};

window.app = app;