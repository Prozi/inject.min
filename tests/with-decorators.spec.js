const { spawnSync } = require('child_process');

describe('GIVEN @Inject decorator', () => {
  it('THEN @Inject() and DIContainer.bind(Original, Override) work', () => {
    const {
      output: [, lines]
    } = spawnSync('ts-node', ['tests/with-decorators.ts'], {
      encoding: 'utf-8'
    });

    const result = JSON.parse(
      JSON.stringify(lines.split('\n').filter(Boolean))
    );

    expect(result).toStrictEqual([
      'example',
      'example2',
      'example3',
      'example',
      'different',
      'example3',
      'example',
      'example2',
      'example3',
      'override',
      'true'
    ]);
  });
});
