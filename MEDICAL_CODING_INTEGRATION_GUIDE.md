# REVILAC Nutrition Intelligence — Medical Coding & Terminology Integration Guide (v2.5)

## What is connected now
- **Local starter catalogue:** works offline with no credentials.
- **LOINC FHIR terminology adapter:** optional; needs LOINC account credentials in local `.env`; provider/API behavior can change.
- **WHO ICD-11 API adapter:** optional; requires WHO API client ID and secret.
- **SNOMED CT adapter:** optional; requires an authorized FHIR terminology endpoint and applicable access/license.
- **Generic FHIR terminology adapter:** optional; requires a compatible FHIR terminology endpoint.
- **FHIR data exchange:** FHIR is an interoperability format; it is not itself a single universal code list.

## Important: do not confuse a connector with a licensed/complete terminology
The connectors are adapters, not a bundled copy of every official code. Search results from a provider are candidates and must be checked for the right release, jurisdiction, concept, specimen, method, units, and clinical context. The local catalogue deliberately leaves official codes blank where exact mappings have not been verified.

## Official resources
- WHO ICD API documentation and registration: https://icd.who.int/icdapi
- LOINC: https://loinc.org and https://fhir.loinc.org
- SNOMED CT terminology services: https://www.implementation.snomed.org/terminology-services
- HL7 FHIR Observation: https://hl7.org/fhir/observation.html
- HL7 FHIR DiagnosticReport: https://hl7.org/fhir/diagnosticreport.html
- UCUM: https://ucum.org
- RxNorm: https://www.nlm.nih.gov/research/umls/rxnorm/
- WHO ATC/DDD: https://www.who.int/tools/atc-ddd-toolkit
- WHO ICF: https://www.who.int/standards/classifications/international-classification-of-functioning-disability-and-health

## Local setup (Windows)
1. Extract the ZIP.
2. Copy `.env.example` to `.env` (the server creates this automatically on first run).
3. Open `.env` in a text editor.
4. Fill only the providers you have registered/are authorized to use. Leave other values blank.
5. Keep `.env` private. Do not send secrets in chat, screenshots, source control, or a public ZIP.
6. Run `START_TERMINOLOGY_SERVER.cmd`.
7. Open `http://127.0.0.1:8787`, then use Terminology Services.
8. Check `/api/terminology/status` to see which providers are configured.

## Mapping workflow recommended for every observation
1. Preserve the original text from the report.
2. Capture test display, value, unit, specimen, method, reference interval, collection time, and lab source when available.
3. Search LOINC candidates; do not choose based on name alone.
4. Validate unit with UCUM where possible.
5. Keep candidate mapping and verified mapping as separate states.
6. Record source URI, release/version, date checked, reviewer and confidence.
7. If multiple codes are plausible or specimen/method is missing, request review rather than auto-selecting.
8. Use ICD-11/SNOMED CT for diagnoses/clinical concepts only with appropriate clinical provenance; never infer a diagnosis from a single lab result.
9. Represent structured report data using FHIR Observation and DiagnosticReport where appropriate.
10. Only run nutrition rules after patient context and safety checks; the terminology code alone does not imply a diet recommendation.

## Privacy and safety
- Use synthetic/demo data in this prototype.
- LocalStorage is not encrypted. Do not store real patient-identifiable data until privacy/security review is complete.
- API credentials are kept only in local `.env`; never bundle a populated `.env` in a ZIP.
- A provider being configured does not mean its output is clinically validated.
- Do not use the prototype to diagnose, prescribe, or replace a registered clinician/dietitian.
