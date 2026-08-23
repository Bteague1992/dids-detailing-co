// Matches a US phone number (optionally prefixed with 1 or +1) and NOTHING else in the
// string once whitespace/punctuation separators are accounted for — e.g. "8282616906",
// "828-261-6906", "(828) 261-6906", "+1 828 261 6906". Anchored with ^...$ so any extra
// words/characters in the message fail the match and are treated as legitimate content.
const PHONE_ONLY_REGEX = /^(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export interface SpamCheckInput {
  /** Value of the honeypot field. Real visitors never see or fill this in. */
  honeypot?: string;
  message?: string;
}

export function isSpamSubmission({ honeypot, message }: SpamCheckInput): boolean {
  // Honeypot: any bot that fills in this hidden field is auto-flagged.
  if (honeypot && honeypot.trim().length > 0) {
    return true;
  }

  // A message that is ONLY a phone number (no greeting, no context) is a common
  // scraper/spam-bot pattern on contact forms — flag it rather than emailing it through.
  const trimmedMessage = message?.trim() ?? "";
  if (trimmedMessage.length > 0 && PHONE_ONLY_REGEX.test(trimmedMessage)) {
    return true;
  }

  return false;
}

export { PHONE_ONLY_REGEX };
