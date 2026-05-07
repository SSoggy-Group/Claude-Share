import { describe, it, expect } from 'vitest';
import { formatChatAsText } from '../RawViewer';

describe('formatChatAsText', () => {
    it('formats a typical chat sequence correctly', () => {
        const chatData = {
            title: 'My Chat',
            content: [
                { source: 'user', message: 'Hello' },
                { source: 'claude', message: 'Hi there!' }
            ]
        };
        const expected = `# My Chat\n\n## You\n\nHello\n\n---\n\n## Claude\n\nHi there!\n\n---\n`;
        expect(formatChatAsText(chatData)).toBe(expected);
    });

    it('handles missing or non-array content', () => {
        const chatData = { title: 'Empty Chat' };
        expect(formatChatAsText(chatData)).toBe(`# Empty Chat\n`);

        const chatDataNonArray = { title: 'Non-Array Chat', content: 'hello' };
        expect(formatChatAsText(chatDataNonArray)).toBe(`# Non-Array Chat\n`);
    });

    it('handles empty content array', () => {
        const chatData = { title: 'Empty Array Chat', content: [] };
        expect(formatChatAsText(chatData)).toBe(`# Empty Array Chat\n`);
    });

    it('handles missing or null messages', () => {
        const chatData = {
            title: 'Missing Messages',
            content: [
                { source: 'user' },
                { source: 'claude', message: null }
            ]
        };
        const expected = `# Missing Messages\n\n## You\n\n\n\n---\n\n## Claude\n\n\n\n---\n`;
        expect(formatChatAsText(chatData)).toBe(expected);
    });
});
