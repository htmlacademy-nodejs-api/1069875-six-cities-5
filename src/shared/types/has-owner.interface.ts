export interface HasOwner {
  getOwner(documentId: string): Promise<string | null>;
}
