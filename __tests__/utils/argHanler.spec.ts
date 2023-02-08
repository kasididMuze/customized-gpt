import { argumentResolver } from "../../utils/argHandler"

describe('argument handler', () => {
  it.each`
    args | opt | expectedValue
    ${['-f', 'foo']} | ${'-f'} | ${'foo'}
    ${['-b', 'bar']} | ${'-f'} | ${undefined}
    ${['-f', 'foo', '-b', 'bar']} | ${'-b'} | ${'bar'}
  `
  (`should parse argument correctly to get options:$opt from $args `, ({ args, opt, expectedValue }) => {
    const val = argumentResolver(args, opt)
    expect(val).toBe(expectedValue)
  })
})