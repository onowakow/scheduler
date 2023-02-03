export interface Prompt {
  subject: string;
  options: [Option];
  acceptedOption: Option;
  email: string;
  created: string;
}

export interface Option {
  slot: string[];
  ownerEmail: string;
  rejected: boolean;
}
