import hbs from 'htmlbars-inline-precompile';
import {
  click,
  find
} from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-attacher', 'Integration | Component | lazyRender', {
  integration: true
});

test('will lazily render the yield block when lazyRender is passed as true', async function(assert) {
  assert.expect(2);

  this.render(hbs`
    <button id="toggle-show">
      Click me, captain!

      {{#attach-popover id='attachment' lazyRender=true}}
        <div id='should-not-be-present-until-clicked'></div>
      {{/attach-popover}}
    </button>
  `);

  assert.notOk(find('#should-not-be-present-until-clicked'), 'Has not initially rendered the yield block.');

  await click('#toggle-show');

  assert.ok(find('#should-not-be-present-until-clicked'), 'Has rendered the yield block.');
});

test('lazily render will default to false which will eager render the yeild block', async function(assert) {
  assert.expect(1);

  this.render(hbs`
    <button id="toggle-show">
      Click me, captain!

      {{#attach-popover id='attachment'}}
        <div id='should-not-be-present-until-clicked'></div>
      {{/attach-popover}}
    </button>
  `);

  assert.ok(find('#should-not-be-present-until-clicked'), 'Has initially rendered the yield block.');
});
