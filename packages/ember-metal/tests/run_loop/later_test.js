// ==========================================================================
// Project:  Ember Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var previousPreventRunloop;

module('system/run_loop/later_test', {
  setup: function() {
    previousPreventRunloop = Ember.ENV.PREVENT_AUTOMATIC_RUNLOOP_CREATION;
    Ember.ENV.PREVENT_AUTOMATIC_RUNLOOP_CREATION = false;
  },

  teardown: function() {
     Ember.ENV.PREVENT_AUTOMATIC_RUNLOOP_CREATION = previousPreventRunloop;
  }
});

test('should invoke after specified period of time - function only', function() {

  var invoked = false;

  Ember.run.later(function() { invoked = true; }, 100);
  stop();

  setTimeout(function() {
    start();
    equal(invoked, true, 'should have invoked later item');
  }, 150);

});


test('should invoke after specified period of time - target/method', function() {

  var obj = { invoked: false } ;

  Ember.run.later(obj, function() { this.invoked = true; }, 100);
  stop();

  setTimeout(function() {
    start();
    equal(obj.invoked, true, 'should have invoked later item');
  }, 150);

});


test('should invoke after specified period of time - target/method/args', function() {

  var obj = { invoked: 0 } ;

  Ember.run.later(obj, function(amt) { this.invoked += amt; }, 10, 100);
  stop();

  setTimeout(function() {
    start();
    equal(obj.invoked, 10, 'should have invoked later item');
  }, 150);

});
