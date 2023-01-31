export class Option {
  constructor(slot: string[], _id?: string) {}
}

export class Prompt {
  constructor(
    subject: string,
    options: [Option],
    acceptedOption: Option | null,
    email: string,
    _id?: string
  ) {}
}
