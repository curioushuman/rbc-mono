const fs = jest.createMockFromModule('fs');

function mockReadFile(
  file: string,
  encoding: string,
  callback: (err: NodeJS.ErrnoException | null, data: string) => void,
): void {
  throw new Error('File could not be found');
}
