/** Trigger a browser download with the given filename. */
export async function downloadMedia(downloadUrl: string, filename: string): Promise<void> {
    const response = await fetch(downloadUrl, { credentials: 'same-origin' });

    if (!response.ok) {
        throw new Error('Could not download the file.');
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
}

export function withExtension(name: string, originalFilename: string): string {
    const trimmed = name.trim() || 'download';
    const originalExt = originalFilename.includes('.')
        ? originalFilename.slice(originalFilename.lastIndexOf('.'))
        : '';

    if (!originalExt) {
        return trimmed;
    }

    const lower = trimmed.toLowerCase();
    const extLower = originalExt.toLowerCase();

    return lower.endsWith(extLower) ? trimmed : `${trimmed}${originalExt}`;
}
