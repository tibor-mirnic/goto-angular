import { UserFriendlyError } from '@modules/errors';

export class FeatureModuleError extends UserFriendlyError {
  constructor(message: string) {
    super(message, 'Feature Module');
  }
}
