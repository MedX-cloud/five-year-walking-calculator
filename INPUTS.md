# Calculator input coding

The calculator uses information available after the initial inpatient rehabilitation admission assessment. Ten form fields map to twelve model variables because neurologic level expands into three indicator variables.

| Form input | Model variable | Encoding | Missing-value handling |
|---|---|---|---|
| System acute medical unit stay | `AHDaSyAc` | Whole days, 1–8,887 | Required. Values outside the training range of 2–242 days trigger a note. |
| Vertebral injury | `AVertInj` | No = 0, yes = 1 | Required. |
| Associated major injury | `AAsscInj` | No = 0, yes = 1 | Unknown → 0. |
| Mechanical ventilation at rehabilitation admission | `AUMVAdm` | None = 0, short-term use for pulmonary complications = 1, ventilator-dependent or weaning = 2, phrenic nerve stimulator = 3, used with duration/type unknown = 4, CPAP for sleep apnea = 5 | Unknown and categories 3–5 → 0. Categories 3–5 trigger a note because they were absent from training. |
| Acute ASIA motor total score | `AASATotA` | Whole number, 0–100 | Use the unknown or untestable checkbox → 50. |
| Acute neurologic level | `ANurLvlA_Cervical`, `ANurLvlA_Thoracic`, `ANurLvlA_Lumbar` | Cervical → (1, 0, 0), thoracic → (0, 1, 0), lumbar → (0, 0, 1), sacral or normal → (0, 0, 0) | Unknown → (1, 0, 0) using the three fixed training modes. |
| Acute voluntary anal contraction | `AVoSphAd` | No = 0, yes = 1 | Unknown → 0. |
| Acute deep anal pressure | `AAnSnAdm` | No = 0, yes = 1 | Unknown → 1. |
| Acute AIS injury completeness | `AASAImAd` | AIS A = 1, AIS B–D = 0 | Unknown → 0. |
| Acute neurologic impairment category | `ANCatAdm` | Paraplegia = 0, tetraplegia = 1 | Unknown → 1. |

At least one of the six acute neurologic assessments must be known before imputation. Select an explicit answer for each dropdown. Where shown, select **Unknown** for missing information. If AIS A is entered together with present voluntary anal contraction or deep anal pressure, the calculator asks the user to check the source record.
