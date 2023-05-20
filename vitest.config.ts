import {defineConfig} from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: [
            './__tests__/setup.ts',
            './__tests__/setupMSW.ts',
        ]
    }
})
