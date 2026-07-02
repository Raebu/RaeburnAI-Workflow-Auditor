import { describe, expect, it } from 'vitest';
import { parseUploadedFile } from '@/lib/document-parser';

describe('document parser', () => {
  it('parses csv uploads into readable workflow text', async () => {
    const content = 'step,owner\nCheck inbox,Agent\nUpdate CRM,Agent\nPrepare weekly report,Manager\nEscalate approval,Manager';
    const file = new File([content], 'workflow.csv', { type: 'text/csv' });
    const parsed = await parseUploadedFile(file);

    expect(parsed.sourceType).toBe('csv');
    expect(parsed.text).toContain('Check inbox');
    expect(parsed.text).toContain('Update CRM');
  });
});
