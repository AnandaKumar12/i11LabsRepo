
export interface IDriver {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  mobile?: string;
  dob?: string;
  licenseNumber?: string;
  experienceYears?: number;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export class Driver implements IDriver {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  mobile?: string;
  dob?: string;
  licenseNumber?: string;
  experienceYears?: number;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;

  constructor(data: Partial<IDriver>) {
    this.id = data.id ?? crypto.randomUUID();
    this.firstName = (data.firstName ?? '').trim();
    this.lastName = (data.lastName ?? '').trim();
    this.email = (data.email ?? '').trim();
    this.mobile = (data.mobile ?? '').trim();
    this.dob = data.dob ?? '';
    this.licenseNumber = (data.licenseNumber ?? '').trim();
    this.experienceYears = data.experienceYears ?? 0;
    this.address1 = (data.address1 ?? '').trim();
    this.address2 = (data.address2 ?? '').trim();
    this.city = (data.city ?? '').trim();
    this.state = (data.state ?? '').trim();
    this.zip = (data.zip ?? '').trim();
  }
}
