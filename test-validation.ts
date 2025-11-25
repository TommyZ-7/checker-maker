import { sanitizeText, validateDiagnostic, MAX_TITLE_LENGTH } from './src/lib/validation';
import { Diagnostic } from './src/types';

const testSanitize = () => {
    const input = 'Hello <script>alert("xss")</script> / { }';
    const expected = 'Hello &lt;script&gt;alert(&quot;xss&quot;)&lt;&#47;script&gt; &#47; &#123; &#125;';
    const result = sanitizeText(input);
    console.log(`Sanitize Test: ${result === expected ? 'PASS' : 'FAIL'}`);
    if (result !== expected) {
        console.log(`Expected: ${JSON.stringify(expected)}`);
        console.log(`Actual:   ${JSON.stringify(result)}`);
    }
};

const testValidate = () => {
    const validDiagnostic: Diagnostic = {
        id: '1',
        title: 'Valid Title',
        description: 'Valid Description',
        questions: [],
        results: [],
        createdAt: new Date().toISOString(),
    };

    const invalidDiagnostic: Diagnostic = {
        ...validDiagnostic,
        title: 'a'.repeat(MAX_TITLE_LENGTH + 1),
    };

    const validResult = validateDiagnostic(validDiagnostic);
    const invalidResult = validateDiagnostic(invalidDiagnostic);

    console.log(`Validate Valid Test: ${validResult.valid ? 'PASS' : 'FAIL'}`);
    console.log(`Validate Invalid Test: ${!invalidResult.valid ? 'PASS' : 'FAIL'}`);
    if (invalidResult.valid) {
        console.log('Expected invalid diagnostic to fail validation');
    }
};

testSanitize();
testValidate();
