import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}))

// Mock Next.js image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(({ src, alt }) => {
    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    return img
  }),
}))

// Mock localStorage
const createStorageMock = (): Storage => {
  const store = new Map<string, string>()

  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, String(value))
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key)
    }),
    clear: vi.fn(() => {
      store.clear()
    }),
    key: vi.fn((index: number) => Array.from(store.keys())[index] ?? null),
    get length() {
      return store.size
    },
  } as Storage
}

global.localStorage = createStorageMock()

// Mock sessionStorage
global.sessionStorage = createStorageMock()
