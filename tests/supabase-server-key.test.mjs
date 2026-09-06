import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const root = new URL('../', import.meta.url)

function token(claims) {
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(claims)}.signature`
}

async function validator() {
  const source = await readFile(new URL('../lib/supabase-server-key.ts', import.meta.url), 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const module = await import(`data:text/javascript,${encodeURIComponent(compiled)}`)
  return module.validateSupabaseServerKey
}

test('legacy JWT time claims are evaluated against server time', async () => {
  const validate = await validator()

  assert.deepEqual(validate(token({ iat: 900, nbf: 950, exp: 2_000 }), 1_000), {
    iat: 900,
    nbf: 950,
    exp: 2_000,
  })
  assert.deepEqual(validate(token({ iat: 1_060, nbf: 1_060, exp: 2_000 }), 1_000), {
    iat: 1_060,
    nbf: 1_060,
    exp: 2_000,
  })
  assert.throws(() => validate(token({ iat: 1_061, exp: 2_000 }), 1_000), /issued in the future/)
  assert.throws(() => validate(token({ iat: 900, nbf: 1_061, exp: 2_000 }), 1_000), /not active yet/)
  assert.throws(() => validate(token({ iat: 900, exp: 1_000 }), 1_000), /has expired/)
})

test('modern Supabase server keys do not get misread as JWTs', async () => {
  const validate = await validator()
  assert.equal(validate('sb_secret_test_key', 1_000), null)
})
