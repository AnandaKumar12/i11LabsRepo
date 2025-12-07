
export interface ICompany {
  id: string;
  name: string;
  establishedOn?: string;
  registrationNumber?: string;
  website?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  primaryFirstName?: string;
  primaryLastName?: string;
  primaryEmail?: string;
  primaryMobile?: string;
}
export class Company implements ICompany {
  id: string;
  name: string;
  establishedOn?: string;
  registrationNumber?: string;
  website?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  primaryFirstName?: string;
  primaryLastName?: string;
  primaryEmail?: string;
  primaryMobile?: string;

  constructor(data: Partial<ICompany>) {
    this.id = data.id ?? crypto.randomUUID();
    this.name = (data.name ?? '').trim();
    this.establishedOn = data.establishedOn ?? '';
    this.registrationNumber = (data.registrationNumber ?? '').trim();
    this.website = (data.website ?? '').trim();
    this.address1 = (data.address1 ?? '').trim();
    this.address2 = (data.address2 ?? '').trim();
    this.city = (data.city ?? '').trim();
    this.state = (data.state ?? '').trim();
    this.zip = (data.zip ?? '').trim();
    this.primaryFirstName = (data.primaryFirstName ?? '').trim();
    this.primaryLastName = (data.primaryLastName ?? '').trim();
    this.primaryEmail = (data.primaryEmail ?? '').trim();
    this.primaryMobile = (data.primaryMobile ?? '').trim();
  }
}
