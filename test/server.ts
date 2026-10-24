/**
 * The MSW node server that answers the tests' requests. It starts with no
 * handlers, so a test that makes a request must add one with
 * server.use(...handlers); an unhandled request fails the test.
 * Shared handlers and fixtures are in test/handlers.ts.
 */
import { setupServer } from 'msw/node'

export const server = setupServer()
