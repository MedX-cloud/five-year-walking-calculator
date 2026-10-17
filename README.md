# Five-year walking prediction calculator

An offline, browser-based research calculator using a frozen gradient boosting model (GBM) with individual probability-scale interventional SHAP explanations.

## Quick start

1. Download this repository using **Code → Download ZIP** and extract it.
2. Open `Calculator.html` in Chrome or Edge.
3. Enter the requested information and select **Calculate probability**.

No installation, R environment, server, or internet connection is required. Editing an input clears the previous result. For an unknown or untestable motor score, use the checkbox rather than codes 888 or 999.

## Model and outcome

Model version: `GBM_1208_20260926`. The supplied documentation reports 468 training patients, 117 internal holdout patients, and 623 earlier-year validation patients. The calculator uses the fitted model and fixed imputation values without refitting or recalibration.

The outcome is completing at least one of three walking tasks at post-injury year 5: walking 150 feet at home, walking one street block outside, or walking up one flight of steps. Assistive devices are permitted.

**For research demonstration only.** This is not a prediction of independent walking. No clinical action threshold is established. SHAP explanations do not establish causality.

## Files

- `Calculator.html`: self-contained calculator, model parameters, and explanation logic.
- `README.txt`: original usage instructions.
- `Verification.txt`: original software verification record and calculator SHA-256 checksum.
- `LICENSE`: MIT license.

The verification results are supplied with the original project; the original R analysis and validation datasets are not included here. The calculator file is preserved byte-for-byte.

## Privacy

Calculations run locally in the browser. The page does not upload or persist entered values and blocks network connections through its content security policy. Original patient data workbooks are not included.

## License

MIT License. See `LICENSE`.
