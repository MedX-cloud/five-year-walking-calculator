# Five-year walking prediction calculator

An offline research calculator accompanying a study of walking ability five years after traumatic spinal cord injury. It runs a frozen gradient boosting model and shows an individual probability-scale interventional SHAP explanation.

## Use the calculator

1. Download and extract the project ZIP.
2. Open [Calculator.html](Calculator.html) in Chrome or Edge. Open the downloaded file directly, since email and messaging previews may block scripts.
3. Enter information available after the initial inpatient rehabilitation admission assessment, then select **Calculate probability**.

The outcome is the ability to complete at least one of three tasks five years after injury: walking 150 feet at home, walking one street block outdoors, or climbing one flight of stairs. Assistive devices are permitted. The calculator is for research demonstration. No clinical action threshold has been established. All calculations run locally. No installation, R session, internet connection, or patient identifiers are required.

## Model and input coding

The calculator uses the frozen model `GBM_1208_20260926`, fitted on 468 patients and evaluated on an internal holdout set of 117 patients and an earlier discharge cohort of 623 patients. It uses the fixed training-set imputation values. The [input coding table](INPUTS.md) explains how 10 fields map to 12 model variables.

## Verify the implementation

With Node.js 18 or later, run this from the project folder:

```sh
node verification/verify.cjs
```

The script compares the bundled calculator with expected outputs captured from the original offline release. It checks probabilities, individual SHAP contributions, selected coding and imputation paths, and invalid inputs using synthetic cases. No packages or patient data are required.

[Verification.txt](Verification.txt) contains the original release's verification report and checksum for the original HTML. The revised page has a different checksum. The original R pipeline and study datasets are outside the scope of this calculator release.

## License

[MIT](LICENSE)
