import { expect, test } from 'vitest'
import {
  camelToPascal,
  camelToSnake,
  capitalize,
  pascalToCamel,
  pascalToSnake,
  snakeToCamel,
  snakeToPascal,
} from '../string'

test('capitalize', () => {
  expect(capitalize('')).toEqual('')
  expect(capitalize('a')).toEqual('A')
  expect(capitalize('A')).toEqual('A')
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('good morning')).toEqual('Good morning')
  expect(capitalize('good__morning')).toEqual('Good__morning')
  expect(capitalize('Fred')).toEqual('Fred')
})

test('camelCaseToPascalCase', () => {
  expect(camelToPascal('')).toEqual('')
  expect(camelToPascal('foo')).toEqual('Foo')
  expect(camelToPascal('Foo')).toEqual('Foo')
  expect(camelToPascal('fooBar')).toEqual('FooBar')
  expect(camelToPascal('helloWorld')).toEqual('HelloWorld')
  expect(camelToPascal('helloWorldUniverse')).toEqual('HelloWorldUniverse')
})

test('pascalCaseToCamelCase', () => {
  expect(pascalToCamel('')).toEqual('')
  expect(pascalToCamel('foo')).toEqual('foo')
  expect(pascalToCamel('Foo')).toEqual('foo')
  expect(pascalToCamel('FooBar')).toEqual('fooBar')
  expect(pascalToCamel('HelloWorld')).toEqual('helloWorld')
})

test('snakeCaseToCamelCase', () => {
  expect(snakeToCamel('')).toEqual('')
  expect(snakeToCamel('foo')).toEqual('foo')
  expect(snakeToCamel('_foo')).toEqual('Foo')
  expect(snakeToCamel('foo_bar')).toEqual('fooBar')
  expect(snakeToCamel('foo_Bar')).toEqual('fooBar')
  expect(snakeToCamel('foo_bar_gaz')).toEqual('fooBarGaz')
  expect(snakeToCamel('hello_world')).toEqual('helloWorld')
})

test('snakeCaseToPascalCase', () => {
  expect(snakeToPascal('')).toEqual('')
  expect(snakeToPascal('foo_bar')).toEqual('FooBar')
  expect(snakeToPascal('hello_world')).toEqual('HelloWorld')
})

test('camelCaseToSnakeCase', () => {
  expect(camelToSnake('')).toEqual('')
  expect(camelToSnake('foo123Bar')).toEqual('foo123_bar')
  expect(camelToSnake('helloWorld45')).toEqual('hello_world45')
  expect(camelToSnake('howAre22YouToday')).toEqual('how_are22_you_today')
})

test('camelCaseToSnakeCase', () => {
  expect(pascalToSnake('')).toEqual('')
  expect(pascalToSnake('Foo123Bar')).toEqual('foo123_bar')
  expect(pascalToSnake('HelloWorld45')).toEqual('hello_world45')
  expect(pascalToSnake('HowAre22YouToday')).toEqual('how_are22_you_today')
})
