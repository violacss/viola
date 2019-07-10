import Core from '../'
import cosmiconfig from 'cosmiconfig'

jest.mock('cosmiconfig')

describe('Core', () => {
  beforeEach(() => {
    cosmiconfig.mockReturnValue({
      searchSync() {
        return {
          config: undefined,
          filepath: '',
        }
      },
    })
  })

  test('when instantiated should has empty sassFuncs', () => {
    const core = new Core()
    expect(core.sassFuncs).toStrictEqual([])
  })

  test('when not instantiated should not allow to access to sassFuncs', () => {
    expect(Core.sassFuncs).toBeUndefined()
  })

  test('given config file exists should provide its config prop based on that', () => {
    let expectedConfig = { fontSizeSteps: 4 }
    cosmiconfig.mockReturnValue({
      searchSync() {
        return {
          config: expectedConfig,
        }
      },
    })
    console.log(cosmiconfig())
    const core = new Core()

    expect(core.config).toStrictEqual(expectedConfig)
  })

  test('given empty config, should return', () => {})
})
