const StateMachine = require('../..');
const expect = require('chai').expect;

describe('Initialisation', function() {

  it('should default to "none" state', function() {

    const fsm = StateMachine({
      events: [
          {name: 'start', from: 'one', to: 'another'}
      ]
    });

    expect(fsm.current).to.be.equal('none');
  });

  it('should initialize to provided state', function() {

    const fsm = StateMachine({
      initial: 'green',
      events: [
          {name: 'warn', from: 'green', to: 'yellow'},
          {name: 'panic', from: 'yellow', to: 'red'},
          {name: 'calm', from: 'red', to: 'yellow'},
          {name: 'clear', from: 'yellow', to: 'green'}
      ]});

    expect(fsm.current).to.be.equal('green');
  });

  it('should throw error on transition with array value for \'to\'', function(done) {


    try {
      const fsm = StateMachine({
        initial: 'here',
        events: [
            {name: 'jump', from: 'here', to: ['here', 'there']}
        ]
      });
    } catch (e) {
      expect(e.message).to.be.equal('Ambigous transition');
      expect(e.trigger).to.be.equal('jump');
      expect(e.current).to.be.equal('here');

      done();
    }
  });
});
