const StateMachine = require('../..');
const expect = require('chai').expect;
const EventEmitter = require('events').EventEmitter;

describe('Event emitter: ', function() {

  it('should emit events (new object)', function(done) {
    const states = [];

    const fsm = StateMachine({
      initial: 'here',
      events: [
        {
          name: 'jump',
          from: 'here',
          to: 'there'
        },
        {
          name: 'walk',
          from: 'there',
          to: 'here'
        }
      ],
      callbacks: {
        onenteredthere: function() {
        }
      }
    });

    fsm.on('state', function(newState) {
      expect(newState)
        .to
        .be
        .equal(fsm.current);
      states.push(newState);
    });

    fsm.jump()
      .then(function() {
        return fsm.walk();
      })
      .then(function() {
        expect(states)
          .to
          .be
          .deep
          .equal([
            'there',
            'here'
          ]);
        done();
      });
  });

  it('should emit events (target provided)', function(done) {
    const states = [];

    const fsm = StateMachine({
      initial: 'here',
      events: [
        {
          name: 'jump',
          from: 'here',
          to: 'there'
        },
        {
          name: 'walk',
          from: 'there',
          to: 'here'
        }
      ],
      callbacks: {
        onenteredthere: function() {
        }
      }
    }, new EventEmitter());

    fsm.on('state', function(newState) {
      expect(newState)
        .to
        .be
        .equal(fsm.current);
      states.push(newState);
    });

    fsm.jump()
      .then(function() {
        return fsm.walk();
      })
      .then(function() {
        expect(states)
          .to
          .be
          .deep
          .equal([
            'there',
            'here'
          ]);
        done();
      });
  });

  it('should not emit `state` event for pseudo states', function(done) {
    const states = [];

    const fsm = StateMachine({
      initial: 'init',
      events: [
        {name: 'start', from: 'init', to: ['a', 'b'], condition: function(options) {
          return 0;
        }}
      ]
    });

    fsm.on('state', function(state) {
      states.push(state);
    });

    fsm.start().then(function() {
      expect(states).to.be.deep.equal(['a']);
      done();
    }).catch(done);
  });
});
