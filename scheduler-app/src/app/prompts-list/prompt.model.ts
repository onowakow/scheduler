import { Option } from '../option/option.model';

export interface Prompt {
  subject: string;
  options: [Option];
  acceptedOption: Option;
  email: string;
  created: string;
}
