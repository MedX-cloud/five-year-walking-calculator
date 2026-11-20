const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");

const html = readFileSync(join(__dirname, "..", "Calculator.html"), "utf8");
const fixtures = JSON.parse(readFileSync(join(__dirname, "cases.json"), "utf8"));
const modelTag = html.match(/<script id="model-data" type="application\/json">([\s\S]*?)<\/script>/);
const engineTag = html.match(/<script>(\/\* Frozen GBM[\s\S]*?)<\/script>/);
assert.ok(modelTag && engineTag, "The bundled model and engine must be present.");

const model = JSON.parse(modelTag[1]);
const engineModule = { exports: {} };
runInNewContext(engineTag[1], { module: engineModule });
const engine = engineModule.exports;
const tolerance = 1e-12;

function close(actual, expected, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, got ${actual}`);
}

assert.equal(model.version, fixtures.modelVersion);
assert.deepEqual(model.variables, fixtures.variableOrder);

for (const test of fixtures.cases) {
  if (test.expectedError) {
    assert.throws(() => engine.prepareInputs(model, test.inputs), {
      message: test.expectedError,
    }, test.name);
    continue;
  }

  const result = engine.prepareInputs(model, test.inputs);
  const explanation = engine.explain(model, result.x);
  assert.deepEqual(Array.from(result.x), test.expected.encoded, test.name);
  assert.deepEqual(Array.from(result.imputed), test.expected.imputed, test.name);
  assert.deepEqual(Array.from(result.notes), test.expected.notes, test.name);
  close(result.probability, test.expected.probability, test.name);
  close(explanation.probability, test.expected.probability, test.name);
  close(explanation.baseline, test.expected.baseline, `${test.name}: SHAP baseline`);
  assert.equal(explanation.contributions.length, model.variables.length, test.name);
  explanation.contributions.forEach((value, index) => {
    close(value, test.expected.shap[index], `${test.name}: ${model.variables[index]}`);
  });
  const reconstructed = explanation.contributions.reduce((sum, value) => sum + value, explanation.baseline);
  close(reconstructed, explanation.probability, `${test.name}: SHAP additivity`);
}

console.log(`Passed ${fixtures.cases.length} synthetic verification cases at tolerance ${tolerance}.`);
