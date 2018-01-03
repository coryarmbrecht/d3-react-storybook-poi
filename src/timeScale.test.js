import timeScale from './index.js'

test('timeScale function exists', () => {
    expect(timeScale()).toBeDefined()
})

test('give the centerpoint date', () => {
    expect(timeScale(50)).toBeDefined()
})