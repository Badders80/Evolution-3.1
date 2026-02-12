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

// Mock Storage interface
class StorageMock implements Storage {
  [name: string]: any;
  length: number = 0;
  clear = vi.fn();
  getItem = vi.fn();
  key = vi.fn();
  removeItem = vi.fn();
  setItem = vi.fn();
}

// Mock localStorage
global.localStorage = new StorageMock()

// Mock sessionStorage
global.sessionStorage = new StorageMock()
