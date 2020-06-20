export interface IWebSite {
  id?: any;
  name?: string;
  description?: string;
  url?: string;
  userAgent?: string;
  holdingTag?: string;
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IWebSite> = {
  id: '',
  name: '',
  description: '',
  url: '',
  userAgent: '',
  holdingTag: '',
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
};
